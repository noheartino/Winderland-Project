import React from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'


export default function OrderCardDetailCoupon() {
    return (
        <>
            <div className={`${styles.orderUsed} d-flex`}>
                <h5 className={styles.orderUsedLabel}>本次使用</h5>
                <div className="used-coupon">
                    <div
                        className="coupon-card d-flex align-items-center"
                        style={{ marginLeft: 98 }}
                    >
                        <div className={styles.couponTicket}>
                            <div className="coupon-n">滿萬元現折350元</div>
                        </div>
                    </div>
                </div>
                <div className="used-wpoint">
                    <div className="point d-flex">
                        <div className={styles.pointImg} />
                        <div className={styles.pointText}>
                            <p>W Points</p>
                            <div className={styles.pointUsed}>-1000 P</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.orderGet} d-flex`}>
                <h5 className={`${styles.orderGetLabel}`}>本次獲得</h5>
                <div className="point d-flex">
                    <div className={styles.pointImgGet} />
                    <div className={styles.pointTextGet} >
                        <p>W Points</p>
                        <div className={styles.pointGet}>1328 P</div>
                    </div>
                </div>
            </div>
        </>
    )
}
