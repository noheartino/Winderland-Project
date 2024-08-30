import React from "react";
import styles from "./Depiction.module.css";
import { useProduct } from "@/context/ProductContext";

export default function Depiction() {
  const { product, loading, error } = useProduct();

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>查無此商品</div>;

  return (
    <>
      {product[0].descriptions.map((d) => (
        <div key={d.id} className={`${styles["product-part"]}`}>{d.part}</div>
      ))}
    </>
  );
}
