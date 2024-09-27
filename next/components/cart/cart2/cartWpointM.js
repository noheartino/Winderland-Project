import React, { useEffect, useState } from "react";
import css from "@/components/cart/cart2/cartWpoint.module.css";

export default function CartWpointM({ userId, isChecked, onPointsChange, onPointsFetch }) {
  const [points, setPoints] = useState(0); // 儲存用戶點數
  const [inputPoints, setInputPoints] = useState(""); // 儲存用戶輸入的點數
  const [error, setError] = useState(""); // 儲存錯誤信息

  useEffect(() => {
    if (userId) {
      fetch(`https://winderland.shop/api/cart/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          const userPoints = data.user_have_points || 0;
          setPoints(userPoints); // 根據 API 返回的字段名設置點數
          if (onPointsFetch) onPointsFetch(userPoints); // 傳遞點數到主頁
        })
        .catch((error) => {
          console.error("獲取點數失敗:", error);
        });
    }
  }, [userId, onPointsFetch]);

  // 處理點數輸入變化
  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) { // 確保輸入的是數字
      setInputPoints(value);

      // 驗證點數是否超過可用點數
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
    <>
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
      </div>
      <div className={css.payTitleLine} />
      <div className={css.wPointContent1M}>
        <div className={css.wPointContent3M}>使用點數</div>
        <div className={css.wPointContentUseM}>
          <input
            type="text"
            className={css.wPointContentUseBoxM}
            value={inputPoints}
            onChange={handleInputChange}
            disabled={!isChecked}
          />
          <b>
            <span>P</span>
          </b>
        </div>
        {error && <div className={css.errorMessage}>{error}</div>} {/* 顯示錯誤信息 */}
      </div>
    </>
  );
}
