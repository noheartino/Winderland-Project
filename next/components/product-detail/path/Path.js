import React from "react";
import styles from "./path.module.css";
import { useProduct } from "@/context/ProductContext";

export default function Path() {
  const { product, loading, error} = useProduct();

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>查無此商品</div>;

  return (
    <>
        <div className={`col ${styles['path']}` }>
          <a className={`${styles['link']}`} href="/product">商品首頁</a>
        </div>
        <div className={`col ${styles['product-top-arrow']}`}>
          <img className={`${styles['top-arrow']}`} src="/product_images/top-arrow.svg" alt="" />
        </div>
        <div className={`col ${styles['path']}`}>
          <a className={`${styles['link']}`} href={`/product?category=${product[0].category_id}`}>{product[0].category_name}</a>
        </div>
        <div className={`col ${styles['product-top-arrow']}`}>
          <img className={`${styles['top-arrow']}`} src="/product_images/top-arrow.svg" alt="" />
        </div>
        <div className={`col ${styles['path']}`}>
          <a className={`${styles['link']}`} href={`/product?category=${product[0].category_id}&variet=${product[0].variet_name}`}>{product[0].variet_name}</a>
        </div>
    </>
  );
}
