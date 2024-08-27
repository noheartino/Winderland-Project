
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

    // 从请求体中获取字段
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

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// router.post('/upload', (req, res) => {
//     const form = new formidable.IncomingForm({
//       uploadDir: path.join(process.cwd(), '/public/event'),
//       keepExtensions: true,
//     });
  
//     if (!fs.existsSync(form.uploadDir)) {
//       fs.mkdirSync(form.uploadDir, { recursive: true });
//     }
  
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Form parse error:', err); // 添加详细的错误日志
//         res.status(500).json({ error: 'Failed to upload file' });
//         return;
//       }
  
//       const file = files.event_cover_image;
//       if (!file || file.length === 0) {
//         console.error('No file uploaded');
//         res.status(400).json({ error: 'No file uploaded' });
//         return;
//       }
  
//       const filePath = file[0].filepath;
//       const newFilePath = path.join(form.uploadDir, file[0].originalFilename);
  
//       try {
//         fs.renameSync(filePath, newFilePath);
//       } catch (renameError) {
//         console.error('File rename error:', renameError);
//         res.status(500).json({ error: 'Failed to rename file' });
//         return;
//       }
  
//       const { title, description } = fields;
  
//       try {
//         const utcNow = moment.utc();
//         const taipeiTime = utcNow.add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
  
//         const status = 2;
  
//         const { event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
//                event_venue, event_address, people_limit, event_introduce, noweventid, useridis, myname, gender, myage, kotoba } = fields;
  
//         const [result1] = await conn.query(
//           `INSERT INTO event (event_name, event_date, event_time_start, event_time_end, apply_start, apply_end,
//            event_city, event_venue, event_address, people_limit, event_introduce, event_cover_image, created_at,
//            status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//           [event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
//             event_venue, event_address, people_limit, event_introduce, file[0].originalFilename, taipeiTime, status]
//         );
//         const [result2] = await conn.query(
//           `INSERT INTO event_apply (event_id, user_id, neckname, gender, age, introduce, apply_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//           [noweventid, useridis, myname, gender, myage, kotoba, taipeiTime]
//         );
//         res.status(201).json({ id: result1.insertId, applyId: result2.insertId });
  
//       } catch (error) {
//         console.error('Database query error:', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//       }
//     });
// });


// const uploadDir = path.join(process.cwd(), '/public/event');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }


// router.post('/', (req, res) => {
    
//     const form = new formidable.IncomingForm({
//         uploadDir: uploadDir,
//         keepExtensions: true,
//     });

  
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         res.status(500).json({ error: 'Failed to upload file' });
//         return;
//       }
  
//       const file = files.event_cover_image;
//       if (!file) {
//           res.status(400).json({ error: 'No file uploaded' });
//           return;
//       }

//       const filePath = file.filepath;
//       const newFilePath = path.join(uploadDir, file.originalFilename);
  
     
  
//       try {

//         fs.renameSync(filePath, newFilePath);

//         const utcNow = moment.utc();
//         const taipeiTime = utcNow.add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
  
//         const status = 2;

//         console.log(fields)
        
  
//         const { event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
//                event_venue, event_address, people_limit, event_introduce, noweventid, useridis, myname, gender, myage, kotoba } = fields;
  
//         const [result1] = await conn.query(
//           `INSERT INTO event (event_name, event_date, event_time_start, event_time_end, apply_start, apply_end,
//            event_city, event_venue, event_address, people_limit, event_introduce, event_cover_image, created_at,
//            status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//           [event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
//             event_venue, event_address, people_limit, event_introduce, file[0].originalFilename, taipeiTime, status]
//         );
//         const [result2] = await conn.query(
//           `INSERT INTO event_apply (event_id, user_id, neckname, gender, age, introduce, apply_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//           [noweventid, useridis, myname, gender, myage, kotoba, taipeiTime]
//         );
//         res.status(201).json({ id: result1.insertId, applyId: result2.insertId });
  
//         console.log(fields);
        
//       } catch (error) {
//         console.error('Error creating event:', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//       }
//     });
//   });
// const uploadDir = path.join(process.cwd(), '/public/event');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// router.post('/', async (req, res) => {

//     const form = new formidable.IncomingForm();

//     form.uploadDir = path.join(process.cwd(), '/public/event');
//     form.keepExtensions = true;

//     // Ensure the upload directory exists
//     if (!fs.existsSync(form.uploadDir)) {
//         fs.mkdirSync(form.uploadDir, { recursive: true });
//     }

//     form.parse(req, async (err, fields, files) => {
//         if (err) {
//             res.status(500).json({ error: 'Failed to upload file' });
//             return;
//         }

//         const file = files.event_cover_image; // Adjust based on how you name the file input field
//         const filePath = file[0].filepath;
//         const newFilePath = path.join(form.uploadDir, file[0].originalFilename);

//         // 移动文件到正确的目录
//         fs.renameSync(filePath, newFilePath);

//         const { title, description } = fields;

//         try {
//             const utcNow = moment.utc();
//             const taipeiTime = utcNow.add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
//             const status = 2;

//             const { event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
//                 event_venue, event_address, people_limit, event_introduce, noweventid, useridis, myname, gender, myage, kotoba } = fields;

//             console.log(fields)
            

//             const [result1] = await pool.query(
//                 `INSERT INTO event (event_name, event_date, event_time_start, event_time_end, apply_start, apply_end,
//                 event_city, event_venue, event_address, people_limit, event_introduce, event_cover_image, created_at,
//                 status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                 [event_name, event_date, event_time_start, event_time_end, apply_start, apply_end, event_city,
//                     event_venue, event_address, people_limit, event_introduce, file[0].originalFilename, taipeiTime, status]
//             );
//             const [result2] = await pool.query(
//                 `INSERT INTO event_apply (event_id, user_id, neckname, gender, age, introduce, apply_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//                 [noweventid, useridis, myname, gender, myage, kotoba, taipeiTime]
//             );
//             res.status(201).json({ id: result1.insertId, applyId: result2.insertId });

//             console.log(fields);

//         } catch (error) {
//             console.error('Error creating event:', error);
//             res.status(500).json({ message: 'Internal server error', error: error.message });
//         }
//     });
// });




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