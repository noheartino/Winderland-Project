import React from 'react';
import css from '@/components/cart/cart1/cartMoney.module.css';

export default function CartMoney({ totalAmount = 0, selectedCoupon }) {
    let discountAmount = 0;

    if (selectedCoupon) {
        const discount = parseFloat(selectedCoupon.coupon_discount) || 0;
        // 當 discount 大於 1 時，表示是直接金額；當小於 1 時，表示是折扣百分比
        if (discount > 1) {
            discountAmount = discount;
        } else {
            discountAmount = totalAmount * (1 - discount);
        }
    }

    const finalAmount = Math.max(0, totalAmount - discountAmount);

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
                    <button className={css.confirmButton}>確認訂單</button>
                </div>
            </div>
        </div>
    );
}
