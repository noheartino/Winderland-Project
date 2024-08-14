import React, { useEffect, useState } from "react";
import CartProduct from "@/components/cart/cart1/cartProduct"; // 引入 CartProduct 組件
import CartPorductM from "@/components/cart/cart1/cartPorductM";
import CartClassM from "@/components/cart/cart1/cartClassM";
import CartClass from "@/components/cart/cart1/cartClass";
import CartMoney from "@/components/cart/cart1/cartMoney";
import CartMoneyM from "@/components/cart/cart1/cartMoneyM";
import CartCoupon from "@/components/cart/cart1/cartCoupon";
import CartCouponM from "@/components/cart/cart1/cartCouponM";
export default function CartCheck1() {
  return (
    <>
      <title>Cart2</title>
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
            <div className="col-7">
              <div className="progressTitle">
                <div className="progressText1">確認訂單</div>
                <div className="progressText2">填寫訂單詳情</div>
                <div className="progressText3">完成訂單</div>
              </div>
              <div className="progressBar">
                <div className="progressCircle progressCircle1" />
                <div className="progressLine progressLine1" />
                <div className="progressCircle progressCircle2" />
                <div className="progressLine progressLine2" />
                <div className="progressCircle progressCircle3" />
              </div>
              <div className="checkAllBox">
                <input type="checkbox" id="all" />
                <label htmlFor="all">全部</label>
              </div>
              <div>
                <div className="checkProductBox">
                  <input type="checkbox" id="productCheck" />
                  <label htmlFor="productCheck">酒類商品</label>
                </div>
                <CartProduct />
                <CartProduct />
                <CartProduct />
              </div>
              <div>
                <div className="checkClassBox">
                  <input type="checkbox" id="classCheck" />
                  <label htmlFor="classCheck">課程商品</label>
                </div>
                <CartClass />
                <CartClass />
              </div>
            </div>
            <div className="col-1" />
            <div className="col-4">
              <CartMoney />
              <CartCoupon />
            </div>
          </div>
        </div>
        <div className="container d-block d-lg-none">
          <div className="progressTitle">
            <div className="progressText1">確認訂單</div>
            <div className="progressText2">填寫訂單詳情</div>
            <div className="progressText3">完成訂單</div>
          </div>
          <div className="progressBar">
            <div className="progressCircle progressCircle1" />
            <div className="progressLine progressLine1" />
            <div className="progressCircle progressCircle2" />
            <div className="progressLine progressLine2" />
            <div className="progressCircle progressCircle3" />
          </div>
          <div className="checkAllBox">
            <input type="checkbox" id="allM" />
            <label htmlFor="allM">全部</label>
          </div>
          <div>
            <div className="checkProductBox">
              <input type="checkbox" id="productCheckM" />
              <label htmlFor="productCheckM">酒類商品</label>
            </div>
            <CartPorductM />
            <CartPorductM />
            <CartPorductM />
          </div>
          <div>
            <div className="checkClassBox">
              <input type="checkbox" id="classCheckM" />
              <label htmlFor="classCheckM">課程商品</label>
            </div>
            <CartClassM />
            <CartClassM />
          </div>
          <CartCouponM />
          <div style={{ height: "150px" }}></div> {/* 占位元素 */}
        </div>
        <CartMoneyM />
      </main>
    </>
  );
}
