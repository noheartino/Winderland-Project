import CartMoneyTotal from "@/components/cart/cart3/cartMoenyTotal";
import CartPayDividend from "@/components/cart/cart3/cartPayDividend";
import CartProductDetail from "@/components/cart/cart3/cartProductDetail";
import CartProductDetailM from "@/components/cart/cart3/cartProductDetailM";
import CartProductTotal from "@/components/cart/cart3/cartProductTotal";
import CartProductTotalM from "@/components/cart/cart3/cartProductTotalM";
import React from "react";

export default function CartCheckout3() {
  return (
    <>
      <>
        <title>Cart4</title>
        {/* Required meta tags */}
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Bootstrap CSS v5.2.1 */}
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
        <main>
          <div className="container mb-5 d-none d-lg-block">
            <div className="row">
              <div className="col-8">
                <div className="progressTitle3">
                  <div className="progressText13">確認訂單</div>
                  <div className="progressText23">填寫訂單詳情</div>
                  <div className="progressText33">完成訂單</div>
                </div>
                <div className="progressBar3">
                  <div className="progressCircle3 progressCircle13" />
                  <div className="progressLine3 progressLine13" />
                  <div className="progressCircle3 progressCircle23" />
                  <div className="progressLine3 progressLine23" />
                  <div className="progressCircle3 progressCircle33" />
                </div>
                <div className="payEndTitle">
                  <b>已完成結帳!!</b>
                </div>
                <CartProductTotal />
                <div className="cartProductDetailBox-3">
                  <div className="col-7 cartProductDetailBox1-3">品項</div>
                  <div className="col-1 cartProductDetailBox2-3">件數</div>
                  <div className="col-3 cartProductDetailBox3-3">小計</div>
                  <div className="col-1 cartProductDetailBox4-3">
                    <button>
                      <i className="fa-solid fa-chevron-up" />
                    </button>
                  </div>
                </div>
                <CartProductDetail />
                <CartProductDetail />
                <CartProductDetail />
              </div>
              <div className="col-4">
                <CartMoneyTotal />
                <CartPayDividend />
                <div className="checkOutEnd">
                  <button className="goOrder">訂單查詢</button>
                  <button className="goPage">回首頁</button>
                </div>
              </div>
            </div>
          </div>
          <div className="container d-block d-lg-none">
            <div className="progressTitle3">
              <div className="progressText13">確認訂單</div>
              <div className="progressText23">填寫訂單詳情</div>
              <div className="progressText33">完成訂單</div>
            </div>
            <div className="progressBar3">
              <div className="progressCircle3 progressCircle13" />
              <div className="progressLine3 progressLine13" />
              <div className="progressCircle3 progressCircle23" />
              <div className="progressLine3 progressLine23" />
              <div className="progressCircle3 progressCircle33" />
            </div>
            <div className="payEndTitle">
              <b>已完成結帳!!</b>
            </div>
            <div className="checkOutEnd">
              <button className="goOrder">訂單查詢</button>
              <button className="goPage">回首頁</button>
            </div>
            <CartProductTotalM />
            <div className="cartProductDetailBox-3">
              <div className="col-7 cartProductDetailBox1-3">品項</div>
              <div className="col-1 cartProductDetailBox2-3">件數</div>
              <div className="col-3 cartProductDetailBox3-3">小計</div>
              <div className="col-1 cartProductDetailBox4-3">
                <button>
                  <i className="fa-solid fa-chevron-up" />
                </button>
              </div>
            </div>
            <div className="cartProductDetailListM">
              <CartProductDetailM />
              <CartProductDetailM />
            </div>
            <CartMoneyTotal />
            <CartPayDividend />
          </div>
        </main>
      </>
    </>
  );
}
