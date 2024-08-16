import React from "react";

export default function CourseCommentMore() {
  return (
    <>
      <a
        className="btn p-0"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i
          className="fa-solid fa-ellipsis text-gray"
        ></i>
      </a>
      <ul className="dropdown-menu course-commentmore-dropmenu">
        <li>
          <a className="dropdown-item spac-1" href="#">
            編輯留言
            <i className="fa-solid fa-pen ms-1"></i>
          </a>
        </li>
        <li>
          <a className="dropdown-item spac-1" href="#">
            刪除留言
            <i
              className="fa-regular fa-trash-can ms-1 text-prim-wine"
            ></i>
          </a>
        </li>
      </ul>
    </>
  );
}
