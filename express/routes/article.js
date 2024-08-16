import express from 'express'
import 'dotenv/config.js'
import connection from '../configs/mysql.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    // 取得所有article資料加入陣列
    const query = `SELECT * FROM article`
    const [articles] = await connection.execute(query)

    if (articles.length === 0) {
      return res.status(404).json({ message: '沒有資料' })
    }
    res.json(articles)
  } catch (err) {
    res.status(500).json({ error: 'error' })
  }
})

export default router