import React, { useState, useEffect } from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponCard from "./CouponCard";
import CouponPlusModal from "./CouponPlusModal";
import { FaRegSadTear } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi";

export default function CouponStorage({
  userId,
  freeCoupon,
  memberLevelName,
  userGetCoupons,
  setUserGetCoupons
}) {

  const [isGetVisible, setIsGetVisible] = useState(true);

  const toggleGetVisibility = () => {
    setIsGetVisible(!isGetVisible);
  };

  return (
    <>
      {/* 優惠券nav */}
      {/*上面兩個title: nav */}
      <div className="coupon-navbar row my-3 d-none d-lg-flex">
        <div className={`${style.couponNav} col-12 col-lg-7`}>
          <span className={`${style.CTitle} row py-2`}>
            <HiOutlineTicket className="col-auto" style={{fontSize:"26px"}}/>
            <p className="col m-0 p-0">優惠券倉庫</p>
            <i
              className={`d-lg-none fa-solid fa-angle-down ${style.pointDown} col`}
            />
          </span>

          <div className="row mt-2">
            <p className={`${style.couponLimit} col-auto`}>
              本用戶等級最多可收藏{freeCoupon}張優惠券
            </p>
            {userGetCoupons.length == freeCoupon && (
              <p className={`${style.couponAlert} col`}>倉庫已滿!!</p>
            )}
          </div>
        </div>
        {/* 領券的區塊 */}
        <div
          className={`${style.couponNav} d-none d-lg-block col-lg-3 ms-auto text-end`}
        >
          <a
            type="button"
            className={`${style.couponPlus}`}
            data-bs-toggle="modal"
            data-bs-target="#couponPlusModal"
          >
            領取本月會員優惠券+
          </a>
          {/* {console.log(coupons)} */}
          <div className={`${style.membership} mt-2`}>
            {<p className={`${style.memberP} p-2`}>{memberLevelName}會員</p>}
          </div>
        </div>
      </div>
      <CouponPlusModal
        userId={userId}
        freeCoupon={freeCoupon}
        setUserGetCoupons={setUserGetCoupons}
      />
      {/* 手機上方nav */}
      <div className="coupon-navbar row my-3 d-lg-none">
        <div className={`${style.couponNav} col-12 col-lg-7 px-4`}>
          <span className={`${style.CTitleSm} row py-2`} onClick={toggleGetVisibility}>
            <HiOutlineTicket className="col-auto" style={{fontSize:"20px"}}/>
            優惠券倉庫
            <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
          </span>

          <div className="row mt-2">
            <p className={`${style.couponLimitSm} col-auto`}>
              本用戶等級最多可收藏{freeCoupon}張優惠券
            </p>
            {userGetCoupons.length == freeCoupon && (
              <p className={`${style.couponAlertSm} col`}>倉庫已滿!!</p>
            )}
          </div>
        </div>
      </div>
      {/* 1 */}
      <div className={`${style.couponZone} row d-none d-lg-flex`}>
        {/* 桌機優惠券 */}
        {/* {console.log(userGetCoupons)} */}
        {userGetCoupons.length === 0 ? (
          <p
            className={`col m-0 py-4 d-flex align-items-center justify-content-center`}
            style={{ fontSize: "24px", color: "var(--wine)" }}
          >
            <FaRegSadTear className="me-2" /> 還沒有優惠券
          </p>
        ) : (
          userGetCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))
        )}
      </div>
      
      <div
        className={`${style.couponZoneSm} row d-lg-none py-4 mx-3 mt-3 mb-5 ${
          isGetVisible ? style.showGetCoupon : style.hideGetCoupon
        }`}
      >
        {/* 手機優惠券 */}
        {userGetCoupons.length === 0 ? (
          <p
            className={`col m-0 py-4 d-flex align-items-center justify-content-center`}
            style={{ fontSize: "16px", color: "var(--wine)" }}
          >
            <FaRegSadTear className="me-2" /> 還沒有優惠券
          </p>
        ) : (
          userGetCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))
        )}
      </div>
    </>
  );
}
