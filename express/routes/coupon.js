import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

// 優惠券資料
router.get('/', async (req, res) => {
  try {
    let query = `
      SELECT coupon.*
      FROM coupon
      WHERE 
        (
          (MONTH(coupon.start_date) = 9 OR MONTH(coupon.end_date) = 9)
          OR (coupon.start_date = '0000/00/00' OR coupon.end_date = '0000/00/00')
        )
        AND coupon.status = '已啟用'
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

// 儲存優惠券到 user_coupon 資料表
router.post('/save-coupons', async (req, res) => {
  try {
    const { user_id, coupons } = req.body

    if (!user_id || !coupons || !coupons.length) {
      return res
        .status(400)
        .json({ status: 'error', message: 'user_id 和 coupons 資料必須提供' })
    }

    // 構建插入 SQL 語句
    let values = coupons
      .map(
        (coupon) =>
          `(${user_id}, ${coupon.coupon_id}, '${coupon.status}', '${coupon.get_at}')`
      )
      .join(', ')

    let query = `
      INSERT INTO user_coupon (user_id, coupon_id, status, get_at)
      VALUES ${values}
    `
    console.log(query)
    // 執行 SQL 插入
    await connection.execute(query)

    res.json({ status: 'success', message: '優惠券已成功儲存' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: '無法儲存優惠券資料' })
  }
})

// 優惠券倉庫資料
router.post('/user-coupon', async (req, res) => {
  console.log('Request body:', req.body) // 打印請求體以調試

  const { user_id } = req.body // 從請求體中獲取 user_id

  // 檢查 user_id 是否存在且有效
  // if (!user_id) {
  //   return res.status(400).json({
  //     status: 'error',
  //     message: 'user_id 必須提供',
  //   })
  // }

  try {
    const query = `
      SELECT uc.*, 
        c.name, 
        c.category, 
        c.min_spend
      FROM user_coupon uc
      JOIN coupon c ON uc.coupon_id = c.id
      WHERE 
        uc.user_id = ?
        AND uc.status = 'get'
        AND c.status = '已啟用'
    `

    // 使用參數化查詢以避免 SQL 注入
    const [userCoupons] = await connection.execute(query, [user_id])

    // 返回查詢結果
    res.json(userCoupons)
  } catch (err) {
    console.error('SQL Error:', err.message)
    res.status(500).json({
      status: 'error',
      message: '無法查詢資料',
      error: err.message,
    })
  }
})

export default router
