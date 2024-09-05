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
import Swal from 'sweetalert2';

export default function ArticleDetail() {
  const router = useRouter();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const { aid } = router.query; // 取得路由中的 id 參數
    const categoryMapping = {
      葡萄酒小知識: "知識",
      產區特色: "產區",
      葡萄品種介紹: "品種",
      搭配餐點推薦: "配餐",
      調酒知識: "調酒",
      // 添加其他需要轉換的 category
    };
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
            category: categoryMapping[data.category] || data.category,
          };
          setArticle(processedArticle);
          // console.log(processedArticle)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.isReady]);

  // 書籤
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if the article is already bookmarked when the component mounts
    checkBookmarkStatus();
  }, [article]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/favorites/articles', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.status === 'success') {
        setIsBookmarked(data.data.some(bookmark => bookmark.id === article.id));
      }
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const url = `http://localhost:3005/api/favorites/articles/${article.id}`;
      const method = isBookmarked ? 'DELETE' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.status === 'success') {
        setIsBookmarked(!isBookmarked);

           // 顯示 Sweet Alert 提示
           Swal.fire({
            icon: 'success',
            title: isBookmarked ? '已取消收藏' : '收藏成功',
            text: isBookmarked ? '文章已從您的收藏中移除' : '文章已添加到您的收藏',
            timer: 1500,
            showConfirmButton: false
          });
      } else {
        console.error('Error toggling bookmark:', data.message);

               // 顯示錯誤提示
               Swal.fire({
                icon: 'error',
                title: '操作失敗',
                text: '無法更改收藏狀態，請稍後再試',
                timer: 1500,
                showConfirmButton: false
              });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);

       // 顯示錯誤提示
       Swal.fire({
        icon: 'error',
        title: '操作失敗',
        text: '發生錯誤，請稍後再試',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  // 捲動的按鈕
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
        <title>醺迷仙園｜{article.title}</title>

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
      <div className="row" style={{position:"relative"}}>
      <div className="aid-bookmark d-lg-none ms-auto col-auto" style={{position:"absolute", top:"10px", right:"25px", backgroundColor:"var(--primary)", padding:"15px 18px 15px 18px" ,borderRadius:"50%"}}>
          <i 
            className={`fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark`}
            onClick={toggleBookmark}
            style={{ cursor: 'pointer', fontSize:"20px", color:"var(--light)" }}
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
