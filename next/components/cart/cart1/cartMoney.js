import React from 'react';
import { useRouter } from 'next/router';
import css from '@/components/cart/cart1/cartMoney.module.css';

export default function CartMoney({ totalAmount = 0, selectedCoupon, userId }) {
  const router = useRouter();
  let discountAmount = 0;

  if (selectedCoupon) {
    const discount = parseFloat(selectedCoupon.coupon_discount) || 0;
    discountAmount = discount > 1 ? discount : totalAmount * (1 - discount);
  }

  const finalAmount = Math.max(0, totalAmount - discountAmount);

  const confirmOrder = () => {
    // 存儲資料到 sessionStorage
    sessionStorage.setItem('user_id', userId);
    sessionStorage.setItem('totalAmount', totalAmount);
    sessionStorage.setItem('discountAmount', discountAmount);
    sessionStorage.setItem('finalAmount', finalAmount);

    // 跳轉到 CartCheckout2 頁
    router.push('/cart/cartCheckout2');
  };

  return (
    <div className={css.cartMoneyTotal}>
      <div className={css.cartMoneyTotalTitle}>訂單詳情</div>
      <div className={css.cartMoneyTotalContent}>
        <div className={css.cartContent}>
          <div>商品總計</div>
          <div>NT$ {Math.floor(totalAmount)}</div>
        </div>
        <div className={css.cartContent}>
          <div>優惠券</div>
          <div className={css.cartContentCoupon}>- NT$ {Math.floor(discountAmount)}</div>
        </div>
        <div className={`${css.cartContent} ${css.cartContentTotal}`}>
          <div className={css.cartContentTotal1}>訂單總金額</div>
          <div className={css.cartContentTotal2}>NT$ {Math.floor(finalAmount)}</div>
        </div>
        <div className={css.cartContent}>
          <button className={css.confirmButton} onClick={confirmOrder}>確認訂單</button>
        </div>
      </div>
    </div>
  );
}
