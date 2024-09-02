import React, { useEffect, useState } from 'react';
import css from '@/components/cart/cart2/cartProduct.module.css';

export default function CartProductM() {
  const [orderData, setOrderData] = useState({
    image: '/images/cart/wine.png',
    name: '',
    quantity: 0,
    totalAmount: 0
  });

  useEffect(() => {
    // 從 sessionStorage 獲取資料
    const productData = JSON.parse(sessionStorage.getItem('productData')) || [];
    const classData = JSON.parse(sessionStorage.getItem('classData')) || [];
    const finalAmount = parseFloat(sessionStorage.getItem('finalAmount')) || 0;

    if (productData.length > 0) {
      // 如果有商品資料
      const firstProduct = productData[0];
      setOrderData({
        image: `/images/product/${firstProduct.product_image}`,
        name: firstProduct.product_name,
        quantity: productData.reduce((acc, item) => acc + item.product_quantity, 0) + classData.length,
        totalAmount: finalAmount + 60
      });
    } else if (classData.length > 0) {
      // 如果沒有商品資料但有課程資料
      const firstClass = classData[0];
      setOrderData({
        image: `/images/course_and_tarot/${firstClass.class_image}`, // 課程沒有圖片，假設使用預設圖片
        name: firstClass.class_name,
        quantity: classData.length,
        totalAmount: finalAmount + 60
      });
    }
  }, []);

  return (
    <div className={css.cartProductBox2}>
      <div className={css.cartProductImg2}>
        <img src={orderData.image} alt="Order Item" />
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
            {orderData.name}
          </div>
          <div className={`${css.orderNumber} ${css.orderNumber2}`}>共{orderData.quantity}件</div>
          <div className={`${css.orderTotal} ${css.orderTotal2}`}>NT$ {Math.floor(orderData.totalAmount)}</div>
        </div>
      </div>
    </div>
  );
}
