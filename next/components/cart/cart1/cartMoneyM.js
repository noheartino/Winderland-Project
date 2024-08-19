import React from 'react';
import css from '@/components/cart/cart1/cartMoney.module.css';

export default function CartMoneyM({ totalAmount, discountAmount }) { // 接收总金额和折扣金额
  const finalAmount = totalAmount - discountAmount; // 计算最终金额

  return (
    <>
      <div className={`container-fluid d-block d-lg-none ${css.cartTotalM}`}>
        <div className={`row ${css.cartTotalMROW}`}>
          <div className={`col-6 ${css.cartTotalML}`}>
            <div className={css.cartTotalML1}>
              <div>商品總計</div>
              <div>NT$ {totalAmount}</div> {/* 动态显示商品总计 */}
            </div>
            <div className={css.cartTotalML2}>
              <div>優惠折扣</div>
              <div>- NT$ {discountAmount}</div> {/* 显示动态的优惠折扣 */}
            </div>
          </div>
          <div className={`col-5 ${css.cartTotalMR}`}>
            <div className={css.cartTotalMRTitle}>總金額</div>
            <div className={css.cartTotalMRMoney}>
              <b>NT$ {finalAmount}</b> {/* 显示最终金额 */}
            </div>
            <div>
              <button className={css.cartTotalMRBTN}>確認</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
