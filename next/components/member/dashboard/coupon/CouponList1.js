import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponCardSm from "./CouponCardSm";

export default function CouponList1({ coupon }) {
  if (!coupon || !coupon.id) {
    // 如果 coupon 或 coupon.id 不存在，返回 null 或其他佔位符內容
    return null;
  }
  // console.log(coupon)
  const getCategoryClass = (category) => {
    switch (category) {
      case "倍數折扣":
        return {
          cardClass: style.couponDiscountCard,
          categoryClass: style.couponDiscountCategory,
        };
      case "金額折扣":
        return {
          cardClass: style.couponCard,
          categoryClass: style.couponC,
        };
      default:
        return {
          cardClass: "",
          categoryClass: "",
        };
    }
  };
  // console.log(coupons)
  const couponcss = getCategoryClass(coupon.category);

  const date = new Date(coupon.used_at);
  const formattedDate = date.toISOString().split("T")[0];
  const [year, month, day] = formattedDate.split('-');
  const formattedNoYear = `${month}-${day}`;
  // console.log(formattedNoYear);

  return (
    <>
      <div className="col-6 px-4 my-3">
        <div
          className={`row align-items-center py-3 d-none d-lg-flex ${couponcss.cardClass}`}
        >
          <div className={`col-auto pe-0`}>
            <p
              className={`p-2 m-0 ${couponcss.categoryClass}`}
            >
              {coupon.category}
            </p>
          </div>
          <div className={`col p-0`}>
            <p className={`${style.couponN} m-0`}>{coupon.name}</p>
          </div>
        </div>
      </div>
      <div className="col-3 my-3">
        <p className={`${style.couponRecordDate} py-2 m-0 d-none d-lg-block`}>
         {formattedDate}
        </p>
        {/* <p className={`${style.couponRecordDateSm} py-2 ps-3 m-0 d-lg-none`}>
          {formattedNoYear}
        </p> */}
      </div>
      <div className="col-3 my-3">
        <p className={`${style.couponRecordCost} py-2 m-0 d-none d-lg-block`}>
          -NT ${coupon.coupon_amount}
        </p>
        {/* <p className={`${style.couponRecordCostSm} py-2 m-0 d-lg-none`}>
          -$ {coupon.coupon_amount}
        </p> */}
      </div>
    </>
  );
}
