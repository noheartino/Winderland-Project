import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponCardSm from "./CouponCardSm";

export default function CouponList1() {
  return (
    <>
      <div className="col-6 px-4 my-3">
        <div className={`${style.couponCard} row align-items-center py-3 d-none d-lg-flex`}>
          <div className={`col-auto pe-0`}>
            <p className={`${style.couponC} p-2 m-0`}>夏季優惠</p>
          </div>
          <div
            className={`col p-0`}
          >
            <p className={`${style.couponN} m-0`}>滿萬元現折350元</p>
          </div>
        </div>
        <CouponCardSm />
      </div>
      <div className="col-3 my-3">
        <p className={`${style.couponRecordDate} py-2 m-0 d-none d-lg-block`}>2024.06.08</p>
        <p className={`${style.couponRecordDateSm} py-2 ps-3 m-0 d-lg-none`}>06.08</p>
      </div>
      <div className="col-3 my-3">
        <p className={`${style.couponRecordCost} py-2 m-0 d-none d-lg-block`}>-NT $350</p>
        <p className={`${style.couponRecordCostSm} py-2 m-0 d-lg-none`}>-$350</p>
      </div>
    </>
  );
}
