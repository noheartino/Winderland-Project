import React, { useEffect, useState } from 'react';
import css from '@/components/cart/cart2/cartPay.module.css';

export default function CartPay({
  pointsUsed, 
  originalPoints, 
  selectedPayment, 
  selectedTransport, 
  transportData, 
  transportBlackCatData,
  creditCardData 
}) {
  const [finalAmount, setFinalAmount] = useState(0);
  const [productData, setProductData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const storedFinalAmount = sessionStorage.getItem('finalAmount');
    const storedProductData = sessionStorage.getItem('productData');
    const storedClassData = sessionStorage.getItem('classData');

    if (storedFinalAmount) setFinalAmount(parseFloat(storedFinalAmount));
    if (storedProductData) setProductData(JSON.parse(storedProductData));
    if (storedClassData) setClassData(JSON.parse(storedClassData));
  }, []);

  const minLength = {
    creditCardNumber: 16,
    expiryDate: 4,
    securityCode: 3,
    pickupPhone: 10,
    blackCatPhoneNumber: 10
  };

  const discountAmount = pointsUsed;
  const finalTotalAmount = finalAmount + 60;
  const discountedAmount = finalTotalAmount - discountAmount;

  const validateForm = () => {
    let valid = true;
    let errorMessages = [];
  
    console.log('Selected Payment:', selectedPayment);
    console.log('Selected Transport:', selectedTransport);
    console.log('Credit Card Data:', creditCardData);
    console.log('Transport Data:', transportData);
    console.log('Transport Black Cat Data:', transportBlackCatData);
  
    if (!selectedPayment || !selectedTransport) {
      valid = false;
      errorMessages.push('請選擇付款方式和運送方式');
    } else {
      if (selectedPayment === 'creditpay') {
        if (!creditCardData || Object.keys(creditCardData).length === 0) {
          valid = false;
          errorMessages.push('請填寫信用卡資料');
        } else {
          const { creditCardNumber, expiryDate, cardHolderName, securityCode, billingAddress } = creditCardData;
          if (!creditCardNumber || !expiryDate || !cardHolderName || !securityCode || !billingAddress) {
            valid = false;
            errorMessages.push('信用卡資料不完整');
          }
          if (creditCardNumber.length < minLength.creditCardNumber ||
              expiryDate.length < minLength.expiryDate ||
              securityCode.length < minLength.securityCode) {
            valid = false;
            errorMessages.push('信用卡格式不正確');
          }
        }
      }
  
      if (selectedTransport === 'transprot711') {
        if (!transportData || Object.keys(transportData).length === 0) {
          valid = false;
          errorMessages.push('請填寫7-11資料');
        } else {
          const { storeName, storeAddress, pickupName, pickupPhone } = transportData;
          if (!storeName || !storeAddress || !pickupName || !pickupPhone) {
            valid = false;
            errorMessages.push('7-11資料不完整');
          }
          if (pickupPhone.length < minLength.pickupPhone) {
            valid = false;
            errorMessages.push('7-11格式不正確');
          }
        }
      }
  
      if (selectedTransport === 'blackcat') {
        if (!transportBlackCatData || Object.keys(transportBlackCatData).length === 0) {
          valid = false;
          errorMessages.push('請填寫黑貓宅急便資料');
        } else {
          const { address: blackCatAddress, name, phone: blackCatPhoneNumber } = transportBlackCatData;
          if (!blackCatAddress || !name || !blackCatPhoneNumber) {
            valid = false;
            errorMessages.push('黑貓宅急便資料不完整');
          }
          if (blackCatPhoneNumber.length < minLength.blackCatPhoneNumber) {
            valid = false;
            errorMessages.push('黑貓宅急便格式不正確');
          }
        }
      }
    }
  
    setIsFormValid(valid);
    // 使用 `<br />` 來實現換行
    setFormError(errorMessages.join(' / ').replace(/ \//g, ' <br />')); 
    console.log('Form valid:', valid);
    console.log('Form Errors:', errorMessages); // 顯示錯誤訊息列表
    return valid;
  };

  useEffect(() => {
    validateForm();
  }, [selectedPayment, selectedTransport, creditCardData, transportData, transportBlackCatData, pointsUsed]);

  const handleCheckout = () => {
    if (validateForm()) {
      // 前往結帳的邏輯
      console.log('Proceeding to checkout...');
      // 實際執行結帳流程
    } else {
      alert(formError); // 彈出提示訊息
    }
  };

  return (
    <>
      <div className={css.payDetail}>
        <div className={css.payDetailTitle}>訂單詳情</div>
        <div className={css.payDetailContent}>
          <div className={css.payContent1}>
            <div>付款方式</div>
            <div>
              {selectedPayment 
                ? selectedPayment === 'creditpay' 
                  ? '信用卡' 
                  : '貨到付款'
                : '請選擇付款方式'}
              {selectedTransport && 
                selectedTransport === 'transprot711' 
                  ? '(7-11)' 
                  : selectedTransport === 'blackcat' 
                    ? '(黑貓宅急便)' 
                    : ''}
            </div>
          </div>
          <div className={css.payContent1}>
            <div>總金額</div>
            <div>NT$ {finalTotalAmount}</div>
          </div>
          <div className={css.payContent1}>
            <div>
              <div>W Point 折抵</div>
              <div className={css.payWpoint}>*W point 折抵新台幣1:1</div>
            </div>
            <div>
              <div className={css.payContentWpoint}>-NT$ {discountAmount}</div>
              <div className={css.payWpoint}>- WP {pointsUsed}</div>
            </div>
          </div>
          <div className={`${css.payContent1} ${css.payContentTotal}`}>
            <div className={css.payContentTotal1}>實付金額</div>
            <div className={css.payContentTotal2}>NT$ {discountedAmount}</div>
          </div>
          <div className={css.payContent1}>
            <button onClick={handleCheckout} disabled={!isFormValid}>前往結帳</button>
          </div>

        </div>
      </div>
      {formError && <div className={css.errorMessage} dangerouslySetInnerHTML={{ __html: formError }}></div>}
    </>
  );
}
