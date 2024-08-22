import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponCard from "./coupon/CouponCard";
import CouponCardSm from "./coupon/CouponCardSm";
import CouponList from "./coupon/CouponList";

export default function DashboardCoupon() {
  return (
    <>
      <div className={`container ${style["coupon-content"]} m-0 mx-auto`}>
        {/* 優惠券頁面nav */}
        {/*上面兩個title: nav */}
        <div className="coupon-navbar row my-3">
          <div className={`${style.couponNav} col-12 col-lg-7`}>
            <span className={`${style.CTitle} row py-2`}>
              <i className="fa-solid fa-ticket col-auto" />
              優惠券倉庫
              <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
            </span>

            <div className="row mt-2">
              <p className={`${style.couponLimit} col-auto`}>
                本用戶等級最多可收藏12張優惠券
              </p>
              <p className={`${style.couponAlert} col`}>倉庫已滿!!</p>
            </div>
          </div>
          {/* 領券的區塊 */}
          <div
            className={`${style.couponNav} d-none d-lg-block col-lg-3 ms-auto text-end`}
          >
            <a className={`${style.couponPlus}`}>領取本月會員優惠券+</a>
            <div className={`${style.membership} mt-2`}>
              <p className={`${style.memberP} p-2`}>白金會員</p>
            </div>
          </div>
        </div>

        {/* 1 */}
        <div className={`${style.couponZone} row m-0 d-none d-lg-flex`}>
          {/* 桌機優惠券 */}
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
        </div>
        <div
          className={`${style.couponZoneSm} row m-0 d-lg-none p-4 mx-3 mt-3 mb-5`}
        >
          {/* 手機優惠券 */}
          <CouponCardSm />
          <CouponCardSm />
          <CouponCardSm />
          <CouponCardSm />
        </div>

        {/* 手機的領券的標題 */}
        <div className={`${style.couponNav} col-12 d-lg-none mt-5 mb-4`}>
          <span className={`${style.CTitle} row`}>
            <i className="fa-solid fa-ticket col-auto" />
            領取本月會員優惠券
            <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
          </span>
        </div>

        {/* 手機領券區塊 */}
        <div
          className={`${style.couponZoneSm} row m-0 d-lg-none p-4 mx-3 mt-3 mb-5`}
        >
          <div className={`${style.couponNav} col-12 col-lg-7`}>
            <span className={`${style.CTitle} row`}>
              <i className="fa-solid fa-ticket col-auto" />
              9月會員優惠券
            </span>
            <div className="row mt-2">
              <p className={`${style.couponLimit} col-auto`}>
                本用戶等級最多可本月領取5張優惠券
              </p>
            </div>
          </div>
          <CouponCardSm />
          <CouponCardSm />
          <CouponCardSm />
          <CouponCardSm />
        </div>

        {/* 優惠券使用紀錄 */}
        <div className={`${style.couponNav} col-12 col-lg-7 mt-5 mb-4`}>
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
        <div className="col-lg-7 mx-3 mt-3 mb-5">
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
          <div className={`${style.couponRecordMain} row py-4`}>
            <CouponList />
          </div>
        </div>

        <hr />
        {/* wpoints */}
        <div className="wPoints">
          <div className="wp-text d-flex">
            <div className="wp-title d-flex">
              <i className="fa-solid fa-coins" />
              <span className={`${style.WTitle}`}>W Points</span>
              <div className="wp-t d-flex">
                <p className="wp-limit">本用戶等級為3.5%回饋，無使用期限</p>
              </div>
            </div>
            <div className="wp-detail">
              <p>白金會員回饋比率 3.5%</p>
              <div className="membership">白金會員</div>
            </div>
          </div>
          <div className={`${style.point} d-flex`}>
            <div className="point-img" />
            <div className="point-text">
              <p>W Points</p>
              <span className={`${style.totalWpoints}`}>1328 P</span>
            </div>
          </div>
        </div>
        {/* 優惠券頁面代碼結尾 */}
      </div>
    </>
  );
}
