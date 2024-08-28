import React, { useEffect, useState } from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponList1 from "./CouponList1";
import CouponList1sm from "./CouponList1sm";
import { FaRegSadTear } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi";

export default function CouponRecord({ userUsedCoupons }) {
  const [isUsedVisible, setIsUsedVisible] = useState(false);

  const toggleUsedVisibility = () => {
    setIsUsedVisible(!isUsedVisible);
  };
  return (
    <>
      <div className="couponRecordZone d-none d-lg-block col-lg-7 ">
        <div className={`${style.couponNav} mt-5 mb-4 d-none d-lg-block`}>
          <span className={`${style.CTitle} row py-2`}>
            <HiOutlineTicket
              className="col-auto"
              style={{ fontSize: "26px" }}
            />
            <p className="col m-0 p-0">優惠券使用紀錄</p>
            <i
              className={`d-lg-none fa-solid fa-angle-down ${style.pointDown} col`}
            />
          </span>

          <div className="row mt-2">
            <p className={`${style.couponLimit} col-auto`}>
              保存半年內使用紀錄，逾期不顯示
            </p>
          </div>
        </div>
        {/* 使用紀錄區塊 */}
        <div className={`${style.couponRecordContent} mx-3 mt-3 mb-5`}>
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
            {userUsedCoupons.length === 0 ? (
              <p
                className={`col m-0 py-4 d-flex align-items-center justify-content-center`}
                style={{ fontSize: "24px", color: "var(--wine)" }}
              >
                <FaRegSadTear className="me-2" /> 沒有使用紀錄
              </p>
            ) : (
              userUsedCoupons.map((coupon) => (
                <CouponList1 key={coupon.id} coupon={coupon} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* 手機使用紀錄 */}
      <div
        className={`couponRecordZone col-12 d-lg-none px-4`}
        onClick={toggleUsedVisibility}
      >
        <div className={`${style.couponNav} mt-5 mb-4`}>
          <span className={`${style.CTitleSm} row py-2`}>
            <HiOutlineTicket
              className="col-auto pe-0"
              style={{ fontSize: "20px" }}
            />
            <p className="col m-0">優惠券使用紀錄</p>
            <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
          </span>

          <div className="row mt-2">
            <p className={`${style.couponLimitSm} col-auto`}>
              保存半年內使用紀錄，逾期不顯示
            </p>
          </div>
        </div>
        {/* 使用紀錄區塊 */}
        <div
          className={`${style.couponRecordContent} mx-4 mt-3 mb-5 ${
            isUsedVisible ? style.showRecord : style.hideRecord
          }`}
        >
          <div className={`${style.couponRecordHeader} row`}>
            <div className="col-7">
              <p className={`${style.couponRecordTitleSm} py-2`}>使用券種</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitleSm} py-2 ps-3`}>日期</p>
            </div>
            <div className="col-2">
              <p className={`${style.couponRecordTitleSm} py-2`}>總折抵</p>
            </div>
          </div>
          <div
            className={`${style.couponRecordMain} row py-1`}
            style={{ maxHeight: "150px" }}
          >
            {userUsedCoupons.length === 0 ? (
              <p
                className={`col m-0 py-4 d-flex align-items-center justify-content-center`}
                style={{ fontSize: "16px", color: "var(--wine)" }}
              >
                <FaRegSadTear className="me-2" /> 沒有使用紀錄
              </p>
            ) : (
              userUsedCoupons.map((coupon) => (
                <CouponList1sm key={coupon.id} coupon={coupon} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
