import React, {useState,useEffect} from "react";
import axios from "axios";
import CategoryTitle from "@/components/product-list/header/CategoryTitle";
import SortSearch from "@/components/product-list/sortSearch/SortSearch";
import MobileFliterAside from "@/components/product-list/aside/MobileFliterAside";
import PcFliterAside from "@/components/product-list/aside/PcFliterAside";
import ProductGroup from "@/components/product-list/productlist/ProductList";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import ListPageNation from "@/components/product-list/productlist/ListPageNation";

export default function ProductIndex() {

  const [products,setProducts] = useState([]);
  const [categories,setCategoryies] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0);
  const [itemsPerPage,setItemsPerPage] = useState(16);
  const [totalItems,setTotalItems] = useState(0);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  // 掛載後執行一個獲取數據的副作用
  // 使用axios發送get訊息到指定URL API
  useEffect(() => {
    const fetchProducts = async () => {
    try{
      // response取得axios的回應數據(內容有很多但我們只要data)
      const response = await axios.get('http://localhost:3005/api/product');
      setProducts(response.data.products);
      setCategoryies(response.data.categories);

      setLoading(false);
    }catch(err){
      setError('加載商品時出錯');
      setLoading(false);
    }
  };
  fetchProducts();
  },[]);

  if(loading) return <div>加載中...</div>;
  if(error) return <div>{error}</div>;

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
            <PcFliterAside categories={categories}/>
            {/* 商品list */}
            <ProductGroup products={products}/>
            {/* 分頁 */}
            <ListPageNation />
          </div>
        </div>
        <Footer />
      </>
    </>
  );
}
