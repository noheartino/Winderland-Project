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
      'SELECT * FROM user_coupon WHERE user_id = ?',
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
