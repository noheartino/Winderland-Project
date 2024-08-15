import React from "react";
import styles from "./AddCart.module.css"

export default function AddCart() {
  return (
    <>
      <div className={`col-lg-1 col-md-1 col-1 ${styles["product-fav-icon"]}`}>
        <i className="fa-regular fa-bookmark" />
      </div>
      <div
        className={`col-lg-11 col-md-11 col-11 ${styles["product-add-cart"]}`}
      >
        <button className={`${styles["product-add-cart-button"]}`}>
          加入購物車
        </button>
      </div>
    </>
  );
}
