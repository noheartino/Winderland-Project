import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponCard from "./coupon/CouponCard";
import CouponCardSm from "./coupon/CouponCardSm";
import CouponList1 from "./coupon/CouponList1";
import CouponList2 from "./coupon/CouponList2";

export default function DashboardCoupon() {
  return (
    <>
      <div className={`container ${style["coupon-content"]} m-0 mx-auto`}>
        {/* 優惠券nav */}
        {/*上面兩個title: nav */}
        <div className="coupon-navbar row my-3 d-none d-lg-flex">
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

        {/* 手機上方nav */}
        <div className="coupon-navbar row my-3 d-lg-none">
          <div className={`${style.couponNav} col-12 col-lg-7`}>
            <span className={`${style.CTitleSm} row py-2`}>
              <i className="fa-solid fa-ticket col-auto" />
              優惠券倉庫
              <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
            </span>

            <div className="row mt-2">
              <p className={`${style.couponLimitSm} col-auto`}>
                本用戶等級最多可收藏12張優惠券
              </p>
              <p className={`${style.couponAlertSm} col`}>倉庫已滿!!</p>
            </div>
          </div>
        </div>
        {/* 1 */}
        <div className={`${style.couponZone} row d-none d-lg-flex`}>
          {/* 桌機優惠券 */}
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
        </div>
        <div
          className={`${style.couponZoneSm} row d-lg-none py-4 mx-3 mt-3 mb-5`}
        >
          {/* 手機優惠券 */}
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
        </div>

        {/* 手機的領券的標題 */}
        <div className={`${style.couponNav} col-12 d-lg-none mt-5 mb-4`}>
          <span className={`${style.CTitle} ${style.CTitleSm} row`}>
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
          <div className="couponRecordZone d-none d-lg-block col-lg-7 ">
            <div className={`${style.couponNav} mt-5 mb-4 d-none d-lg-block`}>
              <span className={`${style.CTitle} row py-2`}>
                <i className="fa-solid fa-ticket col-auto" />
                優惠券使用紀錄
                <i
                  className={`fa-solid fa-angle-down ${style.pointDown} col`}
                />
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
                <i
                  className={`fa-solid fa-angle-down ${style.pointDown} col`}
                />
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
                  <p className={`${style.couponRecordTitleSm} py-2`}>
                    使用券種
                  </p>
                </div>
                <div className="col-3">
                  <p className={`${style.couponRecordTitleSm} py-2`}>日期</p>
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

          {/* 優惠券過期紀錄 */}
          <div className="couponExpiredZone d-none d-lg-block col-lg-5 px-4 ">
            <div className={`${style.couponNav} mt-5 mb-4`}>
              <span className={`${style.CTitle} row py-2`}>
                <i className="fa-solid fa-ticket col-auto" />
                已過期優惠券
                <i
                  className={`fa-solid fa-angle-down ${style.pointDown} col`}
                />
              </span>

              <div className="row mt-2">
                <p className={`${style.couponLimit} col-auto`}>
                  顯示近半年已失效優惠券
                </p>
              </div>
            </div>
            {/* 過期紀錄區塊 */}
            <div className="mx-3 mt-3 mb-5">
              <div className={`${style.couponExpiredHeader} row`}>
                <div className="col">
                  <p className={`${style.couponExpiredTitle} py-2`}>
                    已失效券種
                  </p>
                </div>
              </div>
              <div className={`${style.couponExpiredMain} row px-4`}>
                <CouponList2 />
                <CouponList2 />
                <CouponList2 />
              </div>
            </div>
          </div>

          {/* 手機過期紀錄 */}
          <div className="couponExpiredZone d-lg-none col-12 px-4 ">
            <div className={`${style.couponNav} mt-5 mb-4`}>
              <span className={`${style.CTitleSm} row py-2`}>
                <i className="fa-solid fa-ticket col-auto" />
                已過期優惠券
                <i
                  className={`fa-solid fa-angle-down ${style.pointDown} col`}
                />
              </span>

              <div className="row mt-2">
                <p className={`${style.couponLimitSm} col-auto`}>
                  顯示近半年已失效優惠券
                </p>
              </div>
            </div>
            {/* 過期紀錄區塊 */}
            <div className="mx-3 mt-3 mb-5">
              <div className={`${style.couponExpiredHeader} row`}>
                <div className="col">
                  <p className={`${style.couponExpiredTitleSm} py-2`}>
                    已失效券種
                  </p>
                </div>
              </div>
              <div
                className={`${style.couponExpiredMain} row px-4 py-1`}
                style={{ maxHeight: "160px" }}
              >
                <CouponList2 />
                <CouponList2 />
                <CouponList2 />
                <CouponList2 />
              </div>
            </div>
          </div>
        </div>
        <hr />

        {/* wpoints */}
        {/* wpoints 2 nav */}
        <div className="wpoint-navbar row my-3 d-none d-lg-flex">
          <div className={`${style.couponNav} col-12 col-lg-7`}>
            <span className={`${style.CTitle} row py-2`}>
              <i className="fa-solid fa-coins col-auto" />
              WP (W Point)
              <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
            </span>

            <div className="row mt-2">
              <p className={`${style.couponLimit} col-auto`}>
                本用戶等級為3.5%回饋，無使用期限
              </p>
            </div>

            {/* Wpoint擁有的顯示區 */}
            <div className="row my-5">
              <img
                className="col-auto"
                src="../public/images/member/wpoint.png"
              />
              <div className={`col`}>
                <h2 className={`${style.wpoint}`}>
                  W Point
                </h2>
                <div className={`${style.totalPoints}`}>1238P</div>
              </div>

            </div>
          </div>
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

        {/* 手機上方nav */}
        <div className="coupon-navbar row my-3 d-lg-none">
          <div className={`${style.couponNav} col-12 col-lg-7`}>
            <span className={`${style.CTitleSm} row py-2`}>
              <i className="fa-solid fa-ticket col-auto" />
              WP (W Point)
              <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
            </span>

            <div className="row mt-2">
              <p className={`${style.couponLimitSm} col-auto`}>
                本用戶等級為3.5%回饋，無使用期限
              </p>
            </div>
          </div>
        </div>
        {/* 優惠券頁面代碼結尾 */}
      </div>
    </>
  );
}
