import React, { useState } from 'react';
import OrderCardRWD from './OrderCardRWD';
import OrderCardDetailRWD from './OrderCardDetailRWD';
import styles from './OrderCardRWD.module.css';
import BounceLoader from "react-spinners/BounceLoader";

export default function OrderListRWD({ orders, isLoading }) {
  const [expandedStates, setExpandedStates] = useState({});

  const toggleDetails = (orderId) => {
    setExpandedStates(prevStates => ({
      ...prevStates,
      [orderId]: !prevStates[orderId]
    }));
  };

  if (isLoading) {
    return (
      <div>
        <BounceLoader
          color="#851931"
          loading={isLoading}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mb-4 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <h3>目前尚無訂單記錄</h3>
      </div>
    );
  }

  return (
    <div className={styles.orderListRwd}>
      {orders.map(order => (
        <div key={order.order_uuid} className={`${styles.orderCardRwd} ${expandedStates[order.order_uuid] ? styles.expanded : ''}`}>
          <OrderCardRWD order={order} />
          <button
            type="button"
            className={styles.cardFooter}
            onClick={() => toggleDetails(order.order_uuid)}
          >
          {/* 訂單欄末 */}
          <div className={`${styles.orderTitle} d-flex `}>
          <div className='me-5'>{new Date(order.created_at).toLocaleDateString('zh-TW')}</div>
            <div className='me-4'>訂單編號 ＃{order.order_uuid}</div>
            <div>
              訂單詳情
              <i className={`fa-solid fa-chevron-${expandedStates[order.order_uuid] ? 'up' : 'down'}`} />
            </div>
          </div>
           
          </button>
          {expandedStates[order.order_uuid] && (
            <div className={styles.orderDetailExpanded}>
              <OrderCardDetailRWD orderUuid={order.order_uuid} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}