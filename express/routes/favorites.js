import express from 'express'
const router = express.Router()

// 資料庫使用
import connection from '##/configs/mysql.js'
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// 檢查空物件, 轉換req.params為數字
// import { getIdParam } from '#db-helpers/db-tool.js'

// @ 讀取我的最愛
// 獲得某會員id的有加入到我的最愛清單中的商品id們
// 此路由只有登入會員能使用
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const { type } = req.query

    let query = ''
    let params = [userId]

    if (type === 'products' || !type) {
      query = `
          SELECT 
            ul.item_id,
            p.name AS product_name,
            c.name AS country_name,
            pd.years,
            pd.capacity,
            pd.price
          FROM user_like ul
          JOIN product p ON ul.item_id = p.id
          JOIN origin o ON p.origin_id = o.id  
          JOIN country c ON o.country_id = c.id 
          JOIN product_detail pd ON p.id = pd.product_id
          WHERE ul.user_id = ? AND ul.item_type = 'product'
        `
    } else if (type === 'courses') {
      query = `
          SELECT 
            c.id AS class_id,
            c.name AS class_name,
            t.name AS teacher_name,
            c.price,
            c.sale_price,
            c.online,
            ic.path AS image_path
          FROM user_like ul
          JOIN class c ON ul.item_id = c.id
          JOIN teacher t ON c.teacher_id = t.id
          LEFT JOIN images_class ic ON c.id = ic.class_id
          WHERE ul.user_id = ? AND ul.item_type = 'class'
          GROUP BY c.id
        `
    } else if (type === 'articles') {
      query = `
          SELECT 
            a.id,
            a.title,
            a.category,
            a.poster,
            a.update_time,
            (SELECT ia.path 
             FROM images_article ia 
             WHERE ia.article_id = a.id 
             ORDER BY ia.id ASC 
             LIMIT 1) AS image_path
          FROM user_like ul
          JOIN article a ON ul.item_id = a.id
          WHERE ul.user_id = ? AND ul.item_type = 'article'
          ORDER BY a.update_time DESC
        `
    } else {
      return res.status(400).json({ status: 'error', message: '無效的類型' })
    }

    const [rows] = await connection.query(query, params)
    res.json({ status: 'success', data: rows })
  } catch (error) {
    console.error('獲取收藏時出錯:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

// @ 新增我的最愛
// router.put('/:id', authenticate, async (req, res, next) => {
//   const pid = getIdParam(req)
//   const uid = req.user.id

//   const existFav = await Favorite.findOne({ where: { pid, uid } })
//   if (existFav) {
//     return res.json({ status: 'error', message: '資料已經存在，新增失敗' })
//   }

//   const newFav = await Favorite.create({ pid, uid })

//   // console.log(newFav.id)

//   // 沒有新增到資料
//   if (!newFav.id) {
//     return res.json({
//       status: 'error',
//       message: '新增失敗',
//     })
//   }

//   return res.json({ status: 'success', data: null })
// })

// @ 刪除我的最愛
// router.delete('/:id', authenticate, async (req, res, next) => {
//   const pid = getIdParam(req)
//   const uid = req.user.id

//   const affectedRows = await Favorite.destroy({
//     where: {
//       pid,
//       uid,
//     },
//   })

//   // 沒有刪除到任何資料 -> 失敗或沒有資料被刪除
//   if (!affectedRows) {
//     return res.json({
//       status: 'error',
//       message: '刪除失敗',
//     })
//   }

//   // 成功
//   return res.json({ status: 'success', data: null })
// })

// # 收藏商品區
// @ 獲取收藏商品
router.get('/products', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const [rows] = await connection.query(
      `
        SELECT 
        p.id AS product_id,
        p.name AS product_name,
        pd.years,
        pd.capacity,
        c.name AS country_name,
        pd.price,
        (
          SELECT ip.path
          FROM images_product ip
          WHERE ip.product_id = p.id
          ORDER BY ip.id
          LIMIT 1, 1
        ) AS image_path
      FROM user_like ul
      JOIN product p ON ul.item_id = p.id
      JOIN product_detail pd ON ul.product_detail_id = pd.id
      JOIN origin o ON p.origin_id = o.id
      JOIN country c ON o.country_id = c.id
      WHERE ul.user_id = ? AND ul.item_type = 'product'
      `,
      [userId]
    )
    // 設置響應頭，防止緩存
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    res.json({ status: 'success', data: rows })
  } catch (error) {
    console.error('獲取收藏商品時出錯:', error)
    res.status(500).json({ status: 'error', message: '服務器錯誤' })
  }
})

// @ 添加商品到收藏（用在商品頁面）
// router.post('/products', authenticate, async (req, res) => {
//   try {
//     const userId = req.user.id
//     const { productId, productDetailId } = req.body

//     // 檢查是否已收藏
//     const [existing] = await connection.query(
//       'SELECT * FROM user_like WHERE user_id = ? AND item_id = ? AND item_type = "product"',
//       [userId, productId]
//     )

//     if (existing.length > 0) {
//       return res
//         .status(400)
//         .json({ status: 'error', message: '商品已在收藏中' })
//     }

//     // 添加到收藏
//     await connection.query(
//       'INSERT INTO user_like (user_id, item_id, item_type, product_detail_id) VALUES (?, ?, "product", ?)',
//       [userId, productId, productDetailId]
//     )

