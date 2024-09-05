import React, { useState, useEffect, use } from "react";
import styles from "./AddCart.module.css";

export default function AddCart({ addToCart, toggleFavorite, isFav, isCheckingFav }) {
  return (
    <>
      <div className={`col-lg-1 col-md-1 col-1 ${styles["product-fav-icon"]}`}>
        <button
          type="button"
          className={`${styles["fav-button"]}`}
          onClick={toggleFavorite}
          disabled={isCheckingFav}
        >
          {isCheckingFav ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className={`fa-${isFav ? "solid" : "regular"} fa-bookmark`}></i>
          )}
        </button>
      </div>
      <div
        className={`col-lg-11 col-md-11 col-11 ${styles["product-add-cart"]}`}
      >
        <button
          type="button"
          onClick={addToCart}
          className={`${styles["product-add-cart-button"]}`}
        >
          加入購物車
        </button>
      </div>
    </>
  );
}
