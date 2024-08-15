import React from 'react';
import css from '@/components/cart/cart1/cartCoupon.module.css';

export default function CartCouponM() {
  return (
    <>
      <div className={css.cartCouponMBox}>
        <div className={css.cartCouponMTitle}>
          <i className="fa-solid fa-ticket" /> 挑選優惠券
        </div>
        <div className={`row ${css.cartCouponMDetail} gap-3`}>
          <button className={`col-4 ${css.cartCouponM} ${css.cartCouponM0}`}>
            滿萬元折350元
          </button>
          <button className={`col-4 ${css.cartCouponM2} ${css.cartCouponM0}`}>
            酒類商品85折
          </button>
          <button className={`col-4 ${css.cartCouponM3} ${css.cartCouponM0}`}>
            任商品折50元
          </button>
        </div>
      </div>
    </>
  );
}
