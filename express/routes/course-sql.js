import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    // 取得所有 class 資料加入陣列
    const query = `SELECT * FROM class`
    // courses: class 資料表的 result
    const [courses] = await connection.execute(query)

    if (courses.length === 0) {
      return res.status(404).json({ message: '沒有資料' })
    }
    res.json(courses)
  } catch (err) {
    res.status(500).json({ error: 'error'+ err.message })
  }
})

export default router