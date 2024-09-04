import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import styles from "./MobileFliterAside.module.css";

export default function MobileFliterAside({
  isOpen,
  onClose,
  filters,
  changeFilter,
  selectFilters,
  fetchFilters,
}) {
  const router = useRouter();

  // 雙滑塊js start//
  const minLimit = 0;
  const maxLimit = 150000;
  const step = 5000;

  const [minValue, setMinValue] = useState(minLimit);
  const [maxValue, setMaxValue] = useState(maxLimit);
  const [priceRange, setPriceRange] = useState("0-150000");

  const priceRanges = [
    { label: "全部金額", value: "0-150000" },
    { label: "～＄1,000", value: "0-1000" },
    { label: "＄1,001~$3,000", value: "1001-3000" },
    { label: "＄3,001~$5,000", value: "3001-5000" },
    { label: "＄5,001~$10,000", value: "5001-10000" },
    { label: "＄10,001~$30,000", value: "10001-30000" },
    { label: "＄30,001~", value: "30001-" },
  ];

  const handlePriceRangeClick = (range) => {
    setPriceRange(range);
    const [min, max] = range.split("-");
    setMinValue(parseInt(min));
    setMaxValue(max ? parseInt(max) : 150000);
    changeFilter("price", {
      min: parseInt(min),
      max: max ? parseInt(max) : 150000,
    });
  };

  // 設定最大最小值的數字
  const handleSliderChange = (e) => {
    const value = Math.round(parseInt(e.target.value) / step) * step;
    if (e.target.id === "min-price") {
      setMinValue(Math.min(value, maxValue - step));
    } else {
      setMaxValue(Math.max(value, minValue + step));
    }
  };

  const applyPriceFilter = () => {
    changeFilter("price", { min: minValue, max: maxValue });
    setPriceRange(""); // 清除快速範圍選擇
  };

  // 雙滑塊js end//
  useEffect(() => {
    if (selectFilters.category) {
      changeFilter("country", "");
      changeFilter("origin", "");
    }
  }, [selectFilters.category, changeFilter]);

  useEffect(() => {
    if (selectFilters.country) {
      // 當國家變更時，重新獲取篩選器
      fetchFilters();
    }
  }, [selectFilters.country, fetchFilters]);

  const uniqueVarieties = useMemo(() => {
    if (!filters || !filters.varieties) return [];
    return Array.from(new Set(filters.varieties.map((v) => v.name))).map(
      (name) => filters.varieties.find((v) => v.name === name)
    );
  }, [filters]);

  // 如果 filters 或 filters.varieties 不存在，提前返回
  if (!filters || !filters.varieties) return null;

  // 開關選項的函式
  const toggleShowAllVarieties = () => {
    setShowAllVarieties(!showAllVarieties);
  };

  const toggleShowAllOrigins = () => {
    setShowAllOrigins(!showAllOrigins);
  };

  const handleCategoryChange = (categoryId) => {
    // 構建新的 URL，只包含 category 参数
    const newQuery = categoryId ? { category: categoryId } : {};

    // 使用 router.push 來更新 URL，替換當前歷史紀錄
    router.push(
      {
        pathname: "/product",
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );

    // 調用 changeFilter 来更新组件狀態
    changeFilter("category", categoryId);

    // 重置其他篩選條件
    changeFilter("country", "");
    changeFilter("origin", "");
    changeFilter("variet", "");
    changeFilter("price", { min: minLimit, max: maxLimit });
    setMinValue(minLimit);
    setMaxValue(maxLimit);
    setPriceRange("0-150000");
  };

  return (
    <>
      <div
        className={`${styles["shop-aside-overlay-m"]} ${
          isOpen ? styles.open : ""
        }`}
      />
      <div className={`${styles["shop-aside-m"]} ${isOpen ? styles.open : ""}`}>
        <div className={`${styles["shop-aside-m-top"]}`}>
          <img src="/shop_images/fliter-icon-white.svg" alt="" />
          <p>篩選項目</p>
          <button
            className={`${styles["aside-close-button"]}`}
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <form>
          {/* 類型篩選 */}
          <div className={`${styles["shop-category-fliter-m"]}`}>
            <div className={`${styles["shop-category-title"]}`}>類型</div>
            <select
              value={selectFilters.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">全部商品&nbsp;&nbsp;All Wine</option>
              {filters.categories.map((c) => (
                <option key={c.id} value={c.id.toString()}>
                  {c.name}&nbsp;&nbsp;{c.name_en}
                </option>
              ))}
            </select>
            <div className={`${styles["shop-category-tags"]}`}>
              {filters.categories &&
                filters.categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    value={category.id}
                    className={`${styles["category-tag"]}`}
                    onClick={(e) => handleCategoryChange(e.target.value)}
                  >
                    {category.name_en.replace(/\s*Wine\s*/, "")}&nbsp;
                    {category.name}
                  </button>
                ))}
            </div>
          </div>

          {/* 品種篩選 */}
          <div className={`${styles["shop-variet-fliter-m"]}`}>
            <div className={`${styles["shop-variet-title"]}`}>品種</div>
            <select
              value={selectFilters.variet}
              onChange={(e) => changeFilter("variet", e.target.value)}
            >
              <option value="">全部品種</option>
              {(filters.varieties || []).map((v, index) => (
                <option key={index} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* 國家篩選 */}
          <div className={`${styles["shop-country-fliter-m"]}`}>
            <div className={`${styles["shop-country-title"]}`}>國家</div>
            <select
              value={selectFilters.country}
              onChange={(e) => {
                changeFilter("country", e.target.value);
              }}
            >
              <option value="">全部國家</option>
              {filters.countries.map((c, index) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* 產地篩選 */}
          <div className={`${styles["shop-origin-fliter-m"]}`}>
            <div className={`${styles["shop-origin-title"]}`}>產地</div>
            <select
              value={selectFilters.origin}
              onChange={(e) =>
                changeFilter("origin", e.target.value.toString())
              }
            >
              <option value="">全部產地</option>
              {filters.origins
                .filter(
                  (o) =>
                    o.belongsToSelectedCountry === true || !selectFilters.country
                )
                .map((o, index) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
            </select>
          </div>

          {/* 價格篩選 */}
          <div className={`${styles["shop-price-fliter-m"]}`}>
            <div className={`${styles["shop-price-title"]}`}>價格</div>
            <select
              value={priceRange}
              onChange={(e) => {
                handlePriceRangeClick(e.target.value);
              }}
            >
              {priceRanges.map((range, index) => (
                <option key={index} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* 顯示金額的地方 */}
          <div className={`${styles["minmaxprice"]}`}>
            <div className={`${styles["aside-price"]} ${styles["min-price"]}`}>
              <div className={`${styles["money-icon"]}`}>$</div>
              <div
                className={`${styles["min-price-value"]} ${styles["price-value"]}`}
              >
                {minValue}
              </div>
            </div>
            <div className={`${styles["dash"]}`}>-</div>
            <div className={`${styles["max-price"]} ${styles["aside-price"]}`}>
              <div className={`${styles["money-icon"]}`}>$</div>
              <div
                className={`${styles["max-price-value"]} ${styles["price-value"]}`}
              >
                {maxValue}
              </div>
            </div>
          </div>

          {/* 雙滑塊 */}
          <div className={`${styles["price-slider"]}`}>
            <input
              type="range"
              id="min-price"
              min={minLimit}
              max={maxLimit}
              value={minValue}
              onChange={handleSliderChange}
            />
            <input
              type="range"
              id="max-price"
              min={minLimit}
              max={maxLimit}
              value={maxValue}
              onChange={handleSliderChange}
            />
          </div>
          <div className={`row ${styles["slider-minmax"]}`}>
            <div className={`col-8 ${styles["money-min"]}`}>$0</div>
            <div className={`col-3 ${styles["money-max"]}`}>$150,000</div>
          </div>
          <div className={`${styles["shop-fliter-buttons"]}`}>
            <button
              type="button"
              className={`btn ${styles["reset-button"]}`}
              onClick={() => handleCategoryChange("")}
            >
              重新設定
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                applyPriceFilter();
                onClose();
              }}
              className={`btn ${styles["submit-button"]}`}
            >
              完成篩選
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
