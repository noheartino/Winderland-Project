import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponList2 from "./CouponList2";

export default function CouponExpired({userId}) {
  return (
    <>
      <div className="couponExpiredZone d-none d-lg-block col-lg-5 px-4 ">
            <div className={`${style.couponNav} mt-5 mb-4`}>
              <span className={`${style.CTitle} row py-2`}>
                <i className="fa-solid fa-ticket col-auto" />
                已過期優惠券
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
    </>
  )
}
