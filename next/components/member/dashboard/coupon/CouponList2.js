import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponCardSm from "./CouponCardSm";

export default function CouponList2({coupon}) {
  return (
    <>
      <div className="col-12 px-4 my-3">
        <div
          className={`${style.couponCard} row align-items-center py-3`}
          style={{
            background: "linear-gradient(90deg, #CDCDCD 0%, #737373 100%)",
          }}
        >
          <div className={`col-auto pe-0`}>
            <p className={`${style.couponC} p-2 m-0`} style={{background: "var(--text_gray)"}}>{coupon.category}</p>
          </div>
          <div className={`col p-0`}>
            <p className={`${style.couponN} m-0`}>{coupon.name}</p>
          </div>
        </div>
        {/* <CouponCardSm /> */}
      </div>
    </>
  );
}
