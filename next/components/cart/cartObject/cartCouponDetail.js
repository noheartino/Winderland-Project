import React from "react";
import css from "@/components/cart/cartObject/cartCouponDetail.module.css";

export default function CartCouponDetail({ category, name }) {
  console.log('Category in CartCouponDetail:', category); // 確認 category 是否傳遞正確

  return (
    <div className={css.cartCoupon1}>
      <div className={css.cartCoupon1Box}>{category || '無'}</div> {/* 顯示優惠券類別 */}
      <div className={css.cartCouponText}>{name}</div> {/* 顯示優惠券名稱 */}
    </div>
  );
}
