import React from "react";
import styles from "./Depiction.module.css";
import { useProduct } from "@/context/ProductContext";
import BounceLoader from "react-spinners/BounceLoader";


export default function Depiction() {
  const { product, loading, error } = useProduct();

  if (loading) {
    return (
      <div>
        <BounceLoader
          color="#851931"
          loading={loading}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
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
