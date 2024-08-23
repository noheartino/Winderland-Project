import React, { useState } from "react";

export default function ArticleCommentCreate({ articleId }) {
  // console.log(articleId);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async () => {
    const userId = 5; // 替換為實際的使用者 ID
    // const articleId = articleId; // 替換為實際的文章 ID

    try {
      const response = await fetch(`http://localhost:3005/api/a-comment/${articleId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          comment_text: commentText,
          parent_comment_id: null, // 如果這是一個回覆，則提供父評論的 ID
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        alert("提交評論失敗：" + errorData.error);
      } else {
        const responseData = await response.json();
        console.log(
          "Comment submitted successfully with ID:",
          responseData.commentId
        );
        alert("評論提交成功");
        // 清空輸入框或進行其他操作
        setCommentText("");
        // 刷新頁面
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("發生錯誤，請聯繫管理員");
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="commentModal"
        tabIndex={-1}
        aria-labelledby="commentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="commentModallLabel">
                新評論
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    在這邊寫點什麼:
                  </label>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="form-control"
                    id="message-text"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                返回
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
