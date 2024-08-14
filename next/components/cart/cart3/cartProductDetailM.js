import React from "react";
import css from "@/components/cart/cart3/cartProductDetail.module.css";

export default function CartProductDetailM() {
  return (
    <>
      <div className={`row ${css.cartProductDetailBoxM}`}>
        <div className={`col-7 ${css.cartProductDetailContentM}`}>
          <div className={css.cartProductDetailTitleM}>
            <b>皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡 維一級園紅酒 2017</b>
          </div>
          <div className={css.formatDetailM}>
            <div className={css.formatCcM}>750</div>&nbsp;/&nbsp;
            <div className={css.formatCountyM}>法國</div>&nbsp;/&nbsp;
            <div className={css.formatYearM}>2017年</div>
          </div>
        </div>
        <div className={`col-1 ${css.cartProductDetailAmountM}`}>
          <b>1</b>
        </div>
        <div className={`col-3 ${css.cartProductDetailTotalM}`}>
          <b>NT$&nbsp;17,997</b>
        </div>
      </div>
    </>
  );
}

