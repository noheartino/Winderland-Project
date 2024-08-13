import React from 'react'
// import styles from '@/components/member/member.module.css'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

export default function DashboardOrder() {
  return (
    <>
      {/* desk */}
      <div className="container d-none d-lg-block">
        <div className=" d-flex">
          <aside>
            <hr />
            <ul className="list-unstyled ">
              <span>訂單狀態</span>
              <li>出貨準備中</li>
              <li>已出貨</li>
              <li>已送達</li>
              <li>已完成</li>
            </ul>
            <hr />
            <ul className="list-unstyled ">
              <span>其他狀態</span>
              <li>尚未付款</li>
              <li>貨源不足</li>
              <li>包裹損毀</li>
              <li>訂單異常</li>
              <li>已取消</li>
            </ul>
            <hr />
            <span>日期區間</span>
            <br />
            <div className="input-date-gruop">
              <input type="date" />-<input type="date" />
            </div>
            <br />
            <button>日期篩選</button>
          </aside>
          <div className="order-list">
            <div className="order-card card">
              <div className="card-body d-flex">
                <Image
                  src="/images/member/order1.png"
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
                        <td style={{ color: 'var(--info-orange)' }}>
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
                        src="/images/member/order1.png"
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
                        style={{ marginLeft: '20%' }}
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
                        <td style={{ color: 'var(--info-orange)' }}>
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
                        <td style={{ color: 'var(--info-orange)' }}>
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
                        <td style={{ color: 'var(--info-orange)' }}>
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
        <div className="d-flex align-items-center">
          <div className="search ">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search_icon" />
            <input id="search" type="search" placeholder="搜 尋 關 鍵 字 " />
          </div>
          {/* 篩選-畫布 */}
          <button
            className=" order-filter"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            {/* 畫布標題 */}
            <div className="offcanvas-header">
              <FontAwesomeIcon icon={faFilter} />
              <p id="offcanvasRightLabel">篩選項目</p>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            {/* 畫布內容 */}
            <div className="offcanvas-body ">
              <p className="offcanvas-body-title">訂單狀態</p>
              <div className="mb-3">
                <select
                  defaultValue="option1"
                  className="form-select form-select-lg"
                  name=""
                  id=""
                >
                  <option svalueelected="option1">選擇訂單狀態</option>
                  <option value="">已完成</option>
                  <option value="">運送中</option>
                  <option value="">撿貨中</option>
                </select>
              </div>
              <p className="offcanvas-body-title">特殊狀態</p>
              <div className="button-groups">
                <div className="d-flex">
                  <button>尚未付款</button>
                  <button>包裹毀損</button>
                </div>
                <div className="d-flex">
                  <button>貨源不足</button>
                  <button>訂單異常</button>
                  <button>已取消</button>
                </div>
              </div>
              <p className="offcanvas-body-title">下單日期</p>
              <div className="mb-3">
                <select
                  defaultValue="option1"
                  className="form-select form-select-lg"
                  name=""
                  id=""
                >
                  <option value="option1">選擇下單日期</option>
                  <option value="">近半年</option>
                  <option value="">一年內</option>
                  <option value="">一年以上</option>
                </select>
              </div>
              <div className="input-date-gruop ">
                <input type="date" className="mb-3 me-3" />-
                <input type="date" className="mx-2" />
              </div>
              <br />
              <div className="button-end d-flex justify-content-center">
                <button>重設</button>
                <button>送出篩選</button>
              </div>
            </div>
          </div>
        </div>
        <div className="order-list-rwd container-fluid">
          <div className="order-card-rwd card">
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
          </div>
          <div className="order-card-rwd card">
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
            <div className="card-footer  d-flex align-items-center;">
              <div>2024.07.10</div>
              <div>訂單編號 ＃a441</div>
              <div>
                訂單詳情
                <i className="fa-solid fa-chevron-down" />
              </div>
            </div>
          </div>
          <div className="order-card-rwd card">
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
            <div className="card-footer  d-flex align-items-center;">
              <div>2024.07.10</div>
              <div>訂單編號 ＃a441</div>
              <div>
                訂單詳情
                <i className="fa-solid fa-chevron-down" />
              </div>
            </div>
          </div>
          <div className="order-card-rwd card">
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
            <div className="card-footer  d-flex align-items-center;">
              <div>2024.07.10</div>
              <div>訂單編號 ＃a441</div>
              <div>
                訂單詳情
                <i className="fa-solid fa-chevron-down" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
