import express from 'express'
import conn from '../configs/mysql.js' // 引入資料庫連接

const router = express.Router()

router.get('/:user_id', async (request, response) => {
  const userId = request.params.user_id

  // 查詢購物車內容
  const queryToFetchCartContents = `
  SELECT 
      cart_items.id AS cart_item_id,
      cart_items.product_detail_id,
      product.id AS product_id,
      cart_items.class_id,
      cart_items.product_quantity,
      product.name AS product_name,
      product_detail.price AS product_price,
      product_detail.sale_price AS product_sale_price,
      product_detail.years,
      product_detail.capacity,
      product_detail.amount AS product_amount,
      class.name AS class_name,
      class.price AS class_price,
      class.sale_price AS class_sale_price,
      users.user_name AS username,
      GROUP_CONCAT(DISTINCT images_product.path ORDER BY images_product.path SEPARATOR ',') AS product_images,
      images_class.path AS class_image,
      country.name AS product_country,
      class.online AS class_online,
      teacher.name AS teacher_name,
      class.student_limit AS student_limits,
      class.assigned AS assigned
  FROM 
      cart_items 
  JOIN users ON cart_items.user_id = users.id
  LEFT JOIN product_detail ON cart_items.product_detail_id = product_detail.id
  LEFT JOIN product ON product_detail.product_id = product.id
  LEFT JOIN class ON cart_items.class_id = class.id
  LEFT JOIN images_product ON product.id = images_product.product_id
  LEFT JOIN images_class ON class.id = images_class.class_id
  LEFT JOIN origin ON product.origin_id = origin.id
  LEFT JOIN country ON origin.country_id = country.id
  LEFT JOIN teacher ON class.teacher_id = teacher.id
  WHERE 
      cart_items.user_id = ?
  GROUP BY 
      cart_items.id, product.id;
`

  // 查詢點數和優惠券
  const queryToFetchPointsAndCoupons = `
  SELECT 
      user_points.points_balance AS user_have_points,
      coupon.id AS coupon_id,
      coupon.name AS coupon_name,
      coupon.discount AS coupon_discount,
      coupon.category AS coupon_category,
      coupon.min_spend AS min_spend,
      user_coupon.status AS coupon_status
  FROM 
      users
  LEFT JOIN user_points ON users.id = user_points.user_id
  LEFT JOIN user_coupon ON users.id = user_coupon.user_id
  LEFT JOIN coupon ON user_coupon.coupon_id = coupon.id
  WHERE 
      users.id = ?
  `

  // 查詢最新訂單資訊
  const queryToFetchLatestOrder = `
  SELECT 
      orders.order_uuid AS order_uuid,
      orders.earned_points AS earned_points,
      orders.coupon_amount AS coupon_amount
  FROM 
      orders
  WHERE 
      orders.user_id = ?
  ORDER BY
      orders.created_at DESC
  LIMIT 1;
  `

  try {
    const [cartResults] = await conn.query(queryToFetchCartContents, [userId])
    const [pointsAndCouponsResults] = await conn.query(
      queryToFetchPointsAndCoupons,
      [userId]
    )
    const [latestOrderResults] = await conn.query(queryToFetchLatestOrder, [
      userId,
    ])

    // 格式化購物車內容
    const formattedCartResults = cartResults.map((item) => {
      const imagesArray = item.product_images
        ? item.product_images.split(',')
        : []
      return {
        ...item,
        product_image: imagesArray[1] || imagesArray[0] || null,
        product_amount: item.product_amount, // 確保返回 product_amount
      }
    })

    // 計算總金額和總數量
    let totalAmount = 0
    let totalQuantity = 0 // 商品數量
    let totalClassCount = 0 // 課程數量
    formattedCartResults.forEach((item) => {
      const quantity = item.product_quantity || 0 // 使用 0 當 product_quantity 為 null 時
      const productPrice =
        item.product_sale_price > 0
          ? item.product_sale_price
          : item.product_price
      const classPrice =
        item.class_sale_price > 0 ? item.class_sale_price : item.class_price

      if (item.product_detail_id) {
        totalAmount += productPrice * quantity
        totalQuantity += quantity // 計算商品數量
      }
      if (item.class_id) {
        totalAmount += classPrice
        totalClassCount += 1 // 每個課程算作一個單位
      }
    })

    // 總數量 = 商品數量 + 課程數量
    const totalItems = totalQuantity + totalClassCount

    // 過濾不能使用的優惠券
    const validCoupons = pointsAndCouponsResults.filter(
      (coupon) => totalAmount >= coupon.min_spend
    )

    // 提取點數
    const userPoints =
      pointsAndCouponsResults.length > 0
        ? pointsAndCouponsResults[0].user_have_points
        : 0

    // 提取最新訂單資訊
    const latestOrder =
      latestOrderResults.length > 0 ? latestOrderResults[0] : {}

    response.json({
      items: formattedCartResults,
      totalAmount,
      totalQuantity: totalItems, // 更新返回的總數量字段
      coupons: validCoupons,
      user_have_points: userPoints,
      latestOrder, // 將最新訂單資訊返回到前端
    })
  } catch (error) {
    console.error('查詢失敗:', error)
    return response
      .status(500)
      .json({ error: '查詢失敗', details: error.message })
  }
})

