import React from "react";
import styles from "./Years.module.css";
import { useProduct } from "@/context/ProductContext";
import BounceLoader from "react-spinners/BounceLoader";


export default function Years() {
  const {product,loading,error,detail,setDetail} = useProduct();

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
  if(error) return <div>加載商品錯誤</div>;
  if(!product) return <div>查無此商品</div>;


  return (
    <>
      <select className={`${styles['select']}`} value={detail || ''} onChange={(e) => {setDetail(Number(e.target.value))}}>
        {product[0].details.map(d => {
          return (
            <option key={d.id} value={d.id}>{d.years}年</option>
          )
        })}
      </select>
    </>
  );
}
