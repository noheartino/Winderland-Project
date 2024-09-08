import React from "react";
import styles from "./MobileDescription.module.css";
import Depiction from "./Depiction";
import IntroduceList from "./IntroduceList";
import { useProduct } from "@/context/ProductContext";
import ClipLoader from "react-spinners/ClipLoader";


export default function MobileDescription() {
  const { product, loading, error } = useProduct();

  if (loading) {
    return (
      <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ClipLoader
          color="#851931"
          loading={loading}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  if (error) return <div>{error}</div>;
  if (!product) return <div>查無此商品</div>;

  const hasComments = product[0].comments && product[0].comments.length > 0;

  return (
    <>
      <div className={`row ${styles["product-info2"]}`}>
        {hasComments && (
          <div className={`col-lg-7 col-md-12 ${styles["product-depiction"]}`}>
            <div className={`${styles["product-detail-md-title"]}`}>
              <img src="/product_images/square.svg" alt="" />
              <div className={`${styles["title-font"]}`}>商品特性</div>
              <img src="/product_images/square.svg" alt="" />
            </div>
            <Depiction />
          </div>
        )}
        <div className={`col-lg-5 col-md-12 ${styles["product-introduce"]}`}>
          <div className={`${styles["product-detail-md-title"]}`}>
            <img src="/product_images/square.svg" alt="" />
            <div className={`${styles["title-font"]}`}>商品資訊</div>
            <img src="/product_images/square.svg" alt="" />
          </div>
          <IntroduceList />
        </div>
      </div>
    </>
  );
}
