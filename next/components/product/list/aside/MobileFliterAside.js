import React from "react";
import styles from "./MobileFliterAside.module.css";
import Link from "next/link";

export default function MobileFliterAside({isOpen,onClose}) {
  return (
    <>
      {/* 手機&平板版的開關aside */}
      <div className={`${styles["shop-aside-overlay-m"]} ${isOpen ? styles.open : ""}`} /> 
      <div className={`${styles['shop-aside-m']} ${isOpen ? styles.open : ""}`}> 
        <div className={`${styles['shop-aside-m-top']}`}>
          <img src="/shop_images/fliter-icon-white.svg" alt="" />
          <p>篩選項目</p>
          <button className={`${styles['aside-close-button']}`} onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <form action="">
          <div className={`${styles['shop-category-fliter-m']}`}>
            <div className={`${styles['shop-category-title']}`}>類型</div>
            <select name="" id="">
              <option value={0}>Red 紅酒</option>
              <option value={1}>Port Wine 波特酒</option>
              <option value={2}>Cult Wine 美國膜拜酒</option>
              <option value={3}>GCC 波爾多級數酒</option>
            </select>
            <div className={`${styles['shop-category-tags']}`}>
              <div className={`${styles['category-tag']}`}>Red 紅酒</div>
              <div className={`${styles['category-tag']}`}>Port Wine 波特酒</div>
              <div className={`${styles['category-tag']}`}>Sherry 雪莉酒</div>
              <div className={`${styles['category-tag']}`}>Rose 粉紅酒</div>
              <div className={`${styles['category-tag']}`}>Noble-Wine 貴腐甜酒</div>
              <div className={`${styles['category-tag']}`}>...</div>
            </div>
          </div>
          <div className={`${styles['shop-price-fliter-m']}`}>
            <div className={`${styles['shop-price-title']}`}>價格</div>
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
          <div className={`${styles['minmaxprice']}`}>
            <div className={`${styles['aside-price']} ${styles['min-price']}`}>
              <div className={`${styles['money-icon']}`}>$</div>
              <div className={`${styles['min-price-value']} ${styles['price-value']}`}>500</div>
            </div>
            <div className={`${styles['dash']}`}>-</div>
            <div className={`${styles['max-price']} ${styles['aside-price']}`}>
              <div className={`${styles['money-icon']}`}>$</div>
              <div className={`${styles['max-price-value']} ${styles['price-value']}`}>100,000</div>
            </div>
          </div>
          {/* 雙滑塊本人 */}
          <div className={`${styles['price-slider']}`}>
            <input
              type="range"
              id="min-price"
              min={500}
              max={100000}
              defaultValue={500}
              step={500}
            />
            <input
              type="range"
              id="max-price"
              min={500}
              max={100000}
              defaultValue={100000}
              step={500}
            />
          </div>
          <div className={`row ${styles['slider-minmax']}`}>
            <div className={`col-8 ${styles['money-min']}`}>$500</div>
            <div className={`col-3 ${styles['money-max']}`}>$100,000</div>
          </div>
          <div className={`${styles['shop-fliter-buttons']}`}>
            <button className={`btn ${styles['reset-button']}`}>重新設定</button>
            <button className={`btn ${styles['submit-button']}`}>送出篩選</button>
          </div>
        </form>
      </div>
    </>
  );
}
