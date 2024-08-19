import React from 'react';
import css from '@/components/cart/cart1/cartMoney.module.css';

export default function CartMoney({ totalAmount = 0, coupons = [] }) { // 設置默認值
    // 計算折扣金額
    let discountAmount = 0;

    // 只有在选中优惠券时才计算
    if (Array.isArray(coupons) && coupons.length > 0) {
        discountAmount = coupons.reduce((total, coupon) => {
            const discount = parseFloat(coupon.discount) || 0; // 确保为有效数字
            return discount > 1 ? total + discount : total + (total * discount); // 根据优惠券的折扣类型计算
        }, 0); // 在优惠券为空时设置为0
    }

    // 計算最終金額
    const finalAmount = totalAmount - discountAmount;

    return (
        <div className={css.cartMoneyTotal}>
            <div className={css.cartMoneyTotalTitle}>訂單詳情</div>
            <div className={css.cartMoneyTotalContent}>
                <div className={css.cartContent}>
                    <div>商品總計</div>
                    <div>NT$ {Math.floor(totalAmount)}</div> {/* 去掉小数点 */}
                </div>
                <div className={css.cartContent}>
                    <div>優惠券</div>
                    <div className={css.cartContentCoupon}>- NT$ {Math.floor(discountAmount)}</div> {/* 去掉小数点 */}
                </div>
                <div className={`${css.cartContent} ${css.cartContentTotal}`}>
                    <div className={css.cartContentTotal1}>訂單總金額</div>
                    <div className={css.cartContentTotal2}>NT$ {Math.max(0, Math.floor(finalAmount))}</div> {/* 非负金额 */}
                </div>
                <div className={css.cartContent}>
                    <button className={css.confirmButton}>確認訂單</button>
                </div>
            </div>
        </div>
    );
}
