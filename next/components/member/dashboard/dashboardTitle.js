import React from 'react'
// import styles from '@/components/member/member.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function DashboardTitle() {
    return (
        <>
            {/* desk */}
            <div className=" container d-lg-flex  d-none d-lg-block">
                <div className="u-title d-none d-lg-block">會員中心</div>
            </div>
            {/* rwd */}
            <div className="d-block d-lg-none" id="favorite-content-rwd">
                <div className="u-title-rwd d-block d-lg-none">會員中心</div>
            </div>
        </>
    )
}
