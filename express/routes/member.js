// # 登入登出系統

import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router()

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 資料庫使用
import connection from '##/configs/mysql.js'
// import { QueryTypes } from 'sequelize'
// import sequelize from '#configs/db.js'
// const { User } = sequelize.models

// token
import jsonwebtoken from 'jsonwebtoken'
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// 驗証加密密碼字串用
import { compareHash } from '#db-helpers/password-hash.js'

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// @ 檢查登入狀態用
router.get('/check', authenticate, async (req, res) => {
  // 查詢資料庫目前的資料
  const user = await User.findByPk(req.user.id, {
    raw: true, // 只需要資料表中資料
  })

  // 不回傳密碼值
  delete user.password
  return res.json({ status: 'success', data: { user } })
})

// @ 登入
router.post('/login', async (req, res) => {
  // 從前端來的資料 req.body = { username:'xxxx', password :'xxxx'}
  const loginUser = req.body

  // 檢查從前端來的資料哪些為必要
  if (!loginUser.username || !loginUser.password) {
    return res.json({ status: 'fail', data: null })
  }

  // 查詢資料庫，是否有這帳號與密碼的使用者資料
  // 方式一: 使用直接查詢
  // const user = await sequelize.query(
  //   'SELECT * FROM user WHERE username=? LIMIT 1',
  //   {
  //     replacements: [loginUser.username], //代入問號值
  //     type: QueryTypes.SELECT, //執行為SELECT
  //     plain: true, // 只回傳第一筆資料
  //     raw: true, // 只需要資料表中資料
  //     logging: console.log, // SQL執行呈現在console.log
  //   }
  // )

  // 方式二: 使用模型查詢
  const user = await User.findOne({
    where: {
      username: loginUser.username,
    },
    raw: true, // 只需要資料表中資料
  })

  // console.log(user)

  // user=null代表不存在
  if (!user) {
    return res.json({ status: 'error', message: '使用者不存在' })
  }

  // compareHash(登入時的密碼純字串, 資料庫中的密碼hash) 比較密碼正確性
  // isValid=true 代表正確
  const isValid = await compareHash(loginUser.password, user.password)

  // isValid=false 代表密碼錯誤
  if (!isValid) {
    return res.json({ status: 'error', message: '密碼錯誤' })
  }

  // 存取令牌(access token)只需要id和username就足夠，其它資料可以再向資料庫查詢
  const returnUser = {
    id: user.id,
    username: user.username,
    google_uid: user.google_uid,
    line_uid: user.line_uid,
  }

  // 產生存取令牌(access token)，其中包含會員資料
  const accessToken = jsonwebtoken.sign(returnUser, accessTokenSecret, {
    expiresIn: '3d',
  })

  // 使用httpOnly cookie來讓瀏覽器端儲存access token
  res.cookie('accessToken', accessToken, { httpOnly: true })

  // 傳送access token回應(例如react可以儲存在state中使用)
  res.json({
    status: 'success',
    data: { accessToken },
  })
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
  if (
    !newUser.user_name ||
    !newUser.phone ||
    !newUser.birthday ||
    !newUser.gender ||
    !newUser.account ||
    !newUser.password
  ) {
    return res.status(400).json({ status: 'error', message: '缺少必要資料' })
  }

  try {
  // ! 檢查會員帳號是否已存在
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE account = ? OR email = ?',
    [newUser.account, newUser.email]
  );

  if (rows.length > 0) {
    return res.status(409).json({ status: 'error', message: '會員帳號已存在' });
  }

  // 加密密碼
  const hashedPassword = await bcrypt.hash(newUser.password, 10);

  // 插入新用戶
  const [result] = await connection.execute(
    'INSERT INTO users (user_name, phone, birthday, gender, account, password) VALUES (?, ?, ?, ?, ?, ?)',
    [newUser.user_name, newUser.phone, newUser.birthday, newUser.gender, newUser.account, hashedPassword]
  );

// 確保用戶插入成功
if (result.affectedRows === 1) {
  return res.status(201).json({
    status: 'success',
    message: '會員註冊成功',
    data: { id: result.insertId, user_name: newUser.user_name, account: newUser.account },
  });
} else {
  throw new Error('用戶註冊失敗');
}
} catch (error) {
  console.error('註冊失敗：', error);
  return res.status(500).json({ status: 'error', message: '伺服器錯誤，請稍後再試' });
}
});

export default router
