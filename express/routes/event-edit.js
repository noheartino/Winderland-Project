
import express from 'express';
import conn from '../configs/mysql.js'; // 引入資料庫連接
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import multer from 'multer';



const router = express.Router();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       const uploadDir = path.join(process.cwd(), 'public/uploads');
//       if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//       }
//       cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     }
//   })
// });

const upload = multer({ storage: multer.memoryStorage() });


router.put('/edit/:id', upload.none(), async (req, res) => {
  try {
    const infoId = req.params.id;


    const { event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city, event_venue, 
      event_address, people_limit, event_introduce} = req.body;
    
    const [result1] = await conn.query(
       `UPDATE event SET 
        event_name = ?, 
        event_date = ?, 
        event_time_start = ?, 
        event_time_end = ?, 
        apply_start = ?, 
        apply_end = ?, 
        event_city = ?, 
        event_venue = ?, 
        event_address = ?, 
        people_limit = ?, 
        event_introduce = ? 
        WHERE id = ?
    `,
    [event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
        event_venue, event_address, people_limit, event_introduce, infoId]
    );  
    
    res.status(200).json({ message: 'Event updated successfully', result: result1 });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// router.put('/edit/:id', async (request, response) => {
//     const itemId = request.params.id
//     const { event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city, event_venue, 
//         event_address, people_limit, event_introduce} = req.body;
  
//     try {
//       await conn.query(
//         `UPDATE event SET 
//          event_name = ?, 
//          event_date = ?, 
//          event_time_start = ?, 
//          event_time_end = ?, 
//          apply_start = ?, 
//          apply_end = ?, 
//          event_city = ?, 
//          event_venue = ?, 
//          event_address = ?, 
//          people_limit = ?, 
//          event_introduce = ? 
//          WHERE event_id = ?
//         `,
//         [event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
//             event_venue, event_address, people_limit, event_introduce, itemId]
//         );
      
//         response.json({ message: '購物車項目數量已更新' })
//     } catch (error) {
//       console.error('更新購物車項目數量失敗:', error)
//       return response
//         .status(500)
//         .json({ error: '更新購物車項目數量失敗', details: error.message })
//     }
//   })

router.get('/:id', async (request, response) => {

    const infoId = request.params.id;
    const queryapplyon = `SELECT * FROM event WHERE id = ?`;
    const queryapplyoff = `SELECT * FROM event WHERE status = 0`;


    try {
        const [eventonResults, eventoffResults] = await Promise.all([
            conn.query(queryapplyon,[infoId]),
            conn.query(queryapplyoff)
        ]);

        response.json({
            myevent: eventonResults[0],
            applyoff: eventoffResults[0],
        });

    } catch (error) {
        console.error('失敗:', error);
        return response
            .status(500)
            .json({ error: '失敗', details: error.message });
    }
});



export default router;