import React from "react";
import ArticleSortdropdown from "@/components/article/article-sortdropdown";
import ArticleDateSearch from "./article-date-search";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

export default function ArticleRwdSidebar({ setCategory, setDateFilter, setStartDate, setEndDate }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  // 處理送出篩選
  const handleFilterSubmit = () => {
    setCategory(selectedCategory);
    setDateFilter(selectedDate);
    setStartDate(selectedStartDate)
    setEndDate(selectedEndDate)
  };
  // 處理重設篩選
  const handleReset = () => {
    setSelectedCategory("");
    setSelectedDate("");
    setStartDate("");
    setEndDate("");
    setCategory(""); // 重設父元件的篩選條件
    setDateFilter(""); // 重設父元件的篩選條件
  };
  // console.log(selectedCategory);
  return (
    <>
      <div className="d-lg-none col-2 a-sidebar-sm">
        <button
          className="btn smside-topbtn px-2 py-1"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasResponsive"
          aria-controls="offcanvasResponsive"
        >
          <FaFilter
            className="my-1"
            style={{ color: "#60464c", fontSize: "18px" }}
          />
        </button>
        <div
          className="a-offcanvas offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasResponsive"
          aria-labelledby="offcanvasResponsiveLabel"
        >
          <div className="a-offcanvas-header offcanvas-header">
            <div className="a-offcanvas-title offcanvas-title">
              <p className="mb-0">
                <i className="fa-solid fa-filter" style={{ color: "#fff" }} />
                篩選項目
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasResponsive"
              aria-label="Close"
            />
          </div>
          <div className="a-offcanvas-body offcanvas-body">
            {/* 小篩選1 */}
            <p className="">類型</p>
            <div className="dropdown mb-4">
              <select
                className="btn a-sort-btn ps-4 mb-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  請選擇類型
                </option>
                <option value="knowledge">知識</option>
                <option value="regional">產區特色</option>
                <option value="varieties">品種介紹</option>
                <option value="pairing">搭配餐點</option>
                <option value="cocktail">調酒知識</option>
              </select>
              {/* <ArticleSortdropdown /> */}
              {/* 類型按鈕 */}
              <div className="row mt-3 mb-5 gap-3">
                <div className="col-auto px-2">
                  <button
                    className="btn aCateBtn"
                    value="knowledge"
                    onClick={(e) => setSelectedCategory(e.target.value)}
                  >
                    知識
                  </button>
                </div>
                <div className="col-auto px-2">
                  <button
                    className="btn aCateBtn"
                    value="regional"
                    onClick={(e) => setSelectedCategory(e.target.value)}
                  >
                    產區特色
                  </button>
                </div>
                <div className="col-auto px-2">
                  <button
                    className="btn aCateBtn"
                    value="varieties"
                    onClick={(e) => setSelectedCategory(e.target.value)}
                  >
                    品種介紹
                  </button>
                </div>
                <div className="col-auto px-2">
                  <button
                    className="btn aCateBtn"
                    value="pairing"
                    onClick={(e) => setSelectedCategory(e.target.value)}
                  >
                    搭配餐點
                  </button>
                </div>
                <div className="col-auto px-2">
                  <button
                    className="btn aCateBtn"
                    value="cocktail"
                    onClick={(e) => setSelectedCategory(e.target.value)}
                  >
                    調酒知識
                  </button>
                </div>
              </div>
            </div>
            {/* 小篩選2 */}
            <p className="">發布日期</p>
            <div className="dropdown mb-4">
              <select
                className="btn a-sort-btn ps-4"
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="全部">全部</option>
                <option value="本日">本日</option>
                <option value="本週">本週</option>
                <option value="本月">本月</option>
                <option value="近半年">近半年</option>
                <option value="近一年">近一年</option>
                <option value="一年以上">一年以上</option>
              </select>
              {/* <ArticleSortdropdown /> */}
            </div>
            {/* 日期 */}
            <div className="a-date row my-3">
              <div className="a-date-block p-0 col ms-2">
                <input
                  className="a-date-input "
                  type="date"
                  value={selectedStartDate}
                  onChange={(e) => setSelectedStartDate(e.target.value)}
                />
              </div>
              <p className="col-auto mb-0">-</p>
              <div className="a-date-block p-0 col me-2">
                <input
                  className="a-date-input"
                  type="date"
                  value={selectedEndDate}
                  onChange={(e) => setSelectedEndDate(e.target.value)}
                />
              </div>
            </div>
            {/* <ArticleDateSearch /> */}
            {/* 按鈕 */}
            <div className="row mt-5">
              <div className="col">
                <button
                  className="btn py-3 a-smside-bottombtn"
                  onClick={handleReset}
                >
                  重設
                </button>
              </div>
              <div className="col">
                <button
                  className="btn py-3 a-smside-bottombtn"
                  onClick={handleFilterSubmit}
                  data-bs-dismiss="offcanvas"
                >
                  送出篩選
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
