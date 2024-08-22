import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const { search } = req.query
  let userId = 12
  let querySQL = ``
  let querySQLParams = []
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
                            WHERE orders_detail.class_id>0
                            ORDER BY orders.order_uuid ASC;`
  let querySQLMyFavoriteCourse = `SELECT user_like.*, class.*, class.id AS class_id, user_like.id AS user_like_id, images_class.class_id, images_class.path
                                    FROM user_like
                                    JOIN class ON user_like.item_id = class.id
                                    JOIN images_class ON class.id = images_class.class_id
                                    WHERE user_like.item_type = 'class'
                                    AND user_like.user_id = ${userId};`
  let querySQLMyCourse = `SELECT orders_detail.order_uuid, orders_detail.class_id, orders.user_id, orders.order_uuid, class.*, class.id AS class_id, images_class.class_id, images_class.path
                        FROM
                            orders_detail
                        JOIN
                            orders ON orders_detail.order_uuid = orders.order_uuid
                        JOIN
                            class ON orders_detail.class_id = class.id
                        JOIN images_class ON class.id = images_class.class_id
                        WHERE orders.user_id = ${userId}
                            AND orders_detail.class_id > 0
                        ORDER BY orders.order_uuid ASC;`
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
                  ORDER BY class.id ASC;`
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
                    OR teacher.name LIKE ?
                ORDER BY class.id ASC;`
      querySQLParams = [`%${search}%`, `%${search}%`]
    }
    // courses: class 資料表的 result
    const [courses] = await connection.execute(querySQL, querySQLParams)
    const [comments] = await connection.execute(querySQLComments)
    const [classAssigns] = await connection.execute(querySQLClassAsign)
    const [myFavoriteCourse] = await connection.execute(
      querySQLMyFavoriteCourse
    )
    const [myCourse] = await connection.execute(querySQLMyCourse)

    if (courses.length === 0) {
      return res.status(200).json({ message: '資料庫沒有資料' })
    }
    // 傳出去的資料庫資料
    res.json({ courses, comments, classAssigns, myFavoriteCourse, myCourse })
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
  }
})

export default router
