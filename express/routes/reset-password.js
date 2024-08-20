import express from 'express'
// import { createOtp, updatePassword } from '#db-helpers/otp.js'
// import transporter from '#configs/mail.js'
import 'dotenv/config.js'

const router = express.Router()

// // @ 重設密碼用
// router.post('/reset-password', async (req, res) => {
//   const { email, token, password } = req.body

//   if (!token || !email || !password) {
//     return res.status(400).json({ status: 'error', message: '缺少必要資料' })
//   }

//   try {
//     // updatePassword中驗証otp的存在與合法性(是否有到期)
//     const result = await updatePassword(email, token, password)

//     if (!result) {
//       return res.status(400).json({ status: 'error', message: '修改密碼失敗' })
//     }

//     // 成功
//     return res.json({ status: 'success', message: '密碼重設成功' })
//   } catch (error) {
//     console.error('Error:', error)
//     res.status(500).json({ status: 'error', message: '伺服器錯誤' })
//   }
// })

export default router
