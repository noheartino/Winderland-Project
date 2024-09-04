// # 會員管理介面

// ! 導入模組
import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'
import authenticate from '#middlewares/authenticate.js'
import { getIdParam } from '#db-helpers/db-tool.js'
import { compareHash } from '#db-helpers/password-hash.js'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// multer的設定值 - START
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(
      null,
      path.join(__dirname, '..', 'public', 'images', 'member', 'avatar')
    )
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = uuidv4()
    callback(null, uniqueSuffix + path.extname(file.originalname))
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

// @ GET - 獲取會員資料
router.get('/profile', authenticate, async function (req, res) {
  // 轉為數字
  const id = req.user.id // 從已驗證的用戶資訊中獲取 ID
  // console.log('Extracted ID:', id)

  // 檢查是否為授權會員，只有授權會員可以存取自己的資料
  if (req.user.id !== id) {
    return res.json({ status: 'error', message: '存取會員資料失敗' })
  }

  try {
    const [rows] = await connection.query(
      `
       SELECT u.*, iu.img AS avatar_img, l.free_coupon, u.total_spending,
         l.entry_cumulative AS current_entry_cumulative,
         CASE 
           WHEN u.member_level_id < 4 THEN (SELECT entry_cumulative FROM levels WHERE member_level_id = u.member_level_id + 1)
           ELSE NULL
         END AS next_level_entry_cumulative
          FROM users u
          LEFT JOIN images_user iu ON u.id = iu.user_id
          LEFT JOIN levels l ON u.member_level_id = l.member_level_id
          WHERE u.id = ?
    `,
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ status: 'error', message: '會員不存在' })
    }

    const user = rows[0]
    delete user.password // 不回傳密碼

    // 處理頭像路徑
    if (user.avatar_img) {
      user.avatar_url = `/images/member/avatar/${user.avatar_img}`
    } else {
      user.avatar_url = '/images/member/avatar/default-avatar.jpg'
    }

    return res.json({ status: 'success', data: { user } })
  } catch (error) {
    console.error('Error fetching user:', error)
    return res
      .status(500)
      .json({ status: 'error', message: '獲取會員資料失敗' })
  }
})

// @ POST - 上傳頭像
router.post(
  '/profile/upload-avatar',
  authenticate,
  upload.single('avatar'), // 上傳來的檔案(這是單個檔案，表單欄位名稱為avatar)
  async function (req, res) {
    console.log('Received avatar upload request')

    if (!req.file) {
      console.log('No file uploaded')
      return res.status(400).json({ status: 'error', message: '沒有上傳文件' })
    }

    const userId = req.user.id
    const avatarFilename = req.file.filename

    console.log(
      `Processing avatar upload for user ${userId}, filename: ${avatarFilename}`
    )
    console.log('File saved at:', req.file.path)

    try {
      // 檢查用戶是否已有頭像記錄
      const [existingAvatar] = await connection.execute(
        'SELECT * FROM images_user WHERE user_id = ?',
        [userId]
      )

      let query
      let params

      if (existingAvatar.length > 0) {
        console.log('Updating existing avatar record')
        query = 'UPDATE images_user SET img = ? WHERE user_id = ?'
        params = [avatarFilename, userId]
      } else {
        console.log('Inserting new avatar record')
        query = 'INSERT INTO images_user (user_id, img) VALUES (?, ?)'
        params = [userId, avatarFilename]
      }

      const [result] = await connection.execute(query, params)

      if (result.affectedRows === 0) {
        console.log('Database update failed')
        return res
          .status(500)
          .json({ status: 'error', message: '更新頭像失敗' })
      }

      console.log('Avatar update successful')

      // 構建完整的頭像URL
      const avatarUrl = `/images/member/avatar/${avatarFilename}`
      res.json({
        status: 'success',
        message: '頭像上傳成功',
        data: { avatar_url: avatarUrl },
      })
    } catch (error) {
      console.error('Error in avatar upload:', error)
      res.status(500).json({
        status: 'error',
        message: '頭像上傳失敗',
        error: error.message,
      })
    }
  }
)

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
