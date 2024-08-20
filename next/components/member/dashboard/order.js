import React, { useState } from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import OrderAside from '@/components/member/dashboard/order/OrderAside'
import OrderFilterOffcanvas from '@/components/member/dashboard/order/OrderFilterOffcanvas';
import OrderCard from './order/OrderCard'
import OrderCardRWD from './order/OrderCardRWD'


export default function DashboardOrder() {
  return (
    <>
      {/* desk */}
      <div className="container d-none d-lg-block">
        <div className=" d-flex">
          <OrderAside />
          <div className="order-list">
            <div className="order-card card">
              <OrderCard />
            </div>

            <div className="order-card card">
              <div className="card-body d-flex">
                <Image
                  src="/images/member/order-p1.png"
                  alt=""
                  width={50}
                  height={50}
                  className="order-img"
                />
                <div className="order-detail">
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
                        <td style={{ letterSpacing: 5 }}>共2件</td>
                        <td>
                          貨到付款
                          <br />
                          7-11
                        </td>
                        <td>已送達</td>
                        <td style={{ color: 'var(--orange)' }}>
                          NT$ 8,120
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* 手風琴標題 */}
              <button
                type="button"
                className="card-footer text-muted d-flex justify-content-between align-items-center collapsible"
              >
                <div>2024.07.10</div>
                <div>訂單編號 ＃a441</div>
                <div>
                  訂單詳情
                  <i className="fa-solid fa-chevron-down" />
                </div>
              </button>
              {/* 手風琴內容 */}
              <div className="content order-detail-card ">
                {/* 標題 */}
                <div className="order-detail-title d-flex p-3">
                  <p style={{ marginRight: '60%', marginLeft: '5%' }}>品項</p>
                  <p style={{ marginRight: '10%' }}>件數</p>
                  <p style={{ marginRight: '10%' }}>小計</p>
                  <i className="fa-solid fa-chevron-up" />
                </div>
                {/* 內容 */}
                <div className="order-detail-content">
                  <div className="order-card card">
                    <div className="card-body d-flex">
                      <Image
                        src="/images/member/order-p1.png"
                        alt=""
                        width={50}
                        height={50}
                        className="order-img"
                      />
                      <div className="order-detail d-flex justify-content-between align-items-center ">
                        <div className="order-detail-p">
                          <span>
                            皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園 紅酒 2017
                          </span>
                          <div className=" p-detail d-flex justify-content-between align-items-center">
                            <div className="p-category">
                              <p className="p-capacity">750ml / 法國</p>
                              <p className="p-year">2017年</p>
                            </div>
                            <div className="p-price">NT$&nbsp;5,999</div>
                          </div>
                        </div>
                        <div className="order-detail-n">3</div>
                        <div className="order-detail-t">
                          <p>NT$&nbsp;17,997</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-card card">
                    <div className="card-body d-flex">
                      <Image
                        src="/images/member/order-p1.png"
                        alt=""
                        width={50}
                        height={50}
                        className="order-img"
                      />
                      <div className="order-detail d-flex justify-content-between align-items-center ">
                        <div className="order-detail-p">
                          <span>
                            皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園 紅酒 2017
                          </span>
                          <div className=" p-detail d-flex justify-content-between align-items-center">
                            <div className="p-category">
                              <p className="p-capacity">750ml / 法國</p>
                              <p className="p-year">2017年</p>
                            </div>
                            <div className="p-price">NT$&nbsp;5,999</div>
                          </div>
                        </div>
                        <div className="order-detail-n">3</div>
                        <div className="order-detail-t">
                          <p>NT$&nbsp;17,997</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      border: '1px solid #D4C0C0',
                      marginLeft: 15,
                      marginRight: 15,
                    }}
                  />
                  <div className="order-used d-flex">
                    <h5 className="order-used-label">本次使用</h5>
                    <div className="used-coupon">
                      <div
                        className="coupon-card d-flex align-items-center"
                        style={{ marginLeft: 98 }}
                      >
                        <div className="coupon-ticket  ">
                          {/* <div class="coupon-c">夏季優惠</div> */}
                          <div className="coupon-n">滿萬元現折350元</div>
                        </div>
                      </div>
                    </div>
                    <div className="used-wpoint">
                      <div className="point d-flex">
                        <div className="point-img" />
                        <div className="point-text">
                          <p>W Points</p>
                          <span>-1000 P</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-get d-flex">
                    <h5 className="order-used-label">本次獲得</h5>
                    <div className="point d-flex">
                      <div className="point-img" />
                      <div className="point-text">
                        <p>W Points</p>
                        <span>1328 P</span>
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      border: '1px solid #D4C0C0',
                      marginLeft: 15,
                      marginRight: 15,
                    }}
                  />
                  <div className="order-comment">
                    <div className="mb-3">
                      <select
                        defaultValue="option1"
                        className="form-select form-select-lg"
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
                      <div className="mb-3 comment-text">
                        <label htmlFor="ratingLabel" className="form-label">
                          商品評分
                        </label>
                        <textarea
                          className="form-control"
                          name=""
                          id=""
                          rows={6}
                          cols={40}
                          defaultValue={''}
                        />
                      </div>
                      <div className="mb-3 comment-rating">
                        <label htmlFor="commentLabel" className="form-label">
                          商品評論
                        </label>
                        <div className="star">★ ★ ★ ★ ★</div>
                        <button className="comment-btn">送出</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
