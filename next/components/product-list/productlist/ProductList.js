import React from "react";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

// 接收pages傳來的products
export default function ProductGroup({ products}) {

  return (
    <>
      <main
        className={`col-lg-9 col-md-12 ps-lg-4 pe-4 ${styles["shop-product-list"]}`}
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
