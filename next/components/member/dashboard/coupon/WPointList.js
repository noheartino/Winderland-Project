import React from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import Image from "next/image";

export default function WPointList({userpointdata}) {
  // console.log(userpointdata)
  return (
    <>
      <div className="col-6 px-1 my-2">
        <div
          className={`${style.wpointCard} row align-items-center py-3 d-none d-lg-flex`}
        >
          <div className={`col-auto pe-0 row align-items-center ms-1`}>
            <Image
              className="col-auto"
              src="/images/member/wpoint.png"
              alt="wpoint"
              width={50}
              height={50}
            />
            <p className={`${style.listWpoint} m-0 p-0 col`}>W Point</p>
            <div className={`${style.listUsedPoint} m-0 col`}> {userpointdata.earned_points}P</div>
            </div>
          {/* <div className={`col d-flex justify-content-end ps-0`}>
          </div> */}
        </div>
        {/* 手機 */}
        <div
          className={`${style.wpointCard} row align-items-center py-4 d-lg-none`}
        >
          <div className={`col-auto pe-0 ms-1 row align-items-center`}>
            <Image
              className="col-auto"
              src="/images/member/wpoint.png"
              alt="wpoint"
              width={30}
              height={30}
            />
            <p className={`${style.listWpoint} m-0 p-0 col`} style={{fontSize:"10px"}}>W Point</p>
            <div className={`${style.listUsedPoint} m-0 col`} style={{fontSize:"14px"}}>{userpointdata.earned_points}P</div>
          </div>
          {/* <div className={`col d-flex justify-content-end ps-0`}>
          </div> */}
        </div>
      </div>
      <div className="col-3 my-2">
        <p className={`${style.couponRecordDate} py-2 m-0 d-none d-lg-block`}>
          {userpointdata.fullDate}
        </p>
        <p className={`${style.couponRecordDateSm} ps-3 py-2 m-0 d-lg-none`}>
          {userpointdata.monthDay}
        </p>
      </div>
      <div className="col-3 my-2">
        <p className={`${style.couponRecordCost} py-2 m-0 d-none d-lg-block`}>
          -NT ${userpointdata.pointUsed}
        </p>
        <p className={`${style.couponRecordCostSm} py-2 m-0 d-lg-none`}>
          -${userpointdata.pointUsed}
        </p>
      </div>
    </>
  );
}
