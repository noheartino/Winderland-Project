import React from "react";
import Link from "next/link";
import styles from "./ListPageNation.module.css";

export default function ListPageNation({
  currentPage,
  totalPages,
  changePage,
}) {
  // 生成要顯示的頁碼數組
  const getPageNumbers = () => {
    const pageNumbers = [];
    // 顯示當前頁數的前後頁數數量
    const delta = 1;

    // 增加第一頁
    pageNumbers.push(1);

    let start = Math.max(2, currentPage - delta);
    let end = Math.min(totalPages - 1, currentPage + delta);

    // 增加左側省略
    if (start > 2) {
      pageNumbers.push("...");
    }

    for (let i = start; i <= end; i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    // 增加右側省略號
    if (end < totalPages - 1) {
      pageNumbers.push("...");
    }

    // 增加最後一頁
    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }
    console.log("Current Page:", currentPage);
    console.log("Total Pages:", totalPages);
    console.log(pageNumbers);
    return pageNumbers;
  };

  return (
    <>
      <div className={`${styles["pagination"]}`}>
        {/* 直接跳第一頁的button */}
        {/* <button
          className={`${styles["firstPage-button"]} ${
            styles[currentPage === 1 ? "d-none" : "d-block"]
          }`}
          type="button"
          onClick={() => changePage(1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-angles-left"></i>
        </button> */}
        <button
          className={`${styles["prevPage-button"]} ${
            styles[currentPage === 1 ? "d-none" : "d-block"]
          }`}
          type="button"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {getPageNumbers().map((number,index) => (
          <button
            key={index}
            className={`${styles[number != "..." ? "page-button" : "page-omit"]}
      ${styles[currentPage === number ? "current-page" : ""]}`}
            type="button"
            onClick={() => (number !== "..." ? changePage(number) : null)}
            disabled={number === "..."}
          >
            {number}
          </button>
        ))}
        <button
          className={`${styles["nextPage-button"]} ${
            styles[currentPage === totalPages ? "d-none" : "d-block"]
          }`}
          type="button"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        {/* 直接跳最後一頁的button */}
        {/* <button
          className={`${styles["lastPage-button"]} ${
            styles[currentPage === totalPages ? "d-none" : "d-block"]
          }`}
          type="button"
          onClick={() => changePage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-angles-right"></i>
        </button> */}
      </div>
    </>
  );
}
