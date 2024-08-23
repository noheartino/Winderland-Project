import React, { useEffect, useState } from "react";
import css from '@/components/cart/cart3/cartProductDetail.module.css';

export default function CartProductDetail() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // 從 sessionStorage 獲取商品資料
    const storedProductData = sessionStorage.getItem('productData');
    if (storedProductData) {
      setProductData(JSON.parse(storedProductData));
    }
  }, []);

  if (productData.length === 0) return null;

  return (
    <>
      {productData.map((item) => (
        <div key={item.cart_item_id} className={css.cartProductDetailList}>
          <div className={css.cartProductDetailImg}>
            {item.product_image ? (
              <img
                src={`/images/cart/cartProduct/images/${item.product_image}`}
                alt={item.product_name}
              />
            ) : null}
          </div>
          <div className={css.cartProductDetailContent}>
            <div className={css.cartProductDetailContentTitle}>
              <b>{item.product_name}</b>
            </div>
            <div className={css.cartProductDetailContentMoney}>
              <div className={css.cartProductDetailContentFormat}>
                <div className={css.formatDetail}>
                  <div className={css.formatCc}>{item.capacity}ml</div>&nbsp;/&nbsp;
                  <div className={css.formatCounty}>{item.product_country}</div>
                </div>
                <div className={css.formatYear}>{item.years}年</div>
              </div>
              <div className={css.cartDetailMoney}>
                NT$ {item.product_sale_price > 0 ? item.product_sale_price : item.product_price}
              </div>
            </div>
          </div>
          <div className={css.cartProductAmount}>
            <b>{item.product_quantity}</b>
          </div>
          <div className={css.cartSubtotal}>
            NT$ {item.product_sale_price > 0 ? item.product_sale_price * item.product_quantity : item.product_price * item.product_quantity}
          </div>
        </div>
      ))}
    </>
  );
}
