import React, { useState, useEffect, use } from "react";
import styles from "./Amount.module.css";

export default function Amount({ changeAmount }) {
  // 數字輸入js start//
  const minLimit = 0;
  const maxLimit = 99;

  const [inputValue, setInputValue] = useState(minLimit);

  const addAmount = () => {
    const currentValue = Number(inputValue);
    if (currentValue < 99) {
      const newAddValue = currentValue + 1;
      setInputValue(newAddValue);
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

    const newInputValue = Number(e.target.value);
    setInputValue(newInputValue);
  };

  useEffect(() => {
    changeAmount?.(inputValue);
  }, [inputValue, changeAmount]);

  //數字輸入js end//
  return (
    <>
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
    </>
  );
}
