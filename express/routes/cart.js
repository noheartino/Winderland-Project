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
      cart_items.class_id,
      cart_items.product_quantity,
      product.name AS product_name,
      product_detail.price AS product_price,
      product_detail.sale_price AS product_sale_price,
      product_detail.years,
      product_detail.capacity,
      class.name AS class_name,
      class.price AS class_price,
      class.sale_price AS class_sale_price,
      users.user_name AS username,
      GROUP_CONCAT(DISTINCT images_product.path ORDER BY images_product.path SEPARATOR ',') AS product_images,
      images_class.path AS class_image,
      country.name AS product_country,
      class.online AS class_online,
      teacher.name AS teacher_name
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
    orders.order_uuid AS order_uuid,
    orders.earned_points AS earned_points
FROM 
    users
LEFT JOIN user_points ON users.id = user_points.user_id
LEFT JOIN user_coupon ON users.id = user_coupon.user_id
LEFT JOIN coupon ON user_coupon.coupon_id = coupon.id
LEFT JOIN orders ON users.id = orders.user_id
WHERE 
    users.id = ?
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

    // 格式化購物車內容
    const formattedCartResults = cartResults.map((item) => {
      const imagesArray = item.product_images
        ? item.product_images.split(',')
        : []

      return {
        ...item,
        product_image: imagesArray[1] || imagesArray[0] || null,
      }
    })

    // 計算總金額
    let totalAmount = 0
    formattedCartResults.forEach((item) => {
      const quantity = item.product_quantity || 0
      const productPrice =
        item.product_sale_price > 0
          ? item.product_sale_price
          : item.product_price
      const classPrice =
        item.class_sale_price > 0 ? item.class_sale_price : item.class_price

      if (item.product_detail_id) {
        totalAmount += productPrice * quantity
      }
      if (item.class_id) {
        totalAmount += classPrice
      }
    })

    // 過濾不能使用的優惠券
    const validCoupons = pointsAndCouponsResults.filter(
      (coupon) => totalAmount >= coupon.min_spend
    )

    // 提取點數
    const userPoints =
      pointsAndCouponsResults.length > 0
        ? pointsAndCouponsResults[0].user_have_points
        : 0

    response.json({
      items: formattedCartResults,
      totalAmount,
      coupons: validCoupons,
      user_have_points: userPoints,
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
  console.log('Request Body:', req.body);
  const couponId = req.body.couponData ? req.body.couponData.id : null;
  console.log('Coupon ID:', couponId);
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
  } = req.body;

  try {
    // 生成訂單編號
    const generateOrderNumber = () => {
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      let result = '';
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result.toUpperCase();
    };

    const orderNumber = generateOrderNumber();

    // 計算總金額並無條件捨去
    const totalAmount = Math.floor(
      cartItems.reduce((sum, item) => {
        const productPrice =
          item.product_sale_price > 0
            ? item.product_sale_price
            : item.product_price;
        const classPrice =
          item.class_sale_price > 0 ? item.class_sale_price : item.class_price;
        if (item.product_detail_id) {
          return sum + Math.floor(productPrice * item.product_quantity);
        }
        if (item.class_id) {
          return sum + Math.floor(classPrice);
        }
        return sum;
      }, 0)
    );

    // 計算回饋點數
    const [userLevel] = await conn.query(
      'SELECT member_level_id FROM users WHERE id = ?',
      [userId]
    );
    const memberLevelId = userLevel[0].member_level_id;

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
    );
    console.log('Earned Points:', earnedPoints);

    // 插入訂單資料
    const insertOrderQuery = `
      INSERT INTO orders (order_uuid, user_id, status, payment_method, payment_date, shipping_fee, coupon_id, earned_points, pickup_name, pickup_phone, pickup_address, pickup_store_name, transport, created_at, updated_at)
      VALUES (?, ?, 'pending', '貨到付款', NOW(), ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
    `;
    const [orderResult] = await conn.query(insertOrderQuery, [
      orderNumber,
      userId,
      60, // 固定運費，已無條件捨去
      couponData?.coupon_id || null,
      earnedPoints,
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
    ]);
    console.log('Order Insert Result:', orderResult);

    const orderId = orderResult.insertId;

    // 插入商品和課程
    const insertOrderItemsQuery = `
      INSERT INTO order_details (order_uuid, product_id, product_detail_id, class_id, product_quantity, created_at)
      VALUES (?, ?, ?, ?, ?, NOW());
    `;
    for (const item of cartItems) {
      await conn.query(insertOrderItemsQuery, [
        orderNumber,
        item.product_id || null,
        item.product_detail_id || null,
        item.class_id || null,
        item.product_quantity,
      ]);
    }

    // 刪除已使用的優惠券
    if (couponData?.coupon_id) {
      const deleteCouponQuery = `
        DELETE FROM user_coupon WHERE user_id = ? AND coupon_id = ?;
      `;
      await conn.query(deleteCouponQuery, [userId, couponData.coupon_id]);
      console.log(
        'Deleting coupon for user:',
        userId,
        'with coupon id:',
        couponData.coupon_id
      );
    }

    // 更新會員點數
    const userPointsQuery = `
      INSERT INTO user_points (user_id, points_balance, last_updated)
      VALUES (?, ?, NOW())
      ON DUPLICATE KEY UPDATE points_balance = VALUES(points_balance), last_updated = NOW();
    `;
    const newPointsBalance = Math.floor(
      originalPoints - pointsUsed + earnedPoints
    );
    await conn.query(userPointsQuery, [userId, newPointsBalance]);
    console.log('New Points Balance:', newPointsBalance);

    // 記錄點數變化
    const pointChange = earnedPoints - pointsUsed;
    const insertPointTransactionsQuery = `
      INSERT INTO point_transactions (user_id, point_change, transaction_type, description, created_at)
      VALUES (?, ?, '消費', '購物消費的點數使用獲得量', NOW());
    `;
    await conn.query(insertPointTransactionsQuery, [userId, pointChange]);

    // 刪除購物車內的已購買商品或課程
    const deleteCartItemsQuery = `
        DELETE FROM cart_items WHERE user_id = ? AND (product_detail_id = ? OR class_id = ?);
      `;
    for (const item of cartItems) {
      await conn.query(deleteCartItemsQuery, [
        userId,
        item.product_detail_id || null,
        item.class_id || null,
      ]);
    }
    console.log('已刪除購物車內的已購買商品或課程');

    // 返回成功訊息
    console.log('訂單已成功建立，準備發送回應');
    res.json({ message: '訂單已成功建立', orderNumber });
  } catch (error) {
    console.error('建立訂單時發生錯誤:', error);
    res
      .status(500)
      .json({ error: '建立訂單時發生錯誤', details: error.message });
  }
});


