import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";

export default function CouponCardSm() {
  return (
    <>
      {/* 一組優惠券 */}
      <div className={`col-auto d-lg-none px-3 py-2`}>
          <div className={`${style.couponCard} row px-2 py-3`}>
            <div
              className={`col d-flex justify-content-center align-items-center`}
            >
              <p className={`${style.couponNSm} m-0`}>滿萬元現折350元</p>
            </div>
          </div>
        </div>
    </>
  );
}
