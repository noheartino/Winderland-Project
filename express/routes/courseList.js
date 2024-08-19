import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const { search } = req.query
  let querySQL = ``
  let querySQLParams = []
  let orderByClassId = `ORDER BY class.id ASC`
  let orderByOrderUuId = `ORDER BY orders.order_uuid ASC`
  let querySQLComments = `SELECT comments.* FROM comments`
  let querySQLClassAsign = `SELECT 
                                orders_detail.*, 
                                orders.*, 
                                orders_detail.id AS order_detail_id
                            FROM 
                                orders_detail 
                            JOIN 
                                orders 
                            ON 
                                orders_detail.order_uuid = orders.order_uuid
                            ${orderByOrderUuId};
                        `;
  try {
    if (!search) {
      // 取得所有 class 資料加入陣列
      // images_teacher.i_teacher_id / images_class.i_class_id / teacher.teacher_id
      querySQL = `SELECT 
                      class.*,
                      class.id AS class_id,
                      class.name AS class_name,
                      teacher.*,
                      teacher.id AS teacher_id,
                      teacher.name AS teacher_name,
                      images_class.class_id,
                      images_class.path AS class_path,
                      images_teacher.teacher_id,
                      images_teacher.path AS teacher_path
                  FROM 
                      class
                  LEFT JOIN
                      teacher ON class.teacher_id = teacher.id
                  LEFT JOIN
                      images_class ON class.id = images_class.class_id
                  LEFT JOIN
                      images_teacher ON teacher.id = images_teacher.teacher_id
                  ${orderByClassId};`
      
     } else {
      querySQL = `SELECT 
                      class.*,
                      class.id AS class_id,
                      class.name AS class_name,
                      teacher.*,
                      teacher.id AS teacher_id,
                      teacher.name AS teacher_name,
                      images_class.class_id,
                      images_class.path AS class_path,
                      images_teacher.teacher_id,
                      images_teacher.path AS teacher_path
                  FROM 
                      class
                  LEFT JOIN
                      teacher ON class.teacher_id = teacher.id
                  LEFT JOIN
                      images_class ON class.id = images_class.class_id
                  LEFT JOIN
                      images_teacher ON teacher.id = images_teacher.teacher_id
                 WHERE
                      class.name LIKE ?
                 ${orderByClassId};`
      querySQLParams = [`%${search}%`]
  }
    // courses: class 資料表的 result
    const [courses] = await connection.execute(querySQL, querySQLParams)
    const [comments] = await connection.execute(querySQLComments)
    const [classAssigns] = await connection.execute(querySQLClassAsign)

    if (courses.length === 0) {
      return res.status(200).json({ message: '資料庫沒有資料' })
    }
    // 傳出去的資料庫資料
    // res.json({courses, comments})
    res.json({courses, comments, classAssigns})
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
  }
})

export default router