// 更新購物車中的項目數量 (Update)
router.put('/:id', async (request, response) => {
  const itemId = request.params.id
  const { product_quantity } = request.body

  try {
    await conn.query(
      'UPDATE cart_items SET product_quantity = ? WHERE id = ?',
      [product_quantity, itemId]
    )
    response.json({ message: '購物車項目數量已更新' })
  } catch (error) {
    console.error('更新購物車項目數量失敗:', error)
    return response
      .status(500)
      .json({ error: '更新購物車項目數量失敗', details: error.message })
  }
})

// 刪除該用戶的所有購物車項目
router.delete('/:id', async (request, response) => {
  const itemId = request.params.id // 获取 item ID
  try {
    const [result] = await conn.query('DELETE FROM cart_items WHERE id = ?', [
      itemId,
    ])
    if (result.affectedRows > 0) {
      return response.json({ message: '购物车项已成功删除' })
    } else {
      return response.status(404).json({ message: '找不到要删除的物品' })
    }
  } catch (error) {
    console.error('删除购物车项目失败:', error)
    return response
      .status(500)
      .json({ error: '删除购物车项目失败', details: error.message })
  }
})

// 新增訂單 (Cash On Delivery)
router.post('/cashOnDelivery', async (req, res) => {
  const couponId = req.body.couponData ? req.body.couponData.id : null
  const {
    userId, // 使用從前端傳來的 userId
    pointsUsed,
    originalPoints,
    selectedTransport,
    transportData,
    transportBlackCatData,
    couponData,
    cartItems,
    discountedAmount,
    discountAmounts,
  } = req.body

  try {
    // 生成訂單編號
    const generateOrderNumber = () => {
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters[randomIndex]
      }
      return result.toUpperCase()
    }

    const orderNumber = generateOrderNumber()

    // 計算總金額並無條件捨去
    const totalAmount = Math.floor(
      cartItems.reduce((sum, item) => {
        const productPrice =
          item.product_sale_price > 0
            ? item.product_sale_price
            : item.product_price
        const classPrice =
          item.class_sale_price > 0 ? item.class_sale_price : item.class_price
        if (item.product_detail_id) {
          return sum + Math.floor(productPrice * item.product_quantity)
        }
        if (item.class_id) {
          return sum + Math.floor(classPrice)
        }
        return sum
      }, 0)
    )

    // 計算回饋點數
    const [userLevel] = await conn.query(
      'SELECT member_level_id FROM users WHERE id = ?',
      [userId]
    )
    const memberLevelId = userLevel[0].member_level_id

    const earnedPoints = Math.floor(
      discountedAmount *
        (memberLevelId === 1
          ? 0.003
          : memberLevelId === 2
            ? 0.01
            : memberLevelId === 3
              ? 0.02
              : memberLevelId === 4
                ? 0.035
                : 0)
    )

    // 插入訂單資料
    const insertOrderQuery = `
    INSERT INTO orders (order_uuid, user_id, status, payment_method, payment_date, shipping_fee, coupon_id, coupon_amount, earned_points, pointUsed, pickup_name, pickup_phone, pickup_address, pickup_store_name, transport, totalMoney, created_at, updated_at)
    VALUES (?, ?, ?, '貨到付款', NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
  `

    // 檢查 cartItems 中是否只有課程資料
    const hasOnlyClasses = cartItems.every(
      (item) => item.class_id && !item.product_detail_id
    )

    // 設定訂單狀態，如果只有課程資料則為 '已完成'
    const orderStatus = hasOnlyClasses ? '已完成' : '尚未付款'

    const [orderResult] = await conn.query(insertOrderQuery, [
      orderNumber,
      userId,
      orderStatus, // 動態設定訂單狀態
      60, // 固定運費，已無條件捨去
      couponData?.coupon_id || null,
      discountAmounts || null,
      earnedPoints,
      pointsUsed,
      selectedTransport === 'blackcat'
        ? transportBlackCatData.name
        : transportData.pickupName,
      selectedTransport === 'blackcat'
        ? transportBlackCatData.phone
        : transportData.pickupPhone,
      selectedTransport === 'blackcat' ? transportBlackCatData.address : null,
      selectedTransport === 'transprot711' ? transportData.storeName : null,
      selectedTransport === 'blackcat'
        ? '黑貓宅急便'
        : selectedTransport === 'transprot711'
          ? '7-11'
          : null,
      discountedAmount,
    ])

    const orderId = orderResult.insertId

    // 插入商品和課程
    const insertOrderItemsQuery = `
      INSERT INTO order_details (order_uuid, product_id, product_detail_id, class_id, product_quantity, created_at)
      VALUES (?, ?, ?, ?, ?, NOW());
    `
    for (const item of cartItems) {
      await conn.query(insertOrderItemsQuery, [
        orderNumber,
        item.product_id || null,
        item.product_detail_id || null,
        item.class_id || null,
        item.product_quantity,
      ])

      // 如果 class_id 存在且有報名人數上限，則更新已報名人數
      if (item.class_id && item.student_limits > 0) {
        const updateAssignedQuery = `
          UPDATE class 
          SET assigned = COALESCE(assigned, 0) + 1
          WHERE id = ? AND COALESCE(assigned, 0) < student_limit;
        `
        await conn.query(updateAssignedQuery, [item.class_id])
      }

      // 更新商品銷售數量
      if (item.product_detail_id) {
        const updateSalesQuery = `
                UPDATE product_detail 
                SET sales = sales + ?
                WHERE id = ?;
              `
        await conn.query(updateSalesQuery, [
          item.product_quantity,
          item.product_detail_id,
        ])
      }
    }

    // 更新已使用的優惠券狀態
    if (couponData?.coupon_id) {
      const updateCouponStatusQuery = `
    UPDATE user_coupon 
    SET status = 'used' 
    WHERE user_id = ? AND coupon_id = ?;
  `
      await conn.query(updateCouponStatusQuery, [userId, couponData.coupon_id])
      console.log(
        'Updated coupon status to used for user:',
        userId,
        'with coupon id:',
        couponData.coupon_id
      )
    }

    // 更新會員點數
    const userPointsQuery = `
      INSERT INTO user_points (user_id, points_balance, last_updated)
      VALUES (?, ?, NOW())
      ON DUPLICATE KEY UPDATE points_balance = VALUES(points_balance), last_updated = NOW();
    `
    const newPointsBalance = Math.floor(
      originalPoints - pointsUsed + earnedPoints
    )
    await conn.query(userPointsQuery, [userId, newPointsBalance])

    // 記錄點數變化
    const pointChange = earnedPoints - pointsUsed
    const insertPointTransactionsQuery = `
      INSERT INTO point_transactions (user_id, point_change, transaction_type, description, created_at)
      VALUES (?, ?, '消費', '購物消費的點數使用獲得量', NOW());
    `
    await conn.query(insertPointTransactionsQuery, [userId, pointChange])

    // 刪除購物車內的已購買商品或課程
    const deleteCartItemsQuery = `
        DELETE FROM cart_items WHERE user_id = ? AND (product_detail_id = ? OR class_id = ?);
      `
    for (const item of cartItems) {
      await conn.query(deleteCartItemsQuery, [
        userId,
        item.product_detail_id || null,
        item.class_id || null,
      ])
    }

    console.log('已刪除購物車內的已購買商品或課程')

    // 更新庫存數量並檢查庫存是否為零
    const updateStockQuery = `
UPDATE product_detail 
SET amount = amount - ?, valid = CASE WHEN amount - ? <= 0 THEN 0 ELSE valid END
WHERE id = ?;
`
    for (const item of cartItems) {
      if (item.product_detail_id) {
        await conn.query(updateStockQuery, [
          item.product_quantity,
          item.product_quantity,
          item.product_detail_id,
        ])
      }
    }

    // 如果有 product_detail_id，檢查 product 的 valid 狀態
    if (cartItems.some((item) => item.product_detail_id)) {
      // 獲取 product_id
      const checkProductValidityQuery = `
  SELECT product_id
  FROM product_detail
  WHERE id = ?;
`
      const [productDetailResult] = await conn.query(
        checkProductValidityQuery,
        [cartItems[0].product_detail_id]
      )

      if (productDetailResult.length > 0) {
        const productId = productDetailResult[0].product_id

        // 檢查該 product_id 下所有的 product_detail 的 valid 狀態
        const checkAllDetailsInvalidQuery = `
    SELECT COUNT(*) AS count
    FROM product_detail
    WHERE product_id = ? AND valid = 1;
  `
        const [allDetailsResult] = await conn.query(
          checkAllDetailsInvalidQuery,
          [productId]
        )
        const allDetailsValidCount = allDetailsResult[0].count

        // 如果所有的 product_detail 都無效，則將 product 表格的 valid 更新為 0
        if (allDetailsValidCount === 0) {
          const updateProductValidityQuery = `
      UPDATE product 
      SET valid = 0 
      WHERE id = ?;
    `
          await conn.query(updateProductValidityQuery, [productId])
        }
      }
    }

    console.log('已更新庫存和產品有效性')

    // 返回成功訊息
    console.log('訂單已成功建立，準備發送回應')
    res.json({ message: '訂單已成功建立', orderNumber })
  } catch (error) {
    console.error('建立訂單時發生錯誤:', error)
    res
      .status(500)
      .json({ error: '建立訂單時發生錯誤', details: error.message })
  }
})

