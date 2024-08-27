import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import Image from "next/image";

export default function WPointShow() {
  return (
    <>
      {/* 電腦 */}
      <div className="col-lg-7 d-none d-lg-flex">
        <div className={`${style.couponNav}`}>
          <span className={`${style.CTitle} row py-2`}>
            <i className="fa-solid fa-coins col-auto" />
            WP (W Point)
          </span>

          <div className="row mt-2">
            <p className={`${style.couponLimit} col-auto`}>
              本用戶等級為3.5%回饋，無使用期限
            </p>
          </div>

          {/* Wpoint擁有的顯示區 */}
          <div className="row my-5">
            <Image
              className="col-auto"
              src="/images/member/wpoint.png"
              alt="wpoint"
              width={180}
              height={180}
            />
            <div className={`col py-3`}>
              <h2 className={`${style.wpoint}`}>W Point</h2>
              <div className={`${style.totalPoints}`}>1238P</div>
            </div>
          </div>
        </div>
      </div>

      {/* 手機 */}
      <div className="col d-lg-none p-4" style={{backgroundColor: "#f5f5f5", borderRadius: "3px"}}>
        <div className={`${style.couponNav}`}>
          <span className={`${style.CTitleSm} row py-2`}>
            <i className="fa-solid fa-ticket col-auto" />
            WP (W Point)
          </span>

          <div className="row mt-2">
            <p className={`${style.couponLimitSm} col-auto`}>
              本用戶等級為3.5%回饋，無使用期限
            </p>
          </div>
          {/* Wpoint擁有的顯示區 */}
          <div className="row my-5 px-3">
            <Image
              className="col-auto"
              src="/images/member/wpoint.png"
              alt="描述圖片的替代文字"
              width={100}
              height={100}
            />
            <div className={`col py-3`}>
              <h2 className={`${style.wpoint}`} style={{fontSize: "20px"}}>W Point</h2>
              <div className={`${style.totalPoints}`} style={{fontSize: "40px"}}>1238P</div>
            </div>
          </div>
        </div>
      </div>
      {/* 手機 */}
    </>
  );
}
