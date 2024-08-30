import React, { useState } from 'react'
import styles from './OrderAside.module.css'

export default function OrderAside({ onFilterChange }) {
  const [selectedStatus, setSelectedStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [sortOrder, setSortOrder] = useState('') // 新增排序狀態

  // 類別篩選
  const handleStatusChange = (status) => {
    const newStatus = status === selectedStatus ? '' : status
    setSelectedStatus(newStatus)
    onFilterChange({ status: newStatus ? [newStatus] : [], startDate, endDate })
  }

  // 日期篩選
  const handleDateChange = () => {
    onFilterChange({ status: selectedStatus ? [selectedStatus] : [], startDate, endDate })
  }

  // 排序
  const handleSortChange = (order) => {
    setSortOrder(order)
    onFilterChange({ status: selectedStatus ? [selectedStatus] : [], startDate, endDate, sortOrder: order })
  }

  // 清空篩選
  const handleClearFilters = () => {
    setSelectedStatus('')
    setStartDate('')
    setEndDate('')
    onFilterChange({ status: [], startDate: '', endDate: '' })
  }

  // 訂單狀態
  const statuses = [
    '出貨準備中',
    '已出貨',
    '已送達',
    '已完成',
    '尚未付款',
    '訂單已取消'
  ]

  return (
    <>
      <aside>
        <hr />
        <ul className="list-unstyled ">
          <span>訂單狀態</span>

          {/* <li>出貨準備中</li>
              <li>已出貨</li>
              <li>已送達</li>
              <li>已完成</li>
            </ul>
            <hr />
            <ul className="list-unstyled ">
              <span>其他狀態</span>
              <li>尚未付款</li>
              <li>訂單已取消</li> */}

          {/* <li onClick={() => handleStatusChange('all')}
            style={{ cursor: 'pointer', color: selectedStatus.length === statuses.length ? 'blue' : 'inherit' }}>
            全部
          </li>
          {statuses.map(status => (
            <li key={status}
              onClick={() => handleStatusChange(status)}
              style={{ cursor: 'pointer', color: selectedStatus.includes(status) ? 'blue' : 'inherit' }}>
              {status}
            </li>
          ))} */}
          {statuses.map(status => (
            <li
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`${styles.statusItem} ${selectedStatus === status ? styles.selected : ''}`}
            >
              {status}
            </li>
          ))}
        </ul>

        <hr />
        <span>日期區間</span>
        <br />
        <li
          onClick={() => handleSortChange('asc')}
          className={`${styles.statusItem} ${sortOrder === 'asc' ? styles.selected : ''}`}
        >
          從舊到新
        </li>
        <li
          onClick={() => handleSortChange('desc')}
          className={`${styles.statusItem} ${sortOrder === 'desc' ? styles.selected : ''}`}
        >
          從新到舊
        </li>


        <div className="input-date-gruop">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mb-3 me-3"
          />
          -
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mx-2"
          />
        </div>
        <br />

        <button onClick={handleDateChange} className={`${styles.button} ${styles['button-filled']}`}>日期篩選</button>
        <button onClick={handleClearFilters} className={`${styles.button} ${styles['button-outlined']}`}>清空篩選</button>

      </aside>
    </>
  )
}
