import React from "react";
import styles from  "./CategoryTitle.module.css";


export default function CategoryTitle() {
  return (
    <>
      <div className={styles["shop-header-img"]}>
        <div className={styles["shop-header-title"]}>
          {/* 到時候內容要跑資料庫的Category */}
          <h1 className="h3">紅酒</h1>
          <h5>(Red Wine)</h5>
        </div>
      </div>
    </>
  );
}
