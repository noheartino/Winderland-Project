import React from 'react';
import css from '@/components/cart/cart1/cartMoney.module.css';

export default function CartMoney({ totalAmount }) {
  const discount = 350; // 假设的固定优惠
  const finalAmount = totalAmount - discount; // 计算最终金额

  return (
    <>
      <div className={css.cartMoneyTotal}>
        <div className={css.cartMoneyTotalTitle}>訂單詳情</div>
        <div className={css.cartMoneyTotalContent}>
          <div className={css.cartContent}>
            <div>商品總計</div>
            <div>NT$ {totalAmount}</div> {/* 显示计算出的总金额 */}
          </div>
          <div className={css.cartContent}>
            <div>優惠券</div>
            <div className={css.cartContentCoupon}>- NT$ {discount}</div> {/* 显示固定的优惠 */}
          </div>
          <div className={`${css.cartContent} ${css.cartContentTotal}`}>
            <div className={css.cartContentTotal1}>訂單總金額</div>
            <div className={css.cartContentTotal2}>NT$ {finalAmount}</div> {/* 显示最终金额 */}
          </div>
          <div className={css.cartContent}>
            <button className={css.confirmButton}>確認訂單</button>
          </div>
        </div>
      </div>
    </>
  );
}
