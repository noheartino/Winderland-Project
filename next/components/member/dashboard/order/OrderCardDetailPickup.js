import React from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'


export default function OrderCardDetailPickup() {
    return (
        <>
            <div className={`${styles.pickupArea} d-flex`}>
                <h5 className={styles.orderGetLabel}>收件資訊  |</h5>
                <p className={styles.pickupDetail}>姓名 ／ 手機</p>
            </div>
            <div className={`${styles.pickupArea} d-flex`}>
                <h5 className={`${styles.orderGetLabel}`}>配送資訊 |</h5>
                <p className={styles.pickupDetail}>7-11 — 板橋宜居店</p>
            </div>
            <div className={`${styles.pickupArea} d-flex`}>
                <h5 className={`${styles.orderGetLabel}`}>物流資訊 |</h5>
                <p className={styles.pickupDetail}>
                    已到貨 2024-03-22 18:28 <br />
                    已出貨 2024-03-16 18:16<br />
                    出貨準備中 2024-02-15 19:07<br />
                    處理中 2024-02-15 19:01</p>
            </div>
        </>
    )
}
