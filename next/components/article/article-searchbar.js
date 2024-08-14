import React from 'react'

export default function ArticleSearchbar() {
  return (
    <>
      {/* 搜尋列 */}
      <div className="d-none d-lg-block col-lg-3 a-search-block">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                type="text"
                className="a-search px-3 py-2"
                placeholder="搜尋關鍵字"
              />
            </div>
            {/* 搜尋列小 */}
            <div className="d-lg-none col-10 a-search-sm-block">
              <input
                type="text"
                className="a-search-sm px-5 py-2"
                placeholder="搜尋關鍵字"
              />
              <i className="fa-solid fa-magnifying-glass" />
            </div>
    </>
  )
}
