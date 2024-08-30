import React, { useEffect, useReducer, useState } from "react";
import styles from "./PcFrom.module.css";
import Amount from "./Amount";
import Years from "./Years";
import AddCart from "./AddCart";
import { useAuth } from "@/hooks/use-auth";
import { useProduct } from "@/context/ProductContext";
import axios from "axios";

export default function PcFrom() {
  const [currentDetail, setCurrentDetail] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);

  const { product, loading, error, detail } = useProduct();
  const { auth } = useAuth();
  useEffect(() => {
    if (product && product[0] && product[0].details) {
      const foundDetail =
        product[0].details.find((d) => d.id === detail) ||
        product[0].details[0];
      setCurrentDetail(foundDetail);
    }
    if (auth && auth.userData && auth.userData.id) {
      console.log(auth.userData.id);
    }
  }, [product, detail, auth]);

  const changeAmount = (newAmount) => {
    setCurrentAmount(newAmount);
  };

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;
  if (!product || !currentDetail) return <div>查無此商品</div>;

  // 加入購物車
  const addToCart = async () => {
    try {
      if (currentAmount === 0 || currentAmount === "0") {
        alert("請選擇數量");
        return;
      }

      const response = await axios.post(
        "http://localhost:3005/api/product/addCart",
        {
          user_id: parseInt(auth.userData.id),
          product_detail_id: parseInt(currentDetail.id),
          product_quantity: parseInt(currentAmount),
        }
      );
      if (response.data.success) {
        alert("成功加入購物車!");
      }
    } catch (error) {
      console.error("加入購物車失敗", error.response?.data || error.message);
      alert(
        "加入購物車失敗: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      <form className={`${styles["product-pc-form"]}`} action="">
        <div>
          <div className={`${styles["product-amount"]}`}>
            <div className={`${styles["product-amount-input"]}`}>
              <label htmlFor="">數量</label>
              <Amount value={currentAmount} changeAmount={changeAmount} />
            </div>
            <div className={`col-6 ${styles["product-year"]}`}>
              <label htmlFor="">年份</label>
              <Years />
            </div>
          </div>
          <div className={`${styles["product-reserve"]}`}>庫存 &lt; 56件 </div>
        </div>
        <div className={`${styles["product-fav-cart"]}`}>
          <AddCart addToCart={addToCart} />
        </div>
      </form>
    </>
  );
}
