import React from "react";
import styles from "./ProductPhoto.module.css";
import { useProduct } from "@/context/ProductContext";

export default function ProductPhoto() {
  const {product,loading,error} = useProduct();

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>查無此商品</div>;

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
      <div className={`gap-2 ${styles['product-photos-sm']}`}>
        {product[0].images.map((image,index) => (
          <div key={index} className={`col-3 ${styles['product-photo-sm']}`}>
            <img className={`${styles['product-img']}`} src={`/images/product/${image.path}`} alt="" />
          </div>
        ))}
        <div className={`col-3`}></div>
        <div className={`col-3`}></div>
      </div>
    </>
  );
}