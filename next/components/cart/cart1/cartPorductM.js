import React from "react";
import css from "@/components/cart/cart1/cartProduct.module.css";

export default function CartProductM({ cartItems, onRemove, onUpdateQuantity }) { // 接收 onRemove 和 onUpdateQuantity 作為 props
  if (cartItems.length === 0) return null; // 不渲染空內容

  const handleDecrease = async (itemId, currentQuantity) => {
    if (currentQuantity > 1) { // 确保數量不會小於1
      const newQuantity = currentQuantity - 1;
      await onUpdateQuantity(itemId, newQuantity);
    } else {
      await onRemove(itemId); // 如果数量减少到0，直接删除项目
    }
  };

  const handleIncrease = async (itemId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    await onUpdateQuantity(itemId, newQuantity);
  };

  return (
    <div>
      {cartItems.map(item => (
        item.product_detail_id !== null && (
          <div key={item.cart_item_id} className={`d-flex ${css.cartProductBox}`}>
            <div className={css.cartProductImg}>
              {item.product_image ? (
                <img
                  src={`/images/cart/cartProduct/images/${item.product_image}`}
                  alt="Product"
                />
              ) : null}
            </div>
            <div className={css.cartProductContent}>
              <div className={css.cartProductContentTitle}>
                <b>{item.product_name}</b>
              </div>
              <div className={css.cartProductContentMoney}>
                <div className={css.cartNumber}>
                  <button
                    className={css.cartNumberReduceButton}
                    onClick={() => handleDecrease(item.cart_item_id, item.product_quantity)}
                  >-</button>
                  <div className={css.cartNumberDetail}>{item.product_quantity}</div>
                  <button
                    className={css.cartNumberAddButton}
                    onClick={() => handleIncrease(item.cart_item_id, item.product_quantity)}
                  >+</button>
                </div>
                <div className={css.cartMoney}>NT$ {item.product_price}</div>
              </div>
              <div className={css.cartProductContentFormat}>
                <div>
                  <div className="d-flex">
                    <div>{item.capacity}ml</div>&nbsp;/&nbsp;
                    <div>{item.product_country}</div>
                  </div>
                  <div>{item.years}年</div>
                </div>
              </div>
            </div>
            <div className={css.cartProductDel}>
              <button onClick={() => onRemove(item.cart_item_id)}>✕</button> {/* 触发删除 */}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
