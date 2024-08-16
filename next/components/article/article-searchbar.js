import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ArticleSearchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // 處理搜尋輸入
  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push({
        pathname: '/article',
        query: { search: searchTerm },
      });
    }
  };

  // 處理鍵盤事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* 搜尋列 */}
      <div className="d-none d-lg-block col-lg-3 a-search-block">
        <i className="fa-solid fa-magnifying-glass" />
        <input
          type="text"
          className="a-search px-3 py-2"
          placeholder="搜尋關鍵字"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} // 監聽鍵盤事件
        />
      </div>
      {/* 搜尋列小 */}
      <div className="d-lg-none col-10 a-search-sm-block">
        <input
          type="text"
          className="a-search-sm px-5 py-2"
          placeholder="搜尋關鍵字"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass" />
      </div>
    </>
  );
}
