import express from 'express';
import conn from '../configs/mysql.js'; // 引入資料庫連接

const router = express.Router();

router.get('/', async (request, response) => {

  const queryapplyon = `SELECT * FROM event WHERE status = 2`;
  const queryapplyoff = `SELECT * FROM event WHERE status = 1`;


  try {
    const [eventonResults, eventoffResults] = await Promise.all([
        conn.query(queryapplyon),
        conn.query(queryapplyoff)
    ]);

    response.json({
        applyon: eventonResults[0],
        applyoff: eventoffResults[0],
    });
    
  } catch (error) {
    console.error('失敗:', error);
    return response
      .status(500)
      .json({ error: '失敗', details: error.message });
  }
});



router.get('/info/:id', async (request, response) => {

  const infoId = request.params.id;

  const queryToFetcheventinfo = `SELECT * FROM event WHERE id = ?`;


  try {
    const [eventResults] = await conn.query(queryToFetcheventinfo,[infoId]);
    response.json(eventResults);
    
  } catch (error) {
    console.error('失敗:', error);
    return response
      .status(500)
      .json({ error: '失敗', details: error.message });
  }
});


// import express from 'express';
// import conn from '../configs/mysql.js'; // 引入資料庫連接

// const router = express.Router();

// router.get('/', async (request, response) => {

//   const queryToFetcheventon = `SELECT * FROM event WHERE status = 1 OR status = 2`;


//   try {
//     const [eventResults] = await conn.query(queryToFetcheventon);
//     response.json(eventResults);
    
//   } catch (error) {
//     console.error('失敗:', error);
//     return response
//       .status(500)
//       .json({ error: '失敗', details: error.message });
//   }
// });


// // 更新購物車中的項目數量 (Update)
// router.put('/:id', async (request, response) => {
//   const itemId = request.params.id;
//   const { product_quantity } = request.body;

//   try {
//     await conn.query(
//       'UPDATE cart_items SET product_quantity = ? WHERE id = ?',
//       [product_quantity, itemId]
//     );
//     response.json({ message: '購物車項目數量已更新' });
//   } catch (error) {
//     console.error('更新購物車項目數量失敗:', error);
//     return response
//       .status(500)
//       .json({ error: '更新購物車項目數量失敗', details: error.message });
//   }
// });

// // 刪除該用戶的所有購物車項目
// router.delete('/:id', async (request, response) => {
//   const itemId = request.params.id; // 获取 item ID
//   try {
//     const [result] = await conn.query('DELETE FROM cart_items WHERE id = ?', [
//       itemId,
//     ]);
//     if (result.affectedRows > 0) {
//       return response.json({ message: '购物车项已成功删除' });
//     } else {
//       return response.status(404).json({ message: '找不到要删除的物品' });
//     }
//   } catch (error) {
//     console.error('删除购物车项目失败:', error);
//     return response
//       .status(500)
//       .json({ error: '删除购物车项目失败', details: error.message });
//   }
// });

export default router;
