import React, { useState, useEffect } from "react";
import styles from "./MobileFliterAside.module.css";

export default function MobileFliterAside({
  isOpen,
  onClose,
  filters,
  selectFilters,
  changeFilter,
  resetFilters,
  fetchProducts,
  fetchFilters
}) {
  const [localFilters, setLocalFilters] = useState(selectFilters);
  const [minValue, setMinValue] = useState(selectFilters.minPrice || 0);
  const [maxValue, setMaxValue] = useState(selectFilters.maxPrice || 150000);

  useEffect(() => {
    setLocalFilters(selectFilters);
    setMinValue(selectFilters.minPrice || 0);
    setMaxValue(selectFilters.maxPrice || 150000);
  }, [selectFilters]);

  const minLimit = 0;
  const maxLimit = 150000;
  const step = 500;

  const getStep = (value) => {
    return Math.round(value / step) * step;
  };

  const minChange = (e) => {
    const rawValue = Number(e.target.value);
    const steppedValue = getStep(rawValue);
    const newMinValue = Math.min(steppedValue, maxValue - 4 * step);
    setMinValue(newMinValue);
    setLocalFilters(prev => ({ ...prev, minPrice: newMinValue }));
  };

  const maxChange = (e) => {
    const rawValue = Number(e.target.value);
    const steppedValue = getStep(rawValue);
    const newMaxValue = Math.max(steppedValue, minValue + 4 * step);
    setMaxValue(newMaxValue);
    setLocalFilters(prev => ({ ...prev, maxPrice: newMaxValue }));
  };

  const handleFilterChange = async (filterType, value) => {
    let newFilters = { ...localFilters, [filterType]: value };
    
    if (filterType === 'category') {
      newFilters = { ...newFilters, variet: '', origin: '', country: '' };
    } else if (filterType === 'country') {
      newFilters = { ...newFilters, origin: '' };
    }
    
    setLocalFilters(newFilters);
    
    // 立即更新 selectFilters 並重新獲取篩選器
    Object.entries(newFilters).forEach(([key, val]) => {
      changeFilter(key, val);
    });
    
    await fetchFilters();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProducts(localFilters);
    onClose();
  };

  const handleReset = async () => {
    const resetFiltersState = {
      category: "",
      variet: "",
      origin: "",
      country: "",
      minPrice: 0,
      maxPrice: 150000
    };
    setLocalFilters(resetFiltersState);
    setMinValue(0);
    setMaxValue(150000);
    
    // 重置 selectFilters 並重新獲取篩選器
    Object.entries(resetFiltersState).forEach(([key, value]) => {
      changeFilter(key, value);
    });
    
    await fetchFilters();
    resetFilters();
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
        <form onSubmit={handleSubmit}>
          {/* 類型篩選 */}
          <div className={`${styles["shop-category-fliter-m"]}`}>
            <div className={`${styles["shop-category-title"]}`}>類型</div>
            <select 
              value={localFilters.category} 
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">全部商品&nbsp;&nbsp;All Wine</option>
              {filters.categories &&
                filters.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}&nbsp;&nbsp;{category.name_en}
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
                    onClick={() => handleFilterChange('category', category.id)}
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
              value={localFilters.variet} 
              onChange={(e) => handleFilterChange('variet', e.target.value)}
            >
              <option value="">全部品種</option>
              {filters.varieties &&
                filters.varieties.map((variet) => (
                  <option key={variet.id} value={variet.id}>
                    {variet.name}
                  </option>
                ))}
            </select>
          </div>

          {/* 國家篩選 */}
          <div className={`${styles["shop-country-fliter-m"]}`}>
            <div className={`${styles["shop-country-title"]}`}>國家</div>
            <select 
              value={localFilters.country} 
              onChange={(e) => handleFilterChange('country', e.target.value)}
            >
              <option value="">全部國家</option>
              {filters.countries &&
                filters.countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>

          {/* 產區篩選 */}
          <div className={`${styles["shop-origin-fliter-m"]}`}>
            <div className={`${styles["shop-origin-title"]}`}>產地</div>
            <select 
              value={localFilters.origin} 
              onChange={(e) => handleFilterChange('origin', e.target.value)}
            >
              <option value="">全部產地</option>
              {filters.origins &&
                filters.origins.map((origin) => (
                  <option key={origin.id} value={origin.id}>
                    {origin.name}
                  </option>
                ))}
            </select>
          </div>

          {/* 價格篩選 */}
          <div className={`${styles["shop-price-fliter-m"]}`}>
            <div className={`${styles["shop-price-title"]}`}>價格</div>
            <select
              value={`${minValue}-${maxValue}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-');
                setMinValue(Number(min));
                setMaxValue(Number(max));
                setLocalFilters(prev => ({ ...prev, minPrice: Number(min), maxPrice: Number(max) }));
              }}
            >
              <option value="0-150000">全部價錢</option>
              <option value="0-1000">～＄1,000</option>
              <option value="1001-3000">＄1,001~$3,000</option>
              <option value="3001-5000">＄3,001~$5,000</option>
              <option value="5001-10000">＄5,001~$10,000</option>
              <option value="10001-30000">＄10,001~$30,000</option>
              <option value="30001-150000">＄30,001~</option>
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
          {/* 雙滑塊本人 */}
          <div className={`${styles["price-slider"]}`}>
            <input
              type="range"
              id="min-price"
              min={minLimit}
              max={maxLimit}
              value={minValue}
              step={step}
              onChange={minChange}
            />
            <input
              type="range"
              id="max-price"
              min={minLimit}
              max={maxLimit}
              value={maxValue}
              step={step}
              onChange={maxChange}
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
              onClick={handleReset}
            >
              重新設定
            </button>
            <button type="submit" className={`btn ${styles["submit-button"]}`}>
              送出篩選
            </button>
          </div>
        </form>
      </div>
    </>
  );
}