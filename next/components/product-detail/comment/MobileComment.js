import React, { useEffect, useMemo, useState } from "react";
import CommentTitle from "./CommentTitle";
import Message from "./Message";
import styles from "./MobileComment.module.css";
import RatingArea from "../description/RatingArea";
import { useProduct } from "@/context/ProductContext";
import CommentPageNation from "./CommentPageNation";
import NextTopLoader from 'nextjs-toploader'; // 換頁進度條－nextjs-toploader
import ClipLoader from "react-spinners/ClipLoader";


export default function MobileComment() {
  const { product, loading, error } = useProduct();
  const [sortOption, setSortOption] = useState("created_asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedComments, setSortedComments] = useState([]);
  const commentsPerPage = 5;

  useEffect(() => {
    if (product && product[0].comments && product[0].comments.length > 0) {
      setSortedComments([...product[0].comments]);
    }
  }, [product]);

  const handleSortChange = (e) => {
    const sortType = e.target.value;
    const sorted = [...sortedComments].sort((a, b) => {
      switch (sortType) {
        case "createdAt_desc":
          return new Date(b.updated_at) - new Date(a.updated_at);
        case "createdAt_asc":
          return new Date(a.updated_at) - new Date(b.updated_at);
        case "rating_desc":
          return b.rating - a.rating;
        case "rating_asc":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
    setSortedComments(sorted);
    setSortOption(sortType);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);

  const currentComments = sortedComments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
  if (error) return <div>錯誤: {error}</div>;
  if (!product) return <div>沒有找到產品</div>;

  return (
    <>
      <div className={`container ${styles["product-comment-content"]}`}>
        <CommentTitle handleSortChange={handleSortChange} />
        <div className={`${styles["product-comment-star"]}`}>
          <RatingArea />
        </div>
        <div className={`${styles["product-comment-message"]}`}>
          <Message sortedComments={currentComments} />
          {totalPages > 1 && (
          <CommentPageNation
            currentPage={currentPage}
            totalPages={totalPages}
              changePage={changePage}
            />
          )}
        </div>
      </div>
    </>
  );
}
