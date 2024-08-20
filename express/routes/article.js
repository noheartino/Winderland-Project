import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

// 文章首頁
router.get('/', async (req, res) => {
  try {
    // 獲取查詢參數
    const { search = '' } = req.query

    // 構建 SQL 查詢語句
    let query = `SELECT a.*,
    GROUP_CONCAT(ia.path) AS images,
    DATE(a.update_time) AS update_date
    FROM article a
    LEFT JOIN images_article ia ON a.id = ia.article_id
    `
    // 預設一個空陣列
    const params = []

    // 如果有提供 search 參數，則添加 WHERE 條件
    if (search) {
      query += ' WHERE title LIKE ?'
      params.push(`%${search}%`)
    }

    query += ' GROUP BY a.id'

    // 執行 SQL 查詢
    const [articles] = await connection.execute(query, params)

    if (search && articles.length === 0) {
      return res.json([]) // 當使用 search 且沒有資料時回傳空的陣列
    }

    res.json(articles)
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

export default router
