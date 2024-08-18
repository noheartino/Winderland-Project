import React from "react";
import css from "@/components/cart/cart1/cartProduct.module.css";

export default function CartProductM({ cartItems, onRemove }) {  // 接收 onRemove 作為 props
  // 如果 cartItems 是空陣列，則不渲染任何內容
  if (cartItems.length === 0) {
    return null; // 不顯示任何東西
  }

  return (
    <div>
      {cartItems.map(item => (
        item.product_detail_id !== null && ( // 确保 product_detail_id 不是 null 才渲染
          <div key={item.cart_item_id} className={`d-flex ${css.cartProductBox}`}>
            <div className={css.cartProductImg}>
              {item.product_image ? (
                <img
                  src={`/images/cart/cartProduct/images/${item.product_image}`}
                  alt="Product"
                />
              ) : null} {/* 不渲染無圖片的占位符 */}
            </div>
            <div className={css.cartProductContent}>
              <div className={css.cartProductContentTitle}>
                <b>{item.product_name}</b>
              </div>
              <div className={css.cartProductContentMoney}>
                <div className={css.cartNumber}>數量: {item.product_quantity}</div>
                <div className={css.cartMoney}>NT$ {item.product_price}</div>
              </div>
              <div className={css.cartProductContentFormat}>
                <div>
                  <div className="d-flex">
                    <div>{item.capacity}ml</div>&nbsp;/&nbsp;<div>{item.product_country}</div>
                  </div>
                  <div>{item.years}年</div>
                </div>
              </div>
            </div>
            <div className={css.cartProductDel}>
              <button onClick={() => onRemove(item.cart_item_id)}>✕</button> {/* 触发删除单个项目事件 */}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
