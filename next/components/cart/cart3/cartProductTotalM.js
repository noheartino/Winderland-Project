import React from 'react';
import css from '@/components/cart/cart3/cartProductTotal.module.css';

export default function CartProductTotalM() {
  return (
    <>
      <div className={css.cartProductBox3M}>
        <div className={css.cartProductImg3M}>
          <img src="/images/cart/wine.png" alt="" />
        </div>
        <div className={css.cartProductOrderBox3M}>
          <div className={css.cartProductOrderBox3ML}>
            <div className={css.orderNumber1M}>
              <b>總件數</b>
            </div>
            <div className={css.orderPay1M}>
              <b>付款方式</b>
            </div>
            <div className={css.orderStatus1M}>
              <b>狀態</b>
            </div>
            <div className={css.orderTotal1M}>
              <b>總金額</b>
            </div>
          </div>
          <div>
            <div className={css.orderNumber2M}>共12件</div>
            <div className={css.orderPay2M}>貨到付款(7-11)</div>
            <div className={css.orderStatus2M}>出貨準備中</div>
            <div className={css.orderTotal2M}>NT$ 171,996</div>
          </div>
        </div>
      </div>
    </>
  );
}

