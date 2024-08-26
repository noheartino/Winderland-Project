import express from 'express'
const router = express.Router()

// 資料庫使用
import connection from '##/configs/mysql.js'
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// 檢查空物件, 轉換req.params為數字
// import { getIdParam } from '#db-helpers/db-tool.js'

// # 獲取歷史訂單
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
          SELECT SUM(
            CASE 
              WHEN od.product_id IS NOT NULL THEN od.product_quantity
              WHEN od.class_id IS NOT NULL THEN 1
              ELSE 0
            END
          )
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

export default router
