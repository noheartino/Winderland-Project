import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'
import path from 'path'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// multer的設定值 - START
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '..', 'public', 'uploads', 'article'))
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = uuidv4()
    callback(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })
// multer的設定值 - END

router.get('/all', async (req, res) => {
  try {
    let query = `SELECT a.*, 
        GROUP_CONCAT(ia.path) AS images,
        DATE(a.update_time) AS update_date
      FROM article a
      LEFT JOIN images_article ia ON a.id = ia.article_id
      WHERE a.poster = 'Admin'
      GROUP BY a.id
    `
    const [articles] = await connection.execute(query)

    // 返回文章數據和總頁數
    res.json({ articles })
    // console.log(totalPages)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '無法查詢資料' })
  }
})

router.get('/', async (req, res) => {
  try {
    const {
      search = '',
      category = '',
      dateFilter = '',
      startDate = '',
      endDate = '',
      sortOrder = '',
      page = 1,
      limit = 6,
    } = req.query

    const categoryMap = {
      knowledge: '葡萄酒小知識',
      regional: '產區特色',
      varieties: '葡萄品種介紹',
      pairing: '搭配餐點推薦',
      cocktail: '調酒知識',
    }

    let baseQuery = `
      FROM article a
      LEFT JOIN images_article ia ON a.id = ia.article_id
    `

    const params = []

    let whereClause = ''
    if (search) {
      whereClause += ' WHERE a.title LIKE ?'
      params.push(`%${search}%`)
    }

    if (category) {
      const categoryName = categoryMap[category] || category
      if (params.length > 0) {
        whereClause += ' AND a.category = ?'
      } else {
        whereClause += ' WHERE a.category = ?'
      }
      params.push(categoryName)
    }

    if (dateFilter) {
      let dateCondition
      switch (dateFilter) {
        case '本日':
          dateCondition = `DATE(a.update_time) = CURDATE()`
          break
        case '本週':
          dateCondition = `YEARWEEK(a.update_time, 1) = YEARWEEK(CURDATE(), 1)`
          break
        case '本月':
          dateCondition = `MONTH(a.update_time) = MONTH(CURDATE()) AND YEAR(a.update_time) = YEAR(CURDATE())`
          break
        case '近半年':
          dateCondition = `a.update_time >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)`
          break
        case '近一年':
          dateCondition = `a.update_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)`
          break
        case '一年以上':
          dateCondition = `a.update_time < DATE_SUB(CURDATE(), INTERVAL 1 YEAR)`
          break
        default:
          dateCondition = ''
      }

      if (dateCondition) {
        if (params.length > 0) {
          whereClause += ` AND ${dateCondition}`
        } else {
          whereClause += ` WHERE ${dateCondition}`
        }
      }
    }

    if (startDate && endDate) {
      if (params.length > 0) {
        whereClause += ' AND DATE(a.update_time) BETWEEN ? AND ?'
      } else {
        whereClause += ' WHERE DATE(a.update_time) BETWEEN ? AND ?'
      }
      params.push(startDate, endDate)
    }

    let orderByClause = ' ORDER BY a.update_time DESC' // 默認按最新發布排序

    if (sortOrder === 'oldest') {
      orderByClause = ' ORDER BY a.update_time ASC' // 按時間由舊到新
    } else if (sortOrder === 'latest') {
      orderByClause = ' ORDER BY a.update_time DESC' // 最新發布
    }

    // 計算符合條件的總文章數
    const totalQuery = `SELECT COUNT(DISTINCT a.id) as total ${baseQuery} ${whereClause}`
    const [totalResult] = await connection.execute(totalQuery, params)
    const totalPages = Math.ceil(totalResult[0].total / limit)
    console.log(totalResult)

    // 查詢當前頁面的文章
    let query = `
      SELECT a.*, 
        GROUP_CONCAT(ia.path) AS images,
        DATE(a.update_time) AS update_date
      ${baseQuery} 
      ${whereClause}
      GROUP BY a.id
      ${orderByClause}
      LIMIT ? OFFSET ?
    `
    // const offset = (page - 1) * limit
    // query += ` ORDER BY a.update_time DESC LIMIT ? OFFSET ?`
    // params.push(Number(limit), Number(offset))

    const offset = (page - 1) * limit
    params.push(Number(limit), Number(offset))

    const [articles] = await connection.execute(query, params)

    // 返回文章數據和總頁數
    res.json({ articles, totalPages })
    // console.log(totalPages)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '無法查詢資料' })
  }
})

