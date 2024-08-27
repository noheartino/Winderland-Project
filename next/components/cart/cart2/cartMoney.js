import React, { useEffect, useState } from 'react';
import css from '@/components/cart/cart2/cartMoney.module.css';

export default function CartMoney() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const shippingCost = 60; // 固定運費

  useEffect(() => {
    // 從 sessionStorage 讀取資料
    const storedTotalAmount = Math.floor(parseFloat(sessionStorage.getItem('totalAmount')) || 0);
    const storedDiscountAmount = Math.floor(parseFloat(sessionStorage.getItem('discountAmount')) || 0);
    const storedFinalAmount = Math.floor(parseFloat(sessionStorage.getItem('finalAmount')) || 0);

    setTotalAmount(storedTotalAmount);
    setDiscountAmount(storedDiscountAmount);
    setFinalAmount(storedFinalAmount);
  }, []);

  // 計算包含運費的最終金額
  const finalTotalAmount = Math.floor(finalAmount + shippingCost);

  return (
    <div className={css.cartMoneyTotal2}>
      <div className={css.cartMoneyTotalTitle2}>總金額</div>
      <div className={css.cartMoneyTotalContent2}>
        <div className={css.cartContent2}>
          <div>商品總計</div>
          <div>NT$ {totalAmount.toLocaleString()}</div>
        </div>
        <div className={css.cartContent2}>
          <div>優惠券</div>
          <div className={css.cartContentCoupon2}>- NT$ {discountAmount.toLocaleString()}</div>
        </div>
        <div className={css.cartContent2}>
          <div>運費</div>
          <div>NT$ {shippingCost.toLocaleString()}</div>
        </div>
        <div className={`${css.cartContent2} ${css.cartContentTotal1-2}`}>
          <div className={css.cartContentTotal1}>總金額</div>
          <div className={css.cartContentTotal2}>NT$ {finalTotalAmount.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
