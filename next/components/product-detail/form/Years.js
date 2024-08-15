import React from "react";
import styles from "./Years.module.css"

export default function Years() {
  return (
    <>
      <select className={`${styles['select']}`} name="" id="">
        <option value="">2010年</option>
        <option value="">2016年</option>
        <option value="">2018年</option>
      </select>
    </>
  );
}
