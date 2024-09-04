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
  noProducts,
}) {
  const [localSearch, setLocalSearch] = useState(search);
  const [getSearch, setGetSearch] = useState(false);
  const [activeSort, setActiveSort] = useState("綜合排名");

  useEffect(() => {
    if (search !== "") {
      setGetSearch(true);
    }
    if (search === "") {
      setGetSearch(false);
    }
  }, [search]);

  const handleSortClick = (sortType) => {
    let newSort;
    switch (sortType) {
      case "綜合排名":
        newSort = "rating_desc";
        break;
      case "最新":
        newSort =
          activeSort === "最新" && currentSort === "id_desc"
            ? "id_asc"
            : "id_desc";
        break;
      case "年份":
        newSort =
          activeSort === "年份" && currentSort === "year_desc"
            ? "year_asc"
            : "year_desc";
        break;
      case "價格":
        newSort =
          activeSort === "價格" && currentSort === "price_desc"
            ? "price_asc"
            : "price_desc";
        break;
      default:
        newSort = "rating_desc";
    }
    setActiveSort(sortType);
    changeSort(newSort);
  };

  return (
    <>
      {/* top的排序+搜尋欄 */}
      <div className={`row ${styles["shop-fliterSearch"]}`}>
        <div className={`col`}></div>
        {getSearch && totalItems > 0 && (
          <div className={`col-4 d-flex ${styles["search-total"]}`}>
            <span className={`${styles["search-span"]}`}>
              &nbsp;{search}&nbsp;
            </span>{" "}
            的搜尋結果，共{" "}
            <span className={`${styles["search-span"]}`}>
              &nbsp;{noProducts ? 0 : totalItems}&nbsp;
            </span>{" "}
            筆
          </div>
        )}
        {/* top的排序欄 */}
        <div className={`col-2 ${styles["shop-fliter"]}`}>
          <select
            value={currentSort}
            onChange={(e) => {
              changeSort(e.target.value);
            }}
          >
            <option value={"id_asc"}>默認排序</option>
            <option value={"price_asc"}>金額 低 → 高</option>
            <option value={"price_desc"}>金額 高 → 低</option>
            <option value={"year_asc"}>年份 遠 → 近 </option>
            <option value={"year_desc"}>年份 近 → 遠</option>
            <option value={"rating_desc"}>評價 高 → 低</option>
            <option value={"rating_asc"}>評價 低 → 高</option>
          </select>
        </div>
        {/* top的search欄 */}
        <div className={`col-3 ${styles["shop-search"]}`}>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && localSearch !== "") {
                changeSearch(localSearch);
              }
            }}
            placeholder="搜尋關鍵字"
          />
          <button
            type="button"
            onClick={() => {
              if (localSearch !== "") {
                changeSearch(localSearch);
              }
            }}
            className={`${getSearch ? "d-none" : "d-flex"}` }
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
          <button
            type="button"
            onClick={() => {
              changeSearch("");
              setLocalSearch("");
            }}
            className={`${getSearch ? "d-flex" : "d-none"}`}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      {/* 手機搜尋+篩選 */}
      <div className={`row ${styles["shop-fliterSearch-m"]}`}>
        <div className={`col-md-11 col-10 ${styles["shop-search-m"]}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (localSearch !== "") {
                changeSearch(localSearch);
              }
            }}
          >
            <input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && localSearch !== "") {
                  changeSearch(localSearch);
                }
              }}
              placeholder="搜尋關鍵字"
            />
            <i
              className={`fa-solid fa-magnifying-glass ${styles["search-icon"]}`}
            />
            <button
              type="button"
              onClick={() => {
                changeSearch("");
                setLocalSearch("");
              }}
              className={`${getSearch ? "d-flex" : "d-none"} ${
                styles["search-clear"]
              }`}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </form>
        </div>
        <div
          className={`col-md-1 col-2 ${styles["shop-fliter-m"]} ${styles["aside-open-button"]}`}
        >
          <button
            className={`${styles["fliter-icon"]}`}
            onClick={onOpenMobileFilter}
          >
            <img src="/shop_images/fliter-icon.svg" alt="" />
          </button>
        </div>
      </div>
      {/* 手機排序 */}
      <div className={`${styles["shop-port"]}`}>
        {["綜合排名", "最新", "年份", "價格"].map((sortType, index) => (
          <React.Fragment key={sortType}>
            <button
              type="button"
              className={`${styles["port-button"]} ${
                styles[`port-${sortType.toLowerCase()}`]
              } ${activeSort === sortType ? styles.selected : ""}`}
              onClick={() => handleSortClick(sortType)}
            >
              {sortType}
              {activeSort === sortType && activeSort !== "綜合排名" && activeSort !== "最新" && (
                <span className={styles.sortDirection}>
                  {currentSort.includes("asc") ? " ↑" : " ↓"}
                </span>
              )}
            </button>
            {index < 3 && <div className={`${styles["port-hr"]}`}>|</div>}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
