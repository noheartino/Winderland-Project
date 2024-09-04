import React from "react";
import Image from "next/image";

export default function ArticleListHeader({article}) {
  if (!article || !article.images || article.images.length === 0) {
    return null; // 或者可以返回一個預設的加載中佈局
  }
  return (
    <>
      <div className="aid-header d-none d-lg-block mt-5">
        <div className="article-nav row">
          <div className="aid-category col-auto">教育</div>
          <div className="aid-times col-auto">
            <img src="/images/article/times.svg" alt="" /> 半年前
          </div>
          <div className="aid-date col-auto">
            <img src="/images/article/calender.svg" alt="" /> {article.update_date}
          </div>
        </div>
        <h1 className="aid-title my-5">{article.title}</h1>
        <div className="aid-pic my-4">
          <Image
            src={`http://localhost:3005/uploads/article/${article.images[0]}`} // 必須是public資料夾裡的相對路徑
            alt="Description of image"
            width={100} // 圖像寬度（必需）
            height={100} // 圖像高度（必需）
            priority
          />
        </div>
      </div>
    </>
  );
}
