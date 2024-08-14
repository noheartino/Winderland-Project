import React from "react";

export default function ArticlePagination() {
  return (
    <>
      <ul className="pagination a-pagination my-5 justify-content-center justify-content-lg-end">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true"><i className="fa-solid fa-angle-left"></i></span>
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true"><i className="fa-solid fa-angle-right"></i></span>
          </a>
        </li>
      </ul>
    </>
  );
}
