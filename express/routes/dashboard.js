// # 會員管理介面

// ! 導入模組
import express from 'express'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'
// 資料庫使用
import connection from '##/configs/mysql.js'
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
// 驗証加密密碼字串用
import { compareHash } from '#db-helpers/password-hash.js'
// 上傳檔案用使用multer
import path from 'path'
import multer from 'multer'
// 加密
import bcrypt from 'bcrypt'

const router = express.Router()
// multer的設定值 - START
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // 存放目錄
    callback(null, 'public/avatar/')
  },
  filename: function (req, file, callback) {
    // 經授權後，req.user帶有會員的id
    const newFilename = req.user.id
    // 新檔名由表單傳來的req.body.newFilename決定
    callback(null, newFilename + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
// multer的設定值 - END

// @ GET - 得到所有會員資料
// router.get('/', async function (req, res) {
//   try {
//     const [rows] = await connection.query('SELECT * FROM users')
//     return res.json({ status: 'success', data: { users: rows } })
//   } catch (error) {
//     console.error('Error fetching users:', error)
//     return res
//       .status(500)
//       .json({ status: 'error', message: '獲取會員資料失敗' })
//   }
// })

// @ GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/profile', authenticate, async function (req, res) {
  // 轉為數字
  const id = req.user.id // 從已驗證的用戶資訊中獲取 ID
  console.log('Extracted ID:', id)

  // 檢查是否為授權會員，只有授權會員可以存取自己的資料
  if (req.user.id !== id) {
    return res.json({ status: 'error', message: '存取會員資料失敗' })
  }

  try {
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [
      id,
    ])
    if (rows.length === 0) {
      return res.status(404).json({ status: 'error', message: '會員不存在' })
    }
    const user = rows[0]
    // 不回傳密碼
    delete user.password
    return res.json({ status: 'success', data: { user } })
  } catch (error) {
    console.error('Error fetching user:', error)
    return res
      .status(500)
      .json({ status: 'error', message: '獲取會員資料失敗' })
  }
})

// @ POST - 可同時上傳與更新會員檔案用，使用multer(設定值在此檔案最上面)
// router.post(
//   '/upload-avatar',
//   authenticate,
//   upload.single('avatar'), // 上傳來的檔案(這是單個檔案，表單欄位名稱為avatar)
//   async function (req, res) {
//     // req.file 即上傳來的檔案(avatar這個檔案)
//     // req.body 其它的文字欄位資料…
//     // console.log(req.file, req.body)

//     if (req.file) {
//       const id = req.user.id
//       const data = { avatar: req.file.filename }

//       try {
//         const [result] = await connection.query(
//           'UPDATE users SET avatar = ? WHERE id = ?',
//           [avatar, id]
//         )
//         if (result.affectedRows === 0) {
//           return res.json({
//             status: 'error',
//             message: '更新失敗或沒有資料被更新',
//           })
//         }
//         return res.json({
//           status: 'success',
//           data: { avatar: avatar },
//         })
//       } catch (error) {
//         console.error('Error updating avatar:', error)
//         return res
//           .status(500)
//           .json({ status: 'error', message: '更新頭像失敗' })
//       }
//     } else {
//       return res.json({ status: 'fail', data: null })
//     }
//   }
// )

