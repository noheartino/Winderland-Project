import React from "react";
import styles from "./path.module.css";

export default function Path() {
  return (
    <>
        <div className={`col ${styles['path']}` }>
          <a className={`${styles['link']}`} href="">商品首頁</a>
        </div>
        <div className={`col ${styles['product-top-arrow']}`}>
          <img className={`${styles['top-arrow']}`} src="/product_images/top-arrow.svg" alt="" />
        </div>
        <div className={`col ${styles['path']}`}>
          <a className={`${styles['link']}`} href="">紅酒</a>
        </div>
        <div className={`col ${styles['product-top-arrow']}`}>
          <img className={`${styles['top-arrow']}`} src="/product_images/top-arrow.svg" alt="" />
        </div>
        <div className={`col ${styles['path']}`}>
          <a className={`${styles['link']}`} href="">約瑟夫杜亨酒莊</a>
        </div>
    </>
  );
}
