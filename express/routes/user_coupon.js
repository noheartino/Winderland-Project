import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

// 獲取user_coupon裡面的coupon_id來判斷有無領取過
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const [userCoupon] = await connection.execute(
      'SELECT coupon_id FROM user_coupon WHERE user_id = ? AND status = "get"',
      [userId]
    )

    res.json(userCoupon)
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: '無法獲取已領取的優惠券' })
  }
})
export default router
