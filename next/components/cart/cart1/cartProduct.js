import React from "react";
import css from "@/components/cart/cart1/cartProduct.module.css";

export default function CartProduct() {
  return (
    <>
      <div className={`d-flex ${css.cartProductBox}`}>
        <div className={css.cartProductImg}>
          <img src="/images/cart/wine.png" alt="Product" />
        </div>
        <div className={css.cartProductContent}>
          <div className={css.cartProductContentTitle}>
            <b>皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園紅酒 2017</b>
          </div>
          <div className={css.cartProductContentMoney}>
            <div className={css.cartNumber} />
            <div className={css.cartMoney}>NT$ 5,999</div>
          </div>
          <div className={css.cartProductContentFormat}>
            <div>750ml / 法國</div>
            <div>2017年</div>
          </div>
        </div>
        <div className={css.cartProductDel}>
          <button>✕</button>
        </div>
      </div>
    </>
  );
}
