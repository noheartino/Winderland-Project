import React from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'


export default function OrderCardDetailPickup({ orderInfo }) {
    return (
        <>
            <div className={`${styles.pickupArea} d-flex`}>
                <h5 className={styles.orderGetLabel}>收件資訊  |</h5>
                <p className={styles.pickupDetail}>
                    {orderInfo.pickup_name} ／ 0{orderInfo.pickup_phone}
                </p>
            </div>
            <div className={`${styles.pickupArea} d-flex`}>
                <h5 className={`${styles.orderGetLabel}`}>配送資訊 |</h5>
                <p className={styles.pickupDetail}> 
                    {orderInfo.transport} — {orderInfo.pickup_address || orderInfo.pickup_store_name
                }</p>
            </div>
            <div className={`${styles.pickupArea} d-flex`}>
                <h5 className={`${styles.orderGetLabel}`}>物流資訊 |</h5>
                <p className={styles.pickupDetail}>
                    {orderInfo.status}
                </p>
            </div>
        </>
    )
}
