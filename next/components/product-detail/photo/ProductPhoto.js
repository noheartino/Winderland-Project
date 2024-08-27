import React, { useEffect, useState } from "react";
import styles from "./ProductPhoto.module.css";
import { useProduct } from "@/context/ProductContext";

export default function ProductPhoto() {
  const { product, loading, error } = useProduct();
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  useEffect(() => {
    if (
      product &&
      product[0] &&
      product[0].images &&
      product[0].images.length > 0
    ) {
      product[0].images.reverse();
      console.log(product[0].images)
      setCurrentImageIndex(0);
    }
  }, [product]);

  const changeImage = (direction) => {
    if (product && product[0] && product[0].images) {
      const imagesLength = product[0].images.length;
      if (direction === "next") {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesLength);
      } else if (direction === "prev") {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex - 1 + imagesLength) % imagesLength
        );
      }
    }
  };

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>查無此商品</div>;

  return (
    <>
      {/* 商品大圖片 */}
      <div className={`${styles["product-photo-bg"]}`}>
        <button
          type="button"
          className={`${styles["arrow-button"]}  ${styles["arrow-left"]}`}
          onClick={() => changeImage("prev")}
        >
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <img className={`${styles["product-img"]}`} src={`/images/product/${product[0].images[currentImageIndex].path}`} alt="" />
        <button
          type="button"
          className={`${styles["arrow-button"]} ${styles["arrow-right"]}`}
          onClick={() => changeImage("next")}
        >
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
      {/* 商品小圖片們 */}
      <div className={`gap-2 ${styles["product-photos-sm"]}`}>
        {product[0].images.map((image, index) => (
          <div
            key={index}
            className={`col-3 ${styles["product-photo-sm"]}`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              className={`${styles["product-img"]}`}
              src={`/images/product/${image.path}`}
              alt=""
            />
          </div>
        ))}
        <div className={`col-3`}></div>
        <div className={`col-3`}></div>
      </div>
    </>
  );
}
