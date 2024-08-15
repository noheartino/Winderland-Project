import React from "react";
import styles from "./PcDescription.module.css";
import IntroduceList from "./IntroduceList";
import Depiction from "./Depiction";
import RatingArea from "./RatingArea";

export default function PcDescription() {
  return (
    <>
      <div className={`row ${styles['product-detail-title']}`}>商品詳情</div>
      <div className={`row ${styles["product-info2"]}`}>
        <div className={`col-lg-7 col-md-12 ${styles["product-ratingArea"]}`}>
          <RatingArea />
        </div>
        <div className={`col-lg-5 col-md-12 ${styles["product-introduce"]}`}>
          <div className={`${styles["product-detail-md-title"]}`}>
            <img src="/product_images/square.svg" alt="" />
            <div className={`${styles["title-font"]}`}>商品資訊</div>
            <img src="/product_images/square.svg" alt="" />
          </div>
          <IntroduceList />
        </div>
        <div className={`col-md-12 ${styles["product-depiction"]}`}>
          <div className={`${styles["product-detail-md-title"]}`}>
            <img src="/product_images/square.svg" alt="" />
            <div className={`${styles["title-font"]}`}>商品特性</div>
            <img src="/product_images/square.svg" alt="" />
          </div>
          <Depiction />
        </div>
      </div>
    </>
  );
}