// 文章細節頁
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    let query = `SELECT a.*,
      GROUP_CONCAT(ia.path) AS images,
      DATE(a.update_time) AS update_date 
      FROM article a
      LEFT JOIN images_article ia ON a.id = ia.article_id
      WHERE a.id = ? AND a.valid = '1'
      GROUP BY a.id
    `
    const [article] = await connection.execute(query, [id])
    if (article.length === 0) {
      return res.json([])
    }

    res.json(article[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '無法查詢資料' })
  }
})

// 新增文章
router.post('/new', async (req, res) => {
  try {
    const { title, category, content, poster, update_time, valid } = req.body
    // 格式化 update_time
    const formattedUpdateTime = update_time.replace('T', ' ').slice(0, 19)
    const query = `
      INSERT INTO article (title, category, content, poster, update_time, valid)
      VALUES (?, ?, ?, ?, ?, ?)
    `

    // Execute the query to insert the article
    const [result] = await connection.execute(query, [
      title,
      category,
      content,
      poster,
      formattedUpdateTime,
      valid,
    ])

    res
      .status(201)
      .json({ message: '文章新增成功', articleId: result.insertId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '無法新增文章' })
  }
})

// 上傳首圖
router.post(
  '/upload-main-image/:articleId',
  upload.single('image'),
  async (req, res) => {
    const { articleId } = req.params

    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' })
    }

    const imagePath = `${req.file.filename}`
    try {
      const query = `INSERT INTO images_article (article_id, path) VALUES (?, ?)`
      await connection.execute(query, [articleId, imagePath])
      res.status(200).json({ message: 'Image uploaded successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to save image path' })
    }
  }
)

// 上傳內嵌圖片
router.post(
  '/upload-inline-image/:articleId',
  upload.single('image'),
  async (req, res) => {
    const { articleId } = req.params

    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' })
    }

    const imagePath = `${req.file.filename}`

    try {
      const query = `INSERT INTO images_article (article_id, path) VALUES (?, ?)`
      await connection.execute(query, [articleId, imagePath])
      res.status(200).json({ message: 'Image uploaded successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to save image path' })
    }
  }
)

// const fs = require('fs') // 如果你需要刪除實體檔案

