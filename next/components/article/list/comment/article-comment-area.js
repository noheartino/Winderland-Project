import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleCRreply from "@/components/article/list/comment/article-c-reply";
import ArticleComment from "@/components/article/list/comment/article-comment";
import ArticleCommentCreate from "./article-comment-create";

export default function ArticleCommentArea({ articleId }) {
  const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState('');

  // 用於獲取評論
  useEffect(() => {
    async function fetchComments() {
      try {
        // 發送 GET 請求到 /api/comments/:id
        const response = await axios.get(
          `http://localhost:3005/api/a-comment/${articleId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, [articleId]);

  return (
    <>
      <div className="aid-commentArea py-5">
        <div className="container">
          <h2 className="text-center text-lg-start">留言討論 | Comment</h2>
          {/* 上排按鈕 */}
          <div className="row ac-topbtn gap-4 my-4 justify-content-lg-end justify-content-center">
            {/* 新增評論 */}
            {/* <button className="col-auto px-5 py-2 btn addC-btn">
              攥寫評論
            </button> */}
            <button
              type="button"
              className="col-auto px-5 py-2 btn addC-btn"
              data-bs-toggle="modal"
              data-bs-target="#commentModal"
              data-bs-whatever="@Harry"
            >
              攥寫評論
            </button>
            <ArticleCommentCreate />
          </div>

          <div className="aid-reply-area row">
            {/* 回覆區 */}
              {console.log(comments)}
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <ArticleComment key={comment.id} comment={comment} index={index} />
                ))
              ) : (
                <p>No comments yet</p>
              )}

            {/* 回覆區的回覆 */}
            <div className="col-11 ms-auto mb-4">
              <ArticleCRreply />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
