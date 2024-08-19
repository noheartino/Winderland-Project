import React from "react";
import CartProduct from "@/components/cart/cart2/cartProduct";
import CartCredicard from "@/components/cart/cart2/cartCredicard";
import CartTransport from "@/components/cart/cart2/cartTransport";
import CartWpoint from "@/components/cart/cart2/cartWpoint";
import CartMoney from "@/components/cart/cart2/cartMoney";
import CartPay from "@/components/cart/cart2/cartPay";
import CartProductM from "@/components/cart/cart2/cartProductM";
import CartCredicardM from "@/components/cart/cart2/cartCredicardM";
import CartTransportM from "@/components/cart/cart2/cartTranportM";
import CartWpointM from "@/components/cart/cart2/cartWpointM";
import CartMoneyM from "@/components/cart/cart1/cartMoneyM";
import Nav from '@/components/Header/Header'
import Footer from "@/components/footer/footer";

export default function CartCheckout2() {
  return (
    <>
      <title>Cart3</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
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
        <div className="container mb-5 d-none d-lg-block">
          <div className="row">
            <div className="col-8">
              <div className="progressTitle-2">
                <div className="progressText1-2">確認訂單</div>
                <div className="progressText2-2">填寫訂單詳情</div>
                <div className="progressText3-2">完成訂單</div>
              </div>
              <div className="progressBar-2">
                <div className="progressCircle-2 progressCircle1-2" />
                <div className="progressLine-2 progressLine1-2" />
                <div className="progressCircle-2 progressCircle2-2" />
                <div className="progressLine-2 progressLine2-2" />
                <div className="progressCircle-2 progressCircle3-2" />
              </div>
              <CartProduct />
              <div className="cartProductDetailBox">
                <div>訂單詳情</div>
                <div>
                  <button>
                    <i className="fa-solid fa-chevron-down" />
                  </button>
                </div>
              </div>
              <div className="checkBoxPay">
                <b>付款方式</b>
                <input
                  type="radio"
                  id="productpay"
                  name="payment"
                  className="styled-checkbox"
                />
                <label htmlFor="productpay">貨到付款</label>
                <input
                  type="radio"
                  id="creditpay"
                  name="payment"
                  className="styled-checkbox"
                />
                <label htmlFor="creditpay">信用卡</label>
                <input
                  type="radio"
                  id="linepay"
                  name="payment"
                  className="styled-checkbox"
                />
                <label htmlFor="linepay">Line Pay</label>
              </div>
              <CartCredicard />
              <div className="checkBoxTransport">
                <b>運送方式</b>
                <input
                  type="radio"
                  id="transprot711"
                  name="transport"
                  className="styled-checkbox"
                />
                <label htmlFor="transprot711">7-11</label>
                <input
                  type="radio"
                  id="blackcat"
                  name="transport"
                  className="styled-checkbox"
                />
                <label htmlFor="blackcat">黑貓宅急便</label>
              </div>
              <CartTransport />
              <div className="checkBoxWpoint">
                <img src="/images/cart/wPoint.png" alt="" />
                <input
                  type="checkbox"
                  id="wPointcheck"
                  className="styled-checkbox"
                />
                <label htmlFor="wPointcheck">
                  <b>W Point 扣抵</b>
                </label>
              </div>
              <CartWpoint />
            </div>
            <div className="col-4">
              <CartMoney />
              <CartPay />
            </div>
          </div>
        </div>
        <div className="container d-block d-lg-none">
          <div className="progressTitle-2">
            <div className="progressText1-2">確認訂單</div>
            <div className="progressText2-2">填寫訂單詳情</div>
            <div className="progressText3-2">完成訂單</div>
          </div>
          <div className="progressBar-2">
            <div className="progressCircle-2 progressCircle1-2" />
            <div className="progressLine-2 progressLine1-2" />
            <div className="progressCircle-2 progressCircle2-2" />
            <div className="progressLine-2 progressLine2-2" />
            <div className="progressCircle-2 progressCircle3-2" />
          </div>
          <CartProductM />
          <div className="cartProductDetailBox">
            <div>訂單詳情</div>
            <div>
              <button>
                <i className="fa-solid fa-chevron-down" />
              </button>
            </div>
          </div>
          
          <div className="payTitle">
            <b>付款方式</b>
          </div>
          <div className="payTitleLine" />
          <div className="checkBoxPay">
            <input
              type="radio"
              id="productpayM"
              name="paymentM"
              className="styled-checkbox"
            />
            <label htmlFor="productpayM">貨到付款</label>
            <input
              type="radio"
              id="creditpayM"
              name="paymentM"
              className="styled-checkbox"
            />
            <label htmlFor="creditpayM">信用卡</label>
            <input
              type="radio"
              id="linepayM"
              name="paymentM"
              className="styled-checkbox"
            />
            <label htmlFor="linepayM">Line Pay</label>
          </div>
          <CartCredicardM />
          <div className="payTitle">
            <b>運送方式</b>
          </div>
          <div className="payTitleLine" />
          <div className="checkBoxTransport">
            <input
              type="radio"
              id="transprot711M"
              name="transportM"
              className="styled-checkbox"
            />
            <label htmlFor="transprot711M">7-11</label>
            <input
              type="radio"
              id="blackcatM"
              name="transportM"
              className="styled-checkbox"
            />
            <label htmlFor="blackcatM">黑貓宅急便</label>
          </div>
          <CartTransportM />
          <div className="checkBoxWpoint">
            <input type="checkbox" id="wPointcheckM" />
            <label htmlFor="wPointcheckM">
              <b>W Point 扣抵</b>
            </label>
          </div>
          <CartWpointM />
          <div style={{ height: "150px" }}></div> {/* 占位元素 */}
        </div>
        <CartMoneyM />
      </main>
      <Footer showMobileFooter={false} />
    </>
  );
}
