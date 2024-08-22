import React, { useState } from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import OrderAside from '@/components/member/dashboard/order/OrderAside'
import OrderFilterOffcanvas from '@/components/member/dashboard/order/OrderFilterOffcanvas';
import OrderCard from './order/OrderCard'
import OrderCardDetail from './order/OrderCardDetail'
import OrderCardRWD from './order/OrderCardRWD'
import styles from '@/components/member/dashboard/order/OrderCardDetail.module.css'

export default function DashboardOrder() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* desk */}
      <div className="container d-none d-lg-block">
        <div className=" d-flex">
          <OrderAside />
          <div className="order-list">
            <div className="order-card card">
              <OrderCard />

              {isExpanded ? (
            <>

            {/* <div className="order-detail-title d-flex p-3">
                  <p style={{ marginRight: '60%', marginLeft: '5%' }}>品項</p>
                  <p style={{ marginRight: '10%' }}>件數</p>
                  <p style={{ marginRight: '10%' }}>小計</p>
                  <i className="fa-solid fa-chevron-up" />
                </div> */}

              <div className={`${styles.orderDetailTitle} d-flex p-3`}>
                <div className={`col-7  ${styles.titleLabel}`}>品項</div>
                <div className={`col-2 ${styles.titleLabelNumber} ${styles.titleLabel}`}>件數</div>
                <div className={`col-1 ${styles.titleLabel}`}>小計</div>
                <div className={`col-1`}>
                  <button onClick={toggleDetails} className={styles.iconBox}>
                    <i className={`fa-solid fa-chevron-up ${styles.faChevronUp} `} />
                  </button>
                </div>
              </div>
              <OrderCardDetail />
            </>
          ) : (
            <div>
            <button
                type="button"
                className="card-footer text-muted d-flex justify-content-between align-items-center collapsible"
                onClick={toggleDetails}
            >
                <div>2024.07.10</div>
                <div>訂單編號 ＃a441</div>
                <div>
                    訂單詳情
                    <i className="fa-solid fa-chevron-down"/>
                </div>
            </button>
              {/* <div>
                <button onClick={toggleDetails}>
                  <i className="fa-solid fa-chevron-down" />
                </button>
              </div> */}
            </div>
          )}

            </div>           
          </div>
        </div>
      </div>

      {/* rwd */}
      <div className="d-block d-lg-none" id="order-content-rwd">
        <div className="d-flex align-items-center searchArea">
          <div className="search ms-4 mt-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search_icon" />
            <input id="search" type="search" placeholder="搜 尋 關 鍵 字 " />
          </div>
          {/* 篩選手風琴元件 */}
          <OrderFilterOffcanvas />
        </div>

        <div className="order-list-rwd container-fluid">
          <div className="order-card-rwd card">
            <OrderCardRWD />
          </div>

          <div className="order-card-rwd card">
            <OrderCardRWD />
          </div>

        </div>
      </div>
    </>
  )
}
