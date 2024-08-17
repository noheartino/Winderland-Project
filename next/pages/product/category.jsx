import React from "react";
import CategoryTitle from "@/components/product-list/header/CategoryTitle";
import SortSearch from "@/components/product-list/sortSearch/SortSearch";
import MobileFliterAside from "@/components/product-list/aside/MobileFliterAside";
import PcFliterAside from "@/components/product-list/aside/PcFliterAside";
import ProductGroup from "@/components/product-list/productlist/ProductList";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";

export default function ProductList() {
  return (
    <>
      <>
        <header>
          <Nav />
          {/* TOP的分類名稱 */}
          <CategoryTitle />
        </header>
        <div className="container">
          {/* 排序跟搜尋 */}
          <SortSearch />
          {/* 手機&平板版的開關aside */}
          <MobileFliterAside />
          {/* 主要內容 */}
          <div className="row main-content">
            {/* 電腦版篩選 */}
            <PcFliterAside />
            {/* 商品list */}
            <ProductGroup />
          </div>
        </div>
        <Footer />
      </>
    </>
  );
}
