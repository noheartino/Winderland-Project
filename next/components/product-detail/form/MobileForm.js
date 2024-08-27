import React from "react";
import Amount from "./Amount";
import Years from "./Years";
import AddCart from "./AddCart";
import styles from "./MobileFrom.module.css"

export default function MobileForm() {
  return (
    <>
      <form className={`${styles['product-sm-form']}`} action="">
        <div className={`${styles['product-labels']}`}>
          <div className={`${styles['product-amount-label']}`}>數量</div>
          <div className={`${styles['product-reserve']}`}>庫存 &lt; 56件</div>
          <div className={`${styles['product-year-label']}`}>年份</div>
        </div>
        <div className={`${styles['product-sm-input']}`}>
          <div className={`${styles['product-sm-amount-input']}`}>
            <Amount />
          </div>
          <div className={`${styles['product-sm-select']}`}>
            <Years />
          </div>
        </div>
        <div className={`${styles['product-fav-cart']}`}>
          <AddCart />
        </div>
      </form>
    </>
  );
}
