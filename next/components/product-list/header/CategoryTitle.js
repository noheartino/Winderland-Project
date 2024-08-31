import React, { useEffect, useState, useMemo, useRef } from "react";
import styles from "./CategoryTitle.module.css";

export default function CategoryTitle({ filters, selectFilters }) {
  const DEFAULT_IMAGE = "/shop_images/all.jpg";
  const [currentImage, setCurrentImage] = useState(DEFAULT_IMAGE);
  const [nextImage, setNextImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categoryChange, setCategoryChange] = useState(false);
  const prevCategoryRef = useRef();

  // 使用useMemo記憶當前category
  const currentCategory = useMemo(() => {
    return (
      filters.categories.find((c) => c.id === selectFilters.category) || {
        name: "全部商品",
        name_en: "All Wine",
        img: "all.jpg",
      }
    );
  }, [selectFilters.category, filters.categories]);

  // 取得圖片的路徑
  const getImageUrl = (filename) => {
    if (!filename) return DEFAULT_IMAGE;
    return `/shop_images/${filename}`;
  };

  useEffect(() => {
    if (prevCategoryRef.current !== selectFilters.category) {
      setIsLoading(true);
      setCategoryChange(true);
      const newImage = getImageUrl(currentCategory.img);

      const img = new Image();
      img.src = newImage;
      img.onload = () => {
        setNextImage(newImage);
        setIsLoading(false);

        setTimeout(() => {
          setCurrentImage(newImage);
          setCategoryChange(false);
        }, 500);
      };

      prevCategoryRef.current = selectFilters.category;
    }
  }, [currentCategory, selectFilters.category]);

  return (
    <>
      <div
        className={`${styles["shop-header-img"]} 
                     ${isLoading ? styles["loading"] : ""} 
                     ${categoryChange ? styles["transitioning"] : ""}`}
      >
        <div
          className={`${styles["background-layer"]} ${styles["current"]}`}
          style={{ backgroundImage: `url(${currentImage})` }}
        ></div>
        <div
          className={`${styles["background-layer"]} ${styles["next"]}`}
          style={{ backgroundImage: `url(${nextImage})` }}
        ></div>
        <div
          className={`${styles["shop-header-title"]} ${
            categoryChange ? styles["title-transitioning"] : ""
          }`}
        >
          <h1 className={`h3 `}>
            {currentCategory ? currentCategory.name : "全部商品"}
          </h1>
          <h5>({currentCategory ? currentCategory.name_en : "All Wine"})</h5>
        </div>
      </div>
    </>
  );
}
