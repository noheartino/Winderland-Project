import React, { useEffect, useState } from "react";
import css from "@/components/cart/cart3/cartProductDetail.module.css";

export default function CartClassDetailM() {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    // 從 sessionStorage 獲取課程資料
    const storedClassData = sessionStorage.getItem('classData');
    if (storedClassData) {
      setClassData(JSON.parse(storedClassData));
    }
  }, []);

  if (classData.length === 0) return null;

  return (
    <>
      {classData.map((item, index) => (
        <div key={index} className={`row ${css.cartProductDetailBoxM}`}>
          <div className={`col-7 ${css.cartProductDetailContentM}`}>
            <div className={css.cartProductDetailTitleM}>
              <b>{item.class_name}</b>
            </div>
            <div className={css.formatDetailM}>
              <div className={css.formatCcM}>
                [ {item.class_online ? "線上課程" : "線下課程"} ]
              </div>&nbsp;&nbsp;
              <div className={css.formatCountyM}>By {item.teacher_name}</div>
            </div>
          </div>
          <div className={`col-1 ${css.cartProductDetailAmountM}`}>
            <b>1</b>
          </div>
          <div className={`col-3 ${css.cartProductDetailTotalM}`}>
            <b>NT$ {item.class_sale_price > 0 ? item.class_sale_price : item.class_price}</b>
          </div>
        </div>
      ))}
    </>
  );
}
