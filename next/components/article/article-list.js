import React from "react";
import { useState, useEffect } from "react";
import ArticleSidebar from "@/components/article/article-sidebar";
import ArticleIndexCard from "@/components/article/article-index-card";
import ArticleIndexCardSm from "./article-index-card-sm";
import { useRouter } from "next/router";

export default function ArticleIndexList({Article}) {
  const router = useRouter();
  const { search } = router.query;

  const [articles, setArticles] = useState([]);
  const [firstTwoArticles, setFirstTwoArticles] = useState([]);
  const [remainArticles, setRemainArticles] = useState([]);


  useEffect(() => {
    const apiUrl = search
      ? `http://localhost:3005/api/article?search=${encodeURIComponent(search)}`
      : "http://localhost:3005/api/article";

    // 當組件掛載時執行 fetch 請求
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        // 處理 articles 資料，將 images 字段轉換為數組
        const processedArticles = data.map((article) => ({
          ...article,
          images: article.images ? article.images.split(",") : [],
        }));
        setArticles(processedArticles);
        // console.log(processedArticles);
        setFirstTwoArticles(processedArticles.slice(0, 2));
        setRemainArticles(processedArticles.slice(2));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

    // 取得背景圖片的路徑
    const backgroundImage = Article?.images.length > 0
    ? `url(/images/article/${Article.images[0]})`
    : `url(/images/article/titlePic.jpeg)`;

    const handleLink = () => {
      if (Article.id) {
        router.push(`/article/${Article.id}`);
      }
    };

  return (
    <>
      {/* 側邊欄 */}
      <ArticleSidebar />
      {/* 文章一格格 */}
      <div className="a-content col-lg-9 row g-3">
        {/* 文章頭條 */}
        <div className="col-9 col-lg-8">
          <div className="a-title" style={{backgroundImage: backgroundImage}} onClick={handleLink}>
            <h3>{Article ? Article.title : "..."}</h3>
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
          <h3 className="text-center">沒有可顯示的文章</h3>
        )}

        {/* 文章區塊小 */}
        {remainArticles.length > 0 &&
          remainArticles.map((article) => (
            <ArticleIndexCardSm key={article.id} article={article} />
          ))}
      </div>
    </>
  );
}
