import React from 'react'
import styles from '@/components/member/dashboard/profile/ProfileMembership.module.css'

export default function Lv4Card() {
    return (
        <>
           <div className="levelPageBox Lv4">
            <div className="PageBoxT">白金瓶會員優惠</div>
            <div className="PageBoxC">
            <p>▪ W Point 購物  <span className={`${styles.emphasis} ${styles.birthdayPoints}`}>3.5%</span>回饋</p>
            <p>▪ 每月<span className={`${styles.emphasis} ${styles.birthdayPoints}`}>5張</span>自選優惠券</p>
            <p>▪ 生日禮 W Point <span className={`${styles.emphasis} ${styles.birthdayPoints}`}>2000點</span> </p>
            </div>
        </div>
        </>
    )
}
