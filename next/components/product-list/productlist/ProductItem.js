import React from "react";
import styles from "./ProductItem.module.css";
import Link from "next/link";

export default function ProductItem({ product }) {
  const formatCurrency = (price) => {
    return new Intl.NumberFormat("zh-TW", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div className={`col-lg-3 col-md-3 col-6  ${styles["shop-card"]}`}>
        <Link className={`${styles['detail-link']}`} href={`/product/${product.id}`}>
          <div className={`${styles["shop-card-photo"]}`}>
            <img className={`${styles["photo"]}`} src={`/images/product/${product.images[1].path}`} alt="" />
          </div>
        </Link>
        <Link className={`${styles['detail-link']}`} href={`/product/${product.id}`}>
          <div className={`${styles["shop-card-name"]}`}>{product.name}</div>
        </Link>
        <div className={`${styles["shop-card-country"]}`}>
          {product.details[0].capacity}ml&nbsp;/&nbsp;{product.country_name}
        </div>
        <div className={`${styles["shop-card-money"]}`}>
          <div className={`${styles["shop-card-price"]}`}>
            NT ${formatCurrency(product.details[0].price)}
          </div>
          <div className={`${styles["shop-card-price-sale"]}`}></div>
        </div>
      </div>
    </>
  );
}
