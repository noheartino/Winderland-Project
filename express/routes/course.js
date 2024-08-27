import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()
let userId = 1

router.get('/teacher', async (req, res) => {
  // teacher 列表
  let teachersSQL = `SELECT teacher.*, images_teacher.teacher_id, images_teacher.path AS teacher_path FROM teacher JOIN images_teacher ON teacher.id = images_teacher.teacher_id`
  let commentsSQL = `SELECT comments.*, comments.id AS comment_id, class.*, class.id AS class_id, class.description AS class_description, class.name AS class_name, teacher.*, teacher.id AS teacher_id, teacher.description AS teacher_description, teacher.name AS teacher_name, images_teacher.teacher_id, images_teacher.path AS teacher_path
  FROM
    comments
  JOIN
    class ON comments.entity_id = class.id
  JOIN
    teacher ON class.teacher_id = teacher.id
  JOIN
    images_teacher ON teacher.id = images_teacher.teacher_id
  WHERE
    comments.entity_type = 'class'`

  try {
    const [teachers] = await connection.execute(teachersSQL)
    const [comments] = await connection.execute(commentsSQL)

    res.json({ teachers, comments })
    console.log('來源url:' + req.originalUrl)
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
  }
})

router.get('/', async (req, res) => {
  const { search, view } = req.query
  let querySQL = null
  let querySQLParams = []
  if (!search) {
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
  console.log('送出的查詢詞語是: ' + search)
  let querySQLComments = `SELECT comments.* FROM comments`
  let querySQLClassAsign = `SELECT 
                                order_details.*, 
                                orders.*, 
                                order_details.id AS order_details_id
                            FROM 
                                order_details 
                            JOIN 
                                orders 
                            ON 
                                order_details.order_uuid = orders.order_uuid
                            WHERE order_details.class_id>0
                            ORDER BY orders.order_uuid ASC;`
  let querySQLMyFavoriteCourse = `SELECT user_like.*, class.*, class.id AS class_id, user_like.id AS user_like_id, images_class.class_id, images_class.path AS class_path
                                    FROM user_like
                                    JOIN class ON user_like.item_id = class.id
                                    JOIN images_class ON class.id = images_class.class_id
                                    WHERE user_like.item_type = 'class'
                                    AND user_like.user_id = ${userId};`
  let courseBtnSQLwords = ``
  if (!view || view === '全部') {
    courseBtnSQLwords = `AND order_details.class_id > 0`
    console.log(courseBtnSQLwords + '點擊:' + view)
  } else if (view === '實體') {
    courseBtnSQLwords = `AND order_details.class_id > 0 AND class.online = 0`
    console.log(courseBtnSQLwords + '點擊:' + view)
  } else {
    courseBtnSQLwords = `AND order_details.class_id > 0 AND class.online = 1`
    console.log(courseBtnSQLwords + '點擊:' + view)
  }
  let querySQLMyCourse = `SELECT order_details.order_uuid, order_details.class_id, orders.user_id, orders.order_uuid, class.*, class.id AS class_id, images_class.class_id, images_class.path AS class_path, class.name AS class_name, teacher.id AS teacher_id, teacher.name AS teacher_name
                            FROM
                                order_details
                            JOIN
                                orders ON order_details.order_uuid = orders.order_uuid
                            JOIN
                                class ON order_details.class_id = class.id
                            JOIN
                                images_class ON class.id = images_class.class_id
                            JOIN
                                teacher ON class.teacher_id = teacher.id
                            WHERE orders.user_id = ${userId}
                                ${courseBtnSQLwords}
                            ORDER BY orders.order_uuid ASC;`
  try {
    const [courses] = await connection.execute(querySQL, querySQLParams)
    const [comments] = await connection.execute(querySQLComments)
    const [classAssigns] = await connection.execute(querySQLClassAsign)
    const [myFavoriteCourse] = await connection.execute(
      querySQLMyFavoriteCourse
    )
    const [myCourse] = await connection.execute(querySQLMyCourse)

    // if (myCourse.length === 0) {
    //     return res.json({ courses: [], comments: [], classAssigns: [], myFavoriteCourse: [], myCourse: [] })
    //   }
    // 傳出去的資料庫資料
    res.json({ courses, comments, classAssigns, myFavoriteCourse, myCourse })
    console.log({ courses: courses }, { comments: comments })
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
  }
})

router.get('/:courseId', async (req, res) => {
  const { series } = req.query

  const courseId = req.params.courseId
  let courseSQL = `SELECT 
                    class.*,
                    class.id AS class_id,
                    class.name AS class_name,
                    class.description AS class_description,
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
                WHERE class.id = ${courseId};`
  let theCourseAssignedSQL = `SELECT 
                                order_details.*, 
                                orders.*, 
                                order_details.id AS order_details_id
                            FROM 
                                order_details 
                            JOIN 
                                orders 
                            ON 
                                order_details.order_uuid = orders.order_uuid
                            WHERE order_details.class_id=${courseId};`

  let commentSQLparams = `comments.created_at DESC`
  if (series === 'timeOldToNew') {
    commentSQLparams = `comments.created_at ASC`
  } else if (series && series === 'scoreHtoL') {
    commentSQLparams = `comments.rating DESC, comments.created_at DESC`
  } else if (series && series === 'scoreLtoH') {
    commentSQLparams = `comments.rating ASC, comments.created_at DESC`
  } else {
    commentSQLparams = `comments.created_at DESC`
  }
  let commentsSQL = `SELECT comments.*, users.account, users.id AS user_id FROM comments JOIN users ON comments.user_id = users.id WHERE comments.entity_type = 'class' AND comments.entity_id = ${courseId} ORDER BY ${commentSQLparams}`
  try {
    const [course] = await connection.execute(courseSQL)
    const [theCourseAssigned] = await connection.execute(theCourseAssignedSQL)
    const [comments] = await connection.execute(commentsSQL)
    res.json({ course, theCourseAssigned, comments })
    console.log('測試:' + req.originalUrl)
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
  }
})

export default router
