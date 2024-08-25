import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponCard from "./coupon/CouponCard";
import WPointShow from "./coupon/wPointShow";
import CouponRecord from "./coupon/CouponRecord";
import CouponExpired from "./coupon/CouponExpired";
import CouponStorage from "./coupon/CouponStorage";
import WPointRecord from "./coupon/WPointRecord";

import { useAuth } from "@/hooks/use-auth";

export default function DashboardCoupon() {
  const { auth } = useAuth();
  if (!auth.isAuth || !auth.userData) {
    console.log("使用者尚未登入或用戶資料尚未載入");
    return <p>請先登入再進行評論</p>;
  }
  console.log(auth);

  return (
    <>
      <div className={`container ${style["coupon-content"]} m-0 mx-auto`}>
        {/* 優惠券倉庫 */}
        <CouponStorage />

        {/* 手機的領券的標題 */}
        <div className={`${style.couponNav} col-12 d-lg-none mt-5 mb-4`}>
          <span
            type="button"
            className={`${style.CTitle} ${style.CTitleSm} row`}
            data-bs-toggle="modal"
            data-bs-target="#couponPlusModal"
          >
            <i className="fa-solid fa-ticket col-auto" />
            領取本月會員優惠券
            <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
          </span>
        </div>
        
        

        {/* 手機領券區塊 */}
        <div
          className={`${style.couponZoneSm} row m-0 d-lg-none py-4 mx-3 mt-3 mb-5`}
        >
          <div className={`${style.couponNav} col-12 col-lg-7 px-4`}>
            <span className={`${style.CTitle} ${style.CTitleSm} row`}>
              <i className="fa-solid fa-ticket col-auto" />
              9月會員優惠券
            </span>
            <div className="row mt-2">
              <p
                className={`${style.couponLimit} ${style.couponLimitSm} col-auto`}
              >
                本用戶等級最多可本月領取5張優惠券
              </p>
            </div>
          </div>
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
        </div>

        <div className="row">
          {/* 優惠券使用紀錄 */}
          <CouponRecord />

          {/* 優惠券過期紀錄 */}
          <CouponExpired />
        </div>
        <hr
          className="d-none d-lg-block"
          style={{
            height: "6px",
            backgroundColor: "var(--light)",
            border: "none",
          }}
        />

        {/* wpoints */}
        {/* wpoints 2 nav */}
        <div className="wpoint-navbar mt-5 mx-3 row">
          <WPointShow />

          {/* 會員說明的區塊 */}
          <div
            className={`${style.couponNav} d-none d-lg-block col-lg-3 ms-auto text-end`}
          >
            <a className={`${style.couponPlus}`}>白金會員回饋比率 3.5%</a>
            <div className={`${style.membership} mt-2`}>
              <p className={`${style.memberP} p-2`}>白金會員</p>
            </div>
          </div>
        </div>

        {/* wpoints的使用紀錄 */}
        <div className="row">
          <WPointRecord />
        </div>
      </div>
    </>
  );
}
