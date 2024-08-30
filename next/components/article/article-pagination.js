import React, { useState } from "react";

export default function ArticlePagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  // console.log(totalPages)
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
    <ul className="pagination a-pagination my-5 justify-content-center justify-content-lg-end">
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          aria-label="Previous"
          onClick={(e) => {
            e.preventDefault();
            handlePreviousPage();
          }}
        >
          <span aria-hidden="true">
            <i className="fa-solid fa-angle-left"></i>
          </span>
        </a>
      </li>
      {[...Array(totalPages)].map((_, index) => (
        <li
          key={index}
          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
            e.preventDefault();
            setCurrentPage(index + 1);
          }}
          >
            {index + 1}
          </a>
        </li>
      ))}
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          aria-label="Next"
          onClick={(e) => {
            e.preventDefault();
            handleNextPage;
          }}
        >
          <span aria-hidden="true">
            <i className="fa-solid fa-angle-right"></i>
          </span>
        </a>
      </li>
    </ul>
  );
}
