import React, { useEffect, useState } from "react";
import css from "@/components/cart/cart2/cartWpoint.module.css";

export default function CartWpoint({ userId, isChecked, onPointsChange, onPointsFetch }) {
  const [points, setPoints] = useState(0);
  const [inputPoints, setInputPoints] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3005/api/cart/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          const userPoints = data.user_have_points || 0;
          setPoints(userPoints);
          if (onPointsFetch) onPointsFetch(userPoints);
        })
        .catch((error) => {
          console.error("獲取點數失敗:", error);
        });
    }

    const clearPoints = () => {
      sessionStorage.removeItem('pointsUsed');
      setInputPoints("");
    };

    // 當頁面刷新或關閉時清除數據
    const handleBeforeUnload = () => {
      clearPoints();
    };

    // 當頁面導航時清除數據
    const handlePopState = () => {
      clearPoints();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [userId]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setInputPoints(value);

      if (Number(value) > points) {
        setError("使用點數不能超過擁有的點數");
      } else {
        setError("");
        if (onPointsChange) onPointsChange(Number(value));
      }
    } else {
      setError("請輸入有效的數字");
    }
  };

  return (
    <div className={css.wPointContent}>
      <div>
        <img src="/images/cart/wPoint.png" alt="W Point" />
      </div>
      <div className={css.wPointContent1}>
        <div className={css.wPointContent2}>
          <b>目前持有 W Point</b>
        </div>
        <div className={css.wPointContentHave}>
          <b>{points.toLocaleString()}P</b>
        </div>
      </div>
      <div className={css.wPointContent1}>
        <div className={css.wPointContent3}>使用點數</div>
        <div className={css.wPointContentUse}>
          <input
            type="text"
            className={css.wPointContentUseBox}
            value={inputPoints}
            onChange={handleInputChange}
            disabled={!isChecked}
          />
          <b>
            <span>P</span>
          </b>
        </div>
        {error && <div className={css.errorMessage}>{error}</div>}
      </div>
    </div>
  );
}
