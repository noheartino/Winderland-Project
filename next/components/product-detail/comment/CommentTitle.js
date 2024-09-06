import React from "react";
import styles from "./CommentTitle.module.css";

export default function CommentTitle({handleSortChange}) {
  return (
    <>
      <div className={`${styles['product-comment-header']}`}>
        <div className={`${styles['product-comment-title']}`}>顧客回饋 | Comment</div>
        <div className={`${styles['product-comment-sort']}`}>
            <select className={`${styles['product-comment-select']}`} onChange={handleSortChange} name="" id="">
              <option value={"createdAt_asc"}>時間 舊→新</option>
              <option value={"createdAt_desc"}>時間 新→舊</option>
              <option value={"rating_desc"}>評分 高→低</option>
              <option value={"rating_asc"}>評分 低→高</option>
            </select>
        </div>
      </div>
    </>
  );
}
