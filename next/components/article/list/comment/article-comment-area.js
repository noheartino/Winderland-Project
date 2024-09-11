import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ArticleComment from "@/components/article/list/comment/article-comment";
// import ArticleCRreply from "@/components/article/list/comment/article-c-reply";
// import ArticleCommentCreate from "./article-comment-create";
import { useAuth } from "@/hooks/use-auth";
import TestArticleComment from "./test-article-comment";

export default function ArticleCommentArea({ articleId }) {
  const router = useRouter();
  const { auth } = useAuth(); // 取得認證資訊
  // 檢查使用者是否已經登入，如果沒有登入則跳轉到登入頁面
  const userData = auth.userData;
  const userId = userData && userData.id ? auth.userData.id : null;
  const account =
    userData && userData.account ? auth.userData.account : "guest";
  const avatarUrl =
    userData && userData.avatar_url
      ? `https://winderland.shop${auth.userData.avatar_url}`
      : "/nav-footer/default_user.jpg";
  // console.log(userData)
  const [comments, setComments] = useState([]);
  // 用於獲取評論
  const fetchComments = async () => {
    try {
      if (articleId) {
        const response = await axios.get(
          `https://winderland.shop/api/a-comment/${articleId}`,
          {
            params: {
              entity_type: "article",
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setComments(response.data);
      }
    } catch (error) {
      console.error("取得資料錯誤", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  // 新增評論後更新評論列表
  const onCommentChange = async () => {
    await fetchComments();
  };

  return (
    <>
      <div className="aid-commentArea py-5 mt-5">
        <div className="container">
          {/* 留言區title */}
          <h2 className="text-center text-lg-start py-5">留言討論 | Comment</h2>
          {/* 上排按鈕 */}
          {/* <div className="row ac-topbtn gap-4 my-4 justify-content-lg-end justify-content-center"> */}
          {/* 新增評論 */}
          {/* <button className="col-auto px-5 py-2 btn addC-btn">
              攥寫評論
            </button>

            <button
              type="button"
              className="col-auto px-5 py-2 btn addC-btn"
              data-bs-toggle="modal"
              data-bs-target="#commentModal"
              data-bs-whatever="@Harry"
            >
              新增留言
            </button>
            <ArticleCommentCreate articleId={articleId} /> */}
          {/* </div> */}

          {/* 回覆區主要的內容 */}
          <div className="aid-reply-area row">
            {/* 新增回覆區 */}
            <div className="send-comment">
              <TestArticleComment
                userId={userId}
                account={account}
                articleId={articleId}
                comments={comments}
                onCommentChange={onCommentChange}
              />
            </div>
            {/* 所有人回覆區 */}
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <ArticleComment
                  key={comment.id}
                  comment={comment}
                  index={index}
                  userId={userId}
                  // avatarUrl={avatarUrl}
                  onCommentChange={onCommentChange}
                />
              ))
            ) : (
              <p className="text-center">還沒有任何人留下評論</p>
            )}

            {/* 回覆區的回覆 */}
            {/* <div className="col-11 ms-auto mb-4">
              <ArticleCRreply />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
