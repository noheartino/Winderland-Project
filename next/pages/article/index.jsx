import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";

import ArticleSearchbar from "@/components/article/article-searchbar";
import ArticleSortdropdown from "@/components/article/article-sortdropdown";
import ArticleRwdSidebar from "@/components/article/article-rwd-sidebar";

import ArticleIndexList from "@/components/article/ArticleIndexList";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import Head from "next/head";
import Link from "next/link";

import ClipLoader from "react-spinners/ClipLoader";


export default function Index() {
  const [loading, setLoading] = useState(true); // 新增 loading 狀態
  const authData = useAuth().auth;
  const UserData = authData.userData;
  const myname = UserData ? UserData.account : "";
  const [articles, setArticles] = useState([]);
  const [articleHead, setArticleHead] = useState(null);
  
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

console.log(category)
  useEffect(() => {
    const fetchArticles = () => {
      fetch(`http://localhost:3005/api/article?sortOrder=${sortOrder}`)
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
    };

    fetchArticles();
  }, [sortOrder]);
  const router = useRouter();
  const handleLink = () => {
    router.push(`/article`);
  };
  // console.log(articleHead)
  // 如果正在加載，顯示 loading 畫面
  if (loading) {
    return (
      <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ClipLoader
          color="#851931"
          loading={loading}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
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
              <select
                className="btn a-sort-btn"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">默認排序</option>
                <option value="latest">最新發布</option>
                <option value="oldest">由舊到新</option>
              </select>
              {/* <ArticleSortdropdown /> */}
            </div>
            {/* 搜尋列 */}
            <ArticleSearchbar />
            {/* 手機側邊欄 */}
            <ArticleRwdSidebar
              setSortOrder={setSortOrder}
              setCategory={setCategory}
              setDateFilter={setDateFilter}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            
            {/* 管理文章按鈕 */}
            {/* 只在 myname 為 'Admin' 時顯示按鈕 */}
            {myname === "Admin" && (
              <button className={`col-auto d-none d-lg-block btn aManBtn`}>
                <Link href={"/article/myarticle"}>文章管理</Link>
              </button>
            )}
          </div>
          {/* 主要文章內容區塊 */}
          <div className="row a-contentmain">
            <ArticleIndexList
              Article={articleHead}
              sortOrder={sortOrder}
              categorySM={category}
              dateFilterSM={dateFilter}
              startDateSM={startDate}
              endDateSM={endDate}
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
