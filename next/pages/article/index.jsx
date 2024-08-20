import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";

import ArticleSearchbar from "@/components/article/article-searchbar";
import ArticleSortdropdown from "@/components/article/article-sortdropdown";
import ArticleRwdSidebar from "@/components/article/article-rwd-sidebar";

import ArticleIndexList from "@/components/article/article-list";
import ArticlePagination from "@/components/article/article-pagination";
import Nav from "@/components/Header/Header";

export default function Index() {
  const [articles, setArticles] = useState([]);
  const [articleHead, setArticleHead] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3005/api/article")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        // 處理 articles 資料，將 images 字段轉換為數組
        const processedArticles = data.map((article) => ({
          ...article,
          images: article.images ? article.images.split(",") : [],
        }));
        setArticles(processedArticles);

        // 隨機選擇一筆資料
        if (processedArticles.length > 0) {
          const articleHeads = Math.floor(
            Math.random() * processedArticles.length
          );
          setArticleHead(processedArticles[articleHeads]);
        } else {
          setArticleHead(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const router = useRouter();
  const handleLink = () => {
    router.push(`/article`);
  };
  return (
    <>
      {/* Header */}
      <Nav />
      <title>Title</title>
      {/* Required meta tags */}
      <div className="wrap">
        {/* Banner */}
        <div className="container-fluid a-banner" onClick={handleLink}>
          <h2>相關文章</h2>
          <h3>Aritcle</h3>
        </div>
        <div className="container mx-auto">
          <div className="a-function row m-0 mb-4">
            {/* 篩選 */}
            <div className="d-none d-lg-flex dropdown a-dropdown col-lg-2">
              <ArticleSortdropdown />
            </div>
            {/* 搜尋列 */}
            <ArticleSearchbar />
            {/* 手機側邊欄 */}
            <ArticleRwdSidebar />
          </div>
          {/* 主要文章內容區塊 */}
          <div className="row a-contentmain">
            <ArticleIndexList Article={articleHead} />
          </div>
          {/* 選頁 */}
          <div aria-label="Page navigation">
            <ArticlePagination />
          </div>
        </div>
      </div>
    </>
  );
}
