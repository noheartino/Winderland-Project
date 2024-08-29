import React from "react";
import { useState, useEffect } from "react";
import ArticleSidebar from "@/components/article/article-sidebar";
import ArticleIndexCard from "@/components/article/article-index-card";
import ArticleIndexCardSm from "./article-index-card-sm";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ArticleIndexList({ Article }) {
  const router = useRouter();
  const { search, category } = router.query;

  const [articles, setArticles] = useState([]);
  const [firstTwoArticles, setFirstTwoArticles] = useState([]);
  const [remainArticles, setRemainArticles] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const apiUrl = new URL("http://localhost:3005/api/article");

    if (search) {
      apiUrl.searchParams.append("search", search);
    }

    if (category) {
      apiUrl.searchParams.append("category", category);
    }

    if (dateFilter) {
      apiUrl.searchParams.append("dateFilter", dateFilter);
    }

    if (startDate && endDate) {
      apiUrl.searchParams.append("startDate", startDate);
      apiUrl.searchParams.append("endDate", endDate);
    }

    // 當組件掛載時執行 fetch 請求
    fetch(apiUrl.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        // 處理 articles 資料，將 images 字段轉換為數組
        const processedArticles = data.map((article) => ({
          ...article,
          images: article.images ? article.images.split(",") : [],
        }));
        setArticles(processedArticles);
        setFirstTwoArticles(processedArticles.slice(0, 2));
        setRemainArticles(processedArticles.slice(2));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search, category, dateFilter, startDate, endDate]);

  // 取得背景圖片的路徑
  const backgroundImage =
    Article?.images.length > 0
      ? `url(/images/article/${Article.images[0]})`
      : `url(/images/article/titlePic.jpeg)`;

  const handleLink = () => {
    if (Article.id) {
      router.push(`/article/${Article.id}`);
    }
  };

  // 日期radio篩選用
  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    // setSelectedDateFilter(e.target.value);
  };

  const handleFilterSubmit = () => {
    setStartDate(value);
    setEndDate(value);
  };

  // 輸入日期篩選用
  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
  };

  // 清空篩選用
  const handleResetFilters = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });

    // 清空日期篩選狀態
    setDateFilter("");
    setSelectedDateFilter("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      {/* 側邊欄 */}
      <div className="d-none d-lg-block a-sidebar col-2 p-0">
        <ArticleSidebar
          onDateFilterChange={handleDateFilterChange}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
        {/* 篩選按鈕 */}
        <button className="btn a-btn-select mt-3" onClick={handleFilterSubmit}>
          日期篩選
        </button>
        <button className="btn a-btn-clear mt-4" onClick={handleResetFilters}>
          清空篩選
        </button>
      </div>

      {/* 文章一格格 */}
      <div className="a-content col-lg-9 row g-3">
        {/* 文章頭條 */}
        <div className="col-9 col-lg-8">
          <div
            className="a-title"
            style={{ backgroundImage: backgroundImage }}
            onClick={handleLink}
          >
            <h3>{Article ? Article.title : "..."}</h3>
          </div>
        </div>
        {/* 收藏 */}
        <div className="col-3 col-lg-4">
          <Link className="aLink" href="/dashboard/favorite">
            <div className="a-collection p-2">
              <h3>
                <i className="fa-solid fa-bookmark" /> 我的收藏
              </h3>
            </div>
          </Link>
        </div>

        {/* 根據 search 或 category 的情況來顯示文章列表 */}
        {search || category || dateFilter ? (
          articles.length > 0 ? (
            articles.map((article) => (
              <ArticleIndexCard key={article.id} article={article} />
            ))
          ) : (
            <h3 className="text-center">沒有可顯示的文章</h3>
          )
        ) : (
          <>
            {firstTwoArticles.length > 0 ? (
              firstTwoArticles.map((article) => (
                <ArticleIndexCard key={article.id} article={article} />
              ))
            ) : (
              <h3 className="text-center">沒有可顯示的文章</h3>
            )}

            {/* 文章區塊小 */}
            {remainArticles.length > 0 &&
              remainArticles.map((article) => (
                <ArticleIndexCardSm key={article.id} article={article} />
              ))}
          </>
        )}
      </div>
    </>
  );
}
