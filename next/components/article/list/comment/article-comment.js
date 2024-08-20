import React, { useState } from "react";
import ArticleCReplymore from "./article-c-replymore";

export default function ArticleComment({ comment, index }) {
  // console.log(comment)
  const [commentText, setCommentText] = useState(comment.comment_text);
  const [isEditing, setIsEditing] = useState(false);
  // 設定textarea的行數
  const [rows, setRows] = useState(2);
  // 設定回覆icon字元
  const firstTwoChars = comment.account.slice(0, 2).toUpperCase();
  const handleUpdate = async () => {
    const userId = comment.user_id; // 替換為實際的使用者 ID
    const commentId = comment.id; // 替換為實際的文章 ID
    // console.log("Article ID (Comment ID):", commentId);

    try {
      const response = await fetch(
        `http://localhost:3005/api/a-comment/${commentId}`,
        {
          method: "PUT",
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
        console.log("Comment submitted successfully with ID:", responseData.commentId);
        alert("評論修改成功");
        setCommentText("");
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("發生錯誤，請聯繫管理員");
    }
  };

  return (
    <>
      <div className="col-12 my-4">
        <div className="aid-reply row">
          {/* icon */}
          <div className="col-auto">
            {/* 桌機icon */}
            <div className="au-icon d-none d-lg-flex">
              <p className="m-0">{firstTwoChars}</p>
            </div>
            {/* 手機icon */}
            <div className="au-icon-sm d-lg-none">
              <p className="m-0">{firstTwoChars}</p>
            </div>
          </div>
          <div className="aucomment-section col">
            <div className="aucomment-nav row align-items-center mb-2">
              {/* 使用者 */}
              <div className="au-name col-auto col-lg-auto">
                <h5 className="m-0">{comment.account}</h5>
              </div>

              <div className="col-5 col-lg-4">
                {/* 評論的上排nav */}
                <ul className="au-nav-items row align-items-center justify-content-center m-0 p-0">
                  {/* 樓層 */}
                  <li className="col-auto pe-3">B{index+1}</li>
                  {/* 讚數 */}
                  <li className="col-auto px-3">
                    <a href="">
                      <i
                        className="fa-regular fa-thumbs-up me-1"
                        style={{ color: "var(--wine)" }}
                      />
                      <p className="d-none d-lg-inline">有幫助</p> (???)
                    </a>
                  </li>
                  {/* 回覆 */}
                  <li className="col-auto ps-3 border-0">
                    <a href="">
                      <i className="fa-solid fa-reply me-1" />
                      <p className="d-none d-lg-inline">回覆</p>
                    </a>
                  </li>
                </ul>
              </div>
              {/* 回覆區的more */}
              <div className="ms-auto col-auto pe-3 dropdown aid-replymore">
                <ArticleCReplymore onEdit={() => setIsEditing(true)} />
              </div>
            </div>
            {/* 評論內容 */}
            <div className="aucomment p-4">
            {!isEditing ? (
                <p style={{ whiteSpace: "pre-wrap" }}>{comment.comment_text}</p>
              ) : (
              <form>
                <textarea
                  placeholder={comment.comment_text}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={rows}
                  className="form-control"
                  id="message-text"
                />
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                    送出
                  </button>
                  <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={() => setIsEditing(false)}
                    >
                      取消
                    </button>
                </div>
              </form>
              )}
            </div>
            <div className="aucomment-time mt-2">
              <p>發佈於 {comment.updated_at}</p> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
