import React from "react";
import css from '@/components/cart/cart3/cartProductDetail.module.css';

export default function CartProductDetail() {
  return (
    <>
      <div className={css.cartProductDetailList}>
        <div className={css.cartProductDetailImg}>
          <img src="/images/cart/wine.png" alt="" />
        </div>
        <div className={css.cartProductDetailContent}>
          <div className={css.cartProductDetailContentTitle}>
            <b>皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園紅酒 2017</b>
          </div>
          <div className={css.cartProductDetailContentMoney}>
            <div className={css.cartProductDetailContentFormat}>
              <div className={css.formatDetail}>
                <div className={css.formatCc}>750ml</div>&nbsp;/&nbsp;
                <div className={css.formatCounty}>法國</div>
              </div>
              <div className={css.formatYear}>2017年</div>
            </div>
            <div className={css.cartDetailMoney}>NT$ 5,999</div>
          </div>
        </div>
        <div className={css.cartProductAmount}>
          <b>1</b>
        </div>
        <div className={css.cartSubtotal}>NT$5,999</div>
      </div>
    </>
  );
}
