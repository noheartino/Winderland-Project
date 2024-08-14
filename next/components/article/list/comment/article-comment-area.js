import React from "react";
import ArticleCRreply from "@/components/article/list/comment/article-c-reply";
import ArticleComment from "@/components/article/list/comment/article-comment";

export default function ArticleCommentArea() {
  return (
    <>
      <div className="aid-commentArea py-5">
        <div className="container">
          <h2 className="text-center text-lg-start">留言討論 | Comment</h2>
          {/* 上排按鈕 */}
          <div className="row ac-topbtn gap-4 my-4 justify-content-lg-end justify-content-center">
            {/* 新增評論 */}
            <button className="col-auto px-5 py-2 btn addC-btn">
              攥寫評論
            </button>
          </div>

          <div className="aid-reply-area row">
            {/* 回覆區 */}
            <div className="col mb-4">
              <ArticleComment />
            </div>

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
