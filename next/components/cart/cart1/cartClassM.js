import React from "react";
import css from "@/components/cart/cart1/cartClass.module.css";

export default function CartClassM({ classItems, onRemove }) {  // 接收 onRemove 作為 props
  // 如果 classItems 是空陣列，則不渲染任何內容
  if (classItems.length === 0) {
    return null; // 不顯示任何東西
  }

  return (
    <div>
      {classItems.map(item => (
        item.class_id !== null && ( // 確保 class_id 不是 null 才渲染
          <div key={item.cart_item_id} className={`d-flex ${css.cartClassBox}`}>
            <div className={css.cartClassImg}>
              <img
                src={`/images/cart/cartClass/upload_class/${item.class_image}`}
                alt="Product Image"
              />
            </div>
            <div className={css.cartClassContent}>
              <div className={css.cartClassContentTitle}>
                <b>{item.class_name}</b>
              </div>
              <div className={css.cartClassContentText}>
                <div className={`d-flex`}>
                  <div className={css.cartOnline}>{item.class_online ? "線上" : "線下"}</div>
                  <div className={css.cartTeacher}>By {item.teacher_name}</div>
                </div>
                <div className={css.cartClassDel}>
                  <button onClick={() => onRemove(item.cart_item_id)}>✕</button> {/* 触发删除单个项目的事件 */}
                </div>
              </div>
              <div className={css.cartClassContentMoney}>
                <div className={css.cartMoneyAll}>
                  <div className={css.cartMoney}>NT$ {item.class_price}</div>
                  {item.discount_price && <div className={css.cartMoneyOff}>NT$ {item.discount_price}</div>}
                </div>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
}
