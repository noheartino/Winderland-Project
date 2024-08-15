import React from 'react'
import styles from "./TitlePrice.module.css"

export default function TitlePrice() {
  return (
    <>
        <div className={`${styles['product-title']}`}>
              皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園紅酒 2017
            </div>
            <div className={`${styles['product-dataStar']}`}>
              <div className={`${styles['product-data']}`}>750ml / 法國</div>
              <div className={`${styles['product-stars']}`}>
                <img className={`${styles['star']}`} src="/product_images/Star.svg" alt="" />
                <img className={`${styles['star']}`} src="/product_images/Star.svg" alt="" />
                <img className={`${styles['star']}`} src="/product_images/Star.svg" alt="" />
                <img className={`${styles['star']}`} src="/product_images/Star.svg" alt="" />
                <img className={`${styles['star']}`} src="/product_images/Star.svg" alt="" />
                <div className={`${styles['product-score']}`}>4.8</div>
              </div>
            </div>
            <div className={`${styles['product-prices']}`}>
              <div className={`${styles['product-price']}`}>NT$&nbsp;5,999</div>
              <div className={`${styles['product-sale']}`}>NT$&nbsp;8,999</div>
            </div>
    </>
  )
}
