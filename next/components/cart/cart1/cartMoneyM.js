import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import css from '@/components/cart/cart1/cartMoney.module.css';

export default function CartMoneyM({ totalAmount = 0, selectedCoupon, userId, productData, classData }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);
  const [checkError, setCheckError] = useState(null);
  const [isStockAvailable, setIsStockAvailable] = useState(true);

  let discountAmount = 0;
  if (selectedCoupon) {
    const discount = parseFloat(selectedCoupon.coupon_discount) || 0;
    discountAmount = discount > 1 ? discount : totalAmount * (1 - discount);
  }
  const finalAmount = Math.max(0, totalAmount - discountAmount);

  // 檢查庫存量的函數
  const checkStockAvailability = async () => {
    setIsChecking(true);
    setCheckError(null);
    setIsStockAvailable(true);

    try {
      const response = await fetch(`http://winderland.shop/api/cart/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch cart items');

      const { items } = await response.json();

      for (const item of items) {
        if (item.product_detail_id) {
          // 檢查庫存量是否足夠
          if (item.product_quantity > item.product_amount) {
            setCheckError(`"${item.product_name}" 的數量超過庫存，請修改數量。`);
            setIsStockAvailable(false);
            return;
          }
        }
      }
    } catch (error) {
      console.error('庫存檢查失敗:', error);
      setCheckError('庫存檢查失敗，請稍後再試。');
      setIsStockAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkStockAvailability();
  }, [userId, productData]);

  const confirmOrder = () => {
    if (!isStockAvailable) return; // 如果庫存檢查未通過，則不執行訂單確認

    // 儲存資料到 sessionStorage
    sessionStorage.setItem('user_id', userId);
    sessionStorage.setItem('totalAmount', totalAmount);
    sessionStorage.setItem('discountAmount', discountAmount);
    sessionStorage.setItem('finalAmount', finalAmount);
    sessionStorage.setItem('productData', JSON.stringify(productData));
    sessionStorage.setItem('classData', JSON.stringify(classData));

    if (selectedCoupon) {
      // 儲存選擇的優惠券資料
      sessionStorage.setItem('selectedCoupon', JSON.stringify(selectedCoupon));
    }

    // 跳轉到 CartCheckout2 頁
    router.push('/cart/cartCheckout2');
  };

  return (
    <div className={`container-fluid d-block d-lg-none ${css.cartTotalM}`}>
      <div className={`row ${css.cartTotalMROW}`}>
        <div className={`col-6 ${css.cartTotalML}`}>
          <div className={css.cartTotalML1}>
            <div>商品總計</div>
            <div>NT$ {Math.floor(totalAmount).toLocaleString()}</div>
          </div>
          <div className={css.cartTotalML2}>
            <div>優惠折扣</div>
            <div>- NT$ {Math.floor(discountAmount).toLocaleString()}</div>
          </div>
        </div>
        <div className={`col-5 ${css.cartTotalMR}`}>
          <div className={css.cartTotalMRTitle}>總金額</div>
          <div className={css.cartTotalMRMoney}>
            <b>NT$ {Math.floor(finalAmount).toLocaleString()}</b>
          </div>
          <div>
            <button
              className={css.cartTotalMRBTN}
              onClick={confirmOrder}
              disabled={isChecking || !isStockAvailable || (productData.length === 0 && classData.length === 0)}
            >
              {isChecking ? '檢查中...' : '確認'}
            </button>
          </div>
        </div>
      </div>
      {checkError && (
        <div className={css.cartCheckError}>
          {checkError}
        </div>
      )}
    </div>
  );
}
