import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './OrderCardRWD.module.css';

export default function OrderCardRWD({ order }) {

  const getStatusClass = (status) => {
    switch (status) {
      case '出貨準備中':
        return 'text-warning'
      case '已出貨':
        return 'text-info'
      case '已送達':
      case '已完成':
        return 'text-success'
      case '訂單已取消':
        return 'text-danger'
      case '尚未付款':
        return 'text-secondary'
      default:
        return ''
    }
  }

  if (!order) {
    return (
      <div className="mb-4 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <h3>目前尚無訂單記錄</h3>
      </div>
    )
  }

  // 處理圖片路徑
  const imagePath = order.firstItemImage
    ? (order.firstItemType === 'product'
      ? `/images/product/${order.firstItemImage}`
      : `https://winderland.shop/uploads/course_and_tarot/${order.firstItemImage}`)
    : '/images/default-order-image.png';

  return (
    <>
      <div className={`${styles.cardBodyRwd} d-flex `}>
        <div className="cardImg">
          <Image
            src={imagePath}
            alt="First item"
            width={80}
            height={80}
            className={styles.orderImg}
            //  layout="fill"
            objectFit="cover"
          />
        </div>


        <div className={`${styles.orderDetail}`}>
          <ul className={styles.thRwd}>
            <li>總件數</li>
            <li>付款方式</li>
            <li>狀態</li>
            <li>總金額</li>
          </ul>
          <ul className={styles.tdRwd}>
            <li>共{order.total_items}件</li>
            <li> {order.payment_method}／{order.transport}</li>
            <li className={getStatusClass(order.status)}>{order.status}</li>
            <span className={styles.span}>NT${order.totalMoney.toLocaleString()}</span>
          </ul>
        </div>
      </div>


    </>
  )
}