//     res.json({ status: 'success', message: '商品已添加到收藏' })
//   } catch (error) {
//     console.error('添加商品到收藏時出錯:', error)
//     res.status(500).json({ status: 'error', message: '服務器錯誤' })
//   }
// })

// @ 從商品收藏中移除
router.delete('/products/:id', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const productId = req.params.id

    await connection.query(
      'DELETE FROM user_like WHERE user_id = ? AND item_id = ? AND item_type = "product"',
      [userId, productId]
    )

    res.json({ status: 'success', message: '商品已從收藏中移除' })
  } catch (error) {
    console.error('從收藏中移除商品時出錯:', error)
    res.status(500).json({ status: 'error', message: '服務器錯誤' })
  }
})

// # 收藏課程區
// @ 獲取收藏課程
router.get('/courses', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const [rows] = await connection.query(
      `
     SELECT 
        c.id AS class_id,
        c.name AS class_name,
        t.name AS teacher_name,
        c.price,
        c.sale_price,
        c.online,
        ic.path AS image_path
      FROM user_like ul
      JOIN class c ON ul.item_id = c.id
      JOIN teacher t ON c.teacher_id = t.id
      LEFT JOIN images_class ic ON c.id = ic.class_id
      WHERE ul.user_id = ? AND ul.item_type = 'class'
      GROUP BY c.id
    `,
      [userId]
    )

    res.json({ status: 'success', data: rows })
  } catch (error) {
    console.error('獲取收藏課程時出錯:', error)
    res.status(500).json({ status: 'error', message: '服務器錯誤' })
  }
})

// @ 添加文章到收藏（用在課程頁面）
router.post('/courses/:id', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const classId = req.params.id

    // 檢查是否已收藏
    const [existing] = await connection.query(
      'SELECT * FROM user_like WHERE user_id = ? AND item_id = ? AND item_type = "class"',
      [userId, classId]
    )

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ status: 'error', message: '課程已在經典收藏中' })
    }

    // 添加到收藏
    await connection.query(
      'INSERT INTO user_like (user_id, item_id, item_type) VALUES (?, ?, "class")',
      [userId, classId]
    )

    res.json({ status: 'success', message: '課程已添加到經典收藏' })
  } catch (error) {
    console.error('添加課程到經典收藏時出錯:', error)
    res.status(500).json({ status: 'error', message: '服務器錯誤' })
  }
})

// @ 從文章收藏中移除
router.delete('/courses/:id', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const classId = req.params.id

    await connection.query(
      'DELETE FROM user_like WHERE user_id = ? AND item_id = ? AND item_type = "class"',
      [userId, classId]
    )

    res.json({ status: 'success', message: '課程已從經典收藏中移除' })
  } catch (error) {
    console.error('從經典收藏中移除課程時出錯:', error)
    res.status(500).json({ status: 'error', message: '服務器錯誤' })
  }
})

// # 收藏文章區
// @ 獲取收藏文章
router.get('/articles', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const [rows] = await connection.query(
      `
   SELECT 
        a.id,
        a.title,
        a.category,
        a.poster,
        a.update_time,
        (SELECT ia.path 
         FROM images_article ia 
         WHERE ia.article_id = a.id 
         ORDER BY ia.id ASC 
         LIMIT 1) AS image_path
      FROM user_like ul
      JOIN article a ON ul.item_id = a.id
      WHERE ul.user_id = ? AND ul.item_type = 'article'
      ORDER BY a.update_time DESC
    `,
      [userId]
    )
    res.json({ status: 'success', data: rows })
  } catch (error) {
    console.error('獲取收藏文章時出錯:', error)
    res.status(500).json({ status: 'error', message: '服務器錯誤' })
  }
})

// @ 添加文章到收藏（用在文章頁面）
// router.post('/articles/:id', authenticate, async (req, res) => {
//   try {
//     const userId = req.user.id
//     const articleId = req.params.id

//     // 檢查是否已收藏
//     const [existing] = await connection.query(
//       'SELECT * FROM user_like WHERE user_id = ? AND item_id = ? AND item_type = "article"',
//       [userId, articleId]
//     )

//     if (existing.length > 0) {
//       return res
//         .status(400)
//         .json({ status: 'error', message: '文章已在收藏中' })
//     }

//     // 添加到收藏
//     await connection.query(
//       'INSERT INTO user_like (user_id, item_id, item_type) VALUES (?, ?, "article")',
//       [userId, articleId]
//     )

//     res.json({ status: 'success', message: '文章已添加到收藏' })
//   } catch (error) {
//     console.error('添加文章到收藏時出錯:', error)
//     res.status(500).json({ status: 'error', message: '服務器錯誤' })
//   }
// })

// @ 從文章收藏中移除
router.delete('/articles/:id', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const articleId = req.params.id

    await connection.query(
      'DELETE FROM user_like WHERE user_id = ? AND item_id = ? AND item_type = "article"',
      [userId, articleId]
    )

    res.json({ status: 'success', message: '文章已從經典收藏中移除' })
  } catch (error) {
    console.error('從經典收藏中移除文章時出錯:', error)
    res.status(500).json({ status: 'error', message: '服務器錯誤' })
  }
})

export default router
