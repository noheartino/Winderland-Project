import React, { useState ,useEffect} from 'react'
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
const [orders, setOrders] = useState([])
const [filters, setFilters] = useState({
  status: [],
  startDate: '',
  endDate: ''
})

// 使用對象來存儲每個訂單的展開狀態
const [expandedStates, setExpandedStates] = useState({});
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  fetchOrders()
}, [filters])

const fetchOrders = async () => {
  try {
    setIsLoading(true)
    let url = 'http://localhost:3005/api/orders/history'
    const params = new URLSearchParams()
    
    if (filters.status.length > 0) {
      params.append('status', filters.status.join(','))
    }
    if (filters.startDate) {
      params.append('startDate', filters.startDate)
    }
    if (filters.endDate) {
      params.append('endDate', filters.endDate)
    }

    if (params.toString()) {
      url += `?${params.toString()}`
    }

    const response = await fetch(url, {
      credentials: 'include',
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || '獲取訂單失敗')
    }
    const data = await response.json()
    setOrders(data.data)
  } catch (error) {
    console.error('獲取訂單時出錯:', error)
    setError(error.message)
  } finally {
    setIsLoading(false)
  }
}

// 展開詳細訂單
const toggleDetails = (orderId) => {
  setExpandedStates(prevStates => ({
    ...prevStates,
    [orderId]: !prevStates[orderId]
  }));
};
// 篩選器
const handleFilterChange = (newFilters) => {
  setFilters(newFilters)
}


  return (
    <>
    {error && <div className="alert alert-danger">{error}</div>}
      {/* desk */}
      <div className="container d-none d-lg-block mb-5">
        <div className=" d-flex">
        <OrderAside onFilterChange={handleFilterChange} />

          <div className="order-list">
            {isLoading ? (
              <div>載入中...</div>
            ) : orders.length === 0 ? (
              <OrderCard order={null} />
            ) : (
              orders.map(order => (
                <div key={order.order_uuid} className="order-card card mb-4">
                  <OrderCard order={order} />

                  {expandedStates[order.order_uuid] ? (
                    <>
                      <div className={`${styles.orderDetailTitle} d-flex p-3`}>
                        <div className={`col-7  ${styles.titleLabel}`}>品項</div>
                        <div className={`col-2 ${styles.titleLabelNumber} ${styles.titleLabel}`}>件數</div>
                        <div className={`col-1 ${styles.titleLabel}`}>小計</div>
                        <div className={`col-1`}>
                          <button onClick={() => toggleDetails(order.order_uuid)} className={styles.iconBox}>
                            <i className={`fa-solid fa-chevron-up ${styles.faChevronUp}`} />
                          </button>
                        </div>
                      </div>
                      <OrderCardDetail orderUuid={ order.order_uuid} />
                    </>
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="card-footer text-muted d-flex justify-content-between align-items-center collapsible"
                        onClick={() => toggleDetails(order.order_uuid)}
                      >
                        <div>{new Date(order.created_at).toLocaleDateString('zh-TW')}</div>
                        <div>訂單編號 ＃{order.order_uuid}</div>
                        <div>
                          訂單詳情
                          <i className="fa-solid fa-chevron-down" />
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
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
