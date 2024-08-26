import React, { useState, useEffect } from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponCard from "./CouponCard";
import CouponPlusModal from "./CouponPlusModal";
import { useAuth } from "@/hooks/use-auth";

export default function CouponStorage() {
  const { auth } = useAuth(); // 取得認證資訊
  const userId = auth.userData.id; // 取得使用者 ID
  console.log(auth.userData);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true); // 初始為 true，表示正在載入
  const [error, setError] = useState(null); // 用於處理錯誤

  useEffect(() => {
    const fetchUserCoupons = async () => {
      console.log("Fetching user coupons...");
      try {
        // 模擬網絡延遲
        // await new Promise((resolve) => setTimeout(resolve, 500));

        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:3005/api/coupon/user-coupon",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("Coupons fetched:", data);
        setCoupons(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCoupons();
  }, [userId]);

  return (
    <>
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
          <a
            type="button"
            className={`${style.couponPlus}`}
            data-bs-toggle="modal"
            data-bs-target="#couponPlusModal"
          >
            領取本月會員優惠券+
          </a>
          <div className={`${style.membership} mt-2`}>
            <p className={`${style.memberP} p-2`}>白金會員</p>
          </div>
        </div>
      </div>
      <CouponPlusModal />
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
        {/* {console.log(coupons)} */}
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
      <div
        className={`${style.couponZoneSm} row d-lg-none py-4 mx-3 mt-3 mb-5`}
      >
        {/* 手機優惠券 */}
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </>
  );
}
