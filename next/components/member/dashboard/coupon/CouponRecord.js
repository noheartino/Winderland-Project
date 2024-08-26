import React, { useEffect, useState } from 'react';
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponList1 from "./CouponList1";
import { useAuth } from "@/hooks/use-auth";

export default function CouponRecord({userId}) {
  // const { auth } = useAuth(); // 取得認證資訊
  // const userId = auth.userData.id; // 取得使用者 ID
  // console.log(userId)

  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCoupons() {
      try {
        const response = await fetch('http://localhost:3005/api/coupon/used-coupon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCoupons(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCoupons();
  }, [userId]);

  return (
    <>
      <div className="couponRecordZone d-none d-lg-block col-lg-7 ">
        <div className={`${style.couponNav} mt-5 mb-4 d-none d-lg-block`}>
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
          {/* {console.log(coupons)} */}
          {coupons.map(coupon=>(<CouponList1 key={coupon.id} coupon={coupon} coupons={coupons} />))}
          </div>
        </div>
      </div>

      {/* 手機使用紀錄 */}
      <div className="couponRecordZone col-12 d-lg-none">
        <div className={`${style.couponNav} mt-5 mb-4`}>
          <span className={`${style.CTitleSm} row py-2`}>
            <i className="fa-solid fa-ticket col-auto" />
            優惠券使用紀錄
            <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
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
              <p className={`${style.couponRecordTitleSm} py-2`}>使用券種</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitleSm} py-2 ps-3`}>日期</p>
            </div>
            <div className="col-3">
              <p className={`${style.couponRecordTitleSm} py-2`}>總折抵</p>
            </div>
          </div>
          <div
            className={`${style.couponRecordMain} row`}
            style={{ maxHeight: "150px" }}
          >
            {coupons.map(coupon=>(<CouponList1 key={coupon.id} coupon={coupon} coupons={coupons} />))}
          </div>
        </div>
      </div>
    </>
  );
}
