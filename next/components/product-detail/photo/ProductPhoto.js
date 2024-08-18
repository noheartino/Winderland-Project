import React from "react";
import styles from "./ProductPhoto.module.css";

export default function ProductPhoto({product}) {
  return (
    <>
      {/* 商品大圖片 */}
      <div className={`${styles['product-photo-bg']}`}>
        <img className={`${styles['product-img']}`}
          src="/product_images/8cacfd05b6d9923e4100abb79565d930 (1).png"
          alt=""
        />
        <img
          className={`${styles['photo-arrow']}`}
          src="/product_images/photo-arrow.svg"
          alt=""
        />
      </div>
      {/* 商品小圖片們 */}
      <div className={`${styles['product-photos-sm']}`}>
        <div className={`${styles['product-photo-sm']}`}>
          <img 
            className={`${styles['product-img']}`}
            src="/product_images/8cacfd05b6d9923e4100abb79565d930 (1).png"
            alt=""
          />
        </div>
        <div className={`${styles['product-photo-sm']}`}>
          <img
          className={`${styles['product-img']}`}
            src="/product_images/8cacfd05b6d9923e4100abb79565d930.png"
            alt=""
          />
        </div>
        <div className={`${styles['product-photo-sm']}`}></div>
        <div className={`${styles['product-photo-sm']}`}></div>
      </div>
    </>
  );
}
