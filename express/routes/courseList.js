import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const { search } = req.query;
  let querySQL = ``
  let querySQLParams = [];
  try {
    if(!search){
      // 取得所有 class 資料加入陣列
    // querySQL = `SELECT * FROM class`
    querySQL = `SELECT class.*, images_class.*, images_class.id AS image_id FROM class JOIN images_class ON class.id = images_class.class_id;`

    }else{
    querySQL = 'SELECT class.*, images_class.*, images_class.id AS image_id FROM class JOIN images_class ON class.id = images_class.class_id WHERE name LIKE ?';
    querySQLParams = [`%${search}%`];
    }
    // courses: class 資料表的 result
    const [courses] = await connection.execute(querySQL, querySQLParams);

    if (courses.length === 0) {
      return res.status(200).json({ message: '資料庫沒有資料' })
    }
    // 傳出去的資料庫資料
    res.json(courses)
  } catch (err) {
    res.status(500).json({ error: 'error'+ err.message })
  }
})

export default router