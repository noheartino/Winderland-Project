import React from "react";
import css from '@/components/cart/cart3/cartPayDividend.module.css';

export default function CartPayDividend() {
  return (
    <>
      <div className={css.payDividendTotal}>
        <div className={css.payDividendTitle}>紅利</div>
        <div className={css.payDividendContent}>
          <div className={css.dividendContent}>
            <div>W Point</div>
            <div className={css.dividendWpoint}>549 P</div>
          </div>
          <div className={css.dividendDetail}>總回饋W Point比率 3.5%</div>
        </div>
      </div>
    </>
  );
}
