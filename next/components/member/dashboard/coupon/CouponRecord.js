import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponList1 from "./CouponList1";

export default function CouponRecord() {
  return (
    <>
      <div className="couponRecordZone d-none d-lg-block col-lg-7 ">
        <div className={`${style.couponNav} mt-5 mb-4 d-none d-lg-block`}>
          <span className={`${style.CTitle} row py-2`}>
            <i className="fa-solid fa-ticket col-auto" />
            優惠券使用紀錄
            <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
          </span>

          <div className="row mt-2">
            <p className={`${style.couponLimit} col-auto`}>
              保存半年內使用紀錄，逾期不顯示
            </p>
          </div>
        </div>
        {/* 使用紀錄區塊 */}
        <div className="mx-3 mt-3 mb-5">
          <div className={`${style.couponRecordHeader} row`}>
            <div className="col-6">
              <p className={`${style.couponRecordTitle} py-2`}>使用券種</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitle} py-2`}>日期</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitle} py-2`}>總折抵</p>
            </div>
          </div>
          <div className={`${style.couponRecordMain} row py-1`}>
            <CouponList1 />
            <CouponList1 />
            <CouponList1 />
          </div>
        </div>
      </div>

      {/* 手機使用紀錄 */}
      <div className="couponRecordZone col-12 d-lg-none">
        <div className={`${style.couponNav} mt-5 mb-4`}>
          <span className={`${style.CTitleSm} row py-2`}>
            <i className="fa-solid fa-ticket col-auto" />
            優惠券使用紀錄
            <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
          </span>

          <div className="row mt-2">
            <p className={`${style.couponLimitSm} col-auto`}>
              保存半年內使用紀錄，逾期不顯示
            </p>
          </div>
        </div>
        {/* 使用紀錄區塊 */}
        <div className="mx-4 mt-3 mb-5">
          <div className={`${style.couponRecordHeader} row`}>
            <div className="col-6">
              <p className={`${style.couponRecordTitleSm} py-2`}>使用券種</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitleSm} py-2 ps-3`}>日期</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitleSm} py-2`}>總折抵</p>
            </div>
          </div>
          <div
            className={`${style.couponRecordMain} row`}
            style={{ maxHeight: "150px" }}
          >
            <CouponList1 />
            <CouponList1 />
            <CouponList1 />
          </div>
        </div>
      </div>
    </>
  );
}
