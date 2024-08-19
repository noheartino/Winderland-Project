import React, { useEffect, useState } from "react";
import styles from "./TitlePrice.module.css";
import { useProduct } from "@/context/ProductContext";

export default function TitlePrice() {
  const { product, loading, error, detail } = useProduct();
  const [currentDetail, setCurrentDetail] = useState(null);
  const [onSale, setOnSale] = useState(false);

  useEffect(() => {
    if (product && product[0] && product[0].details) {
      const foundDetail =
        product[0].details.find((d) => d.id === detail) ||
        product[0].details[0];
      setCurrentDetail(foundDetail);
      setOnSale(foundDetail.sale_price !== 0);
    }
  }, [product, detail]);

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;
  if (!product || !currentDetail) return <div>查無此商品</div>;

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("zh-TW", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div className={`${styles["product-title"]}`}>{product[0].name}</div>
      <div className={`${styles["product-dataStar"]}`}>
        <div className={`${styles["product-data"]}`}>
          {currentDetail.capacity}ml / {product[0].country_name}
        </div>
        <div className={`${styles["product-stars"]}`}>
          <img
            className={`${styles["star"]}`}
            src="/product_images/Star.svg"
            alt=""
          />
          <img
            className={`${styles["star"]}`}
            src="/product_images/Star.svg"
            alt=""
          />
          <img
            className={`${styles["star"]}`}
            src="/product_images/Star.svg"
            alt=""
          />
          <img
            className={`${styles["star"]}`}
            src="/product_images/Star.svg"
            alt=""
          />
          <img
            className={`${styles["star"]}`}
            src="/product_images/Star.svg"
            alt=""
          />
          <div className={`${styles["product-score"]}`}>4.8</div>
        </div>
      </div>
      <div
        className={`${styles["product-prices"]} ${
          styles[onSale ? "d-none" : "d-flex"]
        }`}
      >
        <div className={`${styles["product-price"]}`}>
          NT$&nbsp;{formatCurrency(currentDetail.price)}
        </div>
      </div>
      <div
        className={`${styles["product-prices"]} ${
          styles[onSale ? "d-flex" : "d-none"]
        }`}
      >
        <div className={`${styles["product-price"]}`}>
          NT$&nbsp;{formatCurrency(currentDetail.sale_price)}
        </div>
        <div className={`${styles["product-sale"]}`}>
          NT$&nbsp;{formatCurrency(currentDetail.price)}
        </div>
      </div>
    </>
  );
}
