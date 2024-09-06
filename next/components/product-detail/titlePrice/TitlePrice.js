import React, { useEffect, useState } from "react";
import styles from "./TitlePrice.module.css";
import { useProduct } from "@/context/ProductContext";
import ClipLoader from "react-spinners/ClipLoader";


export default function TitlePrice() {
  const { product, loading, error, detail } = useProduct();
  const [currentDetail, setCurrentDetail] = useState(null);
  const [ratingStats, setRatingStats] = useState(null);
  const [onSale, setOnSale] = useState(false);

  useEffect(() => {
    if (product && product[0] && product[0].details) {
      const foundDetail =
        product[0].details.find((d) => d.id === detail) ||
        product[0].details[0];
      setCurrentDetail(foundDetail);
      setOnSale(foundDetail.sale_price !== 0);
    }
  }, [product, detail]);

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

      const roundedRating = Math.round(averageRating);

      // 用setRatingStats打包給組件們使用
      setRatingStats({
        ratingCounts,
        totalComments,
        averageRating: Number(averageRating).toFixed(1),
        roundedRating,
      });
    }
  }, [product]);

  if (loading) {
    return (
      <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ClipLoader
          color="#851931"
          loading={loading}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  if (error) return <div>{error}</div>;
  if (!product || !currentDetail) return <div>查無此商品</div>;

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("zh-TW", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div className={`${styles["product-title"]}`}>{product[0].name}</div>
      <div className={`${styles["product-dataStar"]}`}>
        <div className={`${styles["product-data"]}`}>
          {currentDetail.capacity}ml / {product[0].country_name}
        </div>
        <div className={`${styles["product-stars"]}`}>
          {product[0].comments.length > 0 ? (
            <>
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`fa-solid fa-star ${
                    star <= ratingStats.roundedRating
                      ? styles["light"]
                      : styles["star"]
                  }`}
                ></i>
              ))}
              <div className={`${styles["product-score"]}`}>
                {ratingStats.averageRating}
              </div>
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`fa-solid fa-star ${styles["star"]}`}
                ></i>
              ))}
              <div className={`${styles["product-no-score"]}`}>暫無評分</div>
            </>
          )}
        </div>
      </div>
      <div
        className={`${styles["product-prices"]} ${
          styles[onSale ? "d-none" : "d-flex"]
        }`}
      >
        <div className={`${styles["product-price"]}`}>
          NT$&nbsp;{formatCurrency(currentDetail.price)}
        </div>
      </div>
      <div
        className={`${styles["product-prices"]} ${
          styles[onSale ? "d-flex" : "d-none"]
        }`}
      >
        <div className={`${styles["product-price"]}`}>
          NT$&nbsp;{formatCurrency(currentDetail.sale_price)}
        </div>
        <div className={`${styles["product-sale"]}`}>
          NT$&nbsp;{formatCurrency(currentDetail.price)}
        </div>
      </div>
    </>
  );
}
