import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

router.get('/teacher/:teacherId', async (req, res) => {
  // let { userId } = req.query
  // 目前 teacher ID
  const teacherId = req.params.teacherId
  console.log('---teacherID=' + teacherId)

  // SELECT 目前teacher
  let teacherSQL = `SELECT teacher.*, teacher.id AS teacher_id, images_teacher.teacher_id, images_teacher.path AS teacher_path FROM teacher JOIN images_teacher ON teacher.id = images_teacher.teacher_id WHERE teacher.id = ?;`

  // SELECT 目前teacher的comments
  let teacherCommentsSQL = `SELECT comments.*, comments.id AS comment_id, class.id AS class_id, class.name AS class_name, class.teacher_id FROM comments JOIN class ON comments.entity_id = class.id WHERE comments.entity_type = 'class' AND class.teacher_id = ?`

  // SELECT 目前 teacher 開課的 courses
  let teacherCoursesSQL = `SELECT class.*, class.name AS class_name, images_class.class_id, images_class.path AS class_path, teacher.name AS teacher_name FROM class JOIN images_class ON class.id = images_class.class_id JOIN teacher ON class.teacher_id = teacher.id WHERE class.teacher_id = ?`
  try {
    const [teacher] = await connection.execute(teacherSQL, [teacherId])
    const [teacherComments] = await connection.execute(teacherCommentsSQL, [
      teacherId,
    ])
    const [teacherCourses] = await connection.execute(teacherCoursesSQL, [
      teacherId,
    ])
    res.json({ teacher, teacherComments, teacherCourses })
    console.log('測試:' + req.originalUrl)
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
  }
})

router.get('/teacher', async (req, res) => {
  // teacher 列表
  // let { userId } = req.query
  const { searchT } = req.query
  let teacherSQLParamsStr = ``
  let teachersSQLParams = []
  if (searchT) {
    teacherSQLParamsStr = `WHERE teacher.name LIKE ? OR teacher.name_en LIKE ? AND teacher.valid = '1'`
    teachersSQLParams = [`%${searchT}%`, `%${searchT}%`]
  }
  let teachersSQL = `SELECT teacher.*, images_teacher.teacher_id, images_teacher.path AS teacher_path FROM teacher JOIN images_teacher ON teacher.id = images_teacher.teacher_id ${teacherSQLParamsStr}`
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
    const [teachers] = await connection.execute(teachersSQL, teachersSQLParams)
    const [comments] = await connection.execute(commentsSQL)

    res.json({ teachers, comments })
    console.log('來源url:' + req.originalUrl)
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
  }
})

