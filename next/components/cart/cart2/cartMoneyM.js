import React from 'react';
import css from '@/components/cart/cart2/cartMoney.module.css';

export default function CartMoneyM() {
    return (
        <>
            <div className={`container-fluid d-block d-lg-none ${css.cartTotalM2}`}>
                <div className={`row ${css.cartTotalMROW2}`}>
                    <div className={`col-6 ${css.cartTotalML2}`}>
                        <div className={css.cartTotalML1}>
                            <div>付款方式</div>
                            <div>信用卡付款(7-11)</div>
                        </div>
                        <div className={css.cartTotalML2}>
                            <div>總金額</div>
                            <div>NT$ 16,690</div>
                        </div>
                        <div className={css.cartTotalML3}>
                            <div>
                                <div>W Point折抵</div>
                                <div className={css.cartTotalML3Detail}>
                                    *W Point折抵新台幣1:1
                                </div>
                            </div>
                            <div>- 1000P</div>
                        </div>
                    </div>
                    <div className={`col-6 ${css.cartTotalMR2}`}>
                        <div className={css.cartTotalMRTitle2}>實付金額</div>
                        <div className={css.cartTotalMRMoney2}>
                            <b>NT$ 15,690</b>
                        </div>
                        <div>
                            <button className={css.cartTotalMRBTN2}>確認</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
