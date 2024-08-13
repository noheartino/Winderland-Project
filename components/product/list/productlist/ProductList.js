import React from "react";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

export default function ProductGroup() {
  return (
    <>
      <main className={`col-lg-9 col-md-12 ps-lg-4 ${styles['shop-product-list']}`}>
        <div className="row">
          <ProductItem />
        </div>
      </main>
    </>
  );
}
