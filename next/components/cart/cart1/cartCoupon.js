import React from 'react';
import css from '@/components/cart/cart1/cartCoupon.module.css';

export default function CartCoupon() {
  return (
    <>
      <div className={css.cartMoneyCoupon}>
        <div className={css.cartMoneyCouponText}>
          <button>
            <i className="fa-solid fa-ticket" /> 挑選優惠券
          </button>
        </div>
        <div className={css.cartMoneyCouponDetail}>
          <div className={css.cartCoupon}>* 使用中的優惠券</div>
          <div className={css.cartCouponBox}>
            <div className={css.cartCoupon1}>
              <div className={css.cartCoupon1Box}>夏季優惠</div>
              <div className={css.cartCouponText}>滿萬元折350元</div>
            </div>
            <div className={css.cartCouponDel}>
              <button>✕</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

