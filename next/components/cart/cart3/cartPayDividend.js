import React, { useEffect, useState } from "react";
import css from '@/components/cart/cart3/cartPayDividend.module.css';

export default function CartPayDividend({ userId }) {
  const [earnedPoints, setEarnedPoints] = useState(0); // 初始化 earnedPoints 狀態

  useEffect(() => {
    // 獲取回饋點數
    const fetchEarnedPoints = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/cart/${userId}`);
        if (!response.ok) {
          console.error('Failed to fetch:', response.statusText);
          return;
        }
        const data = await response.json();
        console.log('Fetched order details:', data); // 打印數據以調試

        if (data && data.coupons && data.coupons.length > 0) {
          setEarnedPoints(data.coupons[0].earned_points || 0); // 從 coupons 陣列中提取 earned_points
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
            <div className={css.dividendWpoint}>{earnedPoints} P</div> {/* 顯示 earnedPoints */}
          </div>
          <div className={css.dividendDetail}>總回饋W Point比率 3.5%</div>
        </div>
      </div>
    </>
  );
}
