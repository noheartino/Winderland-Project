import React from "react";
import Image from "next/image";
import { parseISO, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

export default function ArticleListHeader({article}) {
  if (!article || !article.images || article.images.length === 0) {
    return null; // 或者可以返回一個預設的加載中佈局
  }
  // const updateTime = article.update_time
  const getTimeCategory = (updateTime) => {
    const now = new Date();
    const updateDate = parseISO(updateTime);
    const daysDiff = differenceInDays(now, updateDate);
    const monthsDiff = differenceInMonths(now, updateDate);
    const yearsDiff = differenceInYears(now, updateDate);

    if (daysDiff === 0) return '本日';
    if (daysDiff <= 7) return '本週';
    if (monthsDiff === 0) return '本月';
    if (monthsDiff <= 6) return '近半年';
    if (yearsDiff === 0) return '近一年';
    return '一年以上';
  };
  const timeCategory = getTimeCategory(article.update_time);
  return (
    <>
      <div className="aid-header d-none d-lg-block mt-4">
        <div className="article-nav row">
          <div className="aid-category col-auto">{article.category}</div>
          <div className="aid-times col-auto">
            <img src="/images/article/times.svg" alt="" /> {timeCategory}
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
