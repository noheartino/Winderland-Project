import React from "react";
import css from '@/components/cart/cartObject/cartCouponDetail.module.css'

export default function CartCouponDetail() {
  return (
    <>
      <div className={css.cartCoupon1}>
        <div className={css.cartCoupon1Box}>夏季優惠</div>
        <div className={css.cartCouponText}>滿萬元折350元</div>
      </div>
    </>
  );
}
