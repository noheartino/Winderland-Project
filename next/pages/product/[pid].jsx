import React,{useState,useEffect} from "react";
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

export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 掛載後執行一個獲取數據的副作用
  // 使用axios發送get訊息到指定URL API
  useEffect(() => {
    const fetchProductById = async (id) => {
      try {
        // response取得axios的回應數據(內容有很多但我們只要data)
        const response = await axios.get(`http://localhost:3005/api/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("加載商品時出錯");
        setLoading(false);
      }
    };
    fetchProductById();
  }, []);
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="container">
        {/* 商品路徑 */}
        <div className="row product-backhome">
          <Path product={product}/>
        </div>
        {/* 商品圖片 */}
        <div className="row">
          <div className="col-lg-6 col-md-12 product-photos">
            <ProductPhoto product={product}/>
          </div>
          <div className="col-lg-6 col-md-12 product-info">
            {/* 商品名稱~金額 */}
            <TitlePrice product={product}/>
            {/* 電腦+平版的form */}
            <PcFrom product={product}/>
          </div>
          {/* 手機的form */}
          <MobileForm product={product}/>
        </div>
        <div className="product-detail">
          <PcDescription product={product}/>
          <MobileDescription product={product}/>
        </div>
      </main>
      <div className="product-comment">
        <PcComment product={product}/>
        <MobileComment product={product}/>
      </div>
      <Footer />
    </>
  );
}
