import React from "react";
import css from '@/components/cart/cart2/cartTransport.module.css';

export default function CartTransport() {
    return (
        <>
            <div className={css.transportContent}>
                <div className={css.transportContent1}>
                    <div className={css.transportContent2}>
                        <div>門市選擇</div>
                        <div>
                            <input type="text" className={css.transportstore} />
                        </div>
                    </div>
                    <div className={css.payContent2}>
                        <button>選擇</button>
                    </div>
                </div>
                <div className={css.transportContent1}>
                    <div className={css.transportContent2}>
                        <div>取貨姓名</div>
                        <div>
                            <input type="text" className={css.transportname} />
                        </div>
                    </div>
                    <div className="">
                        <div>取貨手機號碼</div>
                        <div>
                            <input type="text" className={css.transportphone} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
