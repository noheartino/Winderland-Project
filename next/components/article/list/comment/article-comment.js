import React from "react";
import ArticleCReplymore from "./article-c-replymore";

export default function ArticleComment({ comment, index }) {
  console.log(comment)
  return (
    <>
      <div className="col-12 mb-4">
        <div className="aid-reply row">
          <div className="col-auto">
            {/* 桌機icon */}
            <div className="au-icon d-none d-lg-flex">
              <p className="m-0">u1</p>
            </div>
            {/* 手機icon */}
            <div className="au-icon-sm d-lg-none">
              <p className="m-0">u1</p>
            </div>
          </div>
          <div className="aucomment-section col">
            <div className="aucomment-nav row align-items-center mb-2">
              {/* 使用者 */}
              <div className="au-name col-auto col-lg-auto">
                <h5 className="m-0">{comment.account}</h5>
              </div>

              <div className="col-6 col-lg-4">
                {/* 評論的上排nav */}
                <ul className="au-nav-items row align-items-center justify-content-center m-0 p-0">
                  {/* 樓層 */}
                  <li className="col-auto px-3">B{index+1}</li>
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
                  <li className="col-auto px-2 border-0">
                    <a href="">
                      <i className="fa-solid fa-reply me-1" />
                      <p className="d-none d-lg-inline">回覆</p>
                    </a>
                  </li>
                </ul>
              </div>
              {/* 回覆區的more */}
              <div className="ms-auto col-auto pe-3 dropdown aid-replymore">
                <ArticleCReplymore />
              </div>
            </div>
            {/* 評論內容 */}
            <div className="aucomment p-4">
              <p>
                {comment.comment_text}
              </p>
            </div>
            <div className="aucomment-time my-1">
              發佈於 {comment.created_at}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
