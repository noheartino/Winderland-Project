import React, { useState, useEffect } from "react";
import Amount from "./Amount";
import Years from "./Years";
import AddCart from "./AddCart";
import styles from "./MobileFrom.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/use-auth";
import { useProduct } from "@/context/ProductContext";
import { useFavorite } from "@/hooks/use-fav.js";

export default function MobileForm() {
  const [currentDetail, setCurrentDetail] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(0);
  const { product, loading, error, detail } = useProduct();
  const { auth } = useAuth();
  const { isFav, isCheckingFav, toggleFavorite, checkFavoriteStatus } =
    useFavorite(product?.[0]?.id);

  useEffect(() => {
    if (product && product[0] && product[0].details) {
      const foundDetail =
        product[0].details.find((d) => d.id === detail) ||
        product[0].details[0];
      setCurrentDetail(foundDetail);
    }
  }, [product, detail]);

  useEffect(() => {
    if (product?.[0]?.id && auth.userData) {
      checkFavoriteStatus();
    }
  }, [product, auth.userData, checkFavoriteStatus]);

  const handleToggleFavorite = async () => {
    if (!auth.userData) {
      Swal.fire({
        icon: "warning",
        title: "請先登入",
        text: "您需要登入才能收藏商品",
      });
      return;
    }
    await toggleFavorite(currentDetail.id);
  };
  const changeAmount = (newAmount) => {
    setCurrentAmount(newAmount);
  };

  const addToCart = async () => {
    try {
      if (currentAmount === 0 || currentAmount === "0") {
        Swal.fire({
          icon: "warning",
          title: "請選擇數量",
          text: "請選擇至少一件商品",
        });
        return;
      }

      const response = await axios.post(
        "http://localhost:3005/api/product/addCart",
        {
          user_id: parseInt(auth.userData.id),
          product_detail_id: parseInt(currentDetail.id),
          product_quantity: parseInt(currentAmount),
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "成功加入購物車!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("加入購物車失敗", error.response?.data || error.message);
      Swal.fire({
        icon: "warning",
        title: "加入購物車失敗",
        text: "請先登入",
      });
    }
  };

  if (loading) return <div>加載中...</div>;
  if (error) return <div>錯誤: {error}</div>;
  if (!product || !currentDetail) return <div>查無此商品</div>;
  return (
    <>
      <form className={`${styles["product-sm-form"]}`} action="">
        <div className={`${styles["product-labels"]}`}>
          <div className={`${styles["product-amount-label"]}`}>數量</div>
          <div className={`${styles["product-reserve"]}`}>庫存 &lt; 56件</div>
          <div className={`${styles["product-year-label"]}`}>年份</div>
        </div>
        <div className={`${styles["product-sm-input"]}`}>
          <div className={`${styles["product-sm-amount-input"]}`}>
            <Amount value={currentAmount} changeAmount={changeAmount} />
          </div>
          <div className={`${styles["product-sm-select"]}`}>
            <Years />
          </div>
        </div>
        <div className={`${styles["product-fav-cart"]}`}>
          <AddCart
            addToCart={addToCart}
            toggleFavorite={handleToggleFavorite}
            isFav={isFav}
            isCheckingFav={isCheckingFav}
          />
        </div>
      </form>
    </>
  );
}
