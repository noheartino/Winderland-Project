import React from "react";
import css from "@/components/cart/cart2/cartCredicard.module.css";

export default function CartCredicardM() {
  return (
    <>
      <div className={css.payContent}>
        <div>
          <div className={css.payContent1}>
            <div className={css.payContent2}>
              <div>信用卡號碼</div>
              <div>
                <input
                  type="text"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  className={`${css.inputField} ${css.creditcard}`}
                />
              </div>
            </div>
            <div className={css.payContent2}>
              <img src="/images/cart/visa.png" alt="" className={css.visa} />
            </div>
          </div>
          <div className={css.payContent1}>
            <div className={css.payContent2}>
              <div>到期日</div>
              <div>
                <input
                  type="text"
                  placeholder="xx/xx"
                  className={`${css.inputField} ${css.creditDate}`}
                />
              </div>
            </div>
            <div className={css.payContent2}>
              <div>安全碼</div>
              <div>
                <input
                  type="text"
                  placeholder="***"
                  className={`${css.inputField} ${css.creditNumber}`}
                />
              </div>
            </div>
          </div>
          <div>
            <div>持卡人姓名</div>
            <div>
              <input
                type="text"
                className={`${css.inputField} ${css.creditname}`}
              />
            </div>
          </div>
          <div>
            <div>帳單地址</div>
            <div>
              <input
                type="text"
                className={`${css.inputField} ${css.creditaddress}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
