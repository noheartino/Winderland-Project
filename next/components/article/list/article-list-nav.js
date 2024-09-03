import React from "react";
import Image from "next/image";

export default function ArticleListNav({ article }) {
  if (!article || !article.images || article.images.length === 0) {
    return null; // 或者可以返回一個預設的加載中佈局
  }
  return (
    <>
      <div className="aid-content-nav row my-4">
        <div className="aid-user-infoLeft col row">
          <div className="icon col-2">
            <img src={'/nav-footer/default_user.jpg'} />
          </div>
          <div className="user-name col-3">{article.poster}</div>
          <div className="time col-7">發佈於 {article.update_date}</div>
        </div>
        <div className="aid-bookmark d-none d-lg-block ms-auto col-auto">
          <i className="fa-regular fa-bookmark" />
        </div>
        <div className="aid-category d-lg-none ms-auto col-auto">{article.category}</div>
      </div>
      <h1 className="aid-title d-lg-none">{article.title}</h1>
      <div className="aid-pic d-lg-none my-4">
        {/* <img src="/images/article/AA.png" alt="" />
         */}
        <Image
          src={`http://localhost:3005/uploads/article/${article.images[0]}`} // 必須是public資料夾裡的相對路徑
          alt="Description of image"
          width={100} // 圖像寬度（必需）
          height={100} // 圖像高度（必需）
          priority
        />
      </div>
    </>
  );
}
