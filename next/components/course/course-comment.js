import React from "react";
import CourseCommentMore from "./course-comment-more";
import styles from './comment-avatar.module.css';

export default function ArticleComment({ comment, index }) {
  return (
    <>
      <div className="course-comment row">
        <div className="col-auto">
          {/* 頭像 */}
          <div className="course-comment-icon d-flex justify-content-center align-items-center">
            <img className={`${styles['course-comment-avatar']}`} src={`https://winderland.shop/images/member/avatar/${comment.user_img}`} alt="" />
          </div>
        </div>
        <div className="course-user-comment-section col">
          <div className="course-comment-bubble-nav row align-items-end mb-2 justify-content-between">
            <div className="col-auto d-flex align-items-center gap-4">
              <span className="m-0 spac-1 h5">{comment?.account}</span>
              <span className="spac-1 text-sec-dark-blue p">B{index}</span>
            </div>
            <div className="col-auto">
              {/* more
                <div className="ms-auto col-auto p-0 dropdown course-commentmore">
                  <CourseCommentMore />
                </div> */}
            </div>
          </div>
          <div className="row">
            <div className="col-auto stars mt-2 d-flex align-items-center mb-2">
              <i
                className={`fa-solid fa-star text-light-wine-border ${comment?.rating > 0.5
                    ? "star-with-score"
                    : "star-without-score"
                  }`}
              />
              <i
                className={`fa-solid fa-star text-light-wine-border ${comment?.rating > 1.5
                    ? "star-with-score"
                    : "star-without-score"
                  }`}
              />
              <i
                className={`fa-solid fa-star text-light-wine-border ${comment?.rating > 2.5
                    ? "star-with-score"
                    : "star-without-score"
                  }`}
              />
              <i
                className={`fa-solid fa-star text-light-wine-border ${comment?.rating > 3.5
                    ? "star-with-score"
                    : "star-without-score"
                  }`}
              />
              <i
                className={`fa-solid fa-star text-light-wine-border ${comment?.rating > 4.5
                    ? "star-with-score"
                    : "star-without-score"
                  }`}
              />
              {/* <span
                          className={`ms-2 spac-1 text-sec-dark-blue emmit1 ${
                            comment?.rating > 0 ? "d-inline-block" : "d-none"
                          }`}
                        >
                          {comment?.rating}
                        </span> */}
            </div>
          </div>
          {/* 評論內容 */}
          <div className="course-comment-bubble p-4">
            <p>
              {comment?.comment_text}
            </p>
          </div>
          <div className="course-commentTime my-1 spac-1 p">
            發佈於 {comment?.created_at}
          </div>
        </div>
      </div>
    </>
  );
}
