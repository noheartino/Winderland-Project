import React from "react";
import css from "@/components/cart/cartObject/cartCouponDetail.module.css";

export default function CartCouponDetail({ category, name }) {
  return (
    <div className={css.cartCoupon1}>
      <div className={css.cartCoupon1Box}>{category}</div> {/* 顯示優惠券類別 */}
      <div className={css.cartCouponText}>{name}</div> {/* 顯示優惠券名稱 */}
    </div>
  );
}
