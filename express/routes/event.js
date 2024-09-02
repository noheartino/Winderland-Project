import express from 'express';
import conn from '../configs/mysql.js'; // 引入資料庫連接
import moment from 'moment';

const router = express.Router();

router.get('/', async (req, res) => {

  const sort = req.query.sort || 'desc';

  const pageSize = 6
  const currentPage = parseInt(req.query.currentPage, 10) || 1;

  const queryapplyon = `SELECT * FROM event WHERE status = 2 ORDER BY event_date ${sort} LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize};`;
  const queryapplyoff = `SELECT * FROM event WHERE status = 1`;
  
  try {
    const [eventonResults, eventoffResults] = await Promise.all([
        conn.query(queryapplyon),
        conn.query(queryapplyoff)
    ]);

    res.json({
        applyon: eventonResults[0],
        applyoff: eventoffResults[0],
        currentPage
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

  const queryToFetchapplyimg = `SELECT * FROM images_user`;


  try {
    const [eventsResults, applysResults, imgResults] = await Promise.all([
      conn.query(queryToFetcheventinfo,[infoId]),
      conn.query(queryToFetchapplyinfo,[infoId]),
      conn.query(queryToFetchapplyimg),
    ]);

    response.json({
      eventinfo: eventsResults[0],
      applyinfo: applysResults[0],
      userimg: imgResults[0]
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

  const queryToFetchmyin = `SELECT * FROM event`;

  const queryToFetapply = `SELECT * FROM event_apply`;

  const queryToFetchin = `
    WITH MinIdPerEvent AS (
    SELECT event_id, MIN(id) AS min_id
    FROM event_apply
    GROUP BY event_id),

    FilteredEvents AS (
    SELECT ea.*
    FROM event_apply ea
    JOIN MinIdPerEvent mie ON ea.event_id = mie.event_id AND ea.id = mie.min_id)
    
    SELECT *
    FROM FilteredEvents
    WHERE user_id = ?
    ORDER BY event_id DESC;`;

  try {
    const [inResults, iesults, inviResults] = await Promise.all([
      conn.query(queryToFetchmyin),
      conn.query(queryToFetapply),
      conn.query(queryToFetchin,[infoId])
    ]);

    response.json({
      myallevent: inResults[0],
      myallapply: iesults[0],
      myowner: inviResults[0],
    });
    
  } catch (error) {
    console.error('失敗:', error);
    return response
      .status(500)
      .json({ error: '失敗', details: error.message });
  }
});




export default router;
