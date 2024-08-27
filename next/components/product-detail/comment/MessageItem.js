import React, { useEffect, useState } from "react";
import styles from "./MessageItem.module.css";
import { useProduct } from "@/context/ProductContext";

export default function MessageItem() {
  const { product, loading, error } = useProduct();

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>查無此商品</div>;

  return (
    <>
      {product[0].comments.map((comment, index) => (
        <div className={`mb-5 ${styles["message-item"]}`} key={index}>
          <div className={`${styles["message-user"]}`}>
            <div className={`${styles["user-photo"]}`}>
              <img
                className={`${styles["photo"]}`}
                src={`/product_images/${comment.user_gender}.jpg`}
                alt=""
              />
            </div>
            <div className={`${styles["name-star"]}`}>
              <div className={`${styles["user"]}`}>
                <div className={`${styles["user-name"]}`}>
                  {comment.account}
                </div>
                <div className={`${styles["floor-good"]}`}>
                  <span>B{index + 1}</span>
                  <span className={`${styles["divider"]}`}> | </span>
                  <button className={`${styles["good-button"]}`} type="button">
                    <i
                      className={`fa-regular fa-thumbs-up ${styles["good-icon"]}`}
                    ></i>
                    251
                  </button>
                </div>
              </div>
              <div className={`${styles["user-star"]}`}>
                <div className={`${styles["stars"]}`}>
                  {[1,2,3,4,5].map((star) => (
                    <i className={`fa-solid fa-star ${star<=comment.rating? styles["light"] : ""}`}></i>
                  ))}
                </div>
                <div className={`${styles["score"]}`}>{comment.rating}</div>
              </div>
            </div>
          </div>
          <div className={`${styles["more-content"]}`}>
            <div itemType="button" className={`${styles["more"]}`}>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
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
      ))}
    </>
  );
}