// 新增訂單 (CreditCard Payment)
router.post('/creditCardPayment', async (req, res) => {
  const couponId = req.body.couponData ? req.body.couponData.id : null
  const {
    userId,
    pointsUsed,
    originalPoints,
    selectedTransport,
    transportData,
    transportBlackCatData,
    couponData,
    cartItems,
    discountedAmount,
    discountAmounts,
  } = req.body

  try {
    // 生成訂單編號
    const generateOrderNumber = () => {
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters[randomIndex]
      }
      return result.toUpperCase()
    }

    const orderNumber = generateOrderNumber()

    // 計算總金額並無條件捨去
    const totalAmount = Math.floor(
      cartItems.reduce((sum, item) => {
        const productPrice =
          item.product_sale_price > 0
            ? item.product_sale_price
            : item.product_price
        const classPrice =
          item.class_sale_price > 0 ? item.class_sale_price : item.class_price
        if (item.product_detail_id) {
          return sum + Math.floor(productPrice * item.product_quantity)
        }
        if (item.class_id) {
          return sum + Math.floor(classPrice)
        }
        return sum
      }, 0)
    )

    // 計算回饋點數
    const [userLevel] = await conn.query(
      'SELECT member_level_id FROM users WHERE id = ?',
      [userId]
    )
    const memberLevelId = userLevel[0].member_level_id

    const earnedPoints = Math.floor(
      discountedAmount *
        (memberLevelId === 1
          ? 0.003
          : memberLevelId === 2
            ? 0.01
            : memberLevelId === 3
              ? 0.02
              : memberLevelId === 4
                ? 0.035
                : 0)
    )

    // 插入訂單資料
    const insertOrderQuery = `
    INSERT INTO orders (order_uuid, user_id, status, payment_method, payment_date, shipping_fee, coupon_id, coupon_amount, earned_points, pointUsed, pickup_name, pickup_phone, pickup_address, pickup_store_name, transport, totalMoney, created_at, updated_at)
    VALUES (?, ?, ?, '信用卡', NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
  `

    // 檢查 cartItems 中是否只有課程資料
    const hasOnlyClasses = cartItems.every(
      (item) => item.class_id && !item.product_detail_id
    )

    // 設定訂單狀態，如果只有課程資料則為 '已完成'
    const orderStatus = hasOnlyClasses ? '已完成' : '信用卡'

    const [orderResult] = await conn.query(insertOrderQuery, [
      orderNumber,
      userId,
      orderStatus, // 動態設定訂單狀態
      60, // 固定運費，已無條件捨去
      couponData?.coupon_id || null,
      discountAmounts || null,
      earnedPoints,
      pointsUsed,
      selectedTransport === 'blackcat'
        ? transportBlackCatData.name
        : transportData.pickupName,
      selectedTransport === 'blackcat'
        ? transportBlackCatData.phone
        : transportData.pickupPhone,
      selectedTransport === 'blackcat' ? transportBlackCatData.address : null,
      selectedTransport === 'transprot711' ? transportData.storeName : null,
      selectedTransport === 'blackcat'
        ? '黑貓宅急便'
        : selectedTransport === 'transprot711'
          ? '7-11'
          : null,
      discountedAmount,
    ])

    const orderId = orderResult.insertId

    // 插入商品和課程
    const insertOrderItemsQuery = `
      INSERT INTO order_details (order_uuid, product_id, product_detail_id, class_id, product_quantity, created_at)
      VALUES (?, ?, ?, ?, ?, NOW());
    `
    for (const item of cartItems) {
      console.log('Inserting item:', item)
      await conn.query(insertOrderItemsQuery, [
        orderNumber,
        item.product_id || null,
        item.product_detail_id || null,
        item.class_id || null,
        item.product_quantity,
      ])

      // 如果 class_id 存在且有報名人數上限，則更新已報名人數
      if (item.class_id && item.student_limits > 0) {
        const updateAssignedQuery = `
          UPDATE class 
          SET assigned = COALESCE(assigned, 0) + 1
          WHERE id = ? AND COALESCE(assigned, 0) < student_limit;
        `
        await conn.query(updateAssignedQuery, [item.class_id])
      }

      // 更新商品銷售數量
      if (item.product_detail_id) {
        const updateSalesQuery = `
                UPDATE product_detail 
                SET sales = sales + ?
                WHERE id = ?;
              `
        await conn.query(updateSalesQuery, [
          item.product_quantity,
          item.product_detail_id,
        ])
      }
    }

    // 更新已使用的優惠券狀態
    if (couponData?.coupon_id) {
      const updateCouponStatusQuery = `
    UPDATE user_coupon 
    SET status = 'used' 
    WHERE user_id = ? AND coupon_id = ?;
  `
      await conn.query(updateCouponStatusQuery, [userId, couponData.coupon_id])
      console.log(
        'Updated coupon status to used for user:',
        userId,
        'with coupon id:',
        couponData.coupon_id
      )
    }

    // 更新會員點數
    const userPointsQuery = `
      INSERT INTO user_points (user_id, points_balance, last_updated)
      VALUES (?, ?, NOW())
      ON DUPLICATE KEY UPDATE points_balance = VALUES(points_balance), last_updated = NOW();
    `
    const newPointsBalance = Math.floor(
      originalPoints - pointsUsed + earnedPoints
    )
    await conn.query(userPointsQuery, [userId, newPointsBalance])

    // 記錄點數變化
    const pointChange = earnedPoints - pointsUsed
    const insertPointTransactionsQuery = `
      INSERT INTO point_transactions (user_id, point_change, transaction_type, description, created_at)
      VALUES (?, ?, '消費', '購物消費的點數使用獲得量', NOW());
    `
    await conn.query(insertPointTransactionsQuery, [userId, pointChange])

    // 新增功能：刪除購物車內的已購買商品或課程
    const deleteCartItemsQuery = `
        DELETE FROM cart_items WHERE user_id = ? AND (product_detail_id = ? OR class_id = ?);
      `
    for (const item of cartItems) {
      await conn.query(deleteCartItemsQuery, [
        userId,
        item.product_detail_id || null,
        item.class_id || null,
      ])
    }
    console.log('已刪除購物車內的已購買商品或課程')

    // 更新庫存數量並檢查庫存是否為零
    const updateStockQuery = `
  UPDATE product_detail 
  SET amount = amount - ?, valid = CASE WHEN amount - ? <= 0 THEN 0 ELSE valid END
  WHERE id = ?;
`
    for (const item of cartItems) {
      if (item.product_detail_id) {
        await conn.query(updateStockQuery, [
          item.product_quantity,
          item.product_quantity,
          item.product_detail_id,
        ])
      }
    }

    // 如果有 product_detail_id，檢查 product 的 valid 狀態
    if (cartItems.some((item) => item.product_detail_id)) {
      // 獲取 product_id
      const checkProductValidityQuery = `
    SELECT product_id
    FROM product_detail
    WHERE id = ?;
  `
      const [productDetailResult] = await conn.query(
        checkProductValidityQuery,
        [cartItems[0].product_detail_id]
      )

      if (productDetailResult.length > 0) {
        const productId = productDetailResult[0].product_id

        // 檢查該 product_id 下所有的 product_detail 的 valid 狀態
        const checkAllDetailsInvalidQuery = `
      SELECT COUNT(*) AS count
      FROM product_detail
      WHERE product_id = ? AND valid = 1;
    `
        const [allDetailsResult] = await conn.query(
          checkAllDetailsInvalidQuery,
          [productId]
        )
        const allDetailsValidCount = allDetailsResult[0].count

        // 如果所有的 product_detail 都無效，則將 product 表格的 valid 更新為 0
        if (allDetailsValidCount === 0) {
          const updateProductValidityQuery = `
        UPDATE product 
        SET valid = 0 
        WHERE id = ?;
      `
          await conn.query(updateProductValidityQuery, [productId])
        }
      }
    }

    console.log('已更新庫存和產品有效性')

    // 返回成功訊息
    console.log('訂單已成功建立，準備發送回應')
    res.json({ message: '訂單已成功建立', orderNumber })
  } catch (error) {
    console.error('建立訂單時發生錯誤:', error)
    res
      .status(500)
      .json({ error: '建立訂單時發生錯誤', details: error.message })
  }
})

export default router
