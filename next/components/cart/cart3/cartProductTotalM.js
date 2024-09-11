import React, { useEffect, useState } from 'react';
import css from '@/components/cart/cart3/cartProductTotal.module.css';

export default function CartProductTotalM() {
  const [orderData, setOrderData] = useState({
    image: '/images/cart/wine.png',
    name: '',
    quantity: 0,
    totalAmount: 0,
    transportText: '', // 新增欄位
    paymentText: '',    // 新增欄位
    orderStatus: '出貨準備中' // 新增欄位
  });

  useEffect(() => {
    // 從 sessionStorage 獲取資料
    const productData = JSON.parse(sessionStorage.getItem('productData')) || [];
    const classData = JSON.parse(sessionStorage.getItem('classData')) || [];
    const discountedAmount = parseFloat(sessionStorage.getItem('discountedAmount')) || 0;
    const selectedTransport = sessionStorage.getItem('selectedTransport') || 'transport711'; // 默認為 '7-11'
    const selectedPayment = sessionStorage.getItem('selectedPayment') || '';

    let transportText = '';
    let paymentText = '';
    let orderStatus = '出貨準備中'; // 默認狀態

    // 根據 selectedPayment 設置 paymentText
    if (selectedPayment === 'creditpay') {
      paymentText = '信用卡';
    } else if (selectedPayment === 'productpay') {
      paymentText = '貨到付款';
    }

    if (productData.length > 0) {
      // 如果有商品資料
      const firstProduct = productData[0];
      // 根據 selectedTransport 設置 transportText
      if (selectedTransport === 'transport711') {
        transportText = '7-11';
      } else if (selectedTransport === 'blackcat') {
        transportText = '黑貓宅急便';
      } else {
        transportText = '7-11'; // 默認顯示 7-11
      }
      setOrderData({
        image: `/images/product/${firstProduct.product_image}`,
        name: firstProduct.product_name,
        quantity: productData.reduce((acc, item) => acc + item.product_quantity, 0) + classData.length,
        totalAmount: discountedAmount,
        transportText, // 更新欄位
        paymentText,   // 更新欄位
        orderStatus    // 狀態保持為出貨準備中
      });
    } else if (classData.length > 0) {
      // 如果只有課程資料
      const firstClass = classData[0];
      orderStatus = '已完成'; // 如果只有課程，狀態設為已完成
      transportText = '不需運送'; // 顯示 "不需運送"
      setOrderData({
        image: `https://winderland.shop/uploads/course_and_tarot/${firstClass.class_image}`, // 課程沒有圖片，假設使用預設圖片
        name: firstClass.class_name,
        quantity: classData.length,
        totalAmount: discountedAmount,
        transportText, // 顯示 "不需運送"
        paymentText,   // 更新欄位
        orderStatus    // 狀態設為已完成
      });
    }
  }, []);

  return (
    <>
      <div className={css.cartProductBox3M}>
        <div className={css.cartProductImg3M}>
          <img src={orderData.image} alt="Order Item" />
        </div>
        <div className={css.cartProductOrderBox3M}>
          <div className={css.cartProductOrderBox3ML}>
            <div className={css.orderNumber1M}>
              <b>總件數</b>
            </div>
            <div className={css.orderPay1M}>
              <b>付款方式</b>
            </div>
            <div className={css.orderStatus1M}>
              <b>狀態</b>
            </div>
            <div className={css.orderTotal1M}>
              <b>總金額</b>
            </div>
          </div>
          <div>
            <div className={css.orderNumber2M}>共{orderData.quantity}件</div>
            <div className={css.orderPay2M}>
              {orderData.paymentText} ({orderData.transportText})
            </div>
            <div className={css.orderStatus2M}>{orderData.orderStatus}</div>
            <div className={css.orderTotal2M}>NT$ {Math.floor(orderData.totalAmount).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
