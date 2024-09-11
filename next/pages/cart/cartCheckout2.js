import React, { useEffect, useState } from "react";
import CartProduct from "@/components/cart/cart2/cartProduct";
import CartTransport from "@/components/cart/cart2/cartTransport";
import CartWpoint from "@/components/cart/cart2/cartWpoint";
import CartMoney from "@/components/cart/cart2/cartMoney";
import CartPay from "@/components/cart/cart2/cartPay";
import CartProductM from "@/components/cart/cart2/cartProductM";
import CartWpointM from "@/components/cart/cart2/cartWpointM";
import CartMoneyM from "@/components/cart/cart2/cartMoneyM";
import CartProductDetail from "@/components/cart/cart3/cartProductDetail";
import CartProductDetailM from "@/components/cart/cart3/cartProductDetailM";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import CartClassDetail from "@/components/cart/cart3/cartClassDetail";
import CartClassDetailM from "@/components/cart/cart3/cartClassDetailM";
import CartTransportBlackCat from "@/components/cart/cart2/cartTransportBlackcat";
import CartTransportBlackCatM from "@/components/cart/cart2/cartTransportBlackcatM";
import { useRouter } from "next/router";
import Head from "next/head";
import Arrtotop from "@/components/Header/arr";
import Swal from "sweetalert2";

