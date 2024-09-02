import React from "react";
import ArticleDateSearch from "./article-date-search";
import { useRouter } from "next/router";
import style from "@/components/article/sortCheckbox.module.css";

export default function ArticleSidebar({
  onDateFilterChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  selectedDate,
  onCategoryChange
}) {
  const router = useRouter();

  return (
    <>
      <ul className="pt-3">
        類型
        <li
          className="aCategoryLi"
          onClick={() => onCategoryChange("knowledge")}
        >
          <p>知識</p>
        </li>
        <li
          className="aCategoryLi"
          onClick={() => onCategoryChange("regional")}
        >
          <p>產區特色</p>
        </li>
        <li
          className="aCategoryLi"
          onClick={() => onCategoryChange("varieties")}
        >
          <p>品種介紹</p>
        </li>
        <li
          className="aCategoryLi"
          onClick={() => onCategoryChange("pairing")}
        >
          <p>搭配餐點</p>
        </li>
        <li
          className="aCategoryLi"
          onClick={() => onCategoryChange("cocktail")}
        >
          <p>調酒知識</p>
        </li>
      </ul>
      {/* radio */}
      <ul className="pt-3">
        發布日期
        {["全部", "本日", "本週", "本月", "近半年", "近一年", "一年以上"].map((label) => (
          <li className={`${style.aCheckLi} pt-1`} key={label}>
            <input
              className={`${style.aCheckbox}`}
              id={label}
              type="radio"
              name="dateFilter"
              value={label}
              checked={selectedDate === label}
              onChange={onDateFilterChange}
            />
            <label className={`${style.aLabelCheckbox}`} htmlFor={label}>
              {label}
            </label>
          </li>
        ))}
      </ul>
      {/* 日期 */}
      {/* <ArticleDateSearch /> */}
      <ul className="pt-3">
        日期區間
        <div className="a-date row my-3">
          <div className="a-date-block p-0 col">
            <input
              className="a-date-input py-1"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
            />
          </div>
          <p className="col-auto mb-0">-</p>
          <div className="a-date-block p-0 col">
            <input
              className="a-date-input py-1"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
            />
          </div>
        </div>
      </ul>
    </>
  );
}