// @ PUT - 更新會員資料(密碼更新用)
router.put('/profile/password', authenticate, async function (req, res) {
  try {
    const userId = req.user.id
    const { oldPassword, newPassword } = req.body

    // 檢查是否為授權會員，只有授權會員可以存取自己的資料
    if (req.user.id !== userId) {
      return res.json({ status: 'error', message: '存取會員資料失敗' })
    }

    console.log('接收到的密碼更新請求:', {
      userId,
      oldPassword: '******',
      newPassword: '******',
    })

    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ status: 'error', message: '缺少必要資料' })
    }

    // 獲取用戶當前的密碼哈希
    const [rows] = await connection.query(
      'SELECT password FROM users WHERE id = ?',
      [userId]
    )
    if (rows.length === 0) {
      return res.status(404).json({ status: 'error', message: '用戶不存在' })
    }

    const currentPasswordHash = rows[0].password

    // 驗證舊密碼
    const isValidPassword = await compareHash(oldPassword, currentPasswordHash)
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: 'error', message: '舊密碼不正確.ᐟ.ᐟ.ᐟ' })
    }

    // 加密新密碼
    const newPasswordHash = await bcrypt.hash(newPassword, 10)

    // 更新密碼
    const [updateResult] = await connection.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [newPasswordHash, userId]
    )
    if (updateResult.affectedRows === 0) {
      return res.status(500).json({ status: 'error', message: '密碼更新失敗' })
    }

    console.log('密碼更新成功:', { userId })

    res.json({
      status: 'success',
      message: '密碼更新成功',
    })
  } catch (error) {
    console.error('更新密碼時發生錯誤:', error)
    res.status(500).json({ status: 'error', message: '更新密碼失敗' })
  }
})

// @ PUT - 更新會員資料(排除更新密碼)
router.put('/profile/update', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const { user_name, birthday, gender, phone, address, email } = req.body

    console.log('接收到的數據:', req.body)

    // 檢查用戶是否有權限更新這個資料
    if (!userId) {
      return res
        .status(403)
        .json({ status: 'error', message: '無權限存取此會員資料' })
    }

    // 檢查必要資料
    if (!user_name) {
      return res.status(400).json({ status: 'error', message: '缺少必要資料' })
    }

    console.log('更新會員id:', userId)
    // console.log('Updated user data:', {
    //   user_name,
    //   birthday,
    //   gender,
    //   phone,
    //   address,
    //   email,
    // })

    // 構建動態 SQL 查詢
    let query = 'UPDATE users SET '
    const updateFields = []
    const params = []

    if (user_name !== undefined) {
      updateFields.push('user_name = ?')
      params.push(user_name)
    }
    if (birthday !== undefined) {
      updateFields.push('birthday = ?')
      params.push(birthday)
    }
    if (gender !== undefined) {
      updateFields.push('gender = ?')
      params.push(gender)
    }
    if (phone !== undefined) {
      updateFields.push('phone = ?')
      params.push(phone)
    }
    if (address !== undefined) {
      updateFields.push('address = ?')
      params.push(address)
    }
    if (email !== undefined) {
      updateFields.push('email = ?')
      params.push(email)
    }

    if (updateFields.length === 0) {
      return res
        .status(400)
        .json({ status: 'error', message: '沒有提供任何更新數據' })
    }

    query += updateFields.join(', ') + ' WHERE id = ?'
    params.push(userId)

    console.log('更新後query:', query)
    console.log('更新後params:', params)

    const [result] = await connection.execute(query, params)
    console.log('資料庫更新結果:', result)

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: '會員不存在或沒有資料被更新' })
    }
    // 獲取更新後的用戶資料
    const [updatedUsers] = await connection.execute(
      'SELECT id, user_name, email, account, birthday, gender, phone, address, member_level_id FROM users WHERE id = ?',
      [userId]
    )

    const updatedUser = updatedUsers[0]
    console.log('更新後會員數據:', updatedUser)

    res.json({
      status: 'success',
      message: '會員資料更新成功',
      data: {
        user: updatedUser,
      },
    })
  } catch (error) {
    console.error('更新會員資料時發生錯誤:', error)
    res.status(500).json({ status: 'error', message: '更新會員資料失敗' })
  }
})

// @ DELETE - 刪除會員資料
router.delete('/:id', async function (req, res) {
  const id = getIdParam(req)

  try {
    const [result] = await connection.query('DELETE FROM users WHERE id = ?', [
      id,
    ])

    if (result.affectedRows === 0) {
      return res.json({
        status: 'fail',
        message: '刪除會員失敗',
      })
    }

    return res.json({ status: 'success', data: null })
  } catch (error) {
    console.error('Error deleting user:', error)
    return res.status(500).json({ status: 'error', message: '刪除會員失敗' })
  }
})

export default router
