import React from "react";
import css from '@/components/cart/cart2/cartTransport.module.css';

export default function CartTransport({ addressLabel = "門市選擇", hideSelectButton = false }) {
    return (
        <div className={css.transportContent}>
            <div className={css.transportContent1}>
                <div className={css.transportContent2}>
                    <div>{addressLabel}</div>
                    <div>
                        <input type="text" className={css.transportstore} />
                    </div>
                </div>
                {!hideSelectButton && (
                    <div className={css.payContent2}>
                        <button>選擇</button>
                    </div>
                )}
            </div>
            <div className={css.transportContent1}>
                <div className={css.transportContent2}>
                    <div>取貨姓名</div>
                    <div>
                        <input type="text" className={css.transportname} />
                    </div>
                </div>
                <div>
                    <div>取貨手機號碼</div>
                    <div>
                        <input type="text" className={css.transportphone} />
                    </div>
                </div>
            </div>
        </div>
    );
}
