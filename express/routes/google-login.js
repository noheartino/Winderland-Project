import express from 'express'
const router = express.Router()
import connection from '##/configs/mysql.js'

import jsonwebtoken from 'jsonwebtoken'
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
  const google_uid = uid

  try {
    // 檢查是否存在具有相同 google_uid 的用戶
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM users WHERE google_uid = ?',
      [google_uid]
    )
    const total = rows[0].count

    let returnUser = {
      id: 0,
      username: '',
      google_uid: '',
      line_uid: '',
    }

    if (total > 0) {
      // 用戶已存在，獲取用戶資料
      const [users] = await connection.execute(
        'SELECT id, user_name, google_uid, line_uid FROM users WHERE google_uid = ?',
        [google_uid]
      )
      const dbUser = users[0]
      returnUser = {
        id: dbUser.id,
        username: dbUser.username,
        google_uid: dbUser.google_uid,
        line_uid: dbUser.line_uid,
      }
    } else {
      // 創建新用戶
      const [result] = await connection.execute(
        'INSERT INTO users (user_name, email, google_uid, photo_url) VALUES (?, ?, ?, ?)',
        [displayName, email, google_uid, photoURL]
      )
      returnUser = {
        id: result.insertId,
        username: '',
        google_uid: google_uid,
        line_uid: null,
      }
    }

    // 產生存取令牌(access token)
    const accessToken = jsonwebtoken.sign(returnUser, accessTokenSecret, {
      expiresIn: '3d',
    })

    // 使用httpOnly cookie來讓瀏覽器端儲存access token
    // res.cookie('accessToken', accessToken, { httpOnly: true })
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 天
    })

    // 傳送access token回應
    // return res.json({
    //   status: 'success',
    //   data: {
    //     accessToken,
    //   },
    // })

    // 返回用戶數據（不包括敏感信息）
    return res.json({
      status: 'success',
      data: {
        user: {
          id: returnUser.id,
          username: returnUser.username,
          email: returnUser.email,
          photoURL: returnUser.photo_url,
        },
      },
    })
  } catch (error) {
    console.error('Error during Google login:', error)
    return res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

export default router
