import React from "react";
import ArticleSidebar from "@/components/article/article-sidebar";
import ArticleCard from "@/components/article/article-index-card";

export default function ArticleList() {
  return (
    <>
      {/* 側邊欄 */}
      <ArticleSidebar />
      {/* 文章一格格 */}
      <div className="a-content col-lg-9 row g-3">
        {/* 文章頭條 */}
        <div className="col-9 col-lg-8">
          <div className="a-title">
            <h3>一分鐘認識橡木桶：增添葡萄酒香氣的幕後功臣</h3>
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
        <ArticleCard />
        <ArticleCard />
        {/* 文章區塊小 */}
        <div className="col-12 col-lg-6">
          <ArticleCard />
        </div>
        <div className="col-12 col-lg-6">
          <ArticleCard />
        </div>
      </div>
    </>
  );
}
