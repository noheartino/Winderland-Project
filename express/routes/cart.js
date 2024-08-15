import express from 'express';
import db from '../configs/mysql.js';

const router = express.Router();

// 獲取用戶購物車中的物品，包括商品、課程和用戶信息
router.get('/:user_id', (req, res) => {
    const userId = req.params.user_id; // 獲取 URL 中的用戶 ID
    const query = `
    SELECT 
      cart.id AS cart_id, 
      cart.product_amount AS product_amount, 
      cart.class_amount AS class_amount, 
      product.name AS product_name,           -- 更新這行中的字段名稱
      product_detail.price AS product_price, 
      class.name AS class_name, 
      class.price AS class_price,
      product_detail.years, 
      product_detail.capacity,
      users.id AS user_id,
      users.user_name AS username,               
      users.email                   
    FROM cart 
    LEFT JOIN product ON cart.product_id = product.id 
    LEFT JOIN product_detail ON product_detail.id = cart.product_detail_id 
    LEFT JOIN class ON cart.class_id = class.id 
    JOIN users ON cart.user_id = users.id 
    WHERE cart.user_id = ?`;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('資料庫查詢失敗:', err);
            return res.status(500).json({ error: '資料庫查詢失敗', details: err });
        }
        res.json(results); // 返回該用戶的購物車項目
        console.log(`Received request for user_id: ${req.params.user_id}`);
    });
});


// 新增商品或課程到購物車
router.post('/', (req, res) => {
  const { user_id, product_id, product_detail_id, class_id, product_amount, class_amount } = req.body;

  const query = `
  INSERT INTO cart (user_id, product_id, product_detail_id, class_id, product_amount, class_amount) 
  VALUES (?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    product_amount = product_amount + VALUES(product_amount), 
    class_amount = class_amount + VALUES(class_amount)`;

  db.query(query, [user_id, product_id, product_detail_id, class_id, product_amount, class_amount], (err, results) => {
      if (err) {
          console.error('添加物品失敗:', err);
          return res.status(500).json({ error: '添加物品失敗' });
      }
      res.status(201).json({ message: '物品已添加至購物車', user_id, product_id, product_detail_id, class_id, product_amount, class_amount });
  });
});

// 從購物車中刪除物品
router.delete('/:id', (req, res) => {
    const itemId = req.params.id; // 獲取路由參數中的 id

    const query = 'DELETE FROM cart WHERE id = ?'; 
    db.query(query, [itemId], (err, results) => {
        if (err) {
            console.error('刪除物品失敗:', err);
            return res.status(500).json({ error: '刪除物品失敗' });
        }
        res.json({ message: '物品已從購物車中刪除' });
    });
});

export default router;
