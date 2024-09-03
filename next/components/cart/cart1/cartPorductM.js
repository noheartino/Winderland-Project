import React, { useEffect } from "react";
import css from "@/components/cart/cart1/cartProduct.module.css";
import Swal from 'sweetalert2';

export default function CartProductM({ cartItems, onRemove, onUpdateQuantity }) {
  if (cartItems.length === 0) return null;

  // 檢查所有商品的數量是否超過庫存並調整
  useEffect(() => {
    cartItems.forEach((item) => {
      if (item.product_quantity > item.product_amount) {
        // 更新數量為最大庫存數量
        onUpdateQuantity(item.cart_item_id, item.product_amount);

        // 顯示提示訊息
        Swal.fire({
          title: '數量調整',
          text: `"${item.product_name}" 已超過庫存量，數量已調整為最大可用庫存 ${item.product_amount}。`,
          icon: 'warning',
          confirmButtonText: '確定'
        });
      }
    });
  }, [cartItems, onUpdateQuantity]);

  const handleDecrease = async (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      await onUpdateQuantity(itemId, newQuantity);
    } else {
      await onRemove(itemId);
    }
  };

  const handleIncrease = async (itemId, currentQuantity, maxQuantity) => {
    if (currentQuantity < maxQuantity) {
      const newQuantity = currentQuantity + 1;
      await onUpdateQuantity(itemId, newQuantity);
    } else {
      Swal.fire({
        title: '數量超過限制',
        text: '商品數量已經達到最大庫存量。',
        icon: 'error',
        confirmButtonText: '確定'
      });
    }
  };

  return (
    <div>
      {cartItems.map(
        (item) =>
          item.product_detail_id !== null && (
            <div key={item.cart_item_id} className={`d-flex ${css.cartProductBox}`}>
              <div className={css.cartProductImg}>
                {item.product_image ? (
                  <img
                    src={`/images/product/${item.product_image}`}
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
                      onClick={() =>
                        handleDecrease(item.cart_item_id, item.product_quantity)
                      }
                    >
                      -
                    </button>
                    <div className={css.cartNumberDetail}>
                      {item.product_quantity}
                    </div>
                    <button
                      className={css.cartNumberAddButton}
                      onClick={() =>
                        handleIncrease(
                          item.cart_item_id,
                          item.product_quantity,
                          item.product_amount
                        ) // 傳入最大數量
                      }
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <div className={css.cartMoney}>
                      NT$ {item.product_sale_price > 0 ? item.product_sale_price : item.product_price}
                    </div>
                    {item.product_sale_price > 0 && (
                      <div className={css.cartMoneySafe}>
                        <s>NT$ {item.product_price}</s>
                      </div>
                    )}
                  </div>
                </div>
                <div className={css.cartProductContentFormat}>
                  <div>
                    {item.capacity}ml / {item.product_country}
                  </div>
                  <div>{item.years}年</div>
                </div>
              </div>
              <div className={css.cartProductDel}>
                <button onClick={() => onRemove(item.cart_item_id)}>✕</button>
              </div>
            </div>
          )
      )}
    </div>
  );
}
