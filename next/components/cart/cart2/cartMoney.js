import React from 'react';
import css from '@/components/cart/cart2/cartMoney.module.css';

export default function CartMoney() {
    return (
        <>
            <div className={css.cartMoneyTotal2}>
                <div className={css.cartMoneyTotalTitle2}>總金額</div>
                <div className={css.cartMoneyTotalContent2}>
                    <div className={css.cartContent2}>
                        <div>商品總計</div>
                        <div>NT$ 16,980</div>
                    </div>
                    <div className={css.cartContent2}>
                        <div>優惠券</div>
                        <div className={css.cartContentCoupon2}>- NT$ 350</div>
                    </div>
                    <div className={css.cartContent2}>
                        <div>運費</div>
                        <div>NT$ 60</div>
                    </div>
                    <div className={`${css.cartContent2} ${css.cartContentTotal1-2}`}>
                        <div className={css.cartContentTotal1}>總金額</div>
                        <div className={css.cartContentTotal2}>NT$ 16,690</div>
                    </div>
                </div>
            </div>
        </>
    );
}

