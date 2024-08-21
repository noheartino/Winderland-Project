import express from 'express';
import conn from '../configs/mysql.js'; // 引入資料庫連接

const router = express.Router();

router.get('/:user_id', async (request, response) => {
  const userId = request.params.user_id;

  // 查詢購物車內容
  const queryToFetchCartContents = `
  SELECT 
      cart_items.id AS cart_item_id,
      cart_items.product_detail_id,
      cart_items.class_id,
      cart_items.product_quantity,
      product.name AS product_name,
      product_detail.price AS product_price,
      product_detail.sale_price AS product_sale_price,
      product_detail.years,
      product_detail.capacity,
      class.name AS class_name,
      class.price AS class_price,
      class.sale_price AS class_sale_price,
      users.user_name AS username,
      GROUP_CONCAT(DISTINCT images_product.path ORDER BY images_product.path SEPARATOR ',') AS product_images,
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
      cart_items.id, product.id;
  `;

  // 查詢點數和優惠券
  const queryToFetchPointsAndCoupons = `
  SELECT 
      user_points.points_balance AS user_have_points,
      coupon.id AS coupon_id,
      coupon.name AS coupon_name,
      coupon.discount AS coupon_discount,
      coupon.category AS coupon_category,
      coupon.min_spend AS min_spend
  FROM 
      users
  LEFT JOIN user_points ON users.id = user_points.user_id
  LEFT JOIN user_coupon ON users.id = user_coupon.user_id
  LEFT JOIN coupon ON user_coupon.coupon_id = coupon.id
  WHERE 
      users.id = ?;
  `;

  try {
    const [cartResults] = await conn.query(queryToFetchCartContents, [userId]);
    const [pointsAndCouponsResults] = await conn.query(queryToFetchPointsAndCoupons, [userId]);

    // 格式化購物車內容
    const formattedCartResults = cartResults.map((item) => {
      const imagesArray = item.product_images ? item.product_images.split(',') : [];

      return {
        ...item,
        product_image: imagesArray[1] || imagesArray[0] || null,
      };
    });

    // 計算總金額
    let totalAmount = 0;
    formattedCartResults.forEach((item) => {
      const quantity = item.product_quantity || 0;
      const productPrice = item.product_sale_price > 0 ? item.product_sale_price : item.product_price;
      const classPrice = item.class_sale_price > 0 ? item.class_sale_price : item.class_price;

      if (item.product_detail_id) {
        totalAmount += productPrice * quantity;
      }
      if (item.class_id) {
        totalAmount += classPrice;
      }
    });

    // 過濾不能使用的優惠券
    const validCoupons = pointsAndCouponsResults.filter(coupon => totalAmount >= coupon.min_spend);

    // 提取點數
    const userPoints = pointsAndCouponsResults.length > 0 ? pointsAndCouponsResults[0].user_have_points : 0;

    response.json({
      items: formattedCartResults,
      totalAmount,
      coupons: validCoupons,
      user_have_points: userPoints
    });
  } catch (error) {
    console.error('查詢失敗:', error);
    return response
      .status(500)
      .json({ error: '查詢失敗', details: error.message });
  }
});




// 更新購物車中的項目數量 (Update)
router.put('/:id', async (request, response) => {
  const itemId = request.params.id;
  const { product_quantity } = request.body;

  try {
    await conn.query(
      'UPDATE cart_items SET product_quantity = ? WHERE id = ?',
      [product_quantity, itemId]
    );
    response.json({ message: '購物車項目數量已更新' });
  } catch (error) {
    console.error('更新購物車項目數量失敗:', error);
    return response
      .status(500)
      .json({ error: '更新購物車項目數量失敗', details: error.message });
  }
});

// 刪除該用戶的所有購物車項目
router.delete('/:id', async (request, response) => {
  const itemId = request.params.id; // 获取 item ID
  try {
    const [result] = await conn.query('DELETE FROM cart_items WHERE id = ?', [
      itemId,
    ]);
    if (result.affectedRows > 0) {
      return response.json({ message: '购物车项已成功删除' });
    } else {
      return response.status(404).json({ message: '找不到要删除的物品' });
    }
  } catch (error) {
    console.error('删除购物车项目失败:', error);
    return response
      .status(500)
      .json({ error: '删除购物车项目失败', details: error.message });
  }
});

export default router;
