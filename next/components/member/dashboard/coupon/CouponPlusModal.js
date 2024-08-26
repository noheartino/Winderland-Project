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
  useEffect(() => {
    // 使用 fetch 從後端 API 獲取資料
    fetch("http://localhost:3005/api/coupon", {
      method: 'POST', // 使用 POST 請求
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ member_level_id: memberLevelId }), // 發送 memberLevelId 作為請求體
    })
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data); // 將資料儲存在狀態中
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });
  }, [memberLevelId]); // 依賴 memberLevelId 確保它變化時重新獲取資料


  return (
    <>
      <div
        className={`modal fade ${style.CPlusModal}`}
        id="couponPlusModal"
        tabindex="-1"
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
            {console.log(coupons)}
              {coupons.map((coupon) => (
                <CouponCardModal key={coupon.id} coupon={coupon} />
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
              <button type="button" className="btn btn-primary">
                確認領取
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
