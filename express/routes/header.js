import express from 'express';
import conn from '../configs/mysql.js'; // 引入資料庫連接

const router = express.Router();


router.get('/:id', async (request, response) => {

    const infoId = request.params.id;
  
    const queryToFetchapply = `SELECT * FROM images_user WHERE id = ?`;
  
    const queryToFetchapplyinfo = `SELECT img FROM images_user WHERE id = ?`;
  
  
    try {
      const [eventsResults, applysResults] = await Promise.all([
        conn.query(queryToFetchapply,[infoId]),
        conn.query(queryToFetchapplyinfo,[infoId])
      ]);
  
      response.json({
        userinfo: eventsResults[0],
        imginfo: applysResults[0],
      });
      
    } catch (error) {
      console.error('失敗:', error);
      return response
        .status(500)
        .json({ error: '失敗', details: error.message });
    }
  });


export default router;