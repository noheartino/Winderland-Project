import React, { useEffect, useState, useMemo, useRef } from "react";
import styles from "./CategoryTitle.module.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function CategoryTitle({ filters, selectFilters }) {
  const DEFAULT_IMAGE = "/shop_images/all.jpg";
  const [currentImage, setCurrentImage] = useState(DEFAULT_IMAGE);
  const [nextImage, setNextImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categoryChange, setCategoryChange] = useState(false);
  const prevCategoryRef = useRef();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // 使用useMemo記憶當前category
  const currentCategory = useMemo(() => {
    const categoryId =
      parseInt(selectFilters.category) || selectFilters.category;
    if (!filters || !filters.categories || filters.categories.length === 0) {
      return {
        name: "全部商品",
        name_en: "All Wine",
        img: "all.jpg",
      }; // 如果分類資料還未回傳，返回預設值
    }
    return (
      filters.categories.find((c) => c.id === categoryId) || {
        name: "全部商品",
        name_en: "All Wine",
        img: "all.jpg",
      }
    );
  }, [selectFilters.category, filters]);

  // 取得圖片的路徑
  const getImageUrl = (filename) => {
    if (!filename) return DEFAULT_IMAGE;
    return `/shop_images/${filename}`;
  };

  useEffect(() => {
    if (filters && filters.categories && filters.categories.length > 0 && !isDataLoaded) {
      setIsDataLoaded(true);
    }
  }, [filters, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded || !currentCategory) return;

    console.log("Current category:", currentCategory);
    console.log("Select filters:", selectFilters);
    console.log("Filters categories:", filters.categories);
    if (prevCategoryRef.current !== selectFilters.category) {
      setIsLoading(true);
      setCategoryChange(true);
      const newImage = getImageUrl(currentCategory.img);

      const img = new Image();
      img.src = newImage;
      console.log("New image:", newImage);
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
  }, [currentCategory, selectFilters.category, isDataLoaded]);

  if (!isDataLoaded || !currentCategory) {
    return (
      <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ClipLoader
          color="#851931"
          loading={true}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );;
  }

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
          <h1 className={`h3 `}>{currentCategory.name}</h1>
          <h5>({currentCategory.name_en})</h5>
        </div>
      </div>
    </>
  );
}
