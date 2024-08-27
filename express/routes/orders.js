import express from 'express'
import connection from '##/configs/mysql.js'
import authenticate from '#middlewares/authenticate.js'
const router = express.Router()

// # 歷史訂單
// @ 獲取歷史訂單
router.get('/history', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const { status, startDate, endDate } = req.query

    let query = `
      SELECT 
        o.order_uuid,
        o.status,
        o.payment_method,
        o.transport,
        o.created_at,
        o.totalMoney,
        (
          SELECT 
            COALESCE(SUM(
              CASE 
                WHEN od.product_id IS NOT NULL THEN od.product_quantity
                ELSE 0
              END
            ), 0) +
            COALESCE(COUNT(DISTINCT CASE WHEN od.class_id IS NOT NULL THEN od.class_id END), 0)
          FROM order_details od
          WHERE od.order_uuid = o.order_uuid
        ) AS total_items,
        (
          SELECT 
            CASE
              WHEN od.product_id IS NOT NULL THEN 'product'
              ELSE 'class'
            END
          FROM order_details od
          WHERE od.order_uuid = o.order_uuid
          LIMIT 1
        ) AS firstItemType,
        (
          SELECT 
            CASE
              WHEN od.product_id IS NOT NULL THEN
                (SELECT ip.path
                 FROM images_product ip
                 WHERE ip.product_id = od.product_id
                 ORDER BY ip.id
                 LIMIT 1 OFFSET 1)
              ELSE
                (SELECT ic.path
                 FROM images_class ic
                 WHERE ic.class_id = od.class_id
                 LIMIT 1)
            END
          FROM order_details od
          WHERE od.order_uuid = o.order_uuid
          LIMIT 1
        ) AS firstItemImage
      FROM orders o
      WHERE o.user_id = ?
    `

    const queryParams = [userId]

    if (status && status.length > 0) {
      query += ` AND o.status IN (?)`
      queryParams.push(status.split(','))
    }

    if (startDate && endDate) {
      query += ` AND o.created_at BETWEEN ? AND ?`
      queryParams.push(startDate, endDate)
    }

    query += ` ORDER BY o.created_at DESC`

    const [rows] = await connection.query(query, queryParams)

    res.json({ status: 'success', data: rows })
  } catch (error) {
    console.error('獲取訂單歷史時出錯:', error)
    res
      .status(500)
      .json({ status: 'error', message: '服務器錯誤', error: error.message })
  }
})

// @ 獲取歷史訂單詳細
router.get('/history/:orderUuid', authenticate, async (req, res) => {
  try {
    const { orderUuid } = req.params
    const userId = req.user.id

    // 獲取訂單基本信息
    const [orderInfo] = await connection.query(
      `SELECT o.*, c.name AS coupon_name, c.category AS coupon_category
       FROM orders o
       LEFT JOIN coupon c ON o.coupon_id = c.id
       WHERE o.order_uuid = ? AND o.user_id = ?`,
      [orderUuid, userId]
    )

    if (orderInfo.length === 0) {
      return res.status(404).json({ status: 'error', message: '訂單不存在' })
    }

    // 獲取商品訂單詳情
    const [productDetails] = await connection.query(
      `SELECT 
        od.*,
        p.name AS product_name,
        pd.capacity,
        pd.years,
        pd.price,
        co.name AS country_name,
        (
          SELECT ip.path
          FROM (
            SELECT path, product_id, ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY id) as row_num
            FROM images_product
          ) ip
          WHERE ip.product_id = p.id AND ip.row_num = 2
        ) AS image_path
      FROM order_details od
      JOIN product p ON od.product_id = p.id
      JOIN product_detail pd ON od.product_detail_id = pd.id
      JOIN product pr ON pd.product_id = pr.id
      JOIN origin o ON pr.origin_id = o.id
      JOIN country co ON o.country_id = co.id
      WHERE od.order_uuid = ? AND od.product_id IS NOT NULL
      ORDER BY od.id`,
      [orderUuid]
    )

    // 獲取課程訂單詳情
    const [classDetails] = await connection.query(
      `SELECT 
        od.*,
        c.name AS class_name,
        c.price AS class_price,
        t.name AS teacher_name,
        ic.path AS image_path
      FROM order_details od
      JOIN class c ON od.class_id = c.id
      JOIN teacher t ON c.teacher_id = t.id
      LEFT JOIN images_class ic ON c.id = ic.class_id
      WHERE od.order_uuid = ? AND od.class_id IS NOT NULL
      ORDER BY od.id`,
      [orderUuid]
    )

    res.json({
      status: 'success',
      data: {
        orderInfo: orderInfo[0],
        productDetails,
        classDetails,
      },
    })
  } catch (error) {
    console.error('獲取訂單詳情時出錯:', error)
    res
      .status(500)
      .json({ status: 'error', message: '服務器錯誤', error: error.message })
  }
})

// # 訂單評論
// @ 獲取訂單可評論商品
router.get('/commentable-items/:orderUuid', authenticate, async (req, res) => {
  try {
    const { orderUuid } = req.params
    const userId = req.user.id

    // 檢查訂單是否屬於該用戶且在30天內
    const [orderCheck] = await connection.query(
      `SELECT created_at FROM orders 
       WHERE order_uuid = ? AND user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)`,
      [orderUuid, userId]
    )

    if (orderCheck.length === 0) {
      return res
        .status(403)
        .json({ status: 'error', message: '無法評論此訂單' })
    }

    // 獲取可評論的商品和課程，並檢查是否已評論
    const [items] = await connection.query(
      `SELECT 
      od.id as order_detail_id,
      CASE 
        WHEN od.product_id IS NOT NULL THEN od.product_id
        ELSE od.class_id
      END as item_id,
      CASE 
        WHEN od.product_id IS NOT NULL THEN p.name
        ELSE c.name
      END as item_name,
      CASE 
        WHEN od.product_id IS NOT NULL THEN 'product'
        ELSE 'class'
      END as item_type,
      CASE
        WHEN od.product_id IS NOT NULL THEN pd.capacity
        ELSE NULL
      END as capacity,
      CASE
        WHEN od.product_id IS NOT NULL THEN pd.years
        ELSE NULL
      END as years,
      CASE
        WHEN od.product_id IS NOT NULL THEN co.name
        ELSE NULL
      END as country_name,
      CASE
        WHEN od.class_id IS NOT NULL THEN t.name
        ELSE NULL
      END as teacher_name,
      CASE
        WHEN comments.id IS NOT NULL THEN 1
        ELSE 0
      END as is_commented,
      comments.rating as existing_rating,
      comments.comment_text as existing_comment
     FROM order_details od
     LEFT JOIN product p ON od.product_id = p.id
     LEFT JOIN product_detail pd ON od.product_detail_id = pd.id
     LEFT JOIN product pr ON pd.product_id = pr.id
     LEFT JOIN origin o ON pr.origin_id = o.id
     LEFT JOIN country co ON o.country_id = co.id
     LEFT JOIN class c ON od.class_id = c.id
     LEFT JOIN teacher t ON c.teacher_id = t.id
     LEFT JOIN comments ON (
       (od.product_id IS NOT NULL AND comments.entity_type = 'product' AND comments.entity_id = od.product_id) OR
       (od.class_id IS NOT NULL AND comments.entity_type = 'class' AND comments.entity_id = od.class_id)
     ) AND comments.user_id = ?
     WHERE od.order_uuid = ?
     ORDER BY od.id`,
      [userId, orderUuid]
    )

    res.json({ status: 'success', data: items })
  } catch (error) {
    console.error('獲取可評論商品時出錯:', error)
    res
      .status(500)
      .json({ status: 'error', message: '服務器錯誤', error: error.message })
  }
})

// @ 提交評論
router.post('/submit-comment', authenticate, async (req, res) => {
  try {
    const { orderUuid, itemId, itemType, rating, commentText } = req.body
    const userId = req.user.id

    // 檢查訂單是否屬於該用戶且在30天內
    const [orderCheck] = await connection.query(
      `SELECT created_at FROM orders 
       WHERE order_uuid = ? AND user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)`,
      [orderUuid, userId]
    )

    if (orderCheck.length === 0) {
      return res
        .status(403)
        .json({ status: 'error', message: '無法評論此訂單' })
    }

    // 檢查是否已經評論過
    const [existingComment] = await connection.query(
      `SELECT id FROM comments 
   WHERE entity_type = ? AND entity_id = ? AND user_id = ?`,
      [itemType, itemId, userId]
    )

    if (existingComment.length > 0) {
      return res
        .status(400)
        .json({ status: 'error', message: '您已經評論過此項目' })
    }

    // 插入評論
    await connection.query(
      `INSERT INTO comments (entity_type, entity_id, user_id, comment_text, rating) 
       VALUES (?, ?, ?, ?, ?)`,
      [itemType, itemId, userId, commentText, rating]
    )

    res.json({ status: 'success', message: '評論已成功提交' })
  } catch (error) {
    console.error('提交評論時出錯:', error)
    res
      .status(500)
      .json({ status: 'error', message: '服務器錯誤', error: error.message })
  }
})

export default router
