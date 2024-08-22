import React from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'

export default function OrderCardDetailItem() {
    return (
        <>
            <div className={`${styles.orderCard} card`}>
                <div className={`${styles.cardBody} d-flex`}>
                    <Image
                        src="/images/member/order-p1.png"
                        alt=""
                        width={50}
                        height={50}
                        className="order-img"
                    />
                    <div className={`${styles.orderDetail} d-flex justify-content-between align-items-center`}>
                        <div className={styles.orderDetailP}>
                            <div className={styles.orderDetailProductName}>
                                皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園 紅酒 2017
                            </div>
                            <div className={`${styles.pDetail}  d-flex justify-content-between align-items-center`}>
                                <div className={styles.pCategory}>
                                    <p className="p-capacity">750ml / 法國</p>
                                    <p className="p-year">2017年</p>
                                </div>
                                <div className={styles.pPprice}>NT$&nbsp;5,999</div>
                            </div>
                        </div>
                        <div className={styles.orderDetailNumber}>3</div>
                        <div className={styles.orderDetailTotal}>
                            <p>NT$&nbsp;17,997</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