router.get('/', async (req, res) => {
  const { userId } = req.query
  const { search, view } = req.query
  let querySQL = null
  let querySQLParams = []
  let classSumSQL = `SELECT class.* FROM class`
  let teachersSQL = `SELECT teacher.* FROM teacher`
  if (!search) {
    // querySQL = `select class.* from class`
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
                    images_teacher.path AS teacher_path,
                    COALESCE(AVG(comments.rating), 0) AS average_rating
                FROM 
                    class
                LEFT JOIN
                    teacher ON class.teacher_id = teacher.id
                LEFT JOIN
                    images_class ON class.id = images_class.class_id
                LEFT JOIN
                    images_teacher ON teacher.id = images_teacher.teacher_id
                LEFT JOIN 
                    comments ON class.id = comments.entity_id AND comments.entity_type = 'class'
                GROUP BY 
                    class.id, class.name, teacher.id, teacher.name, images_class.class_id, images_class.path, images_teacher.teacher_id, images_teacher.path
                ORDER BY 
                    class.id ASC;`
  } else {
    // querySQL = `select class.* from class`
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
                    images_teacher.path AS teacher_path,
                    COALESCE(AVG(comments.rating), 0) AS average_rating
                FROM 
                    class
                LEFT JOIN
                    teacher ON class.teacher_id = teacher.id
                LEFT JOIN
                    images_class ON class.id = images_class.class_id
                LEFT JOIN
                    images_teacher ON teacher.id = images_teacher.teacher_id
                LEFT JOIN 
                    comments ON class.id = comments.entity_id AND comments.entity_type = 'class'
                WHERE
                    class.name LIKE ?
                    OR teacher.name LIKE ?
                GROUP BY 
                    class.id, class.name, teacher.id, teacher.name, images_class.class_id, images_class.path, images_teacher.teacher_id, images_teacher.path
                ORDER BY 
                    class.id ASC;`
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
  // let querySQLMyFavoriteCourse = `select class.* from class`
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
    courseBtnSQLwords = `AND order_details.class_id > 0 AND class.online = '1'`
    console.log(courseBtnSQLwords + '點擊:' + view)
  }
  let todayDateOnly = new Date().toISOString().split('T')[0]
  // let querySQLMyCourse = `select class.* from class`
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
  // if(userId){
  //   console.log("userId-----> "+userId);
  // }
  // if(courseBtnSQLwords){
  //   console.log("courseBtnSQLwords-----> "+courseBtnSQLwords);
  // }
  // if(view){
  //   console.log("view-----> "+view);
  // }
  // if(search){
  //   console.log("search-----> "+search);
  // }
  console.log('測試:' + req.originalUrl)
  try {
    console.log('測試:' + req.originalUrl)

    const [courses] = search
      ? await connection.execute(querySQL, querySQLParams)
      : await connection.execute(querySQL)
    const [classSum] = await connection.execute(classSumSQL)
    const [comments] = await connection.execute(querySQLComments)
    const [classAssigns] = await connection.execute(querySQLClassAsign)
    const [myFavoriteCourse] = await connection.execute(
      querySQLMyFavoriteCourse
    )
    const [myCourse] = await connection.execute(querySQLMyCourse)
    const [teachers] = await connection.execute(teachersSQL)
    res.json({
      courses,
      comments,
      classAssigns,
      myFavoriteCourse,
      myCourse,
      classSum,
      teachers,
    })
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
    console.log('來源測試:' + req.originalUrl)
  }
})
router.get('/:courseId', async (req, res) => {
  const { series, userId } = req.query
  const courseId = req.params.courseId
  console.log(courseId + 'courseId')
  console.log(userId + 'userId')

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
  console.log('------' + commentSQLparams + '------')
  console.log('------' + series + '------')
  if (series) {
    console.log(series)
  }
  try {
    const [course] = await connection.execute(courseSQL)
    const [theCourseAssigned] = await connection.execute(theCourseAssignedSQL)
    const [comments] = await connection.execute(commentsSQL)
    // 檢查課程是否已收藏，length>0就是有
    const [existing] = await connection.query(
      'SELECT * FROM user_like WHERE user_id = ? AND item_id = ? AND item_type = "class"',
      [userId, courseId]
    )
    res.json({ course, theCourseAssigned, comments, existing })
    console.log('測試:' + req.originalUrl)
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
  }
})

// !! 寫入購物車
router.post('/:courseId', async (req, res) => {
  const { userId } = req.query
  const courseId = req.params.courseId
  console.log(courseId + 'courseId')
  console.log(userId + 'userId')

  // 這邊要寫PUT資料進購物車的SQL語法，要寫入userID到cart_items.user_id、courseId到cart_items.class_id、new Date(now)到cart_items.updated_at
  let courseWriteInCartSQL = `INSERT INTO cart_items (user_id, class_id) VALUES (${userId}, ${courseId});`
  console.log(courseWriteInCartSQL)

  try {
    const [courseWriteInCart] = await connection.execute(courseWriteInCartSQL)
    res.json({ courseWriteInCart })
    console.log('測試POST:' + req.originalUrl)
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
  }
})

// !! 課程管理 create
router.post('course/teacher/management', async (req, res) => {

  try {
    // const [courseWriteInCart] = await connection.execute(courseWriteInCartSQL)
    // res.json({ courseWriteInCart })
    console.log('測試POST:' + req.originalUrl)
  } catch (err) {
    res.status(500).json({ error: 'error' + err.message })
  }
})

export default router
