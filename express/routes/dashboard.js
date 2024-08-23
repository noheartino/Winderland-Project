// # 會員管理介面

// ! 導入模組
import express from 'express'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'
// 資料庫使用
import connection from '##/configs/mysql.js'
// token
// import jsonwebtoken from 'jsonwebtoken'
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
router.put('/profile/:id/password', authenticate, async function (req, res) {
  const id = getIdParam(req)

  // 檢查是否為授權會員，只有授權會員可以存取自己的資料
  if (req.user.id !== id) {
    return res.json({ status: 'error', message: '存取會員資料失敗' })
  }

  // user為來自前端的會員資料(準備要修改的資料)
  // const userPassword = req.body
  const { origin, new: newPassword } = req.body

  // 檢查從前端瀏覽器來的資料，哪些為必要(name, ...)，從前端接收的資料為
  // {
  //   originPassword: '', // 原本密碼，要比對成功才能修改
  //   newPassword: '', // 新密碼
  // }
  if (!id || !origin || !newPassword) {
    return res.json({ status: 'error', message: '缺少必要資料' })
  }

  try {
    const [rows] = await connection.query(
      'SELECT password FROM users WHERE id = ?',
      [id]
    )
    if (rows.length === 0) {
      return res.json({ status: 'error', message: '使用者不存在' })
    }

    const dbUser = rows[0]
    const isValid = await compareHash(origin, dbUser.password)

    if (!isValid) {
      return res.json({ status: 'error', message: '密碼錯誤' })
    }

    // 加密密碼
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    const [result] = await connection.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedNewPassword, id]
    )

    if (result.affectedRows === 0) {
      return res.json({ status: 'error', message: '更新失敗' })
    }

    return res.json({ status: 'success', data: null })
  } catch (error) {
    console.error('Error updating password:', error)
    return res.status(500).json({ status: 'error', message: '更新密碼失敗' })
  }
})

// @ PUT - 更新會員資料(排除更新密碼)
// router.put('/:id/profile', authenticate, async function (req, res) {
//   const id = getIdParam(req)

//   // 檢查是否為授權會員，只有授權會員可以存取自己的資料
//   if (req.user.id !== id) {
//     return res.json({ status: 'error', message: '存取會員資料失敗' })
//   }

//   // user為來自前端的會員資料(準備要修改的資料)
//   const user = req.body

//   // 檢查從前端瀏覽器來的資料，哪些為必要(name, ...)
//   if (!id || !user.user_name) {
//     return res.json({ status: 'error', message: '缺少必要資料' })
//   }
//   try {
//     let query = 'UPDATE users SET name = ?, email = ?'
//     let params = [user.user_name, user.email]

//     if (user.birthday) {
//       query += ', birthday = ?'
//       params.push(user.birthday)
//     }

//     query += ' WHERE id = ?'
//     params.push(id)

//     const [result] = await connection.query(query, params)

//     if (result.affectedRows === 0) {
//       return res.json({ status: 'error', message: '更新失敗或沒有資料被更新' })
//     }

//     const [updatedRows] = await connection.query(
//       'SELECT * FROM users WHERE id = ?',
//       [id]
//     )
//     const updatedUser = updatedRows[0]
//     delete updatedUser.password

//     return res.json({ status: 'success', data: { user: updatedUser } })
//   } catch (error) {
//     console.error('Error updating user profile:', error)
//     return res
//       .status(500)
//       .json({ status: 'error', message: '更新會員資料失敗' })
//   }
// })

// 有些特殊欄位的值沒有時要略過更新，不然會造成資料庫錯誤
// if (!user.birth_date) {
//   delete user.birth_date
// }

router.put('/profile', authenticate, async (req, res) => {
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
