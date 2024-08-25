import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";

export default function CouponCardModal({ coupon }) {
  const getCategoryClass = (category) => {
    switch (category) {
      case "倍數折扣":
        return {
          cardClass: style.couponDiscountCard,
          categoryClass: style.couponDiscountCategory,
        };
      default:
        return {
          cardClass: "",
          categoryClass: "",
        };
    }
  };
  const couponcss = getCategoryClass(coupon.category);

  return (
    <>
      {/* 一組優惠券 */}

      <div className={`col-9 px-5 py-3`}>
        <div
          className={`${
            style.couponCard
          } row align-items-center py-3 ${couponcss.cardClass}`}
        >
          <div className={`col-auto pe-0`}>
            <p className={`${style.couponC} p-2 m-0 ${couponcss.categoryClass}`}>{coupon.category}</p>
          </div>
          <div className={`col p-0`}>
            <p className={`${style.couponN} m-0`}>{coupon.name}</p>
          </div>
        </div>
      </div>
      <a className={`${style.plusBottom} col-auto`}>+領取</a>
    </>
  );
}
