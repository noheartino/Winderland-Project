import React, { useState } from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponList2 from "./CouponList2";
import { FaRegSmile } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi";

export default function CouponExpired({ userExpiredCoupons }) {
  const [isExpiredVisible, setIsExpiredVisible] = useState(false);

  const toggleExpiredVisibility = () => {
    setIsExpiredVisible(!isExpiredVisible);
  };
  return (
    <>
      <div className="couponExpiredZone d-none d-lg-block col-lg-5 px-4 ">
        <div className={`${style.couponNav} mt-5 mb-4`}>
          <span className={`${style.CTitle} row py-2`}>
            <HiOutlineTicket
              className="col-auto"
              style={{ fontSize: "26px" }}
            />
            <p className="col m-0 p-0">已過期優惠券</p>
            <i
              className={`d-lg-none fa-solid fa-angle-down ${style.pointDown} col`}
            />
          </span>

          <div className="row mt-2">
            <p className={`${style.couponLimit} col-auto`}>
              顯示近半年已失效優惠券
            </p>
          </div>
        </div>
        {/* 過期紀錄區塊 */}
        <div className={`mx-3 mt-3 mb-5 ${style.couponExpiredContent}`}>
          <div className={`${style.couponExpiredHeader} row`}>
            <div className="col">
              <p className={`${style.couponExpiredTitle} py-2`}>已失效券種</p>
            </div>
          </div>
          <div className={`${style.couponExpiredMain} row px-4 py-1`}>
            {userExpiredCoupons.length === 0 ? (
              <p
                className={`col m-0 py-4 d-flex align-items-center justify-content-center`}
                style={{ fontSize: "24px", color: "var(--wine)" }}
              >
                <FaRegSmile className="me-2" /> 沒有過期紀錄
              </p>
            ) : (
              userExpiredCoupons.map((coupon) => (
                <CouponList2 key={coupon.id} coupon={coupon} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* 手機過期紀錄 */}
      <div
        className="couponExpiredZone d-lg-none col-12 px-4 mb-5"
        onClick={toggleExpiredVisibility}
      >
        <div className={`${style.couponNav} mt-5 mb-4`}>
          <span className={`${style.CTitleSm} row py-2`}>
            <HiOutlineTicket
              className="col-auto pe-0"
              style={{ fontSize: "20px" }}
            />
            <p className="col m-0">已過期優惠券</p>
            <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
          </span>

          <div className="row mt-2">
            <p className={`${style.couponLimitSm} col-auto`}>
              顯示近半年已失效優惠券
            </p>
          </div>
        </div>
        {/* 過期紀錄區塊 */}
        <div
          className={`mx-3 mt-3 mb-5 ${style.couponExpiredContent} ${
            isExpiredVisible ? style.showExpired : style.hideExpired
          }`}
        >
          <div className={`${style.couponExpiredHeader} row`}>
            <div className="col">
              <p className={`${style.couponExpiredTitleSm} py-2`}>已失效券種</p>
            </div>
          </div>
          <div
            className={`${style.couponExpiredMain} row px-4 py-1`}
            style={{ maxHeight: "160px" }}
          >
            {userExpiredCoupons.length === 0 ? (
              <p
                className={`col m-0 py-4 d-flex align-items-center justify-content-center`}
                style={{ fontSize: "16px", color: "var(--wine)" }}
              >
                <FaRegSmile className="me-2" /> 沒有過期紀錄
              </p>
            ) : (
              userExpiredCoupons.map((coupon) => (
                <CouponList2 key={coupon.id} coupon={coupon} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
