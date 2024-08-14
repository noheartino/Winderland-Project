import React from "react";
import css from "@/components/cart/cart1/cartClass.module.css";

export default function CartClass() {
  return (
    <>
      <div className={`d-flex ${css.cartClassBox}`}>
        <div className={css.cartClassImg}>
          <img src="/images/cart/class.jfif" alt="Product Image" />
        </div>
        <div className={css.cartClassContent}>
          <div className={css.cartClassContentTitle}>
            <b>迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解</b>
          </div>
          <div className={css.cartClassContentText}>
            <div className={css.cartOnline}>線上</div>
            <div className={css.cartTeacher}>By 王淇</div>
          </div>
          <div className={css.cartClassContentMoney}>
            <div />
            <div className={css.cartMoneyAll}>
              <div className={css.cartMoney}>NT$ 3,500</div>
              <div className={css.cartMoneyOff}>NT$ 5,500</div>
            </div>
          </div>
        </div>
        <div className={css.cartClassDel}>
          <button>✕</button>
        </div>
      </div>
    </>
  );
}