export default function CartCheckout2() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedTransport, setSelectedTransport] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [pointsUsed, setPointsUsed] = useState(0);
  const [originalPoints, setOriginalPoints] = useState(0); // 儲存原本點數
  const [transportData, setTransportData] = useState({}); //運送資料7-11
  const [transportBlackCatData, setTransportBlackCatData] = useState({}); // 新增狀態來儲存黑貓運送資料
  const [productData, setProductData] = useState([]);
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("user_id");
    const storedOriginalPoints = sessionStorage.getItem("originalPoints"); // 讀取原本點數
    const storedTransportData = sessionStorage.getItem("transportData");
    const storedTransportBlackCatData = sessionStorage.getItem(
      "transportBlackCatData"
    );
    const storedPoints = sessionStorage.getItem("pointsUsed");
    const storedProductData = sessionStorage.getItem("productData");
    const storedClassData = sessionStorage.getItem("classData");

    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedOriginalPoints) {
      setOriginalPoints(parseFloat(storedOriginalPoints));
    }
    if (storedTransportData) {
      setTransportData(JSON.parse(storedTransportData));
    }
    if (storedTransportBlackCatData) {
      setTransportData(JSON.parse(storedTransportBlackCatData));
    }
    if (storedPoints) {
      setPointsUsed(JSON.parse(storedPoints));
    }
    if (storedProductData) setProductData(JSON.parse(storedProductData));
    if (storedClassData) setClassData(JSON.parse(storedClassData));
    // 檢查是否為直接輸入網址
    if (!document.referrer && !storedUserId) {
      router.push("/member/login");
    }
  }, []);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePaymentChange = (event) => {
    const value = event.target.value;

    if (
      classData.length > 0 &&
      productData.length === 0 &&
      value === "productpay"
    ) {
      Swal.fire({
        icon: 'warning',               // 警告框的圖標
        title: '注意',                 // 警告框的標題
        text: '單買課程只能使用信用卡付款', // 警告框的文本
        confirmButtonText: '確定'       // 確認按鈕的文本
      });

    } else {
      setSelectedPayment(value);
    }
  };

  const handleTransportChange = (event) => {
    if (classData.length > 0 && productData.length === 0) {
      Swal.fire({
        icon: 'info',                // 信息框的圖標類型
        title: '提醒',              // 警告框的標題
        text: '購買課程不需運送',  // 警告框的文本
        confirmButtonText: '確定'   // 確認按鈕的文本
      });
    } else {
      const value = event.target.value;
      setSelectedTransport(value);

      if (value === "blackCat") {
        setTransportData({});
        localStorage.removeItem("store711");
      } else if (value === "other") {
        setTransportBlackCatData({});
        localStorage.removeItem("store711");
      } else {
        setTransportBlackCatData({});
        localStorage.removeItem("store711");
      }
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handlePointsChange = (newPoints) => {
    setPointsUsed(newPoints);
    sessionStorage.setItem("pointsUsed", newPoints);
  };

  // 新增處理從 CartWpoint 獲取點數的函數
  const handlePointsFetch = (fetchedPoints) => {
    setOriginalPoints(fetchedPoints);
  };

  const handleTransportDataChange = (newTransportData) => {
    setTransportData(newTransportData);
    sessionStorage.setItem("transportData", JSON.stringify(newTransportData));
  };

  const handleTransportBlackCatDataChange = (data) => {
    setTransportBlackCatData(data);
    sessionStorage.setItem("transportBlackCatData", JSON.stringify(data)); // 存儲到 sessionStorage
  };

  const goTo1 = () => {
    router.push("http://winderland.shop/cart/cartCheckout1");
  };

  return (
    <>
      <Head>
        <title>醺迷仙園｜購物車</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <Nav />
      <main>
        <Arrtotop />
        <div className="container mb-5 d-none d-lg-block">
          <div className="row">
            <div className="col-8">
              <div className="progressTitle-2">
                <div className="progressText1-2">確認訂單(回上一頁)</div>
                <div className="progressText2-2">填寫訂單詳情</div>
                <div className="progressText3-2">完成訂單</div>
              </div>
              <div className="progressBar-2">
                <div
                  className="progressCircle-2 progressCircle1-2"
                  onClick={goTo1}
                  style={{ cursor: "pointer" }}
                />
                <div className="progressLine-2 progressLine1-2" />
                <div className="progressCircle-2 progressCircle2-2" />
                <div className="progressLine-2 progressLine2-2" />
                <div className="progressCircle-2 progressCircle3-2" />
              </div>
              <CartProduct />
              {isExpanded ? (
                <>
                  <div className="cartProductDetailBox-3">
                    <div className="col-7 cartProductDetailBox1-3">品項</div>
                    <div className="col-1 cartProductDetailBox2-3">件數</div>
                    <div className="col-3 cartProductDetailBox3-3">小計</div>
                    <div className="col-1 cartProductDetailBox4-3">
                      <button onClick={toggleDetails}>
                        <i className="fa-solid fa-chevron-up" />
                      </button>
                    </div>
                  </div>
                  <CartProductDetail />
                  <CartClassDetail />
                </>
              ) : (
                <div className="cartProductDetailBox">
                  <div>訂單詳情</div>
                  <div>
                    <button onClick={toggleDetails}>
                      <i className="fa-solid fa-chevron-down" />
                    </button>
                  </div>
                </div>
              )}
              <div className="checkBoxPay">
                <b>付款方式</b>
                <input
                  type="radio"
                  id="productpay"
                  name="payment"
                  value="productpay"
                  checked={selectedPayment === "productpay"}
                  onChange={handlePaymentChange}
                  className="styled-checkbox"
                />
                <label htmlFor="productpay">貨到付款</label>
                <input
                  type="radio"
                  id="creditpay"
                  name="payment"
                  value="creditpay"
                  checked={selectedPayment === "creditpay"}
                  onChange={handlePaymentChange}
                  className="styled-checkbox"
                />
                <label htmlFor="creditpay">信用卡</label>
              </div>
              <div className="checkBoxTransport">
                <b>運送方式</b>
                <input
                  type="radio"
                  id="transprot711"
                  name="transport"
                  value="transprot711"
                  checked={selectedTransport === "transprot711"}
                  onChange={handleTransportChange}
                  className="styled-checkbox"
                />
                <label htmlFor="transprot711">7-11</label>
                <input
                  type="radio"
                  id="blackcat"
                  name="transport"
                  value="blackcat"
                  checked={selectedTransport === "blackcat"}
                  onChange={handleTransportChange}
                  className="styled-checkbox"
                />
                <label htmlFor="blackcat">黑貓宅急便</label>
              </div>
              {selectedTransport === "transprot711" && (
                <CartTransport
                  handleTransportDataChange={handleTransportDataChange}
                />
              )}
              {selectedTransport === "blackcat" && (
                <CartTransportBlackCat
                  onTransportBlackCatDataChange={
                    handleTransportBlackCatDataChange
                  }
                />
              )}
              <div className="checkBoxWpoint">
                <img src="/images/cart/wPoint.png" alt="" />
                <input
                  type="checkbox"
                  id="wPointcheck"
                  className="styled-checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="wPointcheck">
                  <b>W Point 扣抵</b>
                </label>
              </div>
              <CartWpoint
                userId={userId}
                isChecked={isChecked}
                onPointsChange={handlePointsChange}
                onPointsFetch={handlePointsFetch}
              />
            </div>
            <div className="col-4">
              <CartMoney />
              <CartPay
                userId={userId}
                pointsUsed={pointsUsed}
                originalPoints={originalPoints}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment} // 傳遞 setSelectedPayment 函數
                selectedTransport={selectedTransport}
                setSelectedTransport={setSelectedTransport} // 傳遞 setSelectedTransport 函數
                transportData={
                  selectedTransport === "transprot711" ? transportData : {}
                }
                transportBlackCatData={
                  selectedTransport === "blackcat" ? transportBlackCatData : {}
                }
              />
            </div>
          </div>
        </div>
        <div className="container d-block d-lg-none">
          <div className="progressTitle-2">
            <div className="progressText1-2">確認訂單(回上一頁)</div>
            <div className="progressText2-2">填寫訂單詳情</div>
            <div className="progressText3-2">完成訂單</div>
          </div>
          <div className="progressBar-2">
            <div
              className="progressCircle-2 progressCircle1-2"
              onClick={goTo1}
              style={{ cursor: "pointer" }}
            />
            <div className="progressLine-2 progressLine1-2" />
            <div className="progressCircle-2 progressCircle2-2" />
            <div className="progressLine-2 progressLine2-2" />
            <div className="progressCircle-2 progressCircle3-2" />
          </div>
          <CartProductM />
          {isExpanded ? (
            <>
              <div className="cartProductDetailBox-3">
                <div className="col-7 cartProductDetailBox1-3">品項</div>
                <div className="col-1 cartProductDetailBox2-3">件數</div>
                <div className="col-3 cartProductDetailBox3-3">小計</div>
                <div className="col-1 cartProductDetailBox4-3">
                  <button onClick={toggleDetails}>
                    <i className="fa-solid fa-chevron-up" />
                  </button>
                </div>
              </div>
              <CartProductDetailM />
              <CartClassDetailM />
            </>
          ) : (
            <div className="cartProductDetailBox">
              <div>訂單詳情</div>
              <div>
                <button onClick={toggleDetails}>
                  <i className="fa-solid fa-chevron-down" />
                </button>
              </div>
            </div>
          )}
          <div className="checkBoxPay">
            <b>付款方式</b>
            <input
              type="radio"
              id="productpayM"
              name="paymentM"
              value="productpay"
              checked={selectedPayment === "productpay"}
              onChange={handlePaymentChange}
              className="styled-checkbox"
            />
            <label htmlFor="productpayM">貨到付款</label>
            <input
              type="radio"
              id="creditpayM"
              name="paymentM"
              value="creditpay"
              checked={selectedPayment === "creditpay"}
              onChange={handlePaymentChange}
              className="styled-checkbox"
            />
            <label htmlFor="creditpayM">信用卡</label>
          </div>
          <div className="checkBoxTransport">
            <b>運送方式</b>
            <input
              type="radio"
              id="transprot711M"
              name="transportM"
              value="transprot711"
              checked={selectedTransport === "transprot711"}
              onChange={handleTransportChange}
              className="styled-checkbox"
            />
            <label htmlFor="transprot711M">7-11</label>
            <input
              type="radio"
              id="blackcatM"
              name="transportM"
              value="blackcat"
              checked={selectedTransport === "blackcat"}
              onChange={handleTransportChange}
              className="styled-checkbox"
            />
            <label htmlFor="blackcatM">黑貓宅急便</label>
          </div>
          {selectedTransport === "transprot711" && (
            <CartTransport
              handleTransportDataChange={handleTransportDataChange}
            />
          )}
          {selectedTransport === "blackcat" && (
            <CartTransportBlackCatM
              onTransportBlackCatDataChange={handleTransportBlackCatDataChange}
            />
          )}
          <div className="checkBoxWpoint">
            <input
              type="checkbox"
              id="wPointcheckM"
              className="styled-checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="wPointcheckM">
              <b>W Point 扣抵</b>
            </label>
          </div>
          <CartWpointM
            userId={userId}
            isChecked={isChecked}
            onPointsChange={handlePointsChange}
            onPointsFetch={handlePointsFetch}
          />
          <div style={{ height: "180px" }}></div>
          <CartMoneyM
            userId={userId}
            pointsUsed={pointsUsed}
            originalPoints={originalPoints}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment} // 傳遞 setSelectedPayment 函數
            selectedTransport={selectedTransport}
            setSelectedTransport={setSelectedTransport} // 傳遞 setSelectedTransport 函數
            transportData={
              selectedTransport === "transprot711" ? transportData : {}
            }
            transportBlackCatData={
              selectedTransport === "blackcat" ? transportBlackCatData : {}
            }
          />
        </div>
      </main>
      <Footer showMobileFooter={false} />
    </>
  );
}
