import React from "react";
import styles from "./MobileDescription.module.css";
import Depiction from "./Depiction";
import IntroduceList from "./IntroduceList";

export default function MobileDescription() {
  return (
    <>
      <div className={`row ${styles["product-info2"]}`}>
        <div className={`col-lg-7 col-md-12 ${styles["product-depiction"]}`}>
          <div className={`${styles["product-detail-md-title"]}`}>
            <img src="/product_images/square.svg" alt="" />
            <div className={`${styles["title-font"]}`}>商品特性</div>
            <img src="/product_images/square.svg" alt="" />
          </div>
          <Depiction />
        </div>
        <div className={`col-lg-5 col-md-12 ${styles["product-introduce"]}`}>
          <div className={`${styles["product-detail-md-title"]}`}>
            <img src="/product_images/square.svg" alt="" />
            <div className={`${styles["title-font"]}`}>商品資訊</div>
            <img src="/product_images/square.svg" alt="" />
          </div>
          <IntroduceList />
        </div>
      </div>
    </>
  );
}