// 新增訂單 (CreditCard Payment)
router.post('/creditCardPayment', async (req, res) => {
  console.log('Request Body:', req.body)
  const couponId = req.body.couponData ? req.body.couponData.id : null
  console.log('Coupon ID:', couponId)
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
  } = req.body

  try {
    // 生成訂單編號
    const generateOrderNumber = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
      let result = ''
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters[randomIndex]
      }
      return result.toUpperCase()
    }

    const orderNumber = generateOrderNumber()
    console.log('Generated Order Number:', orderNumber)

    // 計算總金額並無條件捨去
    const totalAmount = Math.floor(
      cartItems.reduce((sum, item) => {
        const productPrice = item.product_sale_price > 0 ? item.product_sale_price : item.product_price
        const classPrice = item.class_sale_price > 0 ? item.class_sale_price : item.class_price
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
    console.log('Earned Points:', earnedPoints)

    // 插入訂單資料
    const insertOrderQuery = `
      INSERT INTO orders (order_uuid, user_id, status, payment_method, payment_date, shipping_fee, coupon_id, earned_points, pickup_name, pickup_phone, pickup_address, pickup_store_name, transport, created_at, updated_at)
      VALUES (?, ?, 'pending', '信用卡', NOW(), ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
    `
    const [orderResult] = await conn.query(insertOrderQuery, [
      orderNumber,
      userId,
      60,
      couponData?.coupon_id || null,
      earnedPoints,
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
    ])
    console.log('Order Insert Result:', orderResult)

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
    }

    // 刪除已使用的優惠券
    if (couponData?.coupon_id) {
      const deleteCouponQuery = `
        DELETE FROM user_coupon WHERE user_id = ? AND coupon_id = ?;
      `
      await conn.query(deleteCouponQuery, [userId, couponData.coupon_id])
      console.log('Deleting coupon for user:', userId, 'with coupon id:', couponData.coupon_id)
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
    console.log('New Points Balance:', newPointsBalance)

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

export default router;