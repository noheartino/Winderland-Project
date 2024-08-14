import React from "react";
import ArticleSortdropdown from "@/components/article/article-sortdropdown";
import ArticleDateSearch from "./article-date-search";

export default function ArticleRwdSidebar() {
  return (
    <>
      <div className="d-lg-none col-2 a-sidebar-sm">
        <button
          className="btn smside-topbtn px-2 py-1"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasResponsive"
          aria-controls="offcanvasResponsive"
        >
          <i className="fa-solid fa-filter" style={{ color: "#60464c" }} />
        </button>
        <div
          className="a-offcanvas offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasResponsive"
          aria-labelledby="offcanvasResponsiveLabel"
        >
          <div className="a-offcanvas-header offcanvas-header">
            <div className="a-offcanvas-title offcanvas-title">
              <p className="mb-0">
                <i className="fa-solid fa-filter" style={{ color: "#fff" }} />
                篩選項目
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasResponsive"
              aria-label="Close"
            />
          </div>
          <div className="a-offcanvas-body offcanvas-body">
            {/* 小篩選1 */}
            <p className="">類型</p>
            <div className="dropdown mb-4">
              <ArticleSortdropdown />
            </div>
            {/* 小篩選2 */}
            <p className="">發布日期</p>
            <div className="dropdown mb-4">
              <ArticleSortdropdown />
            </div>
            {/* 日期 */}
            <ArticleDateSearch />
            {/* 按鈕 */}
            <div className="row">
              <div className="col">
                <button className="btn py-3 a-smside-bottombtn">重設</button>
              </div>
              <div className="col">
                <button className="btn py-3 a-smside-bottombtn">
                  送出篩選
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
