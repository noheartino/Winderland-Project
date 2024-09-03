import React, { useEffect, useState } from "react";
import styles from "./SortSearch.module.css";
import MobileFliterAside from "../aside/MobileFliterAside";

export default function SortSearch({
  currentSort,
  changeSort,
  search,
  changeSearch,
  totalItems,
  onOpenMobileFilter,
}) {

  const [localSearch, setLocalSearch] = useState(search);
  const [getSearch, setGetSearch] = useState(false);

  useEffect(() => {
    if (search !== "") {
      setGetSearch(true);
    }
    if(search === ""){
      setGetSearch(false)
    }
  }, [search]);

  console.log(getSearch);

  return (
    <>
      {/* top的排序+搜尋欄 */}
      <div className={`row ${styles["shop-fliterSearch"]}`}>
        <div className={`col`}></div>
        <div
          className={`col-4 ${getSearch ? "d-flex" : "d-none"} ${styles["search-total"]}`}
        >
          <span className={`${styles["search-span"]}`}>
            &nbsp;{search}&nbsp;
          </span>{" "}
          的搜尋結果，共{" "}
          <span className={`${styles["search-span"]}`}>
            &nbsp;{totalItems}&nbsp;
          </span>{" "}
          筆
        </div>
        {/* top的排序欄 */}
        <div className={`col-2 ${styles["shop-fliter"]}`}>
          <select
            value={currentSort}
            onChange={(e) => {
              changeSort(e.target.value);
            }}
          >
            <option value={"id_asc"}>默認排序</option>
            <option value={"name_asc"}>商品名稱 A-Z</option>
            <option value={"name_desc"}>商品名稱 Z-A</option>
            <option value={"price_asc"}>商品金額 0-9</option>
            <option value={"price_desc"}>商品金額 9-0</option>
          </select>
        </div>
        {/* top的search欄 */}
        <div className={`col-3 ${styles["shop-search"]}`}>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                changeSearch(localSearch);
              }
            }}
            placeholder="搜尋關鍵字"
          />
          <button
            type="button"
            onClick={() => {
              changeSearch(localSearch);
            }}
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
      </div>
      {/* 手機搜尋+篩選 */}
      <div className={`row ${styles["shop-fliterSearch-m"]}`}>
        <div className={`col-md-11 col-10 ${styles["shop-search-m"]}`}>
          <form action="" method="">
            <input type="search" className="" placeholder="搜尋關鍵字" />
            <i
              className={`fa-solid fa-magnifying-glass ${styles["search-icon"]}`}
            />
          </form>
        </div>
        <div
          className={`col-md-1 col-2 ${styles["shop-fliter-m"]} ${styles["aside-open-button"]}`}
        >
          <button className={`${styles["fliter-icon"]}`} onClick={onOpenMobileFilter}>
            <img src="/shop_images/fliter-icon.svg" alt="" />
          </button>
        </div>
      </div>
      {/* 手機排序 */}
      <div className={`${styles["shop-port"]}`}>
        <div className={`${styles["port-top"]}`}>綜合排名</div>
        <div className={`${styles["port-hr"]}`}>|</div>
        <div className={`${styles["port-new"]}`}>最新</div>
        <div className={`${styles["port-hr"]}`}>|</div>
        <div className={`${styles["port-sales"]}`}>銷量</div>
        <div className={`${styles["port-hr"]}`}>|</div>
        <div className={`${styles["port-price"]}`}>價格</div>
      </div>
    </>
  );
}
