import React from "react";
import styles from "./Depiction.module.css"

export default function Depiction() {
  return (
    <>
      <div className={`${styles["product-taste"]}`}>
        風味：酒體清香⼤膽，撲⿐⽽來覆盆⼦、櫻桃、香料和⾁桂的味道，並帶有美妙的泥⼟礦物味。⼝感清新和透明的⽔果味，酸度細膩，⼝感集中。
      </div>
      <div className={`${styles["product-recommend"]}`}>
        建議搭配：適合搭配野禽、乳鴿、⽜犢排等料理。
      </div>
    </>
  );
}
