import express from 'express'
const router = express.Router()

// 資料庫使用
import connection from '##/configs/mysql.js'
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// 檢查空物件, 轉換req.params為數字
// import { getIdParam } from '#db-helpers/db-tool.js'

// @ 獲取歷史訂單
router.get('/history', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    console.log('Fetching orders for user:', userId)
    const [rows] = await connection.query(
      `
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
        ) AS total_items
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
      `,
      [userId]
    )
    console.log('Fetched orders:', rows)
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

    // 獲取訂單詳情
    const [orderDetails] = await connection.query(
      `SELECT 
        od.*,
        p.name AS product_name,
        pd.capacity,
        pd.years,
        pd.price,
        c.name AS class_name,
        c.price AS class_price,
        co.name AS country_name
      FROM order_details od
      LEFT JOIN product p ON od.product_id = p.id
      LEFT JOIN product_detail pd ON od.product_detail_id = pd.id
      LEFT JOIN class c ON od.class_id = c.id
      LEFT JOIN product pr ON pd.product_id = pr.id
      LEFT JOIN origin o ON pr.origin_id = o.id
      LEFT JOIN country co ON o.country_id = co.id
      WHERE od.order_uuid = ?`,
      [orderUuid]
    )

    res.json({
      status: 'success',
      data: {
        orderInfo: orderInfo[0],
        orderDetails,
      },
    })
  } catch (error) {
    console.error('獲取訂單詳情時出錯:', error)
    res
      .status(500)
      .json({ status: 'error', message: '服務器錯誤', error: error.message })
  }
})
export default router
