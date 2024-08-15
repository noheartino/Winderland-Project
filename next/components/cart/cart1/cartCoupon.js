import React, { useState } from "react";
import css from "@/components/cart/cart1/cartCoupon.module.css";
import CartCouponAll from "@/components/cart/cartObject/cartCouponAll"; // 引入彈跳視窗組件
import CartCouponDetail from "../cartObject/cartCouponDetail";

export default function CartCoupon() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
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
          <div className={css.cartCouponBox}>
            <CartCouponDetail />
            <div className={css.cartCouponDel}>
              <button>✕</button>
            </div>
          </div>
        </div>
      </div>

      {/* 使用 CartCouponAll 作為彈跳視窗 */}
<CartCouponAll isOpen={isOpen} onClose={toggleModal}>
  <div className="container">
    <div className={css.cartModalTitle}>
      <i className="fa-solid fa-ticket" /> 優惠券倉庫
    </div>
    <div className={css.cartModalAmount}>優惠券數量: 12</div>
    
    {/* 將這裡的內容放在同一行中 */}
    <div className="row justify-content-between align-items-center">
      <div className="col-10">
        <div className={css.cartModalCoupon}>
          <CartCouponDetail />
        </div>
      </div>
      <div className="col-2 d-flex justify-content-end align-items-center">
        <div className={css.cartModalUse}>
          <button>使用 +</button>
        </div>
      </div>
      <div className="col-10">
        <div className={css.cartModalCoupon}>
          <CartCouponDetail />
        </div>
      </div>
      <div className="col-2 d-flex justify-content-end align-items-center">
        <div className={css.cartModalUse}>
          <button>使用 +</button>
        </div>
      </div>
      <div className="col-10">
        <div className={css.cartModalCoupon}>
          <CartCouponDetail />
        </div>
      </div>
      <div className="col-2 d-flex justify-content-end align-items-center">
        <div className={css.cartModalUse}>
          <button>使用 +</button>
        </div>
      </div>
      <div className="col-10">
        <div className={css.cartModalCoupon}>
          <CartCouponDetail />
        </div>
      </div>
      <div className="col-2 d-flex justify-content-end align-items-center">
        <div className={css.cartModalUse}>
          <button>使用 +</button>
        </div>
      </div>
      <div className="col-10">
        <div className={css.cartModalCoupon}>
          <CartCouponDetail />
        </div>
      </div>
      <div className="col-2 d-flex justify-content-end align-items-center">
        <div className={css.cartModalUse}>
          <button>使用 +</button>
        </div>
      </div>
    </div>
  </div>
  {/* 在這裡可以嵌入其他優惠券的元件或內容 */}
</CartCouponAll>
    </>
  );
}
