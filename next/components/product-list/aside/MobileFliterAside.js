import React, { useState, useEffect } from "react";
import styles from "./MobileFliterAside.module.css";
import Link from "next/link";

export default function MobileFliterAside({
  isOpen,
  onClose,
  filters,
  selectFilters,
  changeFilter,
}) {

  // 確保filters存在並且包含categories
  useEffect(() => {
    if(!filters || !filters.categories){
      console.error("filters or filters.categories 不存在");
    }
  }, [filters]);

  // 雙滑塊js start//
  const minLimit = 500;
  const maxLimit = 100000;
  const step = 500;

  const [minValue, setMinValue] = useState(minLimit);
  const [maxValue, setMaxValue] = useState(maxLimit);

  const getStep = (value) => {
    return Math.round(value / step) * step;
  };

  // 小滑塊跟大滑塊的變更
  const minChange = (e) => {
    const rawValue = Number(e.target.value);
    const steppedValue = getStep(rawValue);
    const newMinValue = Math.min(steppedValue, maxValue - 4 * step);
    setMinValue(newMinValue);
  };

  const maxChange = (e) => {
    const rawValue = Number(e.target.value);
    const steppedValue = getStep(rawValue);
    const newMaxValue = Math.max(steppedValue, minValue + 4 * step);
    setMaxValue(newMaxValue);
  };

  const getPercent = (value) =>
    ((value - minLimit) / (maxLimit - minLimit)) * 100;

  // 雙滑塊js end//
  
  // 確保filters.categories存在後再渲染
  if (!filters || !filters.categories) {
    return null;  
  }

  return (
    <>
      {/* 手機&平板版的開關aside */}
      <div
        className={`${styles["shop-aside-overlay-m"]} ${
          isOpen ? styles.open : ""
        }`}
      />
      <div className={`${styles["shop-aside-m"]} ${isOpen ? styles.open : ""}`}>
        <div className={`${styles["shop-aside-m-top"]}`}>
          <img src="/shop_images/fliter-icon-white.svg" alt="" />
          <p>篩選項目</p>
          <button
            className={`${styles["aside-close-button"]}`}
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <form action="">
          <div className={`${styles["shop-category-fliter-m"]}`}>
            <div className={`${styles["shop-category-title"]}`}>類型</div>
            <select name="" id=""> 
              {filters.categories && 
                filters.categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
              {/* <option value={0}>Red 紅酒</option>
              <option value={1}>Port Wine 波特酒</option>
              <option value={2}>Cult Wine 美國膜拜酒</option>
              <option value={3}>GCC 波爾多級數酒</option> */}
            </select>
            <div className={`${styles["shop-category-tags"]}`}>
              <div className={`${styles["category-tag"]}`}>Red 紅酒</div>
              <div className={`${styles["category-tag"]}`}>
                Port Wine 波特酒
              </div>
              <div className={`${styles["category-tag"]}`}>Sherry 雪莉酒</div>
              <div className={`${styles["category-tag"]}`}>Rose 粉紅酒</div>
              <div className={`${styles["category-tag"]}`}>
                Noble-Wine 貴腐甜酒
              </div>
              <div className={`${styles["category-tag"]}`}>...</div>
            </div>
          </div>
          <div className={`${styles["shop-price-fliter-m"]}`}>
            <div className={`${styles["shop-price-title"]}`}>價格</div>
            <select name="" id="">
              <option value={0}>全部價錢</option>
              <option value={1}>～＄1,000</option>
              <option value={2}>＄1,001~$3,000</option>
              <option value={3}>＄3,001~$5,000</option>
              <option value={4}>＄5,001~$10,000</option>
              <option value={5}>＄10,001~$30,000</option>
              <option value={5}>＄30,001~</option>
            </select>
          </div>
          {/* 顯示金額的地方 */}
          <div className={`${styles["minmaxprice"]}`}>
            <div className={`${styles["aside-price"]} ${styles["min-price"]}`}>
              <div className={`${styles["money-icon"]}`}>$</div>
              <div
                className={`${styles["min-price-value"]} ${styles["price-value"]}`}
              >
                {minValue}
              </div>
            </div>
            <div className={`${styles["dash"]}`}>-</div>
            <div className={`${styles["max-price"]} ${styles["aside-price"]}`}>
              <div className={`${styles["money-icon"]}`}>$</div>
              <div
                className={`${styles["max-price-value"]} ${styles["price-value"]}`}
              >
                {maxValue}
              </div>
            </div>
          </div>
          {/* 雙滑塊本人 */}
          <div className={`${styles["price-slider"]}`}>
            <input
              type="range"
              id="min-price"
              min={minLimit}
              max={maxLimit}
              value={minValue}
              step={step}
              onChange={minChange}
            />
            <input
              type="range"
              id="max-price"
              min={minLimit}
              max={maxLimit}
              value={maxValue}
              step={step}
              onChange={maxChange}
            />
          </div>
          <div className={`row ${styles["slider-minmax"]}`}>
            <div className={`col-8 ${styles["money-min"]}`}>$500</div>
            <div className={`col-3 ${styles["money-max"]}`}>$100,000</div>
          </div>
          <div className={`${styles["shop-fliter-buttons"]}`}>
            <button className={`btn ${styles["reset-button"]}`}>
              重新設定
            </button>
            <button className={`btn ${styles["submit-button"]}`}>
              送出篩選
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
