import React, { useState } from "react";
import ArticleCReplymore from "./article-c-replymore";
import Swal from "sweetalert2";
// import { useAuth } from "@/hooks/use-auth";

export default function ArticleComment({ comment, index, userId, avatarUrl, onCommentChange }) {
  const [commentText, setCommentText] = useState(comment.comment_text);
  const [isEditing, setIsEditing] = useState(false);
  // 設定textarea的行數
  const [rows, setRows] = useState(2);

  const commentUser = comment.user_id; // 替換為實際的使用者 ID
  const commentId = comment.id; // 替換為實際的文章 ID
  const entityType = "article";

  // 判定是否有權限編輯
  const handleEdit = async () => {
    if (!userId) {
      Swal.fire({
        title: "請登入",
        text: "來編輯評論",
        icon: "warning",
        confirmButtonText: "確定"
      });
      return;
    }
    if (commentUser !== userId) {
      Swal.fire({
        title: "權限不足",
        text: "您沒有權限編輯此評論",
        icon: "error",
        confirmButtonText: "確定"
      });
      return;
    }
    setIsEditing(true); // 如果有權限，切換到編輯模式
  };

  const handleUpdate = async () => {
    // 檢查用戶是否有權更新評論
    if (commentUser !== userId) {
      Swal.fire({
        title: "權限不足",
        text: "您沒有權限修改此評論",
        icon: "error",
        confirmButtonText: "確定"
      });
      return;
    }

    try {
      const response = await fetch(
        `https://winderland.shop/api/a-comment/${commentId}?entity_type=${encodeURIComponent(
          entityType
        )}`,
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
        Swal.fire({
          title: "提交評論失敗",
          text: "錯誤信息：" + errorData.error,
          icon: "error",
          confirmButtonText: "確定"
        });
      } else {
        const responseData = await response.json();
        console.log(
          "Comment submitted successfully with ID:",
          responseData.commentId
        );
        Swal.fire({
          title: "成功",
          text: "評論修改成功",
          icon: "success",
          confirmButtonText: "確定"
        });
        setCommentText("");
        setIsEditing(false);

        if (onCommentChange) {
          onCommentChange();
        }
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      Swal.fire({
        title: "發生錯誤",
        text: "請聯繫管理員",
        icon: "error",
        confirmButtonText: "確定"
      });
    }
  };

  // 刪除
  const handleDelete = async () => {
    // // 彈出確認對話框
    // const confirmDelete = window.confirm(
    //   "您確定要刪除此評論嗎？此操作無法恢復。"
    // );

    // if (!confirmDelete) {
    //   return; // 如果用戶取消，則退出函數
    // }


    if (commentUser !== userId) {
      Swal.fire({
        title: "權限不足",
        text: "您沒有權限刪除此評論",
        icon: "error",
        confirmButtonText: "確定"
      });
      return;
    }

    try {
      const response = await fetch(
        `https://winderland.shop/api/a-comment/${commentId}?entity_type=${encodeURIComponent(
          entityType
        )}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        Swal.fire({
          title: "刪除評論失敗",
          text: "錯誤信息：" + errorData.error,
          icon: "error",
          confirmButtonText: "確定"
        });
      } else {
        Swal.fire({
          title: "成功",
          text: "評論已刪除",
          icon: "success",
          confirmButtonText: "確定"
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      Swal.fire({
        title: "發生錯誤",
        text: "請聯繫管理員",
        icon: "error",
        confirmButtonText: "確定"
      });
    }
  };
  // console.log(avatarUrl)
  return (
    <>
      <div className="col-12 my-4">
        <div className="aid-reply row">
          {/* icon */}
          <div className="col-auto">
            {/* 桌機icon */}
            <div className="au-icon d-none d-lg-flex">
              <img className="m-0" src={`https://winderland.shop/images/member/avatar/${comment.user_avatar}`} />
            </div>
            {/* 手機icon */}
            <div className="au-icon-sm d-lg-none">
              <img className="m-0" src={`https://winderland.shop/images/member/avatar/${comment.user_avatar}`} />
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
                <ul className="au-nav-items row align-items-center justify-content-left m-0 p-0">
                  {/* 樓層 */}
                  <li className="col-auto pe-3">B{index + 1}</li>
                  {/* 讚數 */}
                  {/* <li className="col-auto px-3">
                    <a href="">
                      <i
                        className="fa-regular fa-thumbs-up me-1"
                        style={{ color: "var(--wine)" }}
                      />
                      <p className="d-none d-lg-inline">有幫助</p>
                    </a>
                  </li> */}
                  {/* 回覆 */}
                  {/* <li className="col-auto ps-3 border-0">
                    <a href="">
                      <i className="fa-solid fa-reply me-1" />
                      <p className="d-none d-lg-inline">回覆</p>
                    </a>
                  </li> */}
                </ul>
              </div>
              {/* 回覆區的more */}
              {userId && (
                <div className="ms-auto col-auto pe-3 dropdown aid-replymore">
                  <ArticleCReplymore
                    onDelete={handleDelete}
                    onEdit={handleEdit} // 傳遞 handleEdit 函數
                  />
                </div>
              )}
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
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdate}
                    >
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
