import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

export default function TestArticleComment({ articleId, comments }) {
  const [commentText, setCommentText] = useState("");
  const [rows, setRows] = useState(2);
  // 這邊是使用hooks的useAuth測試
  const { auth } = useAuth();

  // 如果 auth.userData 不存在，提前處理避免錯誤
  if (!auth.isAuth || !auth.userData) {
    console.log("使用者尚未登入或用戶資料尚未載入");
    return <p>請先登入再進行評論</p>;
  }

  const userId = auth.userData.id; // 取得使用者 ID
  const account = auth.userData.account;
  const entityType = "article";

  const firstTwoChars = account.slice(0, 2).toUpperCase();

  // 新增
  const handleCreate = async () => {
    if (!commentText.trim()) {
      alert("評論內容不能為空白");
      return;
    }

    try {
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
            {console.log(auth.userData.id)}
              {/* <p className="m-0">{firstTwoChars}</p> */}
              <Image src={`/images/member/avatar/${auth.userData.id}.png`} width={100} height={100} />
            </div>
            {/* 手機icon */}
            <div className="au-icon-sm d-lg-none">
              {/* <p className="m-0">{firstTwoChars}</p> */}
              <Image src={`/images/member/avatar/${auth.userData.id}.png`} width={100} height={100} />
            </div>
          </div>
          <div className="aucomment-section col">
            <div className="aucomment-nav row align-items-center mb-2">
              {/* 使用者 */}
              <div className="au-name col-auto col-lg-auto">
                <h5 className="m-0">
                
                {account}</h5>
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
