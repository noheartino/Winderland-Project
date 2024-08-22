import React, { useState, useEffect } from "react";
import styles from "./RatingArea.module.css";
import { useProduct } from "@/context/ProductContext";

export default function RatingArea() {
  const { product, loading, error } = useProduct();
  const [ratingStats, setRatingStats] = useState(null);

  useEffect(() => {
    if (
      product &&
      product[0] &&
      product[0].comments &&
      product[0].comments.length > 0
    ) {
      const comments = product[0].comments;
      // 計算每個星星數的數量
      // acc的值是上一次迭代返回的值，rating是當前的級數,{}為acc的預設值
      const ratingCounts = [5, 4, 3, 2, 1].reduce((acc, rating) => {
        acc[rating] = comments.filter(
          (comment) => comment.rating === rating
        ).length;
        return acc;
      }, {});

      // 計算總評論數量
      const totalComments = comments.length;

      // 計算平均分數
      // sum初始值0，每次迭代加入comment.rating的分數
      // 最後除總評論數量並取小數點一位
      const averageRating =
        comments.reduce((sum, comment) => sum + comment.rating, 0) /
        totalComments.toFixed(2);

      // 用setRatingStats打包給組件們使用
      setRatingStats({
        ratingCounts,
        totalComments,
        averageRating: Number(averageRating).toFixed(1),
      });
    }
  }, [product]);

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;
  if (!product || !product[0] || !product[0].comments) {
    return <div>查無商品評論數據</div>;
  }
  if (!ratingStats) return <div>正在計算評分...</div>;

  return (
    <>
      <div className={`row ${styles["rating-area"]}`}>
        <div className={`col-9 ${styles["rating-group"]}`}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className={`${styles["rating-item"]}`}>
              <div className={`${styles["rating-bar"]}`}>
                <span className={`${styles["rating-number"]}`}>{rating}</span>
                <div className={`${styles["bar-container"]}`}>
                  <div
                    className={`${styles["bar"]}`}
                    style={{
                      width:`${(ratingStats.ratingCounts[rating] / ratingStats.totalComments)*100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
          {/* <div className={`${styles["rating-item"]}`}>
            <div className={`${styles["rating-bar"]}`}>
              <span className={`${styles["rating-number"]}`}>5</span>
              <div className={`${styles["bar-container"]}`}>
                <div
                  className={`${styles["bar"]}`}
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
          </div> */}
        </div>
        <div className={`col-3 ${styles["rating-score"]}`}>
          <span className={`${styles["average-rating"]}`}>
            {ratingStats.averageRating}
          </span>
          <span className={`${styles["star"]}`}>
            <i className="fa-solid fa-star"></i>
          </span>
          <span className={`${styles["review-count"]}`}>
            {ratingStats.totalComments}則評論
          </span>
        </div>
      </div>
    </>
  );
}
