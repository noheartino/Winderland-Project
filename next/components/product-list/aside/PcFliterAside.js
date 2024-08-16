import React, { useState, useEffect } from "react";
import styles from "./PcFliterAside.module.css";

export default function PcFliterAside() {
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
    const newMinValue = Math.min(steppedValue, maxValue - (4*step));
    setMinValue(newMinValue);
  };

  const maxChange = (e) => {
    const rawValue = Number(e.target.value);
    const steppedValue = getStep(rawValue);
    const newMaxValue = Math.max(steppedValue, minValue + (4*step));
    setMaxValue(newMaxValue);
  };

  const getPercent = (value) =>
    ((value - minLimit) / (maxLimit - minLimit)) * 100;

  // 雙滑塊js end//

  return (
    <>
      <aside className={`col-3 pe-5 ${styles["product-pc-aside"]}`}>
        {/* 類型篩選 */}
        <div className={`col ${styles["shop-category-fliter"]}`}>
          <p className={`${styles["shop-flite-p"]}`}>類型</p>
          <ul>
            <a href="">
              <li>Red 紅酒</li>
            </a>
            <a href="">
              <li>Port Wine 波特酒</li>
            </a>
            <a href="">
              <li>Cult Wine 美國膜拜酒</li>
            </a>
            <a href="">
              <li>GCC 波爾多級數酒</li>
            </a>
            <a href="">
              <li>Noble-Wine 貴腐甜酒</li>
            </a>
            <a href="">
              <li>Rose 粉紅酒</li>
            </a>
            <a href="">
              <li>Sherry 雪莉酒</li>
            </a>
            <a href="">
              <li>Fortified 加烈酒</li>
            </a>
          </ul>
        </div>
        {/* 價格篩選 */}
        <div className={`col ${styles["shop-price-fliter"]}`}>
          <p className={`${styles["shop-flite-p"]}`}>價格</p>
          <form action="">
            <div>
              <input
                type="radio"
                name="price"
                id="option1"
                defaultValue=""
                defaultChecked=""
              />
              <label htmlFor="option1">全部價位</label>
            </div>
            <div>
              <input type="radio" name="price" id="option2" defaultValue="" />
              <label htmlFor="option2">～＄1,000</label>
              <br />
            </div>
            <div>
              <input type="radio" name="price" id="option3" defaultValue="" />
              <label htmlFor="option3">＄1,001~$3,000</label>
              <br />
            </div>
            <div>
              <input type="radio" name="price" id="option4" defaultValue="" />
              <label htmlFor="option4">＄3,001~$5,000</label>
              <br />
            </div>
            <div>
              <input type="radio" name="price" id="option5" defaultValue="" />
              <label htmlFor="option5">＄5,001~$10,000</label>
              <br />
            </div>
            <div>
              <input type="radio" name="price" id="option6" defaultValue="" />
              <label htmlFor="option6">＄10,001~$30,000</label>
              <br />
            </div>
            <div>
              <input type="radio" name="price" id="option7" defaultValue="" />
              <label htmlFor="option7">＄30,001~</label>
              <br />
            </div>
          </form>
          {/* 雙滑塊篩選金額 */}
          <form action="" className={`${styles["aside-price-fliter"]}`}>
            {/* 顯示金額的地方 */}
            <div className={`${styles["minmaxprice"]}`}>
              <div
                className={`${styles["min-price"]} ${styles["aside-price"]}`}
              >
                <div className={`${styles["money-icon"]}`}>$</div>
                <div
                  className={`${styles["min-price-value"]} ${styles["price-value"]}`}
                >
                  {minValue}
                </div>
              </div>
              <div className={`${styles["dash"]}`}>-</div>
              <div
                className={`${styles["max-price"]} ${styles["aside-price"]}`}
              >
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
              <div className={`col-lg-8 col-md-8  ${styles["money-min"]}`}>
                $500
              </div>
              <div className={`col-lg-3 col-md-3 ${styles["money-max"]}`}>
                $100,000
              </div>
            </div>
            <button className={`${styles["shop-fliter-button"]}`}>
              <div>執行篩選</div>
              <img src="/shop_images/arrow.svg" alt="" />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