// 更新文章路由
router.put(
  '/update/:articleId',
  upload.fields([{ name: 'mainImage' }, { name: 'inlineImages' }]),
  async (req, res) => {
    let conn
    try {
      conn = await connection.getConnection()
      await conn.beginTransaction()

      const { articleId } = req.params
      const {
        title,
        category,
        content,
        update_time,
        valid,
        existingInlineImages,
      } = req.body
      // 格式化 update_time
      const formattedUpdateTime = update_time.replace('T', ' ').slice(0, 19)

      // 更新文章數據
      const updateQuery = `
        UPDATE article 
        SET title = ?, category = ?, content = ?, update_time = ?, valid = ?
        WHERE id = ?
      `
      await conn.execute(updateQuery, [
        title,
        category,
        content,
        formattedUpdateTime,
        valid,
        articleId,
      ])

      // 處理主圖
      if (req.files['mainImage']) {
        const newMainImagePath = req.files['mainImage'][0].filename
        await handleMainImage(conn, articleId, newMainImagePath)
      }

      // 處理內嵌圖片
      let updatedInlineImages = JSON.parse(existingInlineImages || '[]')
      if (req.files['inlineImages']) {
        updatedInlineImages = await processInlineImages(
          conn,
          articleId,
          updatedInlineImages,
          req.files['inlineImages']
        )
      } else {
        // 如果沒有新上傳的圖片，但有現有的圖片，也需要處理
        await handleInlineImages(conn, articleId, updatedInlineImages)
      }
      // 處理內嵌圖片
      // if (req.files['inlineImages']) {
      //   const inlineImagePaths = req.files['inlineImages'].map(
      //     (file) => file.filename
      //   )
      //   await handleInlineImages(conn, articleId, inlineImagePaths)
      // }
      // // 處理內嵌圖片
      // if (existingInlineImages) {
      //   const parsedExistingInlineImages = JSON.parse(existingInlineImages)
      //   await handleInlineImages(conn, articleId, parsedExistingInlineImages)
      // }
      // if (req.files['inlineImages']) {
      //   const newInlineImages = req.files['inlineImages']

      //   // 創建一個映射，將原始檔名映射到新的 UUID 檔名
      //   const filenameMap = {}
      //   newInlineImages.forEach((file) => {
      //     filenameMap[file.originalname] = file.filename
      //   })

      //   // 更新 existingInlineImages，替換匹配的檔名
      //   existingInlineImages = existingInlineImages.map((filename) => {
      //     return filenameMap[filename] || filename
      //   })

      //   // 處理新上傳的圖片
      //   await handleInlineImages(
      //     conn,
      //     articleId,
      //     newInlineImages.map((file) => file.filename)
      //   )
      // }

      // // 更新資料庫中的 existingInlineImages
      // await updateExistingInlineImages(conn, articleId, existingInlineImages)

      // console.log('Updated existingInlineImages:', existingInlineImages)

      await conn.commit()
      res.status(200).json({ message: 'Article updated successfully' })
    } catch (error) {
      if (conn) await conn.rollback()
      console.error('Error updating article:', error)
      res
        .status(500)
        .json({ message: 'Error updating article', error: error.message })
    } finally {
      if (conn) conn.release()
    }
  }
)

async function handleMainImage(conn, articleId, newMainImagePath) {
  const [currentMainImage] = await conn.execute(
    `SELECT id, path FROM images_article WHERE article_id = ? ORDER BY id ASC LIMIT 1`,
    [articleId]
  )

  if (currentMainImage.length > 0) {
    const currentMainImageId = currentMainImage[0].id
    await conn.execute(`UPDATE images_article SET path = ? WHERE id = ?`, [
      newMainImagePath,
      currentMainImageId,
    ])
  } else {
    await conn.execute(
      `INSERT INTO images_article (article_id, path) VALUES (?, ?)`,
      [articleId, newMainImagePath]
    )
  }
}

async function processInlineImages(
  conn,
  articleId,
  existingInlineImages,
  newInlineImages
) {
  // 創建一個映射，將原始檔名映射到新的 UUID 檔名
  const filenameMap = {}
  newInlineImages.forEach((file) => {
    filenameMap[file.originalname] = file.filename
  })

  // 更新 existingInlineImages，替換匹配的檔名，保持未更換的圖片在原位置
  let updatedInlineImages = existingInlineImages.map((filename) => {
    return filenameMap[filename] || filename
  })

  // 將新上傳的圖片添加到列表末尾（如果它們不是替換現有圖片）
  newInlineImages.forEach((file) => {
    if (!existingInlineImages.includes(file.originalname)) {
      updatedInlineImages.push(file.filename)
    }
  })

  // 處理內嵌圖片
  await handleInlineImages(conn, articleId, updatedInlineImages)

  return updatedInlineImages
}

async function handleInlineImages(conn, articleId, updatedInlineImages) {
  // 刪除所有現有的內嵌圖片（排除主圖）
  await conn.execute(
    `DELETE FROM images_article WHERE article_id = ? AND id NOT IN (
      SELECT id FROM (
        SELECT id FROM images_article WHERE article_id = ? ORDER BY id ASC LIMIT 1
      ) AS t
    )`,
    [articleId, articleId]
  )

  // 插入新的內嵌圖片，按照 existingInlineImages 的順序
  // 如果有 existingInlineImages，逐一插入資料庫
  if (updatedInlineImages && updatedInlineImages.length > 0) {
    const insertQuery = `INSERT INTO images_article (article_id, path) VALUES ?`
    const values = updatedInlineImages.map((path) => [articleId, path])
    await conn.query(insertQuery, [values])
  }
}
export default router
