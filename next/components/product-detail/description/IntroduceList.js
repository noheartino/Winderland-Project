import React from "react";
import styles from "./IntroduceList.module.css"

export default function IntroduceList() {
  return (
    <>
      <div>
        <div className={`${styles["product-introduce-list"]}`}>
          產地 - 法國
        </div>
        <div className={`${styles["product-introduce-list"]}`}>
          容量 - 750ml
        </div>
        <div className={`${styles["product-introduce-list"]}`}>
          年份 - 2017年
        </div>
        <div className={`${styles["product-introduce-list"]}`}>
          品牌 - 皮耶侯奇酒莊
        </div>
        <div className={`${styles["product-introduce-list"]}`}>
          品種 - Pinot Noir 黑皮諾
        </div>
      </div>
    </>
  );
}
