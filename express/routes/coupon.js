import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

// 優惠券資料
router.get('/', async (req, res) => {
  try {
    // 構建 SQL 查詢語句
    let query = `SELECT *
    FROM coupon
    `
    // 預設一個空陣列
    const params = []

    // 執行 SQL 查詢
    const [coupon] = await connection.execute(query, params)

    if (coupon.length === 0) {
      return res.json([]) // 當使用 search 且沒有資料時回傳空的陣列
    }

    res.json(coupon)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '無法查詢資料' })
  }
})

export default router
