import React from "react";
import css from "@/components/cart/cartObject/cartCouponDetail.module.css";

export default function CartCouponDetail({ category, name }) {
  const isAmountDiscount = category === "金額折扣";
  
  return (
    <div
      className={`${css.cartCoupon1} ${isAmountDiscount ? css.amountDiscount : css.multiplierDiscount}`}
    >
      <div
        className={`${css.cartCoupon1Box} ${isAmountDiscount ? css.amountDiscountBox : css.multiplierDiscountBox}`}
      >
        {category || '無'}
      </div>
      <div className={css.cartCouponText}>{name}</div>
    </div>
  );
}
