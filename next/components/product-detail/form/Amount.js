import React, { useState, useEffect } from "react";
import styles from "./Amount.module.css";

export default function Amount({ changeAmount, currentDetail }) {
  // 數字輸入js start//
  const minLimit = 0;
  const maxLimit = currentDetail.amount;

  const [inputValue, setInputValue] = useState(minLimit);

  const addAmount = () => {
    const currentValue = Number(inputValue);
    if (currentValue < maxLimit) {
      const newAddValue = currentValue + 1;
      setInputValue(newAddValue);
    } else {
      setInputValue(maxLimit);
    }
  };

  const reduceAmount = () => {
    const currentValue = Number(inputValue);
    if (currentValue > 0) {
      const newReduceValue = currentValue - 1;
      setInputValue(newReduceValue);
    }
  };

  const inputRule = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = value.replace(/[\D]/g, "");
    }

    if (Number(e.target.value) > maxLimit) {
      setInputValue(maxLimit);
    } else {
      setInputValue(Number(e.target.value));
    }
  };

  useEffect(() => {
    changeAmount?.(inputValue);
  }, [inputValue, changeAmount]);

  //數字輸入js end//
  return (
    <>
      <div className={`${styles["product-selects"]}`}>
        <button
          className={`${styles["product-amount-reduce"]}`}
          type="button"
          onClick={reduceAmount}
        >
          -
        </button>
        <input
          className={`${styles["product-amount-box"]}`}
          type="text"
          min={minLimit}
          max={maxLimit}
          maxLength={2}
          value={inputValue}
          onInput={inputRule}
          name=""
          id=""
        />
        <button
          className={`${styles["product-amount-add"]}`}
          type="button"
          onClick={addAmount}
        >
          +
        </button>
      </div>
    </>
  );
}
