import React from "react";
import css from "@/components/cart/cart1/cartProduct.module.css";

export default function CartProduct({ cartItems, onRemove, onRemoveAll }) { // 接收 onRemove 和 onRemoveAll 作為 props
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
                              <img src={`/images/cart/cartProduct/images/${item.product_image}`} alt="Product" />
                          ) : null}
                      </div>
                      <div className={css.cartProductContent}>
                          <div className={css.cartProductContentTitle}>
                              <b>{item.product_name}</b>
                          </div>
                          <div className={css.cartProductContentMoney}>
                              <div className={css.cartNumber}>数量: {item.product_quantity}</div>
                              <div className={css.cartMoney}>NT$ {item.product_price}</div>
                          </div>
                          <div className={css.cartProductContentFormat}>
                              <div>{item.capacity}ml / {item.product_country}</div>
                              <div>{item.years}年</div>
                          </div>
                      </div>
                      <div className={css.cartProductDel}>
                          {/* 按钮用来删除单个项目 */}
                          <button onClick={() => onRemove(item.cart_item_id)}>✕</button> {/* 删除按钮 */}
                      </div>
                  </div>
              )
          ))}
      </div>
  );
}
