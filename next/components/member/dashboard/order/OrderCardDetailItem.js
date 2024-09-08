import React from 'react'
import Image from 'next/image'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'

export default function OrderCardDetailItem({ item, type }) {
    const isProduct = type === 'product'

    // 使用可選鏈運算符來安全地訪問屬性，並提供默認值
    const name = isProduct ? item?.product_name : item?.class_name
    const price = isProduct ? item?.price : (item?.class_price || item?.price)
    const quantity = isProduct ? (item?.product_quantity || 1) : 1  // 商品使用 product_quantity，課程固定為 1

    // 計算總價，確保價格存在且為數字
    const calculateTotal = () => {
        if (typeof price === 'number' && !isNaN(price)) {
            return Math.round(price * quantity)  // 四捨五入到最接近的整數
        }
        return 'N/A'
    }

    const displayPrice = typeof price === 'number' ? `NT$ ${Math.round(price)}` : 'N/A'
    const totalPrice = `NT$ ${calculateTotal()}`

    // 設置圖片路徑
    const imagePath = item?.image_path
        ? (isProduct
            ? `/images/product/${item.image_path}`
            : `http://localhost:3005/uploads/course_and_tarot/${item.image_path}`)
        : '/images/default-order-image.png' // 請確保您有一個默認圖片

    return (
        <>
            {/* desk */}
            <div className={`${styles.orderCard} card mt-3 d-none d-lg-block`}>
                <div className={`${styles.cardBody} d-flex`}>
                    <div className={styles.orderImg}>
                        <Image
                            src={imagePath}
                            alt={name}
                            width={0}
                            height={150}
                        />
                    </div>
                    <div className={`${styles.orderDetail} d-flex justify-content-between align-items-center`}>

                        <div className={styles.orderDetailP}>
                            <div className={styles.orderDetailProductName}>

                                {isProduct ? item.product_name : item.class_name}
                            </div>
                            <div className={`${styles.pDetail}  d-flex justify-content-between align-items-center`}>
                                <div className={styles.pCategory}>

                                    {isProduct ? (
                                        <>
                                            <p className="p-capacity">
                                                {item.capacity}ml / {item.country_name}
                                            </p>
                                            <p className="p-year">{item.years}年</p>
                                        </>
                                    ) : (
                                        <p className="p-teacher">講師 -  {item.teacher_name}</p>
                                    )}

                                </div>
                                {/* 價格 */}
                                <div className={styles.pPprice}>
                                    NT$&nbsp; {isProduct ? item.price : item.class_price}
                                </div>
                            </div>
                        </div>

                        {/* 數量 */}
                        <div className={styles.orderDetailNumber}>
                            {/* {item.product_quantity} */}
                            {quantity}
                        </div>
                        {/* 小計 */}
                        <div className={styles.orderDetailTotal}>
                            <p>
                                {totalPrice}
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* rwd */}
            <div className="d-block d-lg-none">
            <div className={`${styles.cardBody} d-flex`}>
                 
                    <div className={`${styles.orderDetail} d-flex justify-content-between align-items-center`}>

                        <div className={styles.orderDetailP}>
                            <div className={styles.orderDetailProductName}>
                                {isProduct ? item.product_name : item.class_name}
                            </div>

                            <div className={`${styles.pDetail}  d-flex justify-content-between align-items-center`}>
                                <div className={styles.pCategory}>

                                    {isProduct ? (
                                        <>
                                            <p className="p-capacity mt-2">
                                                {item.capacity}ml / {item.country_name}
                                            </p>
                                            <p className="p-year">{item.years}年</p>
                                        </>
                                    ) : (
                                        <p className="p-teacher">講師 -  {item.teacher_name}</p>
                                    )}

                                </div>
                                {/* 價格 */}
                                {/* <div className={styles.pPprice}>
                                    NT$&nbsp; {isProduct ? item.price : item.class_price}
                                </div> */}
                            </div>
                        </div>

                        {/* 數量 */}
                        <div className={styles.orderDetailNumber}>
                            {/* {item.product_quantity} */}
                            {quantity}
                        </div>
                        {/* 小計 */}
                        <div className={styles.orderDetailTotal}>
                            <p>
                                {totalPrice}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
