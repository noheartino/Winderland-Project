import React from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'

import OrderCardDetailItem from './OrderCardDetailItem'
import OrderCardDetailCoupon from './OrderCardDetailCoupon'
import OrderCardDetailComment from './OrderCardDetailComment'

export default function OrderCardDetail() {
    return (
        <>
            <div className={styles.orderDetailContent}>
                <OrderCardDetailItem />
                <hr className={styles.hr}/>
                <OrderCardDetailCoupon />
                <hr className={styles.hr}/>
                <OrderCardDetailComment />
            </div>
        </>
    )
}
