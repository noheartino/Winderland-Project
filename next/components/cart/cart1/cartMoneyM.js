import React from 'react';
import css from '@/components/cart/cart1/cartMoney.module.css';

export default function CartMoneyM() {
  return (
    <>
      <div className={`container-fluid d-block d-lg-none ${css.cartTotalM}`}>
        <div className={`row ${css.cartTotalMROW}`}>
          <div className={`col-6 ${css.cartTotalML}`}>
            <div className={css.cartTotalML1}>
              <div>商品總計</div>
              <div>NT$ 15,999</div>
            </div>
            <div className={css.cartTotalML2}>
              <div>優惠折扣</div>
              <div>- NT$ 350</div>
            </div>
            <div className={css.cartTotalML3}>
              <div>運費</div>
              <div>NT$ 60</div>
            </div>
          </div>
          <div className={`col-5 ${css.cartTotalMR}`}>
            <div className={css.cartTotalMRTitle}>總金額</div>
            <div className={css.cartTotalMRMoney}>
              <b>NT$ 15,999</b>
            </div>
            <div>
              <button className={css.cartTotalMRBTN}>確認</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
