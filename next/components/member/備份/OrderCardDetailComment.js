import React from 'react'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'

export default function OrderCardDetailComment() {
    return (
        <>
            <div className={styles.orderComment}>
                <div className={`mb-3`}>
                    <select
                        defaultValue="option1"
                        className={`${styles.formSelect} form-select form-select-lg`}
                        name=""
                        id=""
                    >
                        <option value="option1">選擇評論商品</option>
                        <option value="">
                            皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園紅酒 2017
                        </option>
                        <option value="">
                            約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019
                        </option>
                    </select>
                </div>
                <div className="comment-area d-flex">
                    <div className={`mb-3 ${styles.commentText}`}>
                        <label htmlFor="ratingLabel" className={`form-label ${styles.formLabel}`}>
                            商品評分
                        </label>
                        <textarea
                            className={`form-control ${styles.textArea}`}
                            name=""
                            id=""
                            rows={6}
                            cols={40}
                            defaultValue={''}
                        />
                    </div>
                    <div className={`mb-3 ${styles.commentRating}`}>
                        <label htmlFor="commentLabel" className={`form-label ${styles.ratingLabel}`}>
                            商品評論
                        </label>
                        <div className={styles.star}>★ ★ ★ ★ ★</div>
                        <button className={styles.commentBtn}>送出</button>
                    </div>
                </div>
            </div>
        </>
    )
}
