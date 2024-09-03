import React from "react";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

// 接收pages傳來的products
export default function ProductGroup({ products, error }) {
  if (!products || products.length === 0 || error) {
    return (
      <main
        className={`col-lg-9 col-md-12 ps-lg-4 ${styles["shop-product-list"]}`}
      >
        <div className={`${styles["no-data"]}`}>
          <img src={`/shop_images/noData.png`} alt="No Data" />
        </div>
      </main>
    );
  }
  return (
    <>
      <main
        className={`col-lg-9 col-md-12 ps-lg-4 ${styles["shop-product-list"]}`}
      >
        <div className="row">
          {products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </div>
      </main>
    </>
  );
}
