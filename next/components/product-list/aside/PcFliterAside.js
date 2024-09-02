import React, { useState, useEffect, useMemo } from "react";
import styles from "./PcFliterAside.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PcFliterAside({
  filters,
  changeFilter,
  selectFilters,
}) {
  const router = useRouter();

  // 開啟更多選項
  const [showAllVarieties, setShowAllVarieties] = useState(false);
  const [showAllOrigins, setShowAllOrigins] = useState(false);
  // 初始顯示的選項數
  const INITIAL_SHOW_COUNT = 5;

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
      changeFilter("origin", "");    }
  }, [selectFilters.category, changeFilter]);

  const uniqueVarieties = useMemo(() => {
    if (!filters || !filters.varieties) return [];
    return Array.from(new Set(filters.varieties.map((v) => v.name)))
      .map((name) => filters.varieties.find((v) => v.name === name));
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
    // 构建新的 URL，只包含 category 参数
    const newQuery = categoryId ? { category: categoryId } : {};
    
    // 使用 router.push 来更新 URL，替换当前的历史记录
    router.push({
      pathname: '/product',
      query: newQuery,
    }, undefined, { shallow: true });

    // 调用 changeFilter 来更新组件状态
    changeFilter("category", categoryId);

    // 重置其他筛选条件
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
      <aside className={`col-3 pe-5 ${styles["product-pc-aside"]}`}>
        {/* 類型篩選 */}
        <div className={`col ${styles["shop-category-fliter"]}`}>
          <p className={`${styles["shop-flite-p"]}`}>類型</p>
          <button
            type="button"
            className={`${styles["category-button"]} ${
              selectFilters.category === "" ||
              selectFilters.category === undefined
                ? styles.selected
                : ""
            }`}
            onClick={() => handleCategoryChange("")}
          >
            全部商品&nbsp;&nbsp;All Wine
          </button>
          {filters.categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`${styles["category-button"]} ${
                selectFilters.category === c.id.toString() ? styles.selected : ""
              }`}
              onClick={() => handleCategoryChange(c.id.toString())}
            >
              {c.name}&nbsp;&nbsp;{c.name_en}{" "}
            </button>
          ))}
        </div>

        {/* 品種篩選 */}
        <div className={`col ${styles["shop-variet-fliter"]}`}>
          <p className={`${styles["shop-flite-p"]}`}>品種</p>
          <form action="">
            <div>
              <input
                type="radio"
                name="variet"
                id="allVarieties"
                value=""
                checked={selectFilters.variet === ""}
                onChange={() => changeFilter("variet", "")}
              />
              <label htmlFor="allVarieties">全部品種</label>
              {(filters.varieties || [])
                .slice(0, showAllVarieties ? undefined : INITIAL_SHOW_COUNT)
                .map((v, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="variet"
                      id={`variet-${v.name}`}
                      value={v.name}
                      checked={selectFilters.variet === v.name}
                      onChange={() => changeFilter("variet", v.name)}
                    />
                    <label htmlFor={`variet-${v.name}`}>{v.name}</label>
                  </div>
                ))}
            </div>
            {filters.varieties.length > INITIAL_SHOW_COUNT && (
              <button
                type="button"
                onClick={toggleShowAllVarieties}
                className={`${styles["show-more-button"]}`}
              >
                {showAllVarieties ? (
                  <>
                    收起 <i className="fa-solid fa-angles-up"></i>
                  </>
                ) : (
                  <>
                    顯示更多 <i className="fa-solid fa-angles-down"></i>
                  </>
                )}
              </button>
            )}
          </form>
        </div>
        {/* 國家篩選 */}
        <div className={`col ${styles["shop-country-fliter"]}`}>
          <p className={`${styles["shop-flite-p"]}`}>國家</p>
          <form action="">
            <div>
              <input
                type="radio"
                name="country"
                id="allCountry"
                value=""
                checked={selectFilters.country === ""}
                onChange={() => changeFilter("country", "")}
              />
              <label htmlFor="allCountry">全部國家</label>
              {filters.countries.map((c, index) => (
                <div key={c.id}>
                  <input
                    type="radio"
                    name="country"
                    id={`country-${c.id}`}
                    value={c.id}
                    checked={selectFilters.country === c.id}
                    onChange={() => changeFilter("country", c.id)}
                  />
                  <label htmlFor={`country-${c.id}`}>{c.name}</label>
                  <br />
                </div>
              ))}
            </div>
          </form>
        </div>
        {/* 產地篩選 */}
        <div className={`col ${styles["shop-origin-fliter"]}`}>
          <p className={`${styles["shop-flite-p"]}`}>產地</p>
          <form action="">
            <div>
              <input
                type="radio"
                name="origin"
                id="allOrigin"
                value=""
                checked={selectFilters.origin === ""}
                onChange={() => changeFilter("origin", "")}
              />
              <label htmlFor="allOrigin">全部產地</label>
              {filters.origins.filter(o => o.belongsToSelectedCountry)
                .slice(0, showAllOrigins ? undefined : INITIAL_SHOW_COUNT)
                .map((o, index) => (
                  <div
                    key={o.id}
                    className={
                      o.belongsToSelectedCountry ? "" : styles.disabledOption
                    }
                  >
                    <input
                      type="radio"
                      name="origin"
                      id={`origin-${o.id}`}
                      value={o.id}
                      checked={selectFilters.origin === o.id.toString()}
                      onChange={() => changeFilter("origin", o.id.toString())}
                      disabled={!o.belongsToSelectedCountry}
                    />
                    <label
                      htmlFor={`origin-${o.id}`}
                      className={
                        o.belongsToSelectedCountry ? "" : styles.disabledOption
                      }
                    >
                      {o.name}
                    </label>
                    <br />
                  </div>
                ))}
              {filters.origins.filter(o => o.belongsToSelectedCountry).length > INITIAL_SHOW_COUNT && (
                <button
                  type="button"
                  onClick={toggleShowAllOrigins}
                  className={`${styles["show-more-button"]}`}
                >
                  {showAllOrigins ? (
                    <>
                      收起 <i className="fa-solid fa-angles-up"></i>
                    </>
                  ) : (
                    <>
                      顯示更多 <i className="fa-solid fa-angles-down"></i>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
        {/* 價格篩選 */}
        <div className={`col ${styles["shop-price-fliter"]}`}>
          <p className={`${styles["shop-flite-p"]}`}>價格</p>
          <form action="">
            {priceRanges.map((range, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="price"
                  id={`price-${index}`}
                  value={range.value}
                  checked={priceRange === range.value}
                  onChange={() => handlePriceRangeClick(range.value)}
                />
                <label htmlFor={`price-${index}`}>{range.label}</label>
              </div>
            ))}
          </form>
          {/* 雙滑塊篩選金額 */}
          <form action="" className={`${styles["aside-price-fliter"]}`}>
            <div className={`${styles["minmaxprice"]}`}>
              <div
                className={`${styles["min-price"]} ${styles["aside-price"]}`}
              >
                <div className={`${styles["money-icon"]}`}>$</div>
                <div
                  className={`${styles["min-price-value"]} ${styles["price-value"]}`}
                >
                  {minValue}
                </div>
              </div>
              <div className={`${styles["dash"]}`}>-</div>
              <div
                className={`${styles["max-price"]} ${styles["aside-price"]}`}
              >
                <div className={`${styles["money-icon"]}`}>$</div>
                <div
                  className={`${styles["max-price-value"]} ${styles["price-value"]}`}
                >
                  {maxValue}
                </div>
              </div>
            </div>
            <div className={`${styles["price-slider"]}`}>
              <input
                type="range"
                id="min-price"
                min={0}
                max={150000}
                value={minValue}
                onChange={handleSliderChange}
              />
              <input
                type="range"
                id="max-price"
                min={0}
                max={150000}
                value={maxValue}
                onChange={handleSliderChange}
              />
            </div>
            <div className={`row ${styles["slider-minmax"]}`}>
              <div className={`col-lg-8 col-md-8  ${styles["money-min"]}`}>
                $0
              </div>
              <div className={`col-lg-3 col-md-3 ${styles["money-max"]}`}>
                $150,000
              </div>
            </div>
            <button
              className={`${styles["shop-fliter-button"]}`}
              onClick={(e) => {
                e.preventDefault();
                applyPriceFilter();
              }}
            >
              <div>執行篩選</div>
              <img src="/shop_images/arrow.svg" alt="" />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
