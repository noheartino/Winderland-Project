import React, { useState, useEffect } from "react";
import css from "@/components/cart/cart1/cartCoupon.module.css";
import CartCouponAll from "@/components/cart/cartObject/cartCouponAll"; // 引入彈跳視窗組件
import CartCouponDetail from "../cartObject/cartCouponDetail"; // 引入優惠券細節組件

export default function CartCoupon({ userId, onCouponChange, totalAmount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // 切換彈跳視窗的開關
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // 獲取用戶的優惠券
  const fetchCoupons = async () => {
    try {
      const response = await fetch(`http://localhost:3005/api/cart/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Coupons:", data.coupons); // 檢查優惠券數據
        setCoupons(data.coupons);
      } else {
        console.error("請求優惠券失敗:", await response.json());
      }
    } catch (error) {
      console.error("獲取優惠券時發生錯誤:", error);
    }
  };

  // 在組件掛載時獲取優惠券
  useEffect(() => {
    fetchCoupons();
  }, [userId]);

  // 使用優惠券
  const handleUseCoupon = (coupon) => {
    const minSpend = parseFloat(coupon.min_spend) || 0; // 確保 min_spend 是數值
    console.log('Total Amount:', totalAmount); // 輸出總金額
    console.log('Min Spend:', minSpend); // 輸出最低消費金額
    
    if (totalAmount >= minSpend) {
      setSelectedCoupon(coupon); // 設置選中的優惠券
      toggleModal(); // 根據需求關閉彈窗
      onCouponChange(coupon); // 通知父組件更新優惠券
    } else {
      alert(`購物車金額需達到 NT$${minSpend} 才能使用此優惠券。`);
    }
  };

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null);
    onCouponChange(null); // 清除優惠券，通知父組件更新金額
  };

  // 監控 selectedCoupon 和 totalAmount 的變化，並根據 min_spend 自動移除優惠券
  useEffect(() => {
    if (selectedCoupon) {
      const minSpend = parseFloat(selectedCoupon.min_spend) || 0;
      if (totalAmount < minSpend) {
        handleRemoveCoupon();
      }
    }
  }, [totalAmount, selectedCoupon]);

  // 監控 selectedCoupon 的變化
  useEffect(() => {
    console.log('Selected Coupon Updated:', selectedCoupon);
  }, [selectedCoupon]);

  return (
    <>
      <div className={css.cartMoneyCoupon}>
        <div className={css.cartMoneyCouponText}>
          <button onClick={toggleModal}>
            <i className="fa-solid fa-ticket" /> 挑選優惠券
          </button>
        </div>
        <div className={css.cartMoneyCouponDetail}>
          <div className={css.cartCoupon}>* 使用中的優惠券</div>
          {selectedCoupon ? (
            <div className={css.cartCouponBox}>
              <CartCouponDetail
                category={selectedCoupon.coupon_category} // 顯示類別
                name={selectedCoupon.coupon_name} // 顯示名稱
              />
              {console.log(selectedCoupon)}
              <div className={css.cartCouponDel}>
                <button onClick={handleRemoveCoupon}>✕</button>
              </div>
            </div>
          ) : (
            <div></div> // 當沒有選擇的優惠券時留空
          )}
        </div>
      </div>

      {coupons.length > 0 && (
        <CartCouponAll isOpen={isOpen} onClose={toggleModal}>
          <div className="container">
            <div className={css.cartModalTitle}>
              <i className="fa-solid fa-ticket" /> 優惠券倉庫
            </div>
            {coupons.map((coupon) => (
              <div
                key={coupon.coupon_id}
                className="row justify-content-between align-items-center"
              >
                <div className="col-10">
                  {/* 僅當優惠券有有效的名稱或類別時才顯示 CartCouponDetail */}
                  {coupon.coupon_name && coupon.coupon_category ? (
                    <div className={css.cartModalCoupon}>
                      <CartCouponDetail
                        category={coupon.coupon_category}
                        name={coupon.coupon_name}
                      />
                    </div>
                  ) : (
                    <div className={css.cartModalCoupon}>
                      {/* 顯示優惠券資訊為空的情況 */}
                      <div>沒有優惠券</div>
                    </div>
                  )}
                </div>
                <div className="col-2 d-flex justify-content-end align-items-center">
                  <div className={css.cartModalUse}>
                    <button onClick={() => handleUseCoupon(coupon)}>
                      使用 +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CartCouponAll>
      )}
    </>
  );
}
