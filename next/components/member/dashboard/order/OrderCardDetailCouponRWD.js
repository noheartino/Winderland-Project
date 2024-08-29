import React from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetailCoupon.module.css'


export default function OrderCardDetailCoupon({ orderInfo }) {
    // 有無使用折價券邏輯
    const hasCoupon = orderInfo?.coupon_id && orderInfo?.coupon_name
    // 有無使用 WPoints 邏輯
    const hasUsedPoints = orderInfo?.pointUsed > 0

    return (
        <>
            {/* desk */}
            <div className="d-none d-lg-block">
                <div className={`${styles.orderUsed} d-flex `}>
                    <h5 className={styles.orderUsedLabel}>本次使用</h5>

                    {/* 折價券區域 */}
                    <div className={`${styles.usedItem} d-flex align-items-center`}>
                        {hasCoupon ? (
                            <div className="used-coupon">
                                <div className="coupon-card d-flex align-items-center">
                                    <div className={styles.couponTicket}>
                                        <div className="coupon-n">{orderInfo.coupon_name}</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.noCoupon}>
                                本次未使用折價券
                            </div>
                        )}
                    </div>

                    {/* W Points 區域 */}
                    <div className={`${styles.usedItem} d-flex align-items-center`}>
                        {hasUsedPoints ? (
                            <div className="used-wpoint">
                                <div className="point d-flex">
                                    <div className={styles.pointImg} />
                                    <div className={styles.pointText}>
                                        <p>W Points</p>
                                        <div className={styles.pointUsed}>-{orderInfo.pointUsed}P</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.noPoints}>

                                <div className="point d-flex">
                                    <div className={styles.pointImg} />
                                    <div className={styles.pointText}>
                                        <p>W Points</p>
                                        <div className={styles.noPoints}>
                                            本次未使用 W Points</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`${styles.orderGet} d-flex`}>
                    <h5 className={`${styles.orderGetLabel}`}>本次獲得</h5>
                    <div className="point d-flex">
                        <div className={styles.pointImgGet} />
                        <div className={styles.pointTextGet} >
                            <p>W Points</p>
                            <div className={styles.pointGet}>{orderInfo.earned_points} P</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* rwd */}
            <div className="d-block d-lg-none">
                <div className={`${styles.orderUsed}`}>
                    <h5 className={styles.orderUsedLabel}>本次使用</h5>

                    <div className="d-flex justify-content-center align-item-center">

                        {/* 折價券區域 */}
                        <div className={`${styles.usedItem} d-flex align-items-center`}>
                            {hasCoupon ? (
                                <div className="used-coupon">
                                    <div className="coupon-card d-flex align-items-center">
                                        <div className={styles.couponTicket}>
                                            <div className="coupon-n">{orderInfo.coupon_name}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.noCoupon}>
                                    本次未使用折價券
                                </div>
                            )}
                        </div>

                        {/* W Points 區域 */}
                        <div className={`${styles.usedItem} d-flex align-items-center`}>
                            {hasUsedPoints ? (
                                <div className="used-wpoint">
                                    <div className="point d-flex">
                                        <div className={styles.pointImgRWD} />
                                        <div className={styles.pointText}>
                                            <p>W Points</p>
                                            <div className={styles.pointUsed}>-{orderInfo.pointUsed}P</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.noPoints}>

                                    <div className="point d-flex">
                                        <div className={styles.pointImgRWD} />
                                        <div className={styles.pointTextWpoint}>
                                            <p>W Points</p>
                                            <div className={styles.noPoints}>
                                                本次未使用 W Points</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <div className={`${styles.orderGet} `}>
                    <h5 className={`${styles.orderGetLabel}`}>本次獲得</h5>
                    <div className="point d-flex justify-content-center align-item-center ">
                        <div className={styles.pointImgGet} />
                        <div className={styles.pointTextGet} >
                            <p>W Points</p>
                            <div className={styles.pointGet}>+{orderInfo.earned_points} P</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
