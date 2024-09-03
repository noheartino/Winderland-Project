import ArticleListContent from "@/components/article/list/article-list-content";
import ArticleListHeader from "@/components/article/list/article-list-header";
import ArticleListNav from "@/components/article/list/article-list-nav";

import ArticleCommentArea from "@/components/article/list/comment/article-comment-area";
import Footer from "@/components/footer/footer";
import Nav from "@/components/Header/Header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaCircleChevronUp } from "react-icons/fa6";
import Head from "next/head";

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

  // 捲動的按鈕
  // const [isIntersecting, setIsIntersecting] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      // 清除之前的定時器
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // 檢查捲動位置，設定顯示狀態
      if (window.scrollY > 100) {
        // 當捲動超過100px時顯示按鈕
        setShowButton(true);
      } else {
        setShowButton(false);
      }

      // 設置新的定時器，檢查滾動是否停止
      const timeout = setTimeout(() => {
        setShowButton(false); // 停止滾動後隱藏按鈕
      }, 1500); // 延遲時間為1000毫秒（1秒）

      setScrollTimeout(timeout);
    };

    // 添加 scroll 事件監聽器
    window.addEventListener("scroll", handleScroll);

    // 清除事件監聽器
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // 清除在卸載時設置的定時器
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  // 平滑滾動到頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Head>
        <title>{article.title}</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      {/* Header */}
      <Nav />
      <div className="container pb-5">
        {/* 文章主題 */}
        {/* 最上面桌機header */}
        <ArticleListHeader article={article} />
        {/* 文章內容 */}
        <div className="row mb-5" id="target-div">
          <main className="aid-content-area mx-auto col col-lg-8">
            {/* 桌機+手機nav */}
            <ArticleListNav article={article} />
            {/* 文章內容 */}
            <ArticleListContent article={article} />
          </main>
        </div>
      </div>
      {/* 評論區 */}
      <ArticleCommentArea articleId={article.id} />
      {/* Footer */}
      <Footer />

      {/* 桌機右下角的按鈕 */}
      <FaCircleChevronUp
        className="d-none d-lg-inline"
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          fontSize: "50px",
          backgroundColor: "#fff",
          color: "var(--primary)",
          borderRadius: "50%",
          border: "2px solid #fff",
          transition: "all 0.3s ease",
          cursor: "pointer",
          opacity: showButton ? 1 : 0, // 控制按鈕的顯示
          pointerEvents: showButton ? "auto" : "none", // 控制按鈕的點擊事件
        }}
      />
      {/* 手機右下角的按鈕 */}
      <FaCircleChevronUp
        className="d-lg-none"
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "10vh",
          right: "10px",
          fontSize: "40px",
          backgroundColor: "#fff",
          color: "var(--primary)",
          borderRadius: "50%",
          border: "2px solid #fff",
          transition: "all 0.3s ease",
          cursor: "pointer",
          opacity: showButton ? 1 : 0, // 控制按鈕的顯示
          pointerEvents: showButton ? "auto" : "none", // 控制按鈕的點擊事件
        }}
      />
    </>
  );
}
