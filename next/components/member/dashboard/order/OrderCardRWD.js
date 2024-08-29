import React, { useState, useEffect } from 'react'
import Image from 'next/image'

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
 ? `/images/${order.firstItemType === 'product' ? 'product' : 'course_and_tarot'}/${order.firstItemImage}`
 : '/images/default-order-image.png'

  return (
    <>
          <div className="card-body-rwd d-flex ">
          <Image
           src={imagePath}
          alt="First item"
          width={150}
          height={150}
          className="order-img "
              //  layout="fill"
        objectFit="cover"
        />

              <div className="order-detail d-flex">
                <ul className="th-rwd">
                  <li>總件數</li>
                  <li>付款方式</li>
                  <li>狀態</li>
                  <li>總金額</li>
                </ul>
                <ul className="td-rwd">
                  <li>共{order.total_items}件</li>
                  <li> {order.payment_method}／{order.transport}</li>
                  <li  className={getStatusClass(order.status)}>{order.status}</li>
                  <li className="span">NT${order.totalMoney.toLocaleString()}</li>
                </ul>
              </div>
            </div>
            
            {/* <div className="card-footer  d-flex align-items-center ;">
              <div>2024.07.10</div>
              <div>訂單編號 ＃a441</div>
              <div>
                訂單詳情
                <i className="fa-solid fa-chevron-down" />
              </div>
            </div> */}
    </>
  )
}
