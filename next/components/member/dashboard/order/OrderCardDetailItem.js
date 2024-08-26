import React from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'

export default function OrderCardDetailItem({ item }) {
    return (
        <>
            <div className={`${styles.orderCard} card mt-3`}>
                <div className={`${styles.cardBody} d-flex`}>
                    <Image
                        src="/images/member/order-p1.png"
                        alt=""
                        width={150}
                        height={150}
                        className="order-img"
                    />
                    <div className={`${styles.orderDetail} d-flex justify-content-between align-items-center`}>
                        <div className={styles.orderDetailP}>
                            <div className={styles.orderDetailProductName}>
                                {/* 皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園 紅酒 2017 */}
                                {item.product_name || item.class_name}
                            </div>
                            <div className={`${styles.pDetail}  d-flex justify-content-between align-items-center`}>
                                <div className={styles.pCategory}>
                                {/* 容量/國家 */}
                                    <p className="p-capacity">
                                    {item.capacity}ml / {item.country_name}
                                    </p>
                                    {/* 年份 */}
                                    <p className="p-year">{item.years}年</p>
                                </div>
                                {/* 價格 */}
                                <div className={styles.pPprice}>NT$&nbsp; {item.price || item.class_price}</div>
                            </div>
                        </div>
                        {/* 數量 */}
                        <div className={styles.orderDetailNumber}>{item.product_quantity}</div>
                        {/* 小計 */}
                        <div className={styles.orderDetailTotal}>
                            <p>NT$&nbsp;{(item.price || item.class_price) * item.product_quantity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
