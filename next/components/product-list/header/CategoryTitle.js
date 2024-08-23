import React from "react";
import styles from  "./CategoryTitle.module.css";


export default function CategoryTitle() {
  return (
    <>
      <div className={styles["shop-header-img"]}>
        <div className={styles["shop-header-title"]}>
          {/* 到時候內容要跑資料庫的Category */}
          <h1 className="h3">全部商品</h1>
          <h5>(All Wine)</h5>
        </div>
      </div>
    </>
  );
}
