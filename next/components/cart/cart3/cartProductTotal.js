import React from 'react';
import css from '@/components/cart/cart3/cartProductTotal.module.css';

export default function CartProductTotal() {
  return (
    <>
      <div>
        <div className={css.cartProductBox3}>
          <div className={css.cartProductImg3}>
            <img src="/images/cart/wine.png" alt="" />
          </div>
          <div>
            <div className={css.cartProductOrderBox3}>
              <div className={`${css.orderNumber3} ${css.orderNumber1}`}>
                <b>總件數</b>
              </div>
              <div className={`${css.orderPay3} ${css.orderPay1}`}>
                <b>付款方式</b>
              </div>
              <div className={`${css.orderStatus3} ${css.orderStatus1}`}>
                <b>狀態</b>
              </div>
              <div className={`${css.orderTotal3} ${css.orderTotal1}`}>
                <b>總金額</b>
              </div>
            </div>
            <div className={css.cartProductOrderLine3} />
            <div className={css.cartProductOrderBox3}>
              <div className={`${css.orderNumber3} ${css.orderNumber2}`}>共3件</div>
              <div className={`${css.orderPay3} ${css.orderPay2}`}>
                貨到付款
                <br />
                7-11
              </div>
              <div className={`${css.orderStatus3} ${css.orderStatus2}`}>出貨準備中</div>
              <div className={`${css.orderTotal3} ${css.orderTotal2}`}>NT$ 16,690</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
