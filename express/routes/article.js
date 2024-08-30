import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const {
      search = '',
      category = '',
      dateFilter = '',
      startDate = '',
      endDate = '',
      page = 1,
      limit = 8,
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
    `
    const offset = (page - 1) * limit
    query += ` ORDER BY a.update_time DESC LIMIT ? OFFSET ?`
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

// router.get('/', async (req, res) => {
//   try {
//     const {
//       search = '',
//       category = '',
//       dateFilter = '',
//       startDate = '',
//       endDate = '',
//       page = 1,
//       limit = 6,
//     } = req.query

//     const categoryMap = {
//       knowledge: '葡萄酒小知識',
//       regional: '產區特色',
//       varieties: '葡萄品種介紹',
//       pairing: '搭配餐點推薦',
//       cocktail: '調酒知識',
//     }

//     let query = `
//       SELECT a.*,
//         GROUP_CONCAT(ia.path) AS images,
//         DATE(a.update_time) AS update_date
//       FROM article a
//       LEFT JOIN images_article ia ON a.id = ia.article_id
//     `

//     const params = []

//     if (search) {
//       query += ' WHERE a.title LIKE ?'
//       params.push(`%${search}%`)
//     }

//     if (category) {
//       const categoryName = categoryMap[category] || category
//       if (params.length > 0) {
//         query += ' AND a.category = ?'
//       } else {
//         query += ' WHERE a.category = ?'
//       }
//       params.push(categoryName)
//     }

//     if (dateFilter) {
//       const currentDate = new Date()
//       let dateCondition

//       switch (dateFilter) {
//         case '本日':
//           dateCondition = `DATE(a.update_time) = CURDATE()`
//           break
//         case '本週':
//           dateCondition = `YEARWEEK(a.update_time, 1) = YEARWEEK(CURDATE(), 1)`
//           break
//         case '本月':
//           dateCondition = `MONTH(a.update_time) = MONTH(CURDATE()) AND YEAR(a.update_time) = YEAR(CURDATE())`
//           break
//         case '近半年':
//           dateCondition = `a.update_time >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)`
//           break
//         case '近一年':
//           dateCondition = `a.update_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)`
//           break
//         case '一年以上':
//           dateCondition = `a.update_time < DATE_SUB(CURDATE(), INTERVAL 1 YEAR)`
//           break
//         default:
//           dateCondition = ''
//       }

//       if (dateCondition) {
//         if (params.length > 0) {
//           query += ` AND ${dateCondition}`
//         } else {
//           query += ` WHERE ${dateCondition}`
//         }
//       }
//     }

//     // 日期區間篩選
//     if (startDate && endDate) {
//       if (params.length > 0) {
//         query += ' AND DATE(a.update_time) BETWEEN ? AND ?'
//       } else {
//         query += ' WHERE DATE(a.update_time) BETWEEN ? AND ?'
//       }
//       params.push(startDate, endDate)
//     }
//     // if (search || category || dateFilter || (startDate && endDate)) {
//     //   // 加入 ORDER BY 子句，按照 update_time 升序排序
//     //   query += ' GROUP BY a.id ORDER BY a.update_time ASC'
//     // } else {
//     //   query += ' GROUP BY a.id ORDER BY a.update_time DESC'
//     // }

//     // 加入 ORDER BY 子句及 LIMIT 子句
//     const offset = (page - 1) * limit
//     if (search || category || dateFilter || (startDate && endDate)) {
//       query += ' ORDER BY a.update_time ASC'
//     } else {
//       query += ' ORDER BY a.update_time DESC'
//     }
//     query += ' LIMIT ? OFFSET ?'
//     params.push(Number(limit), Number(offset))

//     const [articles] = await connection.execute(query, params)

//     res.json(articles)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: '無法查詢資料' })
//   }
// })

// router.get('/', async (req, res) => {
//   try {
//     const { search = '', category = '' } = req.query

//     const categoryMap = {
//       knowledge: '葡萄酒小知識',
//       regional: '產區特色',
//       varieties: '葡萄品種介紹',
//       pairing: '搭配餐點推薦',
//       cocktail: '調酒知識',
//     }

//     let query = `
//       SELECT a.*,
//         GROUP_CONCAT(ia.path) AS images,
//         DATE(a.update_time) AS update_date
//       FROM article a
//       LEFT JOIN images_article ia ON a.id = ia.article_id
//     `

//     const params = []

//     if (search) {
//       query += ' WHERE a.title LIKE ?'
//       params.push(`%${search}%`)
//     }

//     if (category) {
//       const categoryName = categoryMap[category] || category
//       if (params.length > 0) {
//         query += ' AND a.category = ?'
//       } else {
//         query += ' WHERE a.category = ?'
//       }
//       params.push(categoryName)
//     }

//     query += ' GROUP BY a.id'

//     const [articles] = await connection.execute(query, params)

//     res.json(articles)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: '無法查詢資料' })
//   }
// })

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
    const { title, content, author, update_time, valid, images } = req.body

    // Insert the new article into the `article` table
    const query = `
      INSERT INTO article (title, content, author, update_time, valid)
      VALUES (?, ?, ?, ?, ?)
    `

    // Execute the query to insert the article
    const [result] = await connection.execute(query, [
      title,
      content,
      author,
      update_time,
      valid,
    ])

    // If there are images, insert them into the `images_article` table
    if (images && images.length > 0) {
      const articleId = result.insertId // Get the newly inserted article's ID
      const imageQuery = `
        INSERT INTO images_article (article_id, path)
        VALUES (?, ?)
      `

      for (const path of images) {
        await connection.execute(imageQuery, [articleId, path])
      }
    }

    res
      .status(201)
      .json({ message: '文章新增成功', articleId: result.insertId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '無法新增文章' })
  }
})

export default router
