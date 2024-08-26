import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'

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
    
      if (isLoading) return <div>Loading...</div>
      if (error) return <div>Error: {error}</div>
      if (!orderData) return <div>No order data available</div>
    
    return (
        <>
            <div className={styles.orderDetailContent}>
            {orderData.orderDetails.map((item) => (
                <OrderCardDetailItem key={item.id} item={item}/>
            ))}
                <hr className={styles.hr}/>
                <OrderCardDetailCoupon orderInfo={orderData.orderInfo} />
                <hr className={styles.hr}/>
                <OrderCardDetailPickup orderInfo={orderData.orderInfo} />
                <hr className={styles.hr}/>
                <OrderCardDetailComment />
            </div>
            
        
        </>
    )
}
