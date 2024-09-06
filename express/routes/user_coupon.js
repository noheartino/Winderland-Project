import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

// 獲取會員擁有的優惠券
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    // 獲取優惠券
    const [userCoupons] = await connection.execute(
      `SELECT 
          uc.*,
          COALESCE(o.coupon_amount, 0) AS used_coupon_amount
        FROM 
          user_coupon uc
        LEFT JOIN 
          orders o ON uc.coupon_id = o.coupon_id
        WHERE 
          uc.user_id = ?
        GROUP BY
          uc.id
      `,
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
export default router
