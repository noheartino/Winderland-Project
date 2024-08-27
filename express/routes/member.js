// # 登入、登出、註冊、忘記密碼系統

import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router()

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 資料庫使用
import connection from '##/configs/mysql.js'

// token
import jsonwebtoken from 'jsonwebtoken'
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// 驗証加密密碼字串用
import { compareHash } from '#db-helpers/password-hash.js'

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// 忘記密碼
import { createOtp, updatePassword } from '#db-helpers/otp.js'
import transporter from '#configs/mail.js'

// @ 檢查登入狀態用
router.get('/auth-status', authenticate, async (req, res) => {
  try {
    const [users] = await connection.query(
      `
       SELECT id, user_name, email, account, gender, birthday, member_level_id, phone, address,total_spending
        FROM users
        WHERE id = ?
    `,
      [req.user.id]
    )

    if (!users.length) {
      return res.status(404).json({ status: 'fail', message: 'User not found' })
    }
    const user = users[0]

    // 不回傳密碼值
    // delete user.password
    return res.json({
      status: 'success',
      data: {
        isAuth: true,
        user: {
          id: user.id,
          user_name: user.user_name,
          member_level_id: user.member_level_id,
          account: user.account,
          email: user.email,
          gender: user.gender,
          phone: user.phone,
          birthday: user.birthday,
          address: user.address,
          total_spending: user.total_spending,
        },
      },
    })
  } catch (error) {
    console.error('Error checking auth status:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' })
  }
})

// @ 登入
router.post('/login', async (req, res) => {
  // 從前端來的資料
  const { account, password, rememberMe } = req.body

  // 檢查從前端來的資料哪些為必要
  if (!account || !password) {
    return res.status(400).json({ status: 'error', message: '缺少必要資料' })
  }

  // 查詢資料庫，是否有這帳號與密碼的使用者資料
  try {
    // 使用SQL查詢用戶
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE account = ? LIMIT 1',
      [account]
    )

    const user = rows[0]

    // 檢查用戶是否存在
    if (!user) {
      return res.status(404).json({ status: 'error', message: '使用者不存在' })
    }

    // ! 比較密碼
    // compareHash(登入時的密碼純字串, 資料庫中的密碼hash) 比較密碼正確性
    const isValid = await compareHash(password, user.password)

    if (!isValid) {
      return res
        .status(401)
        .json({ status: 'error', message: '帳號或密碼錯誤' })
    }

    // 存取令牌(access token)只需要id和username就足夠，其它資料可以再向資料庫查詢
    const returnUser = {
      id: user.id,
      account: user.account,
      google_uid: user.google_uid,
      line_uid: user.line_uid,
      user_name: user.user_name,
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
      member_level_id: user.member_level_id,
    }

    // 產生存取令牌(access token)，其中包含會員資料
    const accessToken = jsonwebtoken.sign(
      { id: user.id, account: user.account },
      accessTokenSecret,
      { expiresIn: rememberMe ? '30d' : '1d' }
    )

    // 使用httpOnly cookie來讓瀏覽器端儲存access token
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    })

    // ! 返回成功響應
    // 傳送access token回應(例如react可以儲存在state中使用)
    res.json({
      status: 'success',
      data: {
        user: returnUser,
        accessToken,
      },
    })
  } catch (error) {
    console.error('登入失敗：', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤，請稍後再試' })
  }
})

// @ 登出
router.post('/logout', authenticate, (req, res) => {
  // 清除cookie
  res.clearCookie('accessToken', { httpOnly: true })
  res.json({ status: 'success', data: null })
})

// @ 註冊
router.post('/register', async function (req, res) {
  // 要新增的會員資料
  const newUser = req.body

  // ! 檢查從前端來的資料哪些為必要
  if (!newUser.account || !newUser.password || !newUser.user_name) {
    return res.status(400).json({ status: 'error', message: '缺少必要資料' })
  }

  try {
    // ! 檢查會員帳號是否已存在
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE account = ? ',
      [newUser.account]
    )

    if (rows.length > 0) {
      return res
        .status(409)
        .json({ status: 'error', message: '會員帳號已存在' })
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(newUser.password, 10)

    // 插入新用戶
    const [result] = await connection.execute(
      'INSERT INTO users (user_name, phone, birthday, gender, account, password ,member_level_id,total_spending) VALUES (?, ?, ?, ?, ?, ?, ?,?)',
      [
        newUser.user_name,
        newUser.phone || ' ',
        newUser.birthday || '1900-01-01',
        newUser.gender || ' ',
        newUser.account,
        hashedPassword,
        1,
        0.0,
      ]
    )

    // 確保用戶插入成功
    if (result.affectedRows === 1) {
      return res.status(201).json({
        status: 'success',
        message: '會員註冊成功',
        data: {
          id: result.insertId,
          user_name: newUser.user_name,
          account: newUser.account,
        },
      })
    } else {
      throw new Error('用戶註冊失敗')
    }
  } catch (error) {
    console.error('註冊失敗：', error)
    return res
      .status(500)
      .json({ status: 'error', message: '伺服器錯誤，請稍後再試' })
  }
})

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
router.post('/forget-password', async (req, res) => {
  const { email } = req.body

  if (!email)
    return res.status(400).json({ status: 'error', message: '缺少必要資料' })

  try {
    console.log('Attempting to create OTP for email:', email)
    // 建立otp資料表記錄，成功回傳otp記錄物件，失敗為空物件{}
    const otp = await createOtp(email)

    console.log('OTP creation result:', otp)

    if (!otp || !otp.token) {
      console.log('OTP creation failed')
      return res
        .status(400)
        .json({ status: 'error', message: 'Email錯誤或期間內重覆要求' })
    }

    // 創建重設密碼連結
    const resetLink = `${process.env.FRONTEND_URL}/member/reset-password?token=${otp.token}&email=${email}`

    // 寄送email
    const mailOptions = {
      // 這裡要改寄送人名稱，email在.env檔中代入
      from: `"Winderland support team"<${process.env.SMTP_TO_EMAIL}>`,
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
    console.error('伺服器錯誤:', error)
    res
      .status(500)
      .json({ status: 'error', message: '伺服器錯誤，請稍後再試。' })
  }
})

// @ 重設密碼用
router.post('/reset-password', async (req, res) => {
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
