import React from "react";
import css from "@/components/cart/cart2/cartTransport.module.css";

export default function CartTransportBlackCatM() {
  return (
    <div className={css.transportContent}>
      <div className={css.transportContent1}>
        <div className={css.transportContent2}>
          <div>地址</div>
          <div>
            <input
              type="text"
              className={css.transportstore}
              placeholder="請輸入地址"
            />
          </div>
        </div>
      </div>
      <div className={css.transportContent1}>
        <div className={css.transportContent2}>
          <div>取貨姓名</div>
          <div>
            <input
              type="text"
              className={css.transportname}
              placeholder="請輸入姓名"
            />
          </div>
        </div>
        <div>
          <div>取貨手機號碼</div>
          <div>
            <input
              type="text"
              className={css.transportphone}
              placeholder="請輸入手機號碼"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
