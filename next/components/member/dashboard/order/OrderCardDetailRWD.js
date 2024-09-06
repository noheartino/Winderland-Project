import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetailRWD.module.css'
import ClipLoader from "react-spinners/ClipLoader";

import OrderCardDetailItem from './OrderCardDetailItem'
import OrderCardDetailCouponRWD from './OrderCardDetailCouponRWD'
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
          <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ClipLoader
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
            <div className={styles.orderDetailContentRWD}>
                {/* 商品區 */}
                {orderData.productDetails && orderData.productDetails.length > 0 && (
                    <div className={styles.productSectionRWD}>
                        {orderData.productDetails.map((item) => (
                            <OrderCardDetailItem key={item.id} item={item} type="product" />
                        ))}
                    </div>
                )}

                {/* 課程區 */}
                {orderData.classDetails && orderData.classDetails.length > 0 && (
                    <div className={styles.classSectionRWD}>
                        {orderData.classDetails.map((item) => (
                            <OrderCardDetailItem key={item.id} item={item} type="class" />
                        ))}
                    </div>
                )}

                <hr className={styles.hrRWD} />

                <OrderCardDetailCouponRWD orderInfo={orderData.orderInfo} />
                <hr className={styles.hrRWD} />
                <OrderCardDetailPickup orderInfo={orderData.orderInfo} />
                <hr className={styles.hrRWD} />
                <OrderCardDetailComment orderUuid={orderUuid}    orderStatus={orderData.orderInfo.status} />
            </div>




        </>
    )
}
