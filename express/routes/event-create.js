
import express from 'express';
import conn from '../configs/mysql.js'; // 引入資料庫連接
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import multer from 'multer';



const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});


router.post('/ap', upload.single('myfile') ,async (req, res) => {
  try {
    const utcNow = moment.utc();
    const taipeiTime = utcNow.add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
    const status = 2
    
    console.log('Form Data:', req.body);
    console.log('Uploaded File:', req.file);

    const { event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city, event_venue, 
      event_address, people_limit, event_introduce, noweventid, useridis, myname, mygender, myage, kotoba} = req.body;
    const fileName = req.file ? req.file.originalname : 'No file uploaded';
    
    const [result1] = await conn.query(
      `INSERT INTO event (event_name, event_date, event_time_start, event_time_end, apply_start, apply_end,
        event_city, event_venue, event_address, people_limit, event_introduce, event_cover_image, created_at,
        status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
        event_venue, event_address, people_limit, event_introduce, fileName, taipeiTime, status]
    );
    const [result2] = await conn.query(
      `INSERT INTO event_apply (event_id, user_id, neckname, gender, age, introduce, apply_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [noweventid, useridis, myname, mygender, myage, kotoba, taipeiTime]
    );
    // res.status(201).json({ id: result1.insertId, applyId: result2.insertId });

    // res.status(200).send({
    //   message: 'File uploaded successfully!',
    //   redirectUrl: '/event/list'
    // });

    res.redirect('http://localhost:3000/event/list');

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});



router.get('/', async (request, response) => {

    const queryapplyon = `SELECT id FROM event`;
    const queryapplyoff = `SELECT * FROM event WHERE status = 0`;


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


// router.post('/', async (req, res) => {

//     try {
//       const utcNow = moment.utc();
//       const taipeiTime = utcNow.add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');

//       const status = 2

//       const { event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
//              event_venue, event_address, people_limit, event_introduce, event_cover_image, noweventid, useridis, myname, gender, myage, kotoba } = req.body;

//       const [result1] = await conn.query(
//         `INSERT INTO event (event_name, event_date, event_time_start, event_time_end, apply_start, apply_end,
//          event_city, event_venue, event_address, people_limit, event_introduce, event_cover_image, created_at,
//          status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
//           event_venue, event_address, people_limit, event_introduce, event_cover_image, taipeiTime, status]
//       );
//       const [result2] = await conn.query(
//         `INSERT INTO event_apply (event_id, user_id, neckname, gender, age, introduce, apply_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//         [noweventid, useridis, myname, gender, myage, kotoba, taipeiTime]
//       );
//       res.status(201).json({ id: result1.insertId, id: result2.insertId});

//       console.log(req.body);

//     } catch (error) {
//       console.error('Error creating event:', error);
//       res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
//   });

export default router;