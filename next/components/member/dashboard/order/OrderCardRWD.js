import React from 'react'
import Image from 'next/image'

export default function OrderCardRWD() {
  return (
    <>
          <div className="card-body-rwd d-flex">
              <Image
                src="/images/member/order-p1.png"
                alt=""
                width={50}
                height={50}
                className="order-img"
              />
              <div className="order-detail d-flex">
                <ul className="th-rwd">
                  <li>總件數</li>
                  <li>付款方式</li>
                  <li>狀態</li>
                  <li>總金額</li>
                </ul>
                <ul className="td-rwd">
                  <li>共12件</li>
                  <li>貨到付款 (7-11)</li>
                  <li>出貨準備中</li>
                  <li className="span">NT$&nbsp;78,988</li>
                </ul>
              </div>
            </div>
            <div className="card-footer  d-flex align-items-center ;">
              <div>2024.07.10</div>
              <div>訂單編號 ＃a441</div>
              <div>
                訂單詳情
                <i className="fa-solid fa-chevron-down" />
              </div>
            </div>
    </>
  )
}
