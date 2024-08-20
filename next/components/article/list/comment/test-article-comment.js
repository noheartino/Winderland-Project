import React, { useState } from "react";

export default function TestArticleComment({ articleId }) {
  // console.log(articleId);
  const [commentText, setCommentText] = useState("");
  const [rows, setRows] = useState(2);

  const handleCreate = async () => {
    const userId = 5; // 替換為實際的使用者 ID
    // const articleId = articleId; // 替換為實際的文章 ID

    try {
      const response = await fetch(
        `http://localhost:3005/api/a-comment/${articleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            comment_text: commentText,
            parent_comment_id: null, // 如果這是一個回覆，則提供父評論的 ID
          }),
        }
      );

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
      <div className="col-12 mb-4">
        <div className="aid-reply row">
          <div className="col-auto">
            {/* 桌機icon */}
            <div className="au-icon d-none d-lg-flex">
              <p className="m-0">AA</p>
            </div>
            {/* 手機icon */}
            <div className="au-icon-sm d-lg-none">
              <p className="m-0">AA</p>
            </div>
          </div>
          <div className="aucomment-section col">
            <div className="aucomment-nav row align-items-center mb-2">
              {/* 使用者 */}
              <div className="au-name col-auto col-lg-auto">
                <h5 className="m-0">AAA</h5>
              </div>
            </div>
            {/* 評論內容 */}
            <div className="aucomment p-4">
              <form>
                <textarea
                  placeholder="在這邊寫點什麼..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={rows}
                  onFocus={() => setRows(4)}
                  className="form-control"
                  id="message-text"
                />
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary" onClick={handleCreate}>
                    送出
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
