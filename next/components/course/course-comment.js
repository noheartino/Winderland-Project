import React from "react";
import CourseCommentMore from "./course-comment-more";

export default function ArticleComment() {
  return (
    <>
      <div className="course-comment-area">
        <div className="course-comment row">
          <div className="col-auto">
            <div className="course-comment-icon d-flex justify-content-center align-items-center">
              <h1 className="m-0 text-white d-none d-md-block">u1</h1>
              <h5 className="m-0 text-white d-block d-md-none">u1</h5>
            </div>

          </div>
          <div className="course-user-comment-section col">
            <div className="course-comment-bubble-nav row align-items-end mb-2 justify-content-between">
              <div className="col-auto d-flex align-items-center gap-4">
                <span className="m-0 spac-1 h5">user01</span>
                <span className="spac-1 text-sec-dark-blue p">B1</span>
                <a href="">
                  <i className="p fa-regular fa-thumbs-up me-1 text-prim-wine" />
                  <span className="d-none d-md-inline-block spac-1 text-sec-dark-blue p">
                    有幫助(???)
                  </span>
                </a>
                <a href="">
                  <i className="fa-solid fa-reply me-1 text-sec-dark-blue" />
                  <span className="d-none d-md-inline-block spac-1 text-sec-dark-blue p">
                    回覆
                  </span>
                </a>
              </div>
              <div className="col-auto">
                {/* more */}
                <div className="ms-auto col-auto p-0 dropdown course-commentmore">
                  <CourseCommentMore />
                </div>
              </div>
            </div>
            {/* 評論內容 */}
            <div className="course-comment-bubble p-4">
              <p>
                評論的出現，必將帶領人類走向更高的巔峰。雪萊講過一句值得人反覆尋思的話，道德中最大的秘密是愛。這句話決定了一切。羅斯福說過一句著名的話，有學問而無道德，如一惡漢;
                有道德而無學問，如一鄙夫。這讓我的思緒清晰了。儘管如此，別人往往卻不這麼想。
              </p>
            </div>
            <div className="course-commentTime my-1 spac-1 p">
              發佈於 2024.08.05, 14:22:25
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
