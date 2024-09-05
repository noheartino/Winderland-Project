import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'
import BounceLoader from "react-spinners/BounceLoader";

import OrderCardDetailItem from './OrderCardDetailItem'
import OrderCardDetailCoupon from './OrderCardDetailCoupon'
import OrderCardDetailComment from './OrderCardDetailComment'
import OrderCardDetailPickup from './OrderCardDetailPickup'

export default function OrderCardDetail({ orderUuid }) {
    const [orderData, setOrderData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrderDetails = async () => {
          if (!orderUuid) return
          try {
            setIsLoading(true)
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:3005/api/orders/history/${orderUuid}`, {
              credentials: 'include',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            if (!response.ok) {
              throw new Error('Failed to fetch order details')
            }
            const data = await response.json()
            setOrderData(data.data)
          } catch (error) {
            console.error('獲取訂單詳情失敗:', error)
            setError(error.message)
          } finally {
            setIsLoading(false)
          }
        }
    
        fetchOrderDetails()
      }, [orderUuid])
    
      if (isLoading) {
        return (
          <div>
            <BounceLoader
              color="#851931"
              loading={isLoading}
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
      if (error) return <div>Error: {error}</div>
      if (!orderData) return <div>No order data available</div>
    
    return (
        <>
            <div className={styles.orderDetailContent}>
               {/* 商品區 */}
               {orderData.productDetails && orderData.productDetails.length > 0 && (
                    <div className={styles.productSection}>
                        {/* <h3>購買商品</h3> */}
                        {orderData.productDetails.map((item) => (
                            <OrderCardDetailItem key={item.id} item={item} type="product" />
                        ))}
                    </div>
                )}
                
                {/* 課程區 */}
                {orderData.classDetails && orderData.classDetails.length > 0 && (
                    <div className={styles.classSection}>
                        {/* <h3>購買課程</h3> */}
                        {orderData.classDetails.map((item) => (
                            <OrderCardDetailItem key={item.id} item={item} type="class" />
                        ))}
                    </div>
                )}

                <hr className={styles.hr}/>
                {/* 優惠券 */}
                <OrderCardDetailCoupon orderInfo={orderData.orderInfo} />
                <hr className={styles.hr}/>
                {/* 收件資訊 */}
                <OrderCardDetailPickup orderInfo={orderData.orderInfo} />
                <hr className={styles.hr}/>
                {/* 評論 */}
<OrderCardDetailComment orderUuid={orderUuid}    orderStatus={orderData.orderInfo.status} />
            </div>
            
        
        </>
    )
}
