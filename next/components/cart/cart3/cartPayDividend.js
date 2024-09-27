import React, { useEffect, useState } from "react";
import css from '@/components/cart/cart3/cartPayDividend.module.css';

export default function CartPayDividend({ userId }) {
  const [earnedPoints, setEarnedPoints] = useState(0); // 初始化 earnedPoints 狀態

  useEffect(() => {
    // 獲取回饋點數
    const fetchEarnedPoints = async () => {
      try {
        const response = await fetch(`https://winderland.shop/api/cart/${userId}`);
        if (!response.ok) {
          console.error('Failed to fetch:', response.statusText);
          return;
        }
        const data = await response.json();
        console.log('Fetched order details:', data); // 打印數據以調試

        // 確保 data 中有 latestOrder 並從中提取 earned_points
        if (data && data.latestOrder) {
          setEarnedPoints(data.latestOrder.earned_points || 0); // 從 latestOrder 中提取 earned_points
        } else {
          console.error('Earned points not found in response');
        }
      } catch (error) {
        console.error('Network error', error);
      }
    };

    fetchEarnedPoints();
  }, [userId]);

  return (
    <>
      <div className={css.payDividendTotal}>
        <div className={css.payDividendTitle}>紅利</div>
        <div className={css.payDividendContent}>
          <div className={css.dividendContent}>
            <div>W Point</div>
            <div className={css.dividendWpoint}>{earnedPoints.toLocaleString()} P</div> {/* 顯示 earnedPoints */}
          </div>
          <div className={css.dividendDetail}>總回饋W Point比率 3.5%</div>
        </div>
      </div>
    </>
  );
}
