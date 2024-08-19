import express from 'express'
import conn from '../configs/mysql.js' // 引入資料庫連接

const router = express.Router()

router.get('/:user_id', async (request, response) => {
  const userId = request.params.user_id // 獲取用戶ID

  const queryToFetchCartContentsAndCoupons = `
SELECT 
    cart_items.id AS cart_item_id,
    cart_items.product_detail_id,
    cart_items.class_id,
    cart_items.product_quantity,
    product.name AS product_name,
    product_detail.price AS product_price,
    product_detail.years,
    product_detail.capacity,
    class.name AS class_name,
    class.price AS class_price,
    users.user_name AS username,
    GROUP_CONCAT(DISTINCT images_product.path ORDER BY images_product.path SEPARATOR ',') AS product_images,
    images_class.path AS class_image,
    country.name AS product_country,
    class.online AS class_online,
    teacher.name AS teacher_name,

    -- 子查询获取优惠券信息
    coupon_info.coupon_ids,
    coupon_info.coupon_names,
    coupon_info.coupon_discounts,
    coupon_info.coupon_categories

FROM 
    cart_items 
JOIN users ON cart_items.user_id = users.id
LEFT JOIN product_detail ON cart_items.product_detail_id = product_detail.id
LEFT JOIN product ON product_detail.product_id = product.id
LEFT JOIN class ON cart_items.class_id = class.id
LEFT JOIN images_product ON product.id = images_product.product_id
LEFT JOIN images_class ON class.id = images_class.class_id
LEFT JOIN origin ON product.origin_id = origin.id
LEFT JOIN country ON origin.country_id = country.id
LEFT JOIN teacher ON class.teacher_id = teacher.id
LEFT JOIN (
    SELECT 
        user_coupon.user_id,
        GROUP_CONCAT(coupon.id ORDER BY coupon.id) AS coupon_ids,
        GROUP_CONCAT(coupon.name ORDER BY coupon.id) AS coupon_names,
        GROUP_CONCAT(coupon.discount ORDER BY coupon.id) AS coupon_discounts,
        GROUP_CONCAT(coupon.category ORDER BY coupon.id SEPARATOR ',') AS coupon_categories
    FROM 
        user_coupon
    LEFT JOIN coupon ON user_coupon.coupon_id = coupon.id
    GROUP BY 
        user_coupon.user_id
) AS coupon_info ON cart_items.user_id = coupon_info.user_id

WHERE 
    cart_items.user_id = ?
GROUP BY 
    cart_items.id, product.id;` // 增加product.id以確保分組正確

  try {
    const [results] = await conn.query(queryToFetchCartContentsAndCoupons, [
      userId,
    ])

    // 遍历结果，将路径字符串转为数组并整合优惠券信息
    const formattedResults = results.map((item) => {
      const imagesArray = item.product_images
        ? item.product_images.split(',')
        : []

      // 解析优惠券
      const coupons = item.coupon_names
        ? item.coupon_names.split(',').map((name, index) => ({
            id: item.coupon_ids.split(',')[index], // 使用优惠券的 ID
            name,
            discount: item.coupon_discounts.split(',')[index],
            category: item.coupon_categories.split(',')[index],
          }))
        : []

      return {
        ...item,
        product_image: imagesArray[1] || imagesArray[0] || null, // 只保留第二张商品图片
        coupons, // 新增优惠券数组
      }
    })

    // 提取總金額
    let totalAmount = 0
    formattedResults.forEach((item) => {
      const quantity = item.product_quantity || 0
      const productPrice = item.product_price || 0
      const classPrice = item.class_price || 0

      // 計算金額
      if (item.product_detail_id) {
        totalAmount += productPrice * quantity // 计算产品金额
      }
      if (item.class_id) {
        totalAmount += classPrice
      }
    })

    response.json({ items: formattedResults, totalAmount }) // 返回购物车内容及优惠券
  } catch (error) {
    console.error('查詢購物車內容失敗:', error)
    return response
      .status(500)
      .json({ error: '查詢購物車內容失敗', details: error.message })
  }
})

// 更新購物車中的項目數量 (Update)
router.put('/:id', async (request, response) => {
  const itemId = request.params.id
  const { product_quantity } = request.body

  try {
    await conn.query(
      'UPDATE cart_items SET product_quantity = ? WHERE id = ?',
      [product_quantity, itemId]
    )
    response.json({ message: '購物車項目數量已更新' })
  } catch (error) {
    console.error('更新購物車項目數量失敗:', error)
    return response
      .status(500)
      .json({ error: '更新購物車項目數量失敗', details: error.message })
  }
})

// 刪除該用戶的所有購物車項目
router.delete('/:id', async (request, response) => {
  const itemId = request.params.id // 获取 item ID
  try {
    const [result] = await conn.query('DELETE FROM cart_items WHERE id = ?', [
      itemId,
    ])
    if (result.affectedRows > 0) {
      return response.json({ message: '购物车项已成功删除' })
    } else {
      return response.status(404).json({ message: '找不到要删除的物品' })
    }
  } catch (error) {
    console.error('删除购物车项目失败:', error)
    return response
      .status(500)
      .json({ error: '删除购物车项目失败', details: error.message })
  }
})

export default router
