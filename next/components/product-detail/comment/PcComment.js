import React, { useEffect, useMemo, useState } from "react";
import CommentTitle from "./CommentTitle";
import Message from "./Message";
import styles from "./PcComment.module.css";
import { useProduct } from "@/context/ProductContext";

export default function PcComment() {
  const { product, loading, error } = useProduct(); 
  const [sortOption, setSortOption] = useState("created_asc");
  const [sortedComments, setSortedComments] = useState([]);

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
  };

  if (loading) return <div>加載中...</div>;
  if (error) return <div>錯誤: {error}</div>;
  if (!product) return <div>沒有找到產品</div>;

  return (
    <>
      <div className={`container ${styles["product-comment-content"]}`}>
        <CommentTitle handleSortChange={handleSortChange} />
        <div className={`${styles["product-comment-message"]}`}>
          <Message sortedComments={sortedComments} />
        </div>
      </div>
    </>
  );
}
