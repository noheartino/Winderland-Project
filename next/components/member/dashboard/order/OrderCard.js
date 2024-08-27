import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function OrderCard({order}) {
  // const [orderDetails, setOrderDetails] = useState(null)

  // useEffect(() => {
  //   const fetchOrderDetails = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3005/api/orders/${orderId}`, {
  //         credentials: 'include', 
  //       })
  //       if (!response.ok) throw new Error('獲取訂單詳情失敗')
  //       const data = await response.json()
  //       setOrderDetails(data.data)
  //     } catch (error) {
  //       console.error('獲取訂單詳情時出錯:', error)
  //     }
  //   }

  //   fetchOrderDetails()
  // }, [orderId])

  const getStatusClass = (status) => {
    switch (status) {
      case '出貨準備中':
        return 'text-warning'
      case '已出貨':
        return 'text-info'
      case '已送達':
      case '已完成':
        return 'text-success'
      case '訂單已取消':
        return 'text-danger'
      case '尚未付款':
        return 'text-secondary'
      default:
        return ''
    }
  }

  if (!order) {
    return (
      <div className="mb-4 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <h3>目前尚無訂單記錄</h3>
      </div>
    )
  }

  return (
    <>
        <div className=" mb-4 d-flex">
                <Image
                  src="/images/member/order1.png"
                  alt=""
                  width={50}
                  height={50}
                  className="order-img mt-4 ms-4"
                />

                <div className="order-detail mt-4">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th scope="col">總件數</th>
                        <th scope="col">付款方式</th>
                        <th scope="col">狀態</th>
                        <th scope="col">總金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ letterSpacing: 5 }}>共{order.total_items}件</td>
                        <td>
                        {order.payment_method}
                          <br />
                          {order.transport}
                        </td>
                        <td className={getStatusClass(order.status)}>{order.status}</td>
                  
                        <td style={{ color: 'var(--orange)' }}>
                          NT$ {order.totalMoney.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
        </div>
    </>
  )
}
