import React, { useEffect, useState } from "react";
import styles from "./IntroduceList.module.css"
import { useProduct } from "@/context/ProductContext";

export default function IntroduceList() {
  const {product,loading,error,detail} = useProduct();
  const [currentDetail,setCurrentDetail] = useState();

  useEffect(() => {
    if(product && product[0] && product[0].details){
      const foundDetail =
        product[0].details.find((d) => d.id === detail) ||
        product[0].details[0];
      setCurrentDetail(foundDetail);
    };
  }, [product, detail])
  
  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;
  if (!product || !currentDetail) return <div>查無此商品</div>;

  return (
    <>
      <div>
        <div className={`${styles["product-introduce-list"]}`}>
          產地 - {product[0].country_name} {product[0].origin_name}
        </div>
        <div className={`${styles["product-introduce-list"]}`}>
          容量 - {currentDetail.capacity}ml
        </div>
        <div className={`${styles["product-introduce-list"]}`}>
          年份 - {currentDetail.years}年
        </div>
        <div className={`${styles["product-introduce-list"]}`}>
          品牌 - {product[0].brand}
        </div>
        <div className={`${styles["product-introduce-list"]}`}>
          品種 - {product[0].variet_name}
        </div>
      </div>
    </>
  );
}
