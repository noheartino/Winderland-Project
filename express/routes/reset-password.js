import express from 'express'
import { createOtp, updatePassword } from '#db-helpers/otp.js'
import transporter from '#configs/mail.js'
import 'dotenv/config.js'

const router = express.Router()

// 電子郵件文字訊息樣版
const mailText = (resetLink) => `
＊ 此信件為系統發出信件，請勿直接回覆，感謝您的配合。謝謝！＊

親愛的會員 您好：

這封認證信是由《醺迷仙園》發出，用以處理您忘記密碼，當您收到本「認證信函」後，請直接點選下方連結重新設置您的密碼，無需回信。

${resetLink}

為了確保您的會員資料安全，重設密碼的連結將於此信件寄出後30分鐘內或您重設密碼後失效。

為了保護您的個人資料安全，即日起我們將不在信函中顯示完整訂購/出貨明細，建議您可隨時登入醺迷仙園網站，至會員專區，查詢訂單、最新訊息或修改基本資料。
如果您有任何問題，請您至醺迷仙園客服中心查詢相關訊息或來信給我們。


因為用心，所以我們有自信可以給您最好的！

                                                                                     醺迷仙園 || Winderland 網站 敬上

======= 反詐騙！醺迷仙園提醒您「2不1求證」 ===============
★不操作ATM─ ATM並沒有解除分期付款的選項。
★不透露信用卡資料─ 請勿隨意透露信用卡號與到期日。
★求證相關單位─ 懷疑來電者身份，請撥警政署防詐騙專線165查證。
=======================================================

醺迷仙園網站：https://www.winderland.com
客服專線：886-2-26535588
傳真電話：886-2-27885008`

// @ 發送重設密碼郵件
router.post('/member/forget-password', async (req, res) => {
  const { email } = req.body

  if (!email)
    return res.status(400).json({ status: 'error', message: '缺少必要資料' })

  try {
    // 建立otp資料表記錄，成功回傳otp記錄物件，失敗為空物件{}
    const otp = await createOtp(email)

    // console.log(otp)

    if (!otp.token)
      return res.json({ status: 'error', message: 'Email錯誤或期間內重覆要求' })

    // 創建重設密碼連結
    const resetLink = `${process.env.FRONTEND_URL}/member/reset-password?token=${otp.token}&email=${email}`

    // 寄送email
    const mailOptions = {
      // 這裡要改寄送人名稱，email在.env檔中代入
      from: `"support"<${process.env.SMTP_TO_EMAIL}>`,
      to: email,
      subject: '重設密碼要求',
      text: mailText(resetLink),
    }

    // 寄送email
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        // 失敗處理
        console.error('發送電子郵件失敗:', err)
        return res
          .status(500)
          .json({ status: 'error', message: '發送電子郵件失敗' })
      } else {
        // 成功回覆的json
        return res.json({ status: 'success', message: '重設密碼郵件已發送' })
      }
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

// @ 重設密碼用
router.post('/member/reset-password', async (req, res) => {
  const { email, token, password } = req.body

  if (!token || !email || !password) {
    return res.status(400).json({ status: 'error', message: '缺少必要資料' })
  }

  try {
    // updatePassword中驗証otp的存在與合法性(是否有到期)
    const result = await updatePassword(email, token, password)

    if (!result) {
      return res.status(400).json({ status: 'error', message: '修改密碼失敗' })
    }

    // 成功
    return res.json({ status: 'success', message: '密碼重設成功' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

export default router
