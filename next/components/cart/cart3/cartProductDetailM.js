import React, { useEffect, useState } from "react";
import css from "@/components/cart/cart3/cartProductDetail.module.css";

export default function CartProductDetailM() {
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
        <div key={item.cart_item_id} className={`row ${css.cartProductDetailBoxM}`}>
          <div className={`col-7 ${css.cartProductDetailContentM}`}>
            <div className={css.cartProductDetailTitleM}>
              <b>{item.product_name}</b>
            </div>
            <div className={css.formatDetailM}>
              <div className={css.formatCcM}>{item.capacity}ml</div>&nbsp;/&nbsp;
              <div className={css.formatCountyM}>{item.product_country}</div>&nbsp;/&nbsp;
              <div className={css.formatYearM}>{item.years}年</div>
            </div>
          </div>
          <div className={`col-1 ${css.cartProductDetailAmountM}`}>
            <b>{item.product_quantity}</b>
          </div>
          <div className={`col-3 ${css.cartProductDetailTotalM}`}>
            <b>NT$ {item.product_sale_price > 0 ? item.product_sale_price * item.product_quantity : item.product_price * item.product_quantity}</b>
          </div>
        </div>
      ))}
    </>
  );
}
