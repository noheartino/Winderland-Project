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
}) {
  const router = useRouter();

  return (
    <>
      <ul className="pt-3">
        類型
        <li
          className="aCategoryLi"
          onClick={() => router.push("article/?category=knowledge")}
        >
          <p>知識</p>
        </li>
        <li
          className="aCategoryLi"
          onClick={() => router.push("article/?category=regional")}
        >
          <p>產區特色</p>
        </li>
        <li
          className="aCategoryLi"
          onClick={() => router.push("article/?category=varieties")}
        >
          <p>品種介紹</p>
        </li>
        <li
          className="aCategoryLi"
          onClick={() => router.push("article/?category=pairing")}
        >
          <p>搭配餐點</p>
        </li>
        <li
          className="aCategoryLi"
          onClick={() => router.push("article/?category=cocktail")}
        >
          <p>調酒知識</p>
        </li>
      </ul>
      <ul className="pt-3">
        發布日期
        <li className={`${style.aCheckLi} pt-2`}>
          <input
            className={`${style.aCheckbox}`}
            id="all"
            type="radio"
            name="dateFilter"
            value="全部"
            // checked={selectedDate === '全部'}
            onChange={onDateFilterChange}
          />
          <label className={`${style.aLabelCheckbox}`} htmlFor="all">
            全部
          </label>
        </li>
        <li className={`${style.aCheckLi}`}>
          <input
            className={`${style.aCheckbox}`}
            id="today"
            type="radio"
            name="dateFilter"
            value="本日"
            // checked={selectedDate === '全部'}
            onChange={onDateFilterChange}
          />
          <label className={`${style.aLabelCheckbox}`} htmlFor="today">
            本日
          </label>
        </li>
        <li className={`${style.aCheckLi}`}>
          <input
            className={`${style.aCheckbox}`}
            id="week"
            type="radio"
            name="dateFilter"
            value="本週"
            // checked={selectedDate === '全部'}
            onChange={onDateFilterChange}
          />
          <label className={`${style.aLabelCheckbox}`} htmlFor="week">
            本週
          </label>
        </li>
        <li className={`${style.aCheckLi}`}>
          <input
            className={`${style.aCheckbox}`}
            id="month"
            type="radio"
            name="dateFilter"
            value="本月"
            // checked={selectedDate === '全部'}
            onChange={onDateFilterChange}
          />
          <label className={`${style.aLabelCheckbox}`} htmlFor="month">
            本月
          </label>
        </li>
        <li className={`${style.aCheckLi}`}>
          <input
            className={`${style.aCheckbox}`}
            id="halfyear"
            type="radio"
            name="dateFilter"
            value="近半年"
            // checked={selectedDate === '全部'}
            onChange={onDateFilterChange}
          />
          <label className={`${style.aLabelCheckbox}`} htmlFor="halfyear">
            近半年
          </label>
        </li>
        <li className={`${style.aCheckLi}`}>
          <input
            className={`${style.aCheckbox}`}
            id="year"
            type="radio"
            name="dateFilter"
            value="近一年"
            // checked={selectedDate === '全部'}
            onChange={onDateFilterChange}
          />
          <label className={`${style.aLabelCheckbox}`} htmlFor="year">
            近一年
          </label>
        </li>
        <li className={`${style.aCheckLi}`}>
          <input
            className={`${style.aCheckbox}`}
            id="overyear"
            type="radio"
            name="dateFilter"
            value="一年以上"
            // checked={selectedDate === '全部'}
            onChange={onDateFilterChange}
          />
          <label className={`${style.aLabelCheckbox}`} htmlFor="overyear">
            一年以上
          </label>
        </li>
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
