import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useRouter } from "next/router";

export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const pid = router.query.pid;

  useEffect(() => {
    if(pid){
      const fetchProduct = async () => {
        try{
          setLoading(true);
          const response = await axios.get(`http://localhost:3005/api/product/${pid}`)
          setProduct(response.data);
        }catch(err){
          setError("獲取資料失敗");
          console.error(err);
        }finally{
          setLoading(false);
        }
      }
      fetchProduct();
    }
  },[pid])

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <>
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
            <TitlePrice product={product}/>
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
    </>
  );
}
