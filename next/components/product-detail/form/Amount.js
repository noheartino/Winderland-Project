import React from "react";
import styles from "./Amount.module.css"

export default function Amount() {
  return (
    <>
      <button className={`${styles["product-amount-reduce"]}`} type="button">
        -
      </button>
      <input
        className={`${styles["product-amount-box"]}`}
        type="text"
        min={0}
        max={99}
        maxLength={2}
        name=""
        id=""
      />
      <button className={`${styles["product-amount-add"]}`} type="button">
        +
      </button>
    </>
  );
}
