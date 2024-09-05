import React, { useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";

export default function TestArticleComment({ articleId, userId, account, avatarUrl, onCommentChange }) {
  const router = useRouter();

  const [commentText, setCommentText] = useState("");
  const [rows, setRows] = useState(2);

  if (!userId) {

    // 渲染登入提示和按鈕
    return (
      <div className="text-center mt-2 mb-5">
        <p className="mb-3" style={{letterSpacing:"1.4px", fontSize:"18px"}}>想分享點什麼嗎</p>
        <Link href="/member/login"
          className="btn btn-primary aLoginButton"
        >
          點擊登入留言
        </Link>
      </div>
    );
  }

  // 新增
  const handleCreate = async () => {
    if (!commentText.trim()) {
      Swal.fire({
        title: "警告",
        text: "評論內容不能為空白",
        icon: "warning",
        confirmButtonText: "確定"
      });
      return;
    }

    try {
      const entityType = "article";
      const response = await fetch(
        `http://localhost:3005/api/a-comment/${articleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            entity_type: entityType,
            user_id: userId,
            comment_text: commentText,
            parent_comment_id: null,
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
          text: "評論提交成功",
          icon: "success",
          confirmButtonText: "確定"
        });
        // 清空輸入框或進行其他操作
        setCommentText("");
        // 呼叫父層元件的 callback 函數來更新評論列表
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

  return (
    <>
      <div className="col-12 mb-4">
        <div className="aid-reply row">
          <div className="col-auto">
            {/* 桌機icon */}
            <div className="au-icon d-none d-lg-flex">

              <img className="m-0" src={avatarUrl} />
            </div>
            {/* 手機icon */}
            <div className="au-icon-sm d-lg-none">
              {/* <p className="m-0">{firstTwoChars}</p> */}
              <img className="m-0" src={avatarUrl} />

            </div>
          </div>
          <div className="aucomment-section col">
            <div className="aucomment-nav row align-items-center mb-2">
              {/* 使用者 */}
              <div className="au-name col-auto col-lg-auto">
                <h5 className="m-0">{account}</h5>
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCreate}
                  >
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
