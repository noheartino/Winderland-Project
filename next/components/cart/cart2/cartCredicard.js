import React, { useState, useEffect } from 'react';
import css from '@/components/cart/cart2/cartCredicard.module.css';

export default function CartCredicard({ creditCardData, onCreditCardDataChange }) {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  useEffect(() => {
    if (creditCardData) {
      setCreditCardNumber(creditCardData.creditCardNumber || '');
      setExpiryDate(creditCardData.expiryDate || '');
      setCardHolderName(creditCardData.cardHolderName || '');
      setSecurityCode(creditCardData.securityCode || '');
      setBillingAddress(creditCardData.billingAddress || '');
    }
  }, [creditCardData]);

  const handleCreditCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16); // 只保留數字並限制最大長度
    setCreditCardNumber(value.match(/.{1,4}/g)?.join(' ') || ''); // 顯示為 xxxx xxxx xxxx xxxx
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4); // 只保留數字並限制最大長度
    setExpiryDate(value.match(/.{1,2}/g)?.join('/') || ''); // 顯示為 xx/xx
  };

  const handleCardHolderNameChange = (e) => setCardHolderName(e.target.value);
  const handleSecurityCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3); // 只保留數字並限制最大長度
    setSecurityCode(value); // 使用數字顯示
  };

  const handleBillingAddressChange = (e) => setBillingAddress(e.target.value);

  useEffect(() => {
    onCreditCardDataChange({
      creditCardNumber: creditCardNumber.replace(/\s+/g, ''), // 儲存時去掉空格
      expiryDate: expiryDate.replace('/', ''), // 儲存時去掉斜線
      cardHolderName,
      securityCode,
      billingAddress,
    });
  }, [creditCardNumber, expiryDate, cardHolderName, securityCode, billingAddress]);

  return (
    <>
      <div className={css.payContent}>
        <div className={css.payContent1}>
          <div className={css.payContent2}>
            <div>*信用卡號碼</div>
            <div>
              <input
                type="text"
                placeholder="xxxx xxxx xxxx xxxx"
                className={css.creditcard}
                value={creditCardNumber}
                onChange={handleCreditCardNumberChange}
                maxLength="19" // 16 位數字 + 3 個空格
                minLength="16" // 最少 16 位數字
                required
              />
            </div>
          </div>
          <div className={css.payContent2}>
            <img src="/images/cart/visa.png" alt="" className={css.visa} />
          </div>
          <div className={css.payContent2}>
            <div>*到期日</div>
            <div>
              <input
                type="text"
                placeholder="xx/xx"
                className={css.creditDate}
                value={expiryDate}
                onChange={handleExpiryDateChange}
                maxLength="5" // 最多 5 位數（4 位數字 + 斜線）
                minLength="4" // 最少 4 位數字
                required
              />
            </div>
          </div>
        </div>
        <div className={css.payContent1}>
          <div className={css.payContent2}>
            <div>*持卡人姓名</div>
            <div>
              <input
                type="text"
                className={css.creditname}
                value={cardHolderName}
                onChange={handleCardHolderNameChange}
                required
              />
            </div>
          </div>
          <div className={css.payContent2}>
            <div>*安全碼</div>
            <div>
              <input
                type="password"
                placeholder="***"
                className={css.creditNumber}
                value={securityCode}
                onChange={handleSecurityCodeChange}
                maxLength="3"
                minLength="3"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <div>帳單地址</div>
          <div>
            <input
              type="text"
              className={css.creditaddress}
              value={billingAddress}
              onChange={handleBillingAddressChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
