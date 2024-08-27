import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";

export default function CouponCardSm({couponsm}) {
  
  if (!couponsm || !couponsm.id) {
    // 如果 coupon 或 coupon.id 不存在，返回 null 或其他佔位符內容
    return null;
  }
  // console.log(couponsm)
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
  const couponcss = getCategoryClass(couponsm.category);
  return (
    <>
      {/* 一組優惠券 */}
      <div className={`col-12 d-lg-none px-3 py-2`}>
          <div className={`${style.couponCard} row px-2 py-3 ${couponcss.cardClass}`}>
            <div
              className={`col d-flex justify-content-center align-items-center`}
            >
              <p className={`${style.couponNSm} m-0`}>{couponsm.name}</p>
            </div>
          </div>
        </div>
    </>
  );
}
