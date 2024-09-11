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
import { FaCaretRight } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ArticleDetail() {
  const router = useRouter();
  const [article, setArticle] = useState({}); // 使用空對象作為初始值

  useEffect(() => {
    const { aid } = router.query;
    const categoryMapping = {
      葡萄酒小知識: "知識",
      產區特色: "產區",
      葡萄品種介紹: "品種",
      搭配餐點推薦: "配餐",
      調酒知識: "調酒",
    };
    if (router.isReady) {
      fetch(`http://winderland.shop/api/article/${aid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response not ok");
          }
          return response.json();
        })
        .then((data) => {
          const processedArticle = {
            ...data,
            images: data.images ? data.images.split(",") : [],
            category: categoryMapping[data.category] || data.category,
          };
          setArticle(processedArticle);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.isReady]);

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (article.id) {
      checkBookmarkStatus();
    }
  }, [article.id]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch(
        "http://winderland.shop/api/favorites/articles",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setIsBookmarked(
          data.data.some((bookmark) => bookmark.id === article.id)
        );
      }
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const url = `http://winderland.shop/api/favorites/articles/${article.id}`;
      const method = isBookmarked ? "DELETE" : "POST";

      const response = await fetch(url, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.status === "success") {
        setIsBookmarked(!isBookmarked);

        Swal.fire({
          icon: "success",
          title: isBookmarked ? "已取消收藏" : "收藏成功",
          text: isBookmarked
            ? "文章已從您的收藏中移除"
            : "文章已添加到您的收藏",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        console.error("Error toggling bookmark:", data.message);

        Swal.fire({
          icon: "error",
          title: "操作失敗",
          text: "無法更改收藏狀態，請稍後再試",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);

      Swal.fire({
        icon: "error",
        title: "操作失敗",
        text: "發生錯誤，請稍後再試",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const [showButton, setShowButton] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

      const timeout = setTimeout(() => {
        setShowButton(false);
      }, 1500);

      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Head>
        <title>{`醺迷仙園｜${article.title}`}</title>
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
        {/* 文章返回 */}
        <div
          className={`mt-4 row align-items-center`}
          style={{ fontSize: "14px", color: "var(--text_primary)" }}
        >
          <Link
            className="col-auto text-decoration-none"
            style={{ color: "var(--text_primary)" }}
            href={`/article`}
          >
            文章首頁
          </Link>
          <FaCaretRight className="col-auto p-0" />
          <p className="col-auto m-0">{article.title}</p>
        </div>
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
      {/* 書籤 */}
      <div className="row" style={{ position: "relative" }}>
        <div
          className="aid-bookmark d-lg-none ms-auto col-auto"
          style={{
            position: "absolute",
            top: "10px",
            right: "25px",
            backgroundColor: "var(--primary)",
            padding: "15px 18px 15px 18px",
            borderRadius: "50%",
          }}
        >
          <i
            className={`fa-${isBookmarked ? "solid" : "regular"} fa-bookmark`}
            onClick={toggleBookmark}
            style={{
              cursor: "pointer",
              fontSize: "20px",
              color: "var(--light)",
            }}
          />
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
