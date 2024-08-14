import React from "react";
import styles from "./PcFliterAside.module.css"

export default function PcFliterAside() {
  return (
    <>
      <aside className={`col-3 pe-5 ${styles['product-pc-aside']}`}>
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
              <div className={`${styles["min-price"]} ${styles["aside-price"]}`}>
                <div className={`${styles["money-icon"]}`}>$</div>
                <div className={`${styles["min-price-value"]} ${styles["price-value"]}`}>500</div>
              </div>
              <div className={`${styles["dash"]}`}>-</div>
              <div className={`${styles["max-price"]} ${styles["aside-price"]}`}>
                <div className={`${styles["money-icon"]}`}>$</div>
                <div className={`${styles["max-price-value"]} ${styles["price-value"]}`}>100,000</div>
              </div>
            </div>
            {/* 雙滑塊本人 */}
            <div className={`${styles["price-slider"]}`}>
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
            <div className={`row ${styles["slider-minmax"]}`}>
              <div className={`col-lg-8 col-md-8  ${styles["money-min"]}`}>$500</div>
              <div className={`col-lg-3 col-md-3 ${styles["money-max"]}`}>$100,000</div>
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
