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
          OR (coupon.start_date = '0000-00-00' OR coupon.end_date = '0000-00-00')
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

// 獲取會員來搜尋的擁有的優惠券、點數
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    // 獲取優惠券
    const [userCoupons] = await connection.execute(
      `SELECT uc.*, 
             c.name, 
             c.category, 
             c.min_spend
      FROM user_coupon uc
      JOIN coupon c ON uc.coupon_id = c.id
      WHERE uc.user_id = ?`,
      [userId]
    )

    // 獲取點數
    const [userPoints] = await connection.execute(
      'SELECT * FROM user_points WHERE user_id = ?',
      [userId]
    )

    res.json({ userCoupons, userPoints })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ status: 'error', message: '無法獲取已領取的會員優惠券' })
  }
})

// 新增優惠券到 user_coupon 資料表
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

// 獲取會員等級的名稱
router.post('/member-level', async (req, res) => {
  const { member_level_id } = req.body

  try {
    const query = `
    SELECT 
        ml.id, 
        ml.name 
      FROM 
        member_level ml 
      WHERE 
        ml.id = ?
  `

    // 使用參數化查詢以避免 SQL 注入
    const [memberLevel] = await connection.execute(query, [member_level_id])
    res.json({
      status: 'success',
      data: memberLevel,
    })
  } catch (err) {
    console.error('SQL Error:', err.message)
    res.status(500).json({
      status: 'error',
      message: '無法查詢資料',
      error: err.message,
    })
  }
})

// // 優惠券倉庫(已獲取)資料
// router.post('/get-coupon', async (req, res) => {
//   const { user_id } = req.body

//   try {
//     const query = `
//       SELECT uc.*, 
//              c.name, 
//              c.category, 
//              c.min_spend
//       FROM user_coupon uc
//       JOIN coupon c ON uc.coupon_id = c.id
//       WHERE uc.user_id = ?
//         AND uc.status = 'get'
//     `

//     // 使用參數化查詢以避免 SQL 注入
//     const [userCoupons] = await connection.execute(query, [user_id])

//     // 返回查詢結果
//     res.json(userCoupons)
//   } catch (err) {
//     console.error('SQL Error:', err.message)
//     res.status(500).json({
//       status: 'error',
//       message: '無法查詢資料',
//       error: err.message,
//     })
//   }
// })

// // 使用過的優惠券資料
// router.post('/used-coupon', async (req, res) => {
//   const { user_id } = req.body // 從請求體中獲取 user_id

//   try {
//     const query = `
//       SELECT uc.*, 
//         c.name, 
//         c.category, 
//         c.min_spend,
//         c.discount
//       FROM user_coupon uc
//       JOIN coupon c ON uc.coupon_id = c.id
//       WHERE 
//         uc.user_id = ?
//         AND uc.status = 'used'
//         AND c.status = '已啟用'
//     `

//     // 使用參數化查詢以避免 SQL 注入
//     const [userCoupons] = await connection.execute(query, [user_id])

//     // 返回查詢結果
//     res.json(userCoupons)
//   } catch (err) {
//     console.error('SQL Error:', err.message)
//     res.status(500).json({
//       status: 'error',
//       message: '無法查詢資料',
//       error: err.message,
//     })
//   }
// })

export default router
