import React from 'react';
import css from '@/components/cart/cart1/cartMoney.module.css';

export default function CartMoney() {
  return (
    <>
      <div className={css.cartMoneyTotal}>
        <div className={css.cartMoneyTotalTitle}>訂單詳情</div>
        <div className={css.cartMoneyTotalContent}>
          <div className={css.cartContent}>
            <div>商品總計</div>
            <div>NT$ 16,980</div>
          </div>
          <div className={css.cartContent}>
            <div>優惠券</div>
            <div className={css.cartContentCoupon}>- NT$ 350</div>
          </div>
          <div className={css.cartContent}>
            <div>運費</div>
            <div>NT$ 60</div>
          </div>
          <div className={`${css.cartContent} ${css.cartContentTotal}`}>
            <div className={css.cartContentTotal1}>訂單總金額</div>
            <div className={css.cartContentTotal2}>NT$ 16,690</div>
          </div>
          <div className={css.cartContent}>
            <button className={css.confirmButton}>確認訂單</button>
          </div>
        </div>
      </div>
    </>
  );
}
