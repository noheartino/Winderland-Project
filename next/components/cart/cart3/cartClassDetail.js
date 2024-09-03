import React, { useEffect, useState } from "react";
import css from '@/components/cart/cart3/cartProductDetail.module.css';

export default function CartClassDetail() {
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
        <div key={index} className={css.cartProductDetailList}>
          <div className={css.cartProductDetailImg}>
            <img
              src={`/images/course_and_tarot/${item.class_image}`}
              alt="Class Image"
            />
          </div>
          <div className={css.cartProductDetailContent}>
            <div className={css.cartProductDetailContentTitle}>
              <b>{item.class_name}</b>
            </div>
            <div className={css.cartProductDetailContentMoney}>
              <div className={css.cartProductDetailContentFormat}>
                <div className={css.formatDetail}>
                  <div className={css.formatCc}>
                    [ {item.class_online ? "線上課程" : "線下課程"} ]
                  </div>
                </div>
                <div className={css.formatYear}>by {item.teacher_name}</div>
              </div>
            </div>
          </div>
          <div className={css.cartProductAmount}>
            <b>1</b>
          </div>
          <div className={css.cartSubtotal}>
            NT$ {item.class_sale_price > 0 ? item.class_sale_price.toLocaleString() : item.class_price.toLocaleString()}
          </div>
        </div>
      ))}
    </>
  );
}
