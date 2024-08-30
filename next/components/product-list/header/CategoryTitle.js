import React from "react";
import styles from  "./CategoryTitle.module.css";


export default function CategoryTitle({filters,selectFilters}) {

  let category = filters.categories.find((c) => {
    if(c.id === selectFilters.category){
      return c;
    }
  })

  // 取得圖片的路徑
  const getImageUrl = (filename) => {
    if(!filename) return '';
    return `/shop_images/${filename}`;
  }

  const backgroundStyles = category ? 
  {backgroundImage:`url(${getImageUrl(category.img)})`} : {backgroundImage:`url(${getImageUrl('all.jpg')})`}

  return (
    <>
      <div className={styles["shop-header-img"]} style={backgroundStyles}>
        <div className={styles["shop-header-title"]}>
          {/* 到時候內容要跑資料庫的Category */}
          <h1 className="h3">{category ? category.name : "全部商品"}</h1>
          <h5>({category ? category.name_en : "All Wine"})</h5>
        </div>
      </div>
    </>
  );
}
