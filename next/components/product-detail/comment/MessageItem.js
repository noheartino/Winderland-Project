import React, { useEffect, useState } from "react";
import styles from "./MessageItem.module.css";

export default function MessageItem({ sortedComments }) {
  return (
    <>
      {sortedComments.length === 0 ? (
        <>
          <div className={`${styles["no-comment-img"]}`}>
            <img src="/shop_images/unnamed.png" alt="no-comment" />
          </div>
          <div className={`${styles["no-comments"]}`}>
            目前沒有評論，快來寫下第一個評論吧！
          </div>
        </>
      ) : (
        sortedComments.map((comment, index) => (
          <div key={comment.id} className={`mb-5 ${styles["message-item"]}`}>
            <div className={`${styles["message-user"]}`}>
              <div className={`${styles["user-photo"]}`}>
                <img
                  className={`${styles["photo"]}`}
                  src={`https://winderland.shop/images/member/avatar/${comment.user_img}`}
                  alt=""
                />
              </div>
              <div className={`${styles["name-star"]}`}>
                <div className={`${styles["user"]}`}>
                  <div className={`${styles["user-name"]}`}>
                    {comment.account}
                  </div>
                  {/* !!不確定要不要刪 */}
                  <div className={`${styles["floor-good"]}`}>
                    <span>B{comment.fixedIndex}</span>
                  </div>
                </div>
                <div className={`${styles["user-star"]}`}>
                  <div className={`${styles["stars"]}`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fa-solid fa-star ${star <= comment.rating ? styles["light"] : ""
                          }`}
                      ></i>
                    ))}
                  </div>
                  <div className={`${styles["score"]}`}></div>
                </div>
              </div>
            </div>
            <div className={`${styles["more-content"]}`}>
              <div className={`${styles["message-content"]}`}>
                <p className={`${styles["comment-text"]}`}>
                  {comment.comment_text}
                </p>
              </div>
              <div className={`${styles["time"]}`}>
                發佈於 {comment.updated_at}
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
