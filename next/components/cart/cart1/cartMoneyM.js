import React from 'react';
import css from '@/components/cart/cart1/cartMoney.module.css';

export default function CartMoneyM({ totalAmount = 0, selectedCoupon }) {
    let discountAmount = 0;

    if (selectedCoupon) {
        const discount = parseFloat(selectedCoupon.coupon_discount) || 0;
        if (discount > 1) {
            discountAmount = discount;
        } else {
            discountAmount = totalAmount * (1 - discount);
        }
    }

    const finalAmount = Math.max(0, totalAmount - discountAmount);

    return (
        <div className={`container-fluid d-block d-lg-none ${css.cartTotalM}`}>
            <div className={`row ${css.cartTotalMROW}`}>
                <div className={`col-6 ${css.cartTotalML}`}>
                    <div className={css.cartTotalML1}>
                        <div>商品總計</div>
                        <div>NT$ {Math.floor(totalAmount)}</div>
                    </div>
                    <div className={css.cartTotalML2}>
                        <div>優惠折扣</div>
                        <div>- NT$ {Math.floor(discountAmount)}</div>
                    </div>
                </div>
                <div className={`col-5 ${css.cartTotalMR}`}>
                    <div className={css.cartTotalMRTitle}>總金額</div>
                    <div className={css.cartTotalMRMoney}>
                        <b>NT$ {Math.floor(finalAmount)}</b>
                    </div>
                    <div>
                        <button className={css.cartTotalMRBTN}>確認</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
