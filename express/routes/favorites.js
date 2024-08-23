import express from 'express'
const router = express.Router()

// 資料庫使用
import connection from '##/configs/mysql.js'

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
import authenticate from '#middlewares/authenticate.js'

// @ 讀取我的最愛
// 獲得某會員id的有加入到我的最愛清單中的商品id們
// 此路由只有登入會員能使用
router.get('/', authenticate, async (req, res) => {
  res.json({ message: 'Favorites route is working' })
  try {
    // 從 cookie 或 JWT 中獲取 user_id
    const userId = req.user.id
    console.log('User ID:', userId) // 添加這行來檢查 userId

    const [rows] = await connection.query(
      `
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
    `,
      [userId]
    )
    console.log('Query result:', rows) // 添加這行來檢查查詢結果

    res.json(rows)
  } catch (error) {
    console.error('Detailed error:', error) // 更詳細的錯誤日誌
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// @ 新增我的最愛
router.put('/:id', authenticate, async (req, res, next) => {
  const pid = getIdParam(req)
  const uid = req.user.id

  const existFav = await Favorite.findOne({ where: { pid, uid } })
  if (existFav) {
    return res.json({ status: 'error', message: '資料已經存在，新增失敗' })
  }

  const newFav = await Favorite.create({ pid, uid })

  // console.log(newFav.id)

  // 沒有新增到資料
  if (!newFav.id) {
    return res.json({
      status: 'error',
      message: '新增失敗',
    })
  }

  return res.json({ status: 'success', data: null })
})

// @ 刪除我的最愛
router.delete('/:id', authenticate, async (req, res, next) => {
  const pid = getIdParam(req)
  const uid = req.user.id

  const affectedRows = await Favorite.destroy({
    where: {
      pid,
      uid,
    },
  })

  // 沒有刪除到任何資料 -> 失敗或沒有資料被刪除
  if (!affectedRows) {
    return res.json({
      status: 'error',
      message: '刪除失敗',
    })
  }

  // 成功
  return res.json({ status: 'success', data: null })
})

export default router
