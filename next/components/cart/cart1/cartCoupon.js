import React, { useState, useEffect } from "react";
import css from "@/components/cart/cart1/cartCoupon.module.css";
import CartCouponAll from "@/components/cart/cartObject/cartCouponAll"; // 引入彈跳視窗組件
import CartCouponDetail from "../cartObject/cartCouponDetail"; // 引入優惠券細節組件

export default function CartCoupon({ userId, onCouponChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    // 切換彈跳視窗的開關
    const toggleModal = () => {
        setIsOpen(prev => !prev);
    };

    // 獲取用戶的優惠券
    const fetchCoupons = async () => {
        try {
            const response = await fetch(`http://localhost:3005/api/cart/${userId}`);
            if (response.ok) {
                const data = await response.json();

                const formattedCoupons = data.items.flatMap(item => {
                    const ids = item.coupon_ids.split(',');
                    const names = item.coupon_names.split(',');
                    const discounts = item.coupon_discounts.split(',');
                    const categories = item.coupon_categories.split(',');

                    // 将三个数组合并为对象数组
                    return names.map((name, index) => ({
                        id: ids[index] || Math.random(),
                        category: categories[index] || "未指定",
                        coupon_name: name || "未指定",
                        discount: discounts[index]
                    }));
                });

                setCoupons(formattedCoupons);
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
      setSelectedCoupon(coupon); // 选择的优惠券
      toggleModal(); // 根据需求关闭弹窗
      onCouponChange(coupon); // 通知父组件更新金额
  };
  
  const handleRemoveCoupon = () => {
      setSelectedCoupon(null);
      onCouponChange(null); // 清除优惠券，通知父组件更新金额
  };
  
    
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
                                category={selectedCoupon.category} // 顯示類別
                                name={selectedCoupon.coupon_name} // 顯示名稱
                            />
                            <div className={css.cartCouponDel}>
                                <button onClick={handleRemoveCoupon}>✕</button>
                            </div>
                        </div>
                    ) : (
                        <div></div> // 當沒有選擇的優惠券時留空
                    )}
                </div>
            </div>

            <CartCouponAll isOpen={isOpen} onClose={toggleModal}>
                <div className="container">
                    <div className={css.cartModalTitle}>
                        <i className="fa-solid fa-ticket" /> 優惠券倉庫
                    </div>
                    {coupons.length > 0 ? (
                        coupons.map(coupon => (
                            <div key={coupon.id} className="row justify-content-between align-items-center">
                                <div className="col-10">
                                    <div className={css.cartModalCoupon}>
                                        <CartCouponDetail
                                            category={coupon.category} // 顯示類別
                                            name={coupon.coupon_name} // 顯示名稱
                                        />
                                    </div>
                                </div>
                                <div className="col-2 d-flex justify-content-end align-items-center">
                                    <div className={css.cartModalUse}>
                                        <button onClick={() => handleUseCoupon(coupon)}>
                                            使用 +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>沒有可用的優惠券</div>
                    )}
                </div>
            </CartCouponAll>
        </>
    );
}
