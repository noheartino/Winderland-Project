import React from 'react';
import { useRouter } from 'next/router'; // 导入 useRouter
import css from '@/components/cart/cart1/cartMoney.module.css';

export default function CartMoneyM({ totalAmount = 0, selectedCoupon, userId }) {
  const router = useRouter();
  let discountAmount = 0;

  if (selectedCoupon) {
    const discount = parseFloat(selectedCoupon.coupon_discount) || 0;
    if (discount > 1) {
      discountAmount = discount;
    } else {
      discountAmount = totalAmount * (1 - discount);
    }
  }

  const finalAmount = Math.max(0, totalAmount - discountAmount);

  const confirmOrder = () => {
    sessionStorage.setItem('user_id', userId); // 存储 user_id 到 sessionStorage
    router.push('/cart/cartCheckout2'); // 跳转到 CartCheckout2 页
  };

  return (
    <div className={`container-fluid d-block d-lg-none ${css.cartTotalM}`}>
      <div className={`row ${css.cartTotalMROW}`}>
        <div className={`col-6 ${css.cartTotalML}`}>
          <div className={css.cartTotalML1}>
            <div>商品總計</div>
            <div>NT$ {Math.floor(totalAmount)}</div>
          </div>
          <div className={css.cartTotalML2}>
            <div>優惠折扣</div>
            <div>- NT$ {Math.floor(discountAmount)}</div>
          </div>
        </div>
        <div className={`col-5 ${css.cartTotalMR}`}>
          <div className={css.cartTotalMRTitle}>總金額</div>
          <div className={css.cartTotalMRMoney}>
            <b>NT$ {Math.floor(finalAmount)}</b>
          </div>
          <div>
            <button className={css.cartTotalMRBTN} onClick={confirmOrder}>確認</button>
          </div>
        </div>
      </div>
    </div>
  );
}
