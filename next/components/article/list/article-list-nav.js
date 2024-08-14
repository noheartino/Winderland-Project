import React from "react";

export default function ArticleListNav() {
  return (
    <>
      <div className="aid-content-nav row my-4">
        <div className="aid-user-infoLeft col row">
          <div className="icon col-2">
            <p>Ad</p>
          </div>
          <div className="user-name col-3">admin01</div>
          <div className="time col-7">發佈於 2024.02.05</div>
        </div>
        <div className="aid-bookmark d-none d-lg-block ms-auto col-auto">
          <i className="fa-regular fa-bookmark" />
        </div>
        <div className="aid-category d-lg-none ms-auto col-auto">教育</div>
      </div>
      <h1 className="aid-title d-lg-none">術語：認識最常用的葡萄酒詞彙</h1>
      <div className="aid-pic d-lg-none my-4">
        <img src="/images/article/AA.png" alt="" />
      </div>
    </>
  );
}
