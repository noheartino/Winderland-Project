import React from "react";

export default function ArticleListHeader() {
  return (
    <>
      <div className="aid-header d-none d-lg-block mt-5">
        <div className="article-nav row">
          <div className="aid-category col-auto">教育</div>
          <div className="aid-times col-auto">
            <img src="/images/article/times.svg" alt="" /> 半年前
          </div>
          <div className="aid-date col-auto">
            <img src="/images/article/calender.svg" alt="" /> 2024.02.05
          </div>
        </div>
        <h1 className="aid-title my-5">術語：認識最常用的葡萄酒詞彙</h1>
        <div className="aid-pic my-4">
          <img src="/images/article/AA.png" alt="" />
        </div>
      </div>
    </>
  );
}
