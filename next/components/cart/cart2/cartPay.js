import React from 'react';
import css from '@/components/cart/cart2/cartPay.module.css';

export default function CartPay() {
  return (
    <>
      <div className={css.payDetail}>
        <div className={css.payDetailTitle}>訂單詳情</div>
        <div className={css.payDetailContent}>
          <div className={css.payContent1}>
            <div>付款方式</div>
            <div>信用卡付款(7-11)</div>
          </div>
          <div className={css.payContent1}>
            <div>總金額</div>
            <div>NT$ 16,690</div>
          </div>
          <div className={css.payContent1}>
            <div>
              <div>W Point 折抵</div>
              <div className={css.payWpoint}>*W point 折抵新台幣1:1</div>
            </div>
            <div>
              <div className={css.payContentWpoint}>-NT$ 1,000</div>
              <div className={css.payWpoint}>- WP 1,000P</div>
            </div>
          </div>
          <div className={`${css.payContent1} ${css.payContentTotal}`}>
            <div className={css.payContentTotal1}>實付金額</div>
            <div className={css.payContentTotal2}>NT$ 15,690</div>
          </div>
          <div className={css.payContent1}>
            <button>前往結帳</button>
          </div>
        </div>
      </div>
    </>
  );
}
