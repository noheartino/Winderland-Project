import ArticleListContent from "@/components/article/list/article-list-content";
import ArticleListHeader from "@/components/article/list/article-list-header";
import ArticleListNav from "@/components/article/list/article-list-nav";

import ArticleCommentArea from "@/components/article/list/comment/article-comment-area";
import Nav from "@/components/Header/Header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ArticleDetail() {
  const router = useRouter();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const { aid } = router.query; // 取得路由中的 id 參數

    if (router.isReady) {
      fetch(`http://localhost:3005/api/article/${aid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response not ok");
          }
          return response.json();
        })
        .then((data) => {
          // 處理 articles 資料，將 images 字段轉換為數組
          const processedArticle = {
            ...data,
            images: data.images ? data.images.split(",") : [],
          };
          setArticle(processedArticle);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.isReady]);

  return (
    <>
      {/* Header */}
      <Nav />
      <title>{article.title}</title>
      <div className="container">
        {/* 文章主題 */}
        {/* 最上面桌機header */}
        <ArticleListHeader article={article} />
        {/* 文章內容 */}
        <div className="row mb-5">
          <main className="aid-content-area mx-auto col col-lg-8">
            {/* 桌機+手機nav */}
            <ArticleListNav article={article} />
            {/* 文章內容 */}
            <ArticleListContent article={article} />
          </main>
        </div>
      </div>
      {/* 評論區 */}
      <ArticleCommentArea articleId={article.id}  />
    </>
  );
}
