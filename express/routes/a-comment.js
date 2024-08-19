import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql.js'

const router = express.Router()

// 獲取文章評論
router.get('/:id', async (req, res) => {
  const { id } = req.params; // 文章的 ID

  try {
    // 檢查該文章是否存在
    const [article] = await connection.execute(
      'SELECT * FROM article WHERE id = ?',
      [id]
    );
    if (article.length === 0) {
      return res.status(404).json({ error: '文章不存在' });
    }

    // 獲取該文章的所有評論
    const [comments] = await connection.execute(
      `SELECT comments.*, users.account
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE comments.entity_type = ? AND comments.entity_id = ?
       ORDER BY comments.created_at DESC`,
      ['article', id]
    );

    // 返回評論列表
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: '無法獲取評論', details: err.message });
  }
});

// 新增文章內容評論
router.post('/:id', async (req, res) => {
  const { id } = req.params // 文章的 ID
  const { user_id, comment_text, parent_comment_id } = req.body // 接收請求中的資料

  try {
    // 檢查該文章是否存在
    const [article] = await connection.execute(
      'SELECT * FROM article WHERE id = ?',
      [id]
    )
    if (article.length === 0) {
      return res.status(404).json({ error: '文章不存在' })
    }

    // 插入新的評論到 comments 表中
    const [result] = await connection.execute(
      `INSERT INTO comments (entity_type, entity_id, user_id, comment_text, parent_comment_id, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      ['article', id, user_id, comment_text, parent_comment_id || null]
    )

    // 返回插入成功的評論 ID
    res.status(201).json({ commentId: result.insertId });
  } catch (err) {
    console.error('Error inserting comment:', err);
    res.status(500).json({ error: '無法插入評論', details: err.message });
  }
})

export default router
