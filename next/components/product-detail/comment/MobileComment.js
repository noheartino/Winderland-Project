import React from "react";
import CommentTitle from "./CommentTitle";
import Message from "./Message";
import styles from "./MobileComment.module.css";
import RatingArea from "../description/RatingArea";

export default function MobileComment() {
  return (
    <>
      <div className={`container ${styles["product-comment-content"]}`}>
        <CommentTitle />
        <div className={`${styles["product-comment-star"]}`}>
          <RatingArea />
        </div>
        <div className={`${styles["product-comment-message"]}`}>
          <Message />
        </div>
      </div>
    </>
  );
}
