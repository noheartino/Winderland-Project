import React from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'


export default function OrderCardDetailPickup({ orderInfo }) {
    return (
        <>
        <div className={`${styles.pickupArea} d-flex mt-4`}>
                <div className={styles.orderPickLabel}>訂單編號  </div>
                <p className={styles.pickupDetail}>
                ＃{orderInfo.order_uuid}
                </p>
            </div>
            <div className={`${styles.pickupArea} d-flex`}>
                <div className={styles.orderPickLabel}>訂單日期  </div>
                <p className={styles.pickupDetail}>
                {new Date(orderInfo.created_at).toLocaleDateString('zh-TW')}
                </p>
            </div>
            <div className={`${styles.pickupArea} d-flex`}>
                <div className={styles.orderPickLabel}>收件資訊  </div>
                <p className={styles.pickupDetail}>
                    {orderInfo.pickup_name} ／ 0{orderInfo.pickup_phone}
                </p>
            </div>
            <div className={`${styles.pickupArea} d-flex`}>
                <div className={styles.orderPickLabel}>配送資訊 </div>
                <p className={styles.pickupDetail}> 
                    {orderInfo.transport} <br /> {orderInfo.pickup_address || orderInfo.pickup_store_name
                }</p>
            </div>
            <div className={`${styles.pickupArea} d-flex mb-4`}>
                <div className={styles.orderPickLabel}>物流資訊 </div>
                <p className={styles.pickupDetail}>
                    {orderInfo.status}
                </p>
            </div>
        </>
    )
}
