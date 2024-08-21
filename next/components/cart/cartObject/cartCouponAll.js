// src/components/cart/cartObject/cartCouponAll.js
import React from 'react';
import css from './cartCouponAll.module.css'; // 使用 CSS 模組

export default function CartCouponAll({ isOpen, onClose, children }) {
  if (!isOpen) return null; // 如果未打開，返回 null

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}>
          &times; {/* 關閉按鈕 */}
        </button>
        {children} {/* 傳遞的內容 */}
      </div>
    </div>
  );
}
