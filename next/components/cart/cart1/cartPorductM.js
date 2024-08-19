import React from "react";
import css from "@/components/cart/cart1/cartProduct.module.css";

export default function CartProductM({ cartItems, onRemove, onUpdateQuantity }) {
  if (cartItems.length === 0) return null;

  const handleDecrease = async (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      await onUpdateQuantity(itemId, newQuantity);
    } else {
      await onRemove(itemId);
    }
  };

  const handleIncrease = async (itemId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    await onUpdateQuantity(itemId, newQuantity);
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
                        handleIncrease(item.cart_item_id, item.product_quantity)
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
