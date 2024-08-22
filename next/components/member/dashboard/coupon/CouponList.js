import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";

export default function CouponList() {
  return (
    <>
      <div className="col-6 px-4">
        <div className={`${style.couponCard} row align-items-center py-3`}>
          <div className={`col-auto px-2`}>
            <p className={`${style.couponC} p-2 m-0`}>夏季優惠</p>
          </div>
          <div
            className={`col`}
          >
            <p className={`${style.couponN} m-0`}>滿萬元現折350元</p>
          </div>
        </div>
      </div>
      <div className="col-3">
        <p className={`${style.couponRecordDate} py-2 m-0`}>2024.06.08</p>
      </div>
      <div className="col-3">
        <p className={`${style.couponRecordCost} py-2 m-0`}>-NT $350</p>
      </div>
    </>
  );
}
