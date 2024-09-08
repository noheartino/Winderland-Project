import React, { useState } from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import WPointList from "./WPointList";
import { clippingParents } from "@popperjs/core";

export default function WPointRecord({ userPointsRecord }) {
  // console.log(userPointsRecord);
  const [isUsedVisible, setIsUsedVisible] = useState(false);

  const toggleUsedVisibility = () => {
    setIsUsedVisible(!isUsedVisible);
  };
  return (
    <>
      <div className="couponRecordZone d-none d-lg-block col-lg-7 ">
        <div className={`${style.couponNav} mt-5 mb-4`}>
          <span className={`${style.CTitle} row py-2`}>
            <i className="fa-solid fa-ticket col-auto" />
            WP (W Point) 使用紀錄
            {/* <i className={`fa-solid fa-angle-down ${style.pointDown} col`} /> */}
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
              <p className={`${style.couponRecordTitle} py-2`}>獲得點數</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitle} py-2`}>日期</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitle} py-2`}>總折抵</p>
            </div>
          </div>
          <div className={`${style.couponRecordMain} row py-1`}>
            {/* {userRecordP.map((userpointdata) => (
                <WPointList
                  key={userpointdata.id}
                  userpointdata={userpointdata}
                />
              ))} */}
            {/* {console.log(userPointsRecord)} */}
            {userPointsRecord?.length > 0 &&
              userPointsRecord.map((userpointdata) => (
                <WPointList
                  key={userpointdata.id}
                  userpointdata={userpointdata}
                />
              ))}
            {/* <WPointList /> */}
          </div>
        </div>
      </div>

      {/* 手機使用紀錄 */}
      <div
        className={`couponRecordZone col-12 d-lg-none px-4 mb-5`}
        onClick={toggleUsedVisibility}
      >
        <div className={`${style.couponNav} mt-5 mb-4`}>
          <span className={`${style.CTitleSm} row py-2`}>
            <i className="fa-solid fa-ticket col-auto" />
            WP (W Point) 使用紀錄
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
            <div className="col-6">
              <p className={`${style.couponRecordTitleSm} py-2`}>獲得點數</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitleSm} ps-3 py-2`}>日期</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitleSm} py-2`}>總折抵</p>
            </div>
          </div>
          <div
            className={`${style.couponRecordMain} row`}
            style={{ maxHeight: "150px" }}
          >
            {userPointsRecord?.length > 0 &&
              userPointsRecord.map((userpointdata) => (
                <WPointList
                  key={userpointdata.id}
                  userpointdata={userpointdata}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
