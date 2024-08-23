import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";

export default function CouponCard() {
  return (
    <>
      {/* 一組優惠券 */}
      <div className={`col-12 col-lg-4 px-5 py-3`}>
        <div className={`${style.couponCard} row align-items-center py-3`}>
          <div className={`col-auto pe-0`}>
            <p className={`${style.couponC} p-2 m-0`}>夏季優惠</p>
          </div>
          <div className={`col p-0`}>
            <p className={`${style.couponN} m-0`}>滿萬元現折350元</p>
          </div>
        </div>
      </div>
    </>
  );
}
