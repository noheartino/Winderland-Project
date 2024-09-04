import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/use-auth";
import Swal from "sweetalert2";

export function useFavorite(productId) {
  const [isFav, setIsFav] = useState(false);
  const [isCheckingFav, setIsCheckingFav] = useState(true);
  const { auth } = useAuth();

  const checkFavoriteStatus = useCallback(async () => {
    if (auth.userData && productId) {
      setIsCheckingFav(true);
      try {
        const response = await axios.get(
          `http://localhost:3005/api/favorites/products/check/${productId}`,
          {
            withCredentials: true,
          }
        );
        setIsFav(response.data.isFavorited);
        console.log("收藏狀態檢查結果:", response.data.isFavorited);
      } catch (error) {
        console.error("檢查收藏狀態失敗", error);
        setIsFav(false);
      } finally {
        setIsCheckingFav(false);
      }
    } else {
      setIsFav(false);
      setIsCheckingFav(false);
    }
  }, [auth.userData, productId]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const toggleFavorite = async (productDetailId) => {
    if (!auth.userData) {
      Swal.fire({
        icon: "warning",
        title: "請先登入",
        text: "您需要登入才能收藏商品",
      });
      return;
    }

    setIsCheckingFav(true);
    try {
      if (isFav) {
        await axios.delete(
          `http://localhost:3005/api/favorites/products/${productId}`,
          {
            withCredentials: true,
          }
        );
        setIsFav(false);
        Swal.fire({
          icon: "success",
          title: "已移除收藏",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axios.post(
          "http://localhost:3005/api/favorites/products",
          { productId, productDetailId },
          { withCredentials: true }
        );
        setIsFav(true);
        Swal.fire({
          icon: "success",
          title: "已加入收藏",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("切換收藏狀態失敗", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "操作失敗",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setIsCheckingFav(false);
    }
  };
  return { isFav, isCheckingFav, toggleFavorite, checkFavoriteStatus };
}