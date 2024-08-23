import React, { useEffect, useState } from "react";
import css from "@/components/cart/cart2/cartPay.module.css";
import axios from "axios"; // 引入 axios 或其他 HTTP 請求庫
import { useRouter } from "next/router"; // 引入 useRouter

export default function CartPay({
  userId,
  pointsUsed,
  originalPoints,
  selectedPayment,
  selectedTransport,
  transportData,
  transportBlackCatData,
}) {
  const [finalAmount, setFinalAmount] = useState(0);
  const [productData, setProductData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formError, setFormError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const router = useRouter(); // 使用 useRouter 來進行導航

  useEffect(() => {
    const storedFinalAmount = sessionStorage.getItem("finalAmount");
    const storedProductData = sessionStorage.getItem("productData");
    const storedClassData = sessionStorage.getItem("classData");
    const storedCoupon = sessionStorage.getItem("selectedCoupon");

    if (storedFinalAmount) setFinalAmount(parseFloat(storedFinalAmount));
    if (storedProductData) setProductData(JSON.parse(storedProductData));
    if (storedClassData) setClassData(JSON.parse(storedClassData));
    if (storedCoupon) setSelectedCoupon(JSON.parse(storedCoupon));
  }, []);

  const minLength = {
    pickupPhone: 10,
    blackCatPhoneNumber: 10,
  };

  const discountAmount = pointsUsed;
  const finalTotalAmount = finalAmount + 60; // 假設運費為60元
  const discountedAmount = finalTotalAmount - discountAmount;

  const validateForm = () => {
    let valid = true;
    let errorMessages = [];
  
    if (!selectedPayment || !selectedTransport) {
      valid = false;
      errorMessages.push("請選擇付款方式和運送方式");
    } else {
      if (selectedTransport === "transprot711") {
        if (!transportData || Object.keys(transportData).length === 0) {
          valid = false;
          errorMessages.push("請填寫7-11資料");
        } else {
          const { storeName, storeAddress, pickupName, pickupPhone } = transportData;
          if (!storeName || !storeAddress || !pickupName) {
            valid = false;
            errorMessages.push("7-11資料不完整");
          }
          // 如果 pickupPhone 是 undefined 或空字串，設為空字串
          const validPickupPhone = pickupPhone || "";
          if (validPickupPhone.length < minLength.pickupPhone) {
            valid = false;
            errorMessages.push("7-11格式不正確");
          }
        }
      }
  
      if (selectedTransport === "blackcat") {
        if (!transportBlackCatData || Object.keys(transportBlackCatData).length === 0) {
          valid = false;
          errorMessages.push("請填寫黑貓宅急便資料");
        } else {
          const { address: blackCatAddress, name, phone: blackCatPhoneNumber } = transportBlackCatData;
          if (!blackCatAddress || !name) {
            valid = false;
            errorMessages.push("黑貓宅急便資料不完整");
          }
          // 如果 blackCatPhoneNumber 是 undefined 或空字串，設為空字串
          const validBlackCatPhoneNumber = blackCatPhoneNumber || "";
          if (validBlackCatPhoneNumber.length < minLength.blackCatPhoneNumber) {
            valid = false;
            errorMessages.push("黑貓宅急便格式不正確");
          }
        }
      }
    }
  
    setIsFormValid(valid);
    setFormError(errorMessages.join(" / ").replace(/ \//g, " <br />"));
    return valid;
  };
  

  useEffect(() => {
    validateForm();
  }, [
    selectedPayment,
    selectedTransport,
    transportData,
    transportBlackCatData,
    pointsUsed,
  ]);

  const handleCheckout = async () => {
    if (validateForm()) {
      try {
        let response;
                sessionStorage.setItem("productData", JSON.stringify(productData));
        sessionStorage.setItem("classData", JSON.stringify(classData));
        sessionStorage.setItem("selectedPayment", selectedPayment);
        sessionStorage.setItem("selectedTransport", selectedTransport);
        sessionStorage.setItem("discountedAmount", discountedAmount);
        sessionStorage.setItem("pointsUsed", pointsUsed);
        sessionStorage.setItem("userId", userId);

        if (selectedPayment === "productpay") {
          // 貨到付款
          response = await axios.post(
            "http://localhost:3005/api/cart/cashOnDelivery",
            {
              userId,
              pointsUsed,
              originalPoints,
              selectedPayment,
              selectedTransport,
              transportData,
              transportBlackCatData,
              couponData: selectedCoupon || null,
              cartItems: [...productData, ...classData],
              discountedAmount,
            }
          );

          setOrderNumber(response.data.orderNumber);

          // 導航到確認頁
          router.push("/cart/cartCheckout3");
        } else if (selectedPayment === "creditpay") {
          const goECPayTestOnly = (discountedAmount) => {
            if (window.confirm('確認要導向至ECPay進行付款?')) {
              window.location.href = `http://localhost:3005/api/ecpay-test-only?amount=${discountedAmount}`;
            }
          };

          // 信用卡付款
          response = await axios.post(
            "http://localhost:3005/api/cart/creditCardPayment",
            {
              userId,
              pointsUsed,
              originalPoints,
              selectedPayment,
              selectedTransport,
              transportData,
              transportBlackCatData,
              couponData: selectedCoupon || null,
              cartItems: [...productData, ...classData],
              discountedAmount,
            }
          );

          // 假設後端返回了訂單編號
          setOrderNumber(response.data.orderNumber);

          // 在處理完成後，可能需要導航至某個頁面
          goECPayTestOnly(discountedAmount);
        }

        console.log("Order created successfully:", response.data);
      } catch (error) {
        console.error("Error creating order:", error);
        alert("訂單建立失敗，請稍後再試");
      }
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
                ? selectedPayment === "creditpay"
                  ? "信用卡"
                  : "貨到付款"
                : "請選擇付款方式"}
              {selectedTransport && selectedTransport === "transprot711"
                ? "(7-11)"
                : selectedTransport === "blackcat"
                ? "(黑貓宅急便)"
                : ""}
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
            <button onClick={handleCheckout} disabled={!isFormValid}>
              前往結帳
            </button>
          </div>
        </div>
      </div>
      {formError && (
        <div
          className={css.errorMessage}
          dangerouslySetInnerHTML={{ __html: formError }}
        ></div>
      )}
    </>
  );
}
