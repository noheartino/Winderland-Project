import React from "react";
import css from '@/components/cart/cart2/cartWpoint.module.css';

export default function CartWpointM() {
  return (
    <>
      <div className={css.wPointContent}>
        <div>
          <img src="/images/cart/wPoint.png" alt="W Point" />
        </div>
        <div className={css.wPointContent1}>
          <div className={css.wPointContent2}>
            <b>目前持有 W Point</b>
          </div>
          <div className={css.wPointContentHave}>
            <b>1328P</b>
          </div>
        </div>
      </div>
      <div className={css.payTitleLine} />
      <div className={css.wPointContent1M}>
        <div className={css.wPointContent3M}>使用點數</div>
        <div className={css.wPointContentUseM}>
          <input type="text" className={css.wPointContentUseBoxM} />
          <b>
            <span>P</span>
          </b>
        </div>
      </div>
    </>
  );
}

