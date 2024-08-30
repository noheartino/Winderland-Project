import React, { useState, useEffect } from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import { HiOutlineTicket } from "react-icons/hi";
import CouponPlusCard from "./CouponPlusCard";

export default function CouponPlusSm({
  userId,
  freeCoupon,
  setUserGetCoupons,
}) {
  const [isAllVisible, setIsAllVisible] = useState(false);

  const toggleAllVisibility = () => {
    setIsAllVisible(!isAllVisible);
  };

  const [plusCoupons, setplusCoupons] = useState([]);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [claimedCoupons, setClaimedCoupons] = useState([]);
  const [usedClaimedCoupons, setUsedClaimedCoupons] = useState([]);
  useEffect(() => {
    // 取得所有優惠券的資料
    fetch("http://localhost:3005/api/coupon")
      .then((response) => response.json())
      .then((data) => {
        setplusCoupons(data);
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });

    // 獲取用戶已經領取的優惠券
    fetch(`http://localhost:3005/api/coupon/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const userCoupons = data.userCoupons;
        // console.log(userCoupons)
        const usedClaimedCouponIds = userCoupons
          .filter((coupon) => coupon.status === "used") // 只選擇 status 為 'used' 的資料
          .map((coupon) => coupon.coupon_id); // 提取 coupon_id
        // console.log(usedClaimedCouponIds)
        // 過濾出 status 為 'get' 的優惠券
        const claimedCouponIds = userCoupons
          .filter((coupon) => coupon.status === "get") // 只選擇 status 為 'get' 的資料
          .map((coupon) => coupon.coupon_id); // 提取 coupon_id
        // console.log(claimedCouponIds)

        setUsedClaimedCoupons(usedClaimedCouponIds);
        setClaimedCoupons(claimedCouponIds);
      })
      .catch((error) => {
        console.error("Error fetching user coupons:", error);
      });
  }, [userId]);

  // 新增到會員擁有的優惠券空陣列
  const handleCouponSelect = (coupon) => {
    setSelectedCoupons((prevSelected) => {
      // 如果該優惠券已經被選擇，就將其從選擇列表中移除，否則加入
      if (prevSelected.find((c) => c.id === coupon.id)) {
        return prevSelected.filter((c) => c.id !== coupon.id);
      } // 如果選擇的優惠券數量未超過限制，則加入到選擇列表中
      else if (prevSelected.length < freeCoupon - claimedCoupons.length) {
        return [...prevSelected, coupon];
      }
      // 否則保持原有的選擇列表
      else {
        alert(`最多只能選擇 ${freeCoupon} 張優惠券`);
        return prevSelected;
      }
    });
  };

  const handleConfirm = async () => {
    if (selectedCoupons.length === 0) {
      alert("請先選擇優惠券");
      return;
    }
    // 更改日期格式
    const formatDate = (date) => {
      return date.toISOString().slice(0, 19).replace("T", " ");
    };
    try {
      const response = await fetch(
        "http://localhost:3005/api/coupon/save-coupons",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            coupons: selectedCoupons.map((coupon) => ({
              coupon_id: coupon.id,
              status: "get",
              get_at: formatDate(new Date()), // 當前時間
            })),
          }),
        }
      );

      const result = await response.json();
      if (response.ok && result.status === "success") {
        alert("優惠券領取成功");

        // 更新父層的 coupons 狀態
        setUserGetCoupons((prevCoupons) => [
          ...prevCoupons,
          ...selectedCoupons.map((coupon) => ({
            ...coupon,
            status: "get",
            get_at: formatDate(new Date()),
          })),
        ]);

        setSelectedCoupons([]); // 清空選擇列表

        // 重新 fetch 用戶已經領取的優惠券
        fetch(`http://localhost:3005/api/coupon/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            const userCoupons = data.userCoupons;
            const usedClaimedCouponIds = userCoupons
              .filter((coupon) => coupon.status === "used") // 只選擇 status 為 'used' 的資料
              .map((coupon) => coupon.coupon_id); // 提取 coupon_id
            // 過濾出 status 為 'get' 的優惠券
            const claimedCouponIds = userCoupons
              .filter((coupon) => coupon.status === "get") // 只選擇 status 為 'get' 的資料
              .map((coupon) => coupon.coupon_id); // 提取 coupon_id
            // console.log(claimedCouponIds)
            setUsedClaimedCoupons(usedClaimedCouponIds);
            setClaimedCoupons(claimedCouponIds);
          })
          .catch((error) => {
            console.error("Error fetching user coupons:", error);
          });
      } else {
        throw new Error(result.message || "領取失敗");
      }
    } catch (error) {
      console.error("領取優惠券時發生錯誤：", error);
      alert("發生錯誤，請稍後再試");
    }
  };
  // console.log(claimedCoupons);
  return (
    <>
      <div className="couponPlusZoneSm row d-lg-none">
        <div
          className={`${style.couponNav} col-12 px-4`}
          onClick={toggleAllVisibility}
        >
          <span
            type="button"
            className={`${style.CTitle} ${style.CTitleSm} row py-2`}
          >
            <HiOutlineTicket
              className="col-auto pe-0"
              style={{ fontSize: "20px" }}
            />
            <p className="col m-0">領取本月會員優惠券</p>
            <i className={`fa-solid fa-angle-down ${style.pointDown} col`} />
          </span>
          <div className="row mt-2">
            <p
              className={`${style.couponLimit} ${style.couponLimitSm} col-auto`}
            >
              可選擇
              {freeCoupon - claimedCoupons.length - selectedCoupons.length}
              張優惠券
            </p>
          </div>
        </div>
      </div>
      {/* 手機領券區塊 */}
      <div
        className={`${style.couponZoneSm} row d-lg-none py-4 mx-3 mt-3 ${
          isAllVisible ? style.showGetCoupon : style.hideGetCoupon
        }`}
      >
        <div className={`${style.couponNav} col-12`}>
          <span className={`${style.CTitle} ${style.CTitleSm} row py-2`}>
            <HiOutlineTicket
              className="col-auto pe-0"
              style={{ fontSize: "20px" }}
            />
            <p className="col m-0">9月會員優惠券</p>
          </span>
        </div>
        {/* {console.log(usedClaimedCoupons)} */}
        {plusCoupons.map((coupon) => (
          <CouponPlusCard
            key={coupon.id}
            coupon={coupon}
            onSelect={handleCouponSelect}
            isClaimed={claimedCoupons.includes(coupon.id)}
            isUsed={usedClaimedCoupons.includes(coupon.id)}
            isSelected={selectedCoupons.some(
              (selectedCoupon) => selectedCoupon.id === coupon.id
            )}
          />
        ))}
      </div>
      <div className="row px-5">
        <button
          type="button"
          className={`btn btn-primary col py-2 border-0 ${
            isAllVisible ? style.showGetCoupon : style.hideGetCoupon
          }`}
          style={{ fontSize: "18px", background:"var(--primary)" }}
          onClick={handleConfirm}
        >
          確認領取
        </button>
      </div>
    </>
  );
}
