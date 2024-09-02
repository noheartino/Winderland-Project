import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function ArticlePagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const pageNumbers = [];
  const maxPagesToShow = 5; // 可以根據需求調整顯示的頁碼數量
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (startPage > 1) {
    pageNumbers.push(
      <li key="first" className="">
        <a className="" href="" onClick={() => setCurrentPage(1)}>
          1
        </a>
      </li>
    );
    if (startPage > 2) {
      pageNumbers.push(
        <li key="dots-start" className="" style={{backgroundColor:"transparent"}}>
          ...
        </li>
      );
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <li key={i} className={`${currentPage === i ? "active" : ""}`}>
        <a
          className=""
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(i);
          }}
        >
          {i}
        </a>
      </li>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <li key="dots-end" className="">
          ...
        </li>
      );
    }
    pageNumbers.push(
      <li key="last" className="">
        <a
          className=""
          href=""
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(totalPages);
          }}
        >
          {totalPages}
        </a>
      </li>
    );
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ul className="a-pagination my-5 justify-content-center justify-content-lg-end">
      {currentPage > 1 && (
        <li>
          <a
            href="#"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
              handlePreviousPage();
            }}
          >
            <span aria-hidden="true">
              <FaAngleLeft />
            </span>
          </a>
        </li>
      )}
      {pageNumbers}
      {currentPage < totalPages && (
        <li>
          <a
            href="#"
            aria-label="Next"
            onClick={(e) => {
              e.preventDefault();
              handleNextPage();
            }}
          >
            <span aria-hidden="true">
              <FaAngleRight />
            </span>
          </a>
        </li>
      )}
    </ul>
  );
}
