import React from 'react';
import css from '@/components/cart/cart2/cartProduct.module.css';
import { divide } from 'lodash';

export default function CartProduct() {
  return (
    <div>
        <div className={css.cartProductBox2}>
      <div className={css.cartProductImg2}>
        <img src="/images/cart/wine.png" alt="" />
      </div>
      <div>
        <div className={css.cartProductOrderBox}>
          <div className={`${css.orderContent} ${css.orderContent1}`}>
            <b>訂單內容</b>
          </div>
          <div className={`${css.orderNumber} ${css.orderNumber1}`}>
            <b>總件數</b>
          </div>
          <div className={`${css.orderTotal} ${css.orderTotal1}`}>
            <b>總金額</b>
          </div>
        </div>
        <div className={css.cartProductOrderLine} />
        <div className={css.cartProductOrderBox}>
          <div className={`${css.orderContent} ${css.orderContent2}`}>
            皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園紅酒 2017
          </div>
          <div className={`${css.orderNumber} ${css.orderNumber2}`}>共3件</div>
          <div className={`${css.orderTotal} ${css.orderTotal2}`}>NT$ 16,690</div>
        </div>
      </div>
    </div>
    </div>
  );
}
