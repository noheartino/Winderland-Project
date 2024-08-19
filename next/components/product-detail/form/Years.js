import React from "react";
import styles from "./Years.module.css";
import { useProduct } from "@/context/ProductContext";

export default function Years() {
  const {product,loading,error,detail,setDetail} = useProduct();

  if(loading) return <div>加載中...</div>;
  if(error) return <div>加載商品錯誤</div>;
  if(!product) return <div>查無此商品</div>;


  return (
    <>
      <select className={`${styles['select']}`} value={detail} onChange={(e) => {setDetail(Number(e.target.value))}}>
        {product[0].details.map(d => {
          return (
            <option key={d.id} value={d.id}>{d.years}</option>
          )
        })}
      </select>
    </>
  );
}
