import React from "react";

import ArticleSearchbar from "@/components/article/article-searchbar";
import ArticleSortdropdown from "@/components/article/article-sortdropdown";
import ArticleRwdSidebar from "@/components/article/article-rwd-sidebar";

import ArticleList from "@/components/article/article-list";
import ArticlePagination from "@/components/article/article-pagination";

export default function Index() {
  return (
    <>
      <title>Title</title>
      {/* Required meta tags */}
      <div className="wrap">
        {/* Banner */}
        <div className="container-fluid a-banner">
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
            <ArticleList />
          </div>
          {/* 選頁 */}
          <nav aria-label="Page navigation">
            <ArticlePagination />
          </nav>
        </div>
      </div>
    </>
  );
}
