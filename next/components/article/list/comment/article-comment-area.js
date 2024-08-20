import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleCRreply from "@/components/article/list/comment/article-c-reply";
import ArticleComment from "@/components/article/list/comment/article-comment";
import ArticleCommentCreate from "./article-comment-create";
import TestArticleComment from "./test-article-comment";

export default function ArticleCommentArea({ articleId }) {
  const [comments, setComments] = useState([]);

  // 用於獲取評論
  useEffect(() => {
    // 定義 fetchComments 函數
    const fetchComments = async () => {
      try {
        if (articleId) {
          // console.log(`Fetching comments for articleId: ${articleId}`);
          const response = await axios.get(
            `http://localhost:3005/api/a-comment/${articleId}`
          );
          setComments(response.data);
        }
      } catch (error) {
        console.error("取得資料錯誤", error);
      }
    };

    // 呼叫 fetchComments 函數
    fetchComments();
  }, [articleId]);

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
              <TestArticleComment articleId={articleId} />
            </div>
            {/* 所有人回覆區 */}
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <ArticleComment
                  key={comment.id}
                  comment={comment}
                  index={index}
                />
              ))
            ) : (
              <p className="text-center">還沒有任何人留下評論QQ</p>
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
