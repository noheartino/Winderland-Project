import ArticleListContent from "@/components/article/list/article-list-content";
import ArticleListHeader from "@/components/article/list/article-list-header";
import ArticleListNav from "@/components/article/list/article-list-nav";

import ArticleCommentArea from "@/components/article/list/comment/article-comment-area";
import React from "react";

export default function ArticleDetail() {
  return (
    <>
      <title>文章</title>
      <div className="container">
        {/* 文章主題 */}
        {/* 最上面桌機header */}
        <ArticleListHeader />
        {/* 文章內容 */}
        <div className="row mb-5">
          <main className="aid-content-area mx-auto col col-lg-8">
            {/* 桌機+手機nav */}
            <ArticleListNav />
            {/* 文章內容 */}
            <ArticleListContent />
          </main>
        </div>
      </div>
      {/* 評論區 */}
      <ArticleCommentArea />
    </>
  );
}
