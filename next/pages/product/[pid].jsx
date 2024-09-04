import React from "react";
import { ProductProvider } from "@/context/ProductContext";
import Path from "@/components/product-detail/path/Path";
import ProductPhoto from "@/components/product-detail/photo/ProductPhoto";
import TitlePrice from "@/components/product-detail/titlePrice/TitlePrice";
import PcFrom from "@/components/product-detail/form/PcFrom";
import MobileForm from "@/components/product-detail/form/MobileForm";
import MobileDescription from "@/components/product-detail/description/MobileDescription";
import PcDescription from "@/components/product-detail/description/PcDescription";
import PcComment from "@/components/product-detail/comment/PcComment";
import MobileComment from "@/components/product-detail/comment/MobileComment";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import Head from "next/head";



export default function ProductDetail() {

  return (
    <>

      <ProductProvider>
      <Head>
          <title>醺迷仙園｜商品詳情</title>

          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="icon" href="/logo.png" />
      </Head>
        <header>
          <Nav />
        </header>
        <main className="container">
          {/* 商品路徑 */}
          <div className="row product-backhome">
            <Path />
          </div>
          {/* 商品圖片 */}
          <div className="row">
            <div className="col-lg-6 col-md-12 product-photos">
              <ProductPhoto />
            </div>
            <div className="col-lg-6 col-md-12 product-info">
              {/* 商品名稱~金額 */}
              <TitlePrice />
              {/* 電腦+平版的form */}
              <PcFrom />
            </div>
            {/* 手機的form */}
            <MobileForm />
          </div>
          <div className="product-detail">
            <PcDescription />
            <MobileDescription />
          </div>
        </main>
        <div className="product-comment">
          <PcComment />
          <MobileComment />
        </div>
        <Footer />
      </ProductProvider>
    </>
  );
}
