import React, { useEffect } from "react";
import css from "@/components/cart/cart1/cartClass.module.css";
import Swal from 'sweetalert2';

export default function CartClass({ classItems, onRemove }) {
  useEffect(() => {
    classItems.forEach((item) => {
      if (
        item.class_id !== null &&
        item.student_limits > 0 &&
        item.assigned >= item.student_limits
      ) {
        Swal.fire({
          title: '課程已滿',
          text: `課程 ${item.class_name} 已達報名人數上限，將從購物車中移除。`,
          icon: 'warning',
          confirmButtonText: '確定'
        });
        onRemove(item.cart_item_id);
      }
    });
  }, [classItems, onRemove]);

  if (classItems.length === 0) return null;

  return (
    <div>
      {classItems.map(
        (item) =>
          item.class_id !== null && (
            <div key={item.cart_item_id} className={`d-flex ${css.cartClassBox}`}>
              <div className={css.cartClassImg}>
                <img
                  src={`https://winderland.shop/uploads/course_and_tarot/${item.class_image}`}
                  alt="Class Image"
                />
              </div>
              <div className={css.cartClassContent}>
                <div className={css.cartClassContentTitle}>
                  <b>{item.class_name}</b>
                </div>
                <div className={css.cartClassContentText}>
                  <div className={`d-flex`}>
                    <div className={css.cartOnline}>
                      {item.class_online ? "線上" : "線下"}
                    </div>
                    <div className={css.cartTeacher}>
                      By {item.teacher_name}
                    </div>
                  </div>
                  <div className={css.cartClassDel}>
                    <button onClick={() => onRemove(item.cart_item_id)}>✕</button>
                  </div>
                </div>
                <div className={css.cartClassContentMoney}>
                  <div></div>
                  <div>
                    <div className={css.cartMoney}>
                      NT$ {item.class_sale_price > 0 ? item.class_sale_price.toLocaleString() : item.class_price.toLocaleString()}
                    </div>
                    {item.class_sale_price > 0 && (
                      <div className={css.cartMoneySafe}>
                        <s>NT$ {item.class_price.toLocaleString()}</s>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}
