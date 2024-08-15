import React from "react";
import { useState, useEffect } from "react";
import ArticleSidebar from "@/components/article/article-sidebar";
import ArticleIndexCard from "@/components/article/article-index-card";
import ArticleIndexCardSm from "./article-index-card-sm";

export default function ArticleIndexList() {
  const [articles, setArticles] = useState([]);
  const [firstTwoArticles, setFirstTwoArticles] = useState([]);
  const [remainArticles, setRemainArticles] = useState([]);

  useEffect(() => {
    // 當組件掛載時執行 fetch 請求
    fetch("http://localhost:3005/api/article")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data);
        setFirstTwoArticles(data.slice(0, 2));
        setRemainArticles(data.slice(2));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(firstTwoArticles);

  return (
    <>
      {/* 側邊欄 */}
      <ArticleSidebar />
      {/* 文章一格格 */}
      <div className="a-content col-lg-9 row g-3">
        {/* 文章頭條 */}
        <div className="col-9 col-lg-8">
          <div className="a-title">
            <h3>aaa</h3>
          </div>
        </div>
        {/* 收藏 */}
        <div className="col-3 col-lg-4">
          <div className="a-collection p-2">
            <h3>
              <i className="fa-solid fa-bookmark" /> 我的收藏
            </h3>
          </div>
        </div>
        {/* 文章區塊大 */}
          {firstTwoArticles.length > 0 ? (
            firstTwoArticles.map((article) => (
              <ArticleIndexCard key={article.id} article={article} />
            ))
          ) : (
            <p>沒有可顯示的文章</p>
          )}

        {/* 文章區塊小 */}
        {remainArticles.length > 0 ? (
            remainArticles.map((article) => (
              <ArticleIndexCardSm key={article.id} article={article} />
            ))
          ) : (
            <p>沒有可顯示的文章</p>
          )}
      </div>
    </>
  );
}
