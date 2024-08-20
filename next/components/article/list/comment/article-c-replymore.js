import React from "react";

export default function ArticleCReplymore({ onEdit }) {
  return (
    <>
      <div className="dropdown aid-replymore">
        <a
          className="btn p-0"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i
            className="fa-solid fa-ellipsis"
            style={{ color: "var(--text_gray)" }}
          ></i>
        </a>
        <ul className="dropdown-menu aid-replymore-dropmenu dropdown-menu-end dropdown-menu-lg-start">
          <li>
            <a className="dropdown-item" onClick={ onEdit }>
              編輯留言
              <i className="fa-solid fa-pen ms-1"></i>
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              刪除留言
              <i
                className="fa-regular fa-trash-can ms-1"
                style={{ color: "var(--wine)" }}
              ></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
