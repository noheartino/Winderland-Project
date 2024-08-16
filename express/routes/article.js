import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    // 獲取查詢參數
    const { search = '' } = req.query

    // 構建 SQL 查詢語句
    let query = `SELECT a.*,
    GROUP_CONCAT(ia.path) AS images
    FROM article a
    LEFT JOIN images_article ia ON a.id = ia.article_id
    GROUP BY a.id
`
    const params = []

    // 如果有提供 search 參數，則添加 WHERE 條件
    if (search) {
      query += ' WHERE title LIKE ?'
      params.push(`%${search}%`)
    }

    // 如果 includeImages 為 true，則加入 LEFT JOIN 和 GROUP BY
    // if (includeImages === 'true') {
    //   query += `
    //     LEFT JOIN images_article ia ON a.id = ia.article_id
    //     GROUP BY a.id
    //   `
    // }

    // 執行 SQL 查詢
    const [articles] = await connection.execute(query, params)

    if (articles.length === 0) {
      return res.status(404).json({ message: '沒有資料' })
    }

    res.json(articles)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '無法查詢資料' })
  }
})

export default router
