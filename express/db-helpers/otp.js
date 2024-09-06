// #opt

// 資料庫查詢處理函式
import { generateToken } from '#configs/otp.js'
// 密碼加密
import bcrypt from 'bcrypt'
// 資料庫使用
import connection from '##/configs/mysql.js'

// 判斷token是否到期, true代表到期
// const hasExpired = (expTimestamp) => {
//   return Date.now() > expTimestamp
// }

// 判斷是否可以重設token, true代表可以重設
const shouldReset = (expTimestamp, exp, limit = 60) => {
  const createdTimestamp = expTimestamp - exp * 60 * 1000
  return Date.now() - createdTimestamp > limit * 1000
}

// exp = 是 30 分到期,  limit = 60 是 60秒內不產生新的token
const createOtp = async (email, exp = 30, limit = 60) => {
  try {
    console.log('Attempting to create OTP for email:', email)

    // 檢查使用者email是否存在
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    )
    console.log('Users found:', users.length)

    if (users.length === 0) {
      console.log('ERROR - 使用者帳號不存在')
      return {}
    }

    const user = users[0]

    // 檢查otp是否已經存在
    const [otp] = await connection.execute(
      'SELECT * FROM otp WHERE email = ? LIMIT 1',
      [email]
    )

    const foundOtp = otp[0]
    console.log('Existing OTP found:', otp.length)

    // 找到記錄，因為在60s(秒)內限制，所以"不能"產生新的otp token
    if (foundOtp && !shouldReset(foundOtp.exp_timestamp, exp, limit)) {
      console.log('ERROR - 60s(秒)內要求重新產生otp')
      return {}
    }

    // 以使用者輸入的Email作為secret產生otp token
    const token = generateToken(email)

    // 到期時間 預設 exp = 30 分鐘到期
    const exp_timestamp = Date.now() + exp * 60 * 1000
    const expires_at = new Date(exp_timestamp)

    if (foundOtp && shouldReset(foundOtp.exp_timestamp, exp, limit)) {
      // 修改Otp
      await connection.execute(
        'UPDATE otp SET token = ?, exp_timestamp = ?, expires_at = ? WHERE email = ?',
        [token, exp_timestamp, expires_at, email]
      )

      return {
        ...foundOtp,
        exp_timestamp,
        expires_at,
        token,
      }
    }

    // 以下為"沒找到otp記錄"
    // 建立新記錄
    const [result] = await connection.execute(
      'INSERT INTO otp (user_id, email, token, exp_timestamp, expires_at) VALUES (?, ?, ?, ?, ?)',
      [user.id, email, token, exp_timestamp, expires_at]
    )

    console.log('New OTP created:', token)
    return {
      id: result.insertId,
      user_id: user.id,
      email,
      token,
      exp_timestamp,
      expires_at,
    }
  } catch (error) {
    console.error('Error in createotps:', error)
    throw error
  }
}

// 更新密碼
const updatePassword = async (email, token, password) => {
  const conn = await connection.getConnection()

  try {
    await conn.beginTransaction()

    // 檢查otp是否已經存在
    const [otp] = await connection.execute(
      'SELECT * FROM otp WHERE email = ? AND token = ? LIMIT 1',
      [email, token]
    )
    const foundOtp = otp[0]

    // 沒找到回傳false
    if (!foundOtp) {
      console.log('ERROR - OTP Token資料不存在'.bgRed)
      await conn.rollback()
      return false
    }

    // 計算目前時間比對是否超過，到期的timestamp
    if (Date.now() > foundOtp.exp_timestamp) {
      console.log('ERROR - OTP Token已到期'.bgRed)
      await conn.rollback()

      return false
    }

    // 加密新密碼
    const hashedPassword = await bcrypt.hash(password, 10)

    // 修改密碼
    await conn.query('UPDATE users SET password = ? WHERE id = ?', [
      hashedPassword,
      foundOtp.user_id,
    ])

    // 移除otp記錄
    await connection.execute('DELETE FROM otp WHERE id = ?', [foundOtp.id])
    await conn.commit()
    return true
  } catch (error) {
    await conn.rollback()
    console.error('Error in updatePassword:', error)
    throw error
  } finally {
    conn.release()
  }
}
export { createOtp, updatePassword }