import express from 'express'
import conn from '../configs/mysql.js' // 引入資料庫連接
import fs from 'fs'
import path from 'path'
import moment from 'moment'
import multer from 'multer'

const router = express.Router()

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'public/uploads/event')
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }
      cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  }),
})

router.post('/', upload.single('myfile'), async (req, res) => {
  try {
    const utcNow = moment.utc()
    const taipeiTime = utcNow.add(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
    const status = 2

    console.log('Form Data:', req.body)
    console.log('Uploaded File:', req.file)

    const {
      event_name,
      event_date,
      event_time_start,
      event_time_end,
      apply_start,
      apply_end,
      event_city,
      event_venue,
      event_address,
      people_limit,
      event_introduce,
      noweventid,
      useridis,
      myname,
      mygender,
      myage,
      kotoba,
    } = req.body
    const fileName = req.file ? req.file.originalname : 'No file uploaded'

    const [result1] = await conn.query(
      `INSERT INTO event (event_name, event_date, event_time_start, event_time_end, apply_start, apply_end,
        event_city, event_venue, event_address, people_limit, event_introduce, event_cover_image, created_at,
        status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        event_name,
        event_date,
        event_time_start,
        event_time_end,
        apply_start,
        apply_end,
        event_city,
        event_venue,
        event_address,
        people_limit,
        event_introduce,
        fileName,
        taipeiTime,
        status,
      ]
    )
    const [result2] = await conn.query(
      `INSERT INTO event_apply (event_id, user_id, neckname, gender, age, introduce, apply_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [noweventid, useridis, myname, mygender, myage, kotoba, taipeiTime]
    )
    res.status(201).json({ id: result1.insertId, applyId: result2.insertId })

    // res.status(200).send({
    //   message: 'File uploaded successfully!',
    //   redirectUrl: '/event/list'
    // });

    // res.redirect('https://winderland.shop/event/list');
  } catch (error) {
    console.error('Error processing request:', error)
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

// import express from 'express';
// import conn from '../configs/mysql.js'; // 引入資料庫連接
// import fs from 'fs';
// import path from 'path';
// import moment from 'moment';
// import multer from 'multer';
// import crypto from 'crypto'; // 用於生成唯一文件名

// const router = express.Router();

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
//       // 生成唯一的文件名
//       const uniqueSuffix = crypto.randomBytes(16).toString('hex');
//       const fileExt = path.extname(file.originalname);
//       cb(null, `${uniqueSuffix}${fileExt}`);
//     }
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 }, // 限制文件大小 5MB
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Only image files are allowed!'));
//   }
// });

// router.post('/', upload.single('myfile'), async (req, res) => {
//   try {
//     const utcNow = moment.utc();
//     const taipeiTime = utcNow.add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
//     const status = 2;

//     console.log('Form Data:', req.body);
//     console.log('Uploaded File:', req.file);

//     const {
//       event_name, event_date, event_time_start, event_time_end, apply_start, apply_end,
//       event_city, event_venue, event_address, people_limit, event_introduce, noweventid,
//       useridis, myname, mygender, myage, kotoba
//     } = req.body;

//     const fileName = req.file ? req.file.filename : 'No file uploaded';

//     // 使用預處理語句防範 SQL 注入
//     const [result1] = await conn.query(
//       `INSERT INTO event (event_name, event_date, event_time_start, event_time_end, apply_start, apply_end,
//         event_city, event_venue, event_address, people_limit, event_introduce, event_cover_image, created_at,
//         status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
//         event_venue, event_address, people_limit, event_introduce, fileName, taipeiTime, status]
//     );

//     const [result2] = await conn.query(
//       `INSERT INTO event_apply (event_id, user_id, neckname, gender, age, introduce, apply_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [noweventid, useridis, myname, mygender, myage, kotoba, taipeiTime]
//     );

//     // 使用環境變數而不是硬編碼 URL
//     const redirectUrl = process.env.FRONTEND_URL || 'https://winderland.shop/event/list';
//     res.redirect(redirectUrl);

//   } catch (error) {
//     console.error('Error processing request:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// });

router.get('/', async (request, response) => {
  const queryapplyon = `SELECT id FROM event`
  const queryapplyoff = `SELECT * FROM event WHERE status = 0`

  try {
    const [eventonResults, eventoffResults] = await Promise.all([
      conn.query(queryapplyon),
      conn.query(queryapplyoff),
    ])

    response.json({
      applyon: eventonResults[0],
      applyoff: eventoffResults[0],
    })
  } catch (error) {
    console.error('失敗:', error)
    return response.status(500).json({ error: '失敗', details: error.message })
  }
})

export default router
