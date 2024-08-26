import express from 'express';
import conn from '../configs/mysql.js'; // 引入資料庫連接
import moment from 'moment';

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

  const queryToFetcheventinfo = `SELECT * FROM event WHERE id = ? AND status != 0`;

  const queryToFetchapplyinfo = `SELECT * FROM event_apply WHERE event_id = ?`;


  try {
    const [eventsResults, applysResults] = await Promise.all([
      conn.query(queryToFetcheventinfo,[infoId]),
      conn.query(queryToFetchapplyinfo,[infoId])
    ]);

    response.json({
      eventinfo: eventsResults[0],
      applyinfo: applysResults[0],
    });
    
  } catch (error) {
    console.error('失敗:', error);
    return response
      .status(500)
      .json({ error: '失敗', details: error.message });
  }
});


router.get('/apply/:id', async (request, response) => {

  const infoId = request.params.id;

  const queryToFetchapply = `SELECT * FROM event WHERE id = ? AND status = 2`;

  const queryToFetchapplyinfo = `SELECT * FROM event_apply WHERE event_id = ?`;


  try {
    const [eventsResults, applysResults] = await Promise.all([
      conn.query(queryToFetchapply,[infoId]),
      conn.query(queryToFetchapplyinfo,[infoId])
    ]);

    response.json({
      eventinfo: eventsResults[0],
      applyinfo: applysResults[0],
    });
    
  } catch (error) {
    console.error('失敗:', error);
    return response
      .status(500)
      .json({ error: '失敗', details: error.message });
  }
});


router.post('/app', async (req, res) => {
  try {
    const utcNow = moment.utc();
    const taipeiTime = utcNow.add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');

    const { event_id, user_id, neckname, gender, age, introduce } = req.body;
    const [result] = await conn.query(
      'INSERT INTO event_apply (event_id, user_id, neckname, gender, age, introduce, apply_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [event_id, user_id, neckname, gender, age, introduce, taipeiTime]
    );
    res.status(201).json({ id: result.insertId, event_id, user_id, neckname, gender, age, introduce, taipeiTime });
    console.log(req.body);
    
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.get('/invitation/:id', async (request, response) => {

  const infoId = request.params.id;

  const queryToFetchmyin = `SELECT * FROM event_apply WHERE user_id = ? ORDER BY id DESC LIMIT 1`;

  const queryToFetchin = `SELECT event_apply.* ,event.*, event_apply.id AS applyid FROM event_apply LEFT JOIN event ON event_apply.event_id = event.id WHERE event_apply.user_id = ? ORDER BY event_apply.id DESC LIMIT 1`;

  

  try {
    const [inResults, inviResults] = await Promise.all([
      conn.query(queryToFetchmyin,[infoId]),
      conn.query(queryToFetchin,[infoId])
    ]);

    response.json({
      myinvitation: inResults[0],
      allinvitation: inviResults[0],
    });
    
  } catch (error) {
    console.error('失敗:', error);
    return response
      .status(500)
      .json({ error: '失敗', details: error.message });
  }
});


router.get('/list/:id', async (request, response) => {

  const infoId = request.params.id;

  const queryToFetchmyin = `SELECT * FROM event_apply WHERE user_id = ?`;

  const queryToFetchin = `WITH RankedEvents AS (
    SELECT *,
    ROW_NUMBER() OVER (PARTITION BY event_id ORDER BY id) AS rn
    FROM event_apply
    WHERE user_id = ?)

    SELECT * FROM RankedEvents WHERE rn = 1`;

  

  try {
    const [inResults, inviResults] = await Promise.all([
      conn.query(queryToFetchmyin,[infoId]),
      conn.query(queryToFetchin,[infoId])
    ]);

    response.json({
      myallevent: inResults[0],
      myowner: inviResults[0],
    });
    
  } catch (error) {
    console.error('失敗:', error);
    return response
      .status(500)
      .json({ error: '失敗', details: error.message });
  }
});

// useEffect(() => {
//   console.log('Component mounted');
// }, []);


// router.get('/info/:id', async (request, response) => {

//   const infoId = request.params.id;

//   const queryToFetcheventinfo = `SELECT * FROM event WHERE id = ? AND status != 0`;


//   try {
//     const [eventResults] = await conn.query(queryToFetcheventinfo,[infoId]);
//     response.json(eventResults);
    
//   } catch (error) {
//     console.error('失敗:', error);
//     return response
//       .status(500)
//       .json({ error: '失敗', details: error.message });
//   }
// });


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
