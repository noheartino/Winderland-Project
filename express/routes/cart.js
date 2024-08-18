import express from 'express'
import conn from '../configs/mysql.js' // 引入資料庫連接

const router = express.Router()

// 獲取用戶購物車內容 (Read)
router.get('/:user_id', async (request, response) => {
    const userId = request.params.user_id; // 獲取用戶ID
    const queryToFetchCartContents = `
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
      GROUP_CONCAT(images_product.path ORDER BY images_product.path) AS product_images,
      images_class.path AS class_image,
      country.name AS product_country,
      class.online AS class_online,
      teacher.name AS teacher_name
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
    WHERE 
      cart_items.user_id = ?
    GROUP BY 
      cart_items.id;`;

    try {
        const [results] = await conn.query(queryToFetchCartContents, [userId]);

        // 遍历结果，将路径字符串转为数组并取第二个
        const formattedResults = results.map((item) => {
            const imagesArray = item.product_images ? item.product_images.split(',') : []
            return {
                ...item,
                product_image: imagesArray[1] || imagesArray[0] || null,
            }
        });

        // 计算总金额
        let totalAmount = 0;
        formattedResults.forEach(item => {
            const quantity = item.product_quantity || 0;
            const productPrice = item.product_price || 0;
            const classPrice = item.class_price || 0;

            // 计算金额
            if (item.product_detail_id) {
                totalAmount += productPrice * quantity;
            }
            if (item.class_id) {
                totalAmount += classPrice; 
            }
        });

        response.json({ items: formattedResults, totalAmount });
    } catch (error) {
        console.error('查詢購物車內容失敗:', error);
        return response.status(500).json({ error: '查詢購物車內容失敗', details: error.message });
    }
});


router.post('/checkout', async (request, response) => {
  const {
    user_id,
    pickup_name,
    pickup_phone,
    pickup_address,
    pickup_store_id,
  } = request.body

  try {
    // 獲取購物車內容
    const [cartItems] = await conn.query(
      'SELECT * FROM cart_items WHERE user_id = ?',
      [user_id]
    )

    if (cartItems.length === 0) {
      return response.status(400).json({ message: '購物車為空，不能結帳' })
    }

    // 創建訂單，只使用 created_at 記錄時間
    const [orderResult] = await conn.query(
      'INSERT INTO orders (user_id, created_at, status, pickup_name, pickup_phone, pickup_address, pickup_store_id) VALUES (?, NOW(), ?, ?, ?, ?, ?)',
      [
        user_id,
        '新訂單',
        pickup_name,
        pickup_phone,
        pickup_address,
        pickup_store_id,
      ]
    )

    const orderId = orderResult.insertId // 獲取生成的訂單 ID

    // 為每個購物車項目創建訂單詳細
    for (const item of cartItems) {
      await conn.query(
        'INSERT INTO order_details (order_id, product_detail_id, class_id, quantity, price) VALUES (?, ?, ?, ?, ?)',
        [
          orderId,
          item.product_detail_id,
          item.class_id,
          item.product_quantity,
          item.product_price,
        ]
      ) // 記得根據需要傳入價格
    }

    // 清空購物車
    await conn.query('DELETE FROM cart_items WHERE user_id = ?', [user_id])

    response.status(200).json({ message: '結帳成功', orderId })
  } catch (error) {
    console.error('結帳失敗:', error)
    return response
      .status(500)
      .json({ error: '結帳失敗', details: error.message })
  }
})

// 更新購物車中的項目數量 (Update)
router.put('/cart/:id', async (request, response) => {
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
    const itemId = request.params.id; // 获取 item ID
    try {
        const [result] = await conn.query('DELETE FROM cart_items WHERE id = ?', [itemId]);
        if (result.affectedRows > 0) {
            return response.json({ message: '购物车项已成功删除' });
        } else {
            return response.status(404).json({ message: '找不到要删除的物品' });
        }
    } catch (error) {
        console.error('删除购物车项目失败:', error);
        return response.status(500).json({ error: '删除购物车项目失败', details: error.message });
    }
});




export default router
