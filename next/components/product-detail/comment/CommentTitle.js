import React from "react";
import styles from "./CommentTitle.module.css";

export default function CommentTitle() {
  return (
    <>
      <div className={`${styles['product-comment-header']}`}>
        <div className={`${styles['product-comment-title']}`}>顧客回饋 | Comment</div>
        <div className={`${styles['product-comment-sort']}`}>
            <select className={`${styles['product-comment-select']}`} name="" id="">
              <option value={0}>默認排序</option>
              <option value={1}>選項1</option>
              <option value={2}>選項2</option>
              <option value={3}>選項3</option>
            </select>
        </div>
      </div>
    </>
  );
}
