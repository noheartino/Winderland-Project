import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";

export default function CouponCard() {
  return (
    <>
      {/* 一組優惠券 */}
      <div className={`d-none d-lg-block col-lg-4 px-4 py-2`}>
          <div className={`${style.couponCard} row p-3`}>
            <div className={`col-auto`}>
              <p className={`${style.couponC} p-2 m-0`}>夏季優惠</p>
            </div>
            <div
              className={`col d-flex justify-content-center align-items-center`}
            >
              <p className={`${style.couponN} m-0`}>滿萬元現折350元</p>
            </div>
          </div>
        </div>
    </>
  );
}
