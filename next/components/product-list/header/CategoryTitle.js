import React, { useEffect, useState } from "react";
import styles from "./CategoryTitle.module.css";

export default function CategoryTitle({ filters, selectFilters }) {
  const DEFAULT_IMAGE = "/shop_images/all.jpg";
  const [currentImage, setCurrentImage] = useState(DEFAULT_IMAGE);
  const [nextImage, setNextImage] = useState("");
  const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let category = filters.categories.find(
      (c) => c.id === selectFilters.category
    );
    const newImage = category
      ? getImageUrl(category.img)
      : getImageUrl("all.jpg");

    const img = new Image();
    img.src = newImage;
    img.onload=() => {
      setNextImage(newImage);
      setTimeout(() => {
        setCurrentImage(newImage);
        setIsLoading(false);
      },300) //短暫延遲觸發過度效果
    }

    img.onerror = () => {
      console.error("Error loading image:",newImage);
      setIsLoading(false);
    }

  }, [selectFilters.category, filters.categories]);

  // 取得圖片的路徑
  const getImageUrl = (filename) => {
    if (!filename) return "";
    return `/shop_images/${filename}`;
  };

  let category = filters.categories.find(
    (c) => c.id === selectFilters.category
  );

  return (
    <>
      <div className={`${styles["shop-header-img"]} ${isLoading ? styles["loading"] : ""}`}>
        <div className={`${styles['background-layer']} ${styles['current']}`} style={{backgroundImage: `url(${currentImage})`}}></div>
        <div className={`${styles['background-layer']} ${styles['next']}`} style={{backgroundImage: `url(${nextImage})`}}></div>
        <div className={`${styles['overlay']}`}></div>
        <div className={styles["shop-header-title"]}>
          <h1 className={`h3 ${isLoading ? styles["loading"] : ""}`}>{category ? category.name : "全部商品"}</h1>
          <h5 className={`${isLoading ? styles["loading"] : ""}`}>({category ? category.name_en : "All Wine"})</h5>
        </div>
      </div>
    </>
  );
}
