import React from 'react'
import styles from '@/components/member/dashboard/profile/ProfileMembership.module.css'

export default function Lv1Card() {
  return (
    <>
         <div className="levelPageBox Lv1">
            <div className="PageBoxT">銅瓶會員優惠</div>
            <div className="PageBoxC">
            <p>▪ W Point 購物 <span className={`${styles.emphasis} ${styles.birPoints}`} style={{color:"#FFE7A9"}}>0.3%</span>回饋</p>
            <p>▪ 生日禮 W Point <span className={`${styles.emphasis} ${styles.birPoints}`} style={{color:"#FFE7A9"}}>100點</span></p>
            </div>
        </div>
    </>
  )
}
