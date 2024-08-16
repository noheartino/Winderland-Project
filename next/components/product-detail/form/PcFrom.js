import React from 'react'
import styles from "./PcFrom.module.css"
import Amount from './Amount'
import Years from './Years'
import AddCart from './AddCart'

export default function PcFrom() {
  return (
    <>
        <form className={`${styles['product-pc-form']}`} action="">
              <div>
                <div className={`${styles['product-amount']}`}>
                  <div className={`${styles['product-amount-input']}`}>
                    <label htmlFor="">數量</label>
                    <Amount />
                  </div>
                  <div className={`col-6 ${styles['product-year']}`}>
                    <label htmlFor="">年份</label>
                    <Years />
                  </div>
                </div>
                <div className={`${styles['product-reserve']}`}>庫存 &lt; 56件 </div>
              </div>
              <div className={`${styles['product-fav-cart']}`}>
                <AddCart />
              </div>
            </form>
    </>
  )
}
