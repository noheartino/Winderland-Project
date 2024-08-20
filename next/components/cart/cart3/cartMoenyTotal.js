import React from 'react';
import css from '@/components/cart/cart3/cartMoneyTotal.module.css';

export default function CartMoneyTotal() {
    return (
        <>
            <div className={css.cartMoneyTotal3}>
                <div className={css.cartMoneyTotalTitle3}>結帳詳情</div>
                <div className={css.cartMoneyTotalContent3}>
                    <div className={css.cartContent3}>
                        <div>結帳日期</div>
                        <div>2024.06.12</div>
                    </div>
                    <div className={css.cartContent3}>
                        <div>訂單編號</div>
                        <div className={css.cartContentCoupon}>#a171</div>
                    </div>
                    <div className={css.cartContent3}>
                        <div>總折抵</div>
                        <div>- NT$ 1,350</div>
                    </div>
                    <div className={`${css.cartContent3} ${css.cartContentTotal1}`}>
                        <div className={css.cartContentTotal1}>實付金額</div>
                        <div className={css.cartContentTotal2}>NT$ 15,690</div>
                    </div>
                </div>
            </div>
        </>
    );
}
