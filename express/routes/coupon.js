import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { member_level_id } = req.body // 從請求體中獲取會員等級 ID

    if (!member_level_id) {
      return res.status(400).json({ error: '會員等級 ID 必須提供' })
    }

    let query = `
      SELECT coupon.*
      FROM coupon
      JOIN levels ON levels.member_level_id = ${member_level_id}
      WHERE 
        (
          (MONTH(coupon.start_date) = 9 OR MONTH(coupon.end_date) = 9)
          OR (coupon.start_date = '0000/00/00' OR coupon.end_date = '0000/00/00')
        )
        AND coupon.status = '已啟用'
        AND levels.member_level_id = ${member_level_id}
    `

    // 執行 SQL 查詢
    const [coupon] = await connection.execute(query)

    if (coupon.length === 0) {
      return res.json([]) // 當使用 search 且沒有資料時回傳空的陣列
    }

    res.json(coupon)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '無法查詢資料' })
  }
})

// 優惠券資料
router.get('/', async (req, res) => {
  try {
    // 假設 userData 已經從其他地方獲得
    const userData = req.userData // 根據實際情況獲得 userData

    let query = `
      SELECT coupon.*
      FROM coupon
      JOIN levels ON levels.member_level_id = ${userData.member_level_id}
      WHERE 
        (
          (MONTH(coupon.start_date) = 9 OR MONTH(coupon.end_date) = 9)
          OR (coupon.start_date = '0000/00/00' OR coupon.end_date = '0000/00/00')
        )
        AND coupon.status = '已啟用'
        AND levels.member_level_id = ${userData.member_level_id}
    `

    // 執行 SQL 查詢
    const [coupon] = await connection.execute(query)

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
