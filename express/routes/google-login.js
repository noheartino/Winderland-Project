import express from 'express'
const router = express.Router()
import connection from '##/configs/mysql.js'

import jsonwebtoken from 'jsonwebtoken'
// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

router.post('/', async function (req, res) {
  // providerData =  req.body
  console.log(JSON.stringify(req.body))

  // 檢查從react來的資料
  if (!req.body.providerId || !req.body.uid) {
    return res.json({ status: 'error', message: '缺少google登入資料' })
  }

  const { displayName, email, uid, photoURL } = req.body
  // const google_uid = uid

  try {
    // 檢查用戶是否已存在
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE google_uid = ?',
      [uid]
    )

    let user

    if (existingUsers.length === 0) {
      // 創建新用戶
      const [result] = await connection.execute(
        'INSERT INTO users (user_name, email, google_uid, photo_url) VALUES (?, ?, ?, ?)',
        [displayName, email, uid, photoURL]
      )

      const [newUser] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [result.insertId]
      )
      user = newUser[0]
    } else {
      user = existingUsers[0]
    }

    // 生成 JWT
    const accessToken = jsonwebtoken.sign(
      {
        id: user.id,
        account: user.account,
        google_uid: user.google_uid,
      },
      accessTokenSecret,
      { expiresIn: '3d' }
    )

    // 設置 httpOnly cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 在生產環境中使用 secure
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 天
    })

    res.json({
      status: 'success',
      data: {
        accessToken,
        user: {
          id: user.id,
          user_name: user.user_name,
          email: user.email,
          photo_url: user.photo_url,
        },
      },
    })
  } catch (error) {
    console.error('Google 登入處理錯誤:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

export default router
