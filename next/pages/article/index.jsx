import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";

import ArticleSearchbar from "@/components/article/article-searchbar";
import ArticleSortdropdown from "@/components/article/article-sortdropdown";
import ArticleRwdSidebar from "@/components/article/article-rwd-sidebar";

import ArticleIndexList from "@/components/article/ArticleIndexList";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import Head from "next/head";
import Link from "next/link";

export default function Index() {
  const [articles, setArticles] = useState([]);
  const [articleHead, setArticleHead] = useState(null);
  const [loading, setLoading] = useState(true); // 新增 loading 狀態
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
        const processedArticles = data.articles.map((article) => ({
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const router = useRouter();
  const handleLink = () => {
    router.push(`/article`);
  };
  // console.log(articleHead)
  // 如果正在加載，顯示 loading 畫面
  if (loading) {
    return <div>Loading...</div>; // 你可以替換成更符合風格的 loading 畫面
  }
  return (
    <>
      <Head>
        <title>醺迷仙園｜相關文章</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      {/* Header */}
      <Nav />
      {/* Required meta tags */}
      <div className="wrap">
        {/* Banner */}
        <div className="container-fluid a-banner" onClick={handleLink}>
          <h2>相關文章</h2>
          <h3>Aritcle</h3>
        </div>
        <div className="container mx-auto">
          <div className="a-function row m-0 mt-4 mb-1">
            {/* 篩選 */}
            <div className="d-none d-lg-flex dropdown a-dropdown col-lg-2">
              <ArticleSortdropdown />
            </div>
            {/* 搜尋列 */}
            <ArticleSearchbar />
            {/* 手機側邊欄 */}
            <ArticleRwdSidebar />
            {/* 管理文章按鈕 */}
            <button className={`col-auto d-none d-lg-block btn aManBtn`}><Link href={'/article/myarticle'}>文章管理</Link></button>
          </div>
          {/* 主要文章內容區塊 */}
          <div className="row a-contentmain">
            <ArticleIndexList Article={articleHead} />
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
