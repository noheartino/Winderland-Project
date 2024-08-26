import React, { useState, useEffect } from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponCardModal from "./CouponCardModal";
import { useAuth } from "@/hooks/use-auth";

export default function CouponPlusModal() {
  // 這邊是使用hooks的useAuth測試
  const { auth } = useAuth(); // 取得認證資訊
  const userId = auth.userData.id; // 取得使用者 ID
  const memberLevelId = auth.userData.member_level_id; // 取得會員等級 ID

  const [coupons, setCoupons] = useState([]);
  const [selectedCoupons, setSelectedCoupons] = useState([]);

  useEffect(() => {
    // 使用 fetch 從後端 API 獲取資料
    fetch("http://localhost:3005/api/coupon")
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data); // 將資料儲存在狀態中
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });
  }, []); // 依賴 memberLevelId 確保它變化時重新獲取資料

  // 新增到user_coupon
  const handleCouponSelect = (coupon) => {
    setSelectedCoupons((prevSelected) => {
      // 如果該優惠券已經被選擇，就將其從選擇列表中移除，否則加入
      if (prevSelected.find((c) => c.id === coupon.id)) {
        return prevSelected.filter((c) => c.id !== coupon.id);
      } else {
        return [...prevSelected, coupon];
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
      return date.toISOString().slice(0, 19).replace('T', ' ');
    };
    try {
      const response = await fetch("http://localhost:3005/api/coupon/save-coupons", {
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
      });
  
      const result = await response.json();
      if (response.ok && result.status === "success") {
        alert("優惠券領取成功");
        setSelectedCoupons([]); // 清空選擇列表
      } else {
        throw new Error(result.message || "領取失敗");
      }
    } catch (error) {
      console.error("領取優惠券時發生錯誤：", error);
      alert("發生錯誤，請稍後再試");
    }
  };

  return (
    <>
      <div
        className={`modal fade ${style.CPlusModal}`}
        id="couponPlusModal"
        tabIndex="-1"
        aria-labelledby="couponPlusModalLabel"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-dialog-centered modal-dialog-scrollable`}
        >
          <div className={`modal-content ${style.CModalContent}`}>
            <div className="modal-header border-0">
              <div className={`${style.couponNav} px-4`}>
                <span className={`${style.CTitle}`}>
                  <i className="fa-solid fa-ticket" />
                  9月會員優惠券
                </span>
                <div className="mt-2">
                  <p className={`${style.couponLimit} m-0`}>
                    本用戶等級最多可本月領取5張優惠券
                  </p>
                </div>
              </div>
              {/* 關閉的地方 */}
              <button
                type="button"
                className={`btn-close ${style.cModalClose}`}
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            {/* 電腦領取modal */}
            <div className="modal-body row align-items-center">
              {/* {console.log(selectedCoupons)} */}
              {coupons.map((coupon) => (
                <CouponCardModal
                  key={coupon.id}
                  coupon={coupon}
                  onSelect={handleCouponSelect}
                  isChecked={selectedCoupons.some((c) => c.id === coupon.id)}
                />
              ))}
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirm}
              >
                確認領取
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
