import React from 'react'
// import styles from '@/components/member/member.module.css'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

export default function DashboardFavorite() {
  return (
    <>
      {/* desk */}
      <div className=" container d-lg-flex  d-none d-lg-block">
        <aside>
          <hr />
          <ul className="list-unstyled ">
            <span>類別</span>
            <li>商品</li>
            <li>課程</li>
            <li>文章</li>
            <li>全部</li>
          </ul>
          <hr />
          <span>日期區間</span>
          <br />
          <div className="input-date-gruop ">
            <input type="date" className="mb-3 me-3" />-
            <input type="date" className="mx-2" />
          </div>
          <br />
          <button>日期篩選</button>
        </aside>
        <div className="favorite-list">
          {/* 商品收藏 */}
          <div className="favorite-p">
            <span>商品收藏</span>
            <hr />
            <div className="favorite-p-group d-flex">
              <div className="favorite-p-card">
                <div className="">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={170}
                    height={170}
                    className="favorite-p-img"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail">
                  <p>約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019</p>
                  <p>750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
              <div className="favorite-p-card">
                <div className="">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={170}
                    height={170}
                    className="favorite-p-img"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail">
                  <p>約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019</p>
                  <p>750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
              <div className="favorite-p-card">
                <div className="">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={170}
                    height={170}
                    className="favorite-p-img"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail">
                  <p>約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019</p>
                  <p>750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
              <div className="favorite-p-card">
                <div className="">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={268}
                    height={268}
                    className="favorite-p-img"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail">
                  <p>約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019</p>
                  <p>750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
            </div>
          </div>
          {/* 課程收藏 */}
          <div className="favorite-c">
            <span>課程收藏</span>
            <hr />
            <div className="favorite-c-group d-flex">
              <div className="favorite-c-card">
                <div className="favorite-c-img">
                  <Image
                    src="/images/member/fav-c1.jpg"
                    alt=""
                    width={265}
                    height={165}
                    className="favorite-c-img-rwd"
                  />
                  {/* <i class="fa-solid fa-bookmark"></i> */}
                  <svg
                    className="svg-bookmark"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={25}
                    viewBox="0 0 20 25"
                    fill="none"
                  >
                    <path
                      d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                      fill="#5B839A"
                      stroke="white"
                    />
                  </svg>
                </div>
                <div className="favorite-c-detail">
                  <div className="favorite-c-title d-flex">
                    <div className="online">線上</div>
                    <span>迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了</span>
                  </div>
                  <p className="byTeacher">by 王淇</p>
                  <div className="stars">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    4.8
                  </div>
                  {/* 進度條 */}
                  <div className="progress-detail d-flex justify-content-between ">
                    <p>課程時長-5小時</p>
                    <p>已完成90%</p>
                  </div>
                  <div className="progress" style={{ height: 10 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '90%' }}
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <div className="price d-flex">
                    <p className="nowPrice">NT$3,500</p>
                    <p className="oldPrice">NT$5,500</p>
                  </div>
                </div>
              </div>
              <div className="favorite-c-card">
                <div className="favorite-c-img">
                  <Image
                    src="/images/member/fav-c1.jpg"
                    alt=""
                    width={265}
                    height={165}
                    className="favorite-c-img-rwd"
                  />
                  {/* <i class="fa-solid fa-bookmark"></i> */}
                  <svg
                    className="svg-bookmark"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={25}
                    viewBox="0 0 20 25"
                    fill="none"
                  >
                    <path
                      d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                      fill="#5B839A"
                      stroke="white"
                    />
                  </svg>
                </div>
                <div className="favorite-c-detail">
                  <div className="favorite-c-title d-flex">
                    <div className="online">線上</div>
                    <span>迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了</span>
                  </div>
                  <p className="byTeacher">by 王淇</p>
                  <div className="stars">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    4.8
                  </div>
                  {/* 進度條 */}
                  <div className="progress-detail d-flex justify-content-between ">
                    <p>課程時長-5小時</p>
                    <p>已完成20%</p>
                  </div>
                  <div className="progress" style={{ height: 10 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '20%' }}
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <div className="price d-flex">
                    <p className="nowPrice">NT$3,500</p>
                    <p className="oldPrice">NT$5,500</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 文章收藏 */}
          <div className="favorite-a">
            <span>文章收藏</span>
            <hr />
            <div className="favorite-a-group d-flex">
              <div className="favorite-a-card">
                <div className="favorite-a-img">
                  <Image
                    src="/images/member/fav-a1.jpeg"
                    alt=""
                    width={80}
                    height={80}
                    className="favorite-a-img"
                  />
                  {/* <i class="fa-solid fa-bookmark"></i> */}
                  <svg
                    className="svg-bookmark"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={25}
                    viewBox="0 0 20 25"
                    fill="none"
                  >
                    <path
                      d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                      fill="#FF4F4F"
                      stroke="white"
                    />
                  </svg>
                </div>
                <div className="favorite-a-detail">
                  <div className="a-category">⬩酒類介紹</div>
                  <span>
                    澳洲紅酒產區葡萄酒特色介紹-- 巴羅莎谷紅酒 Barossa Valley
                  </span>
                  <p>by admin l 2024.02.10</p>
                </div>
              </div>
              <div className="favorite-a-card">
                <div className="favorite-a-img">
                  <Image
                    src="/images/member/fav-a1.jpeg"
                    alt=""
                    width={80}
                    height={80}
                    className="favorite-a-img"
                  />
                  {/* <i class="fa-solid fa-bookmark"></i> */}
                  <svg
                    className="svg-bookmark"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={25}
                    viewBox="0 0 20 25"
                    fill="none"
                  >
                    <path
                      d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                      fill="#FF4F4F"
                      stroke="white"
                    />
                  </svg>
                </div>
                <div className="favorite-a-detail">
                  <div className="a-category">⬩酒類介紹</div>
                  <span>
                    澳洲紅酒產區葡萄酒特色介紹-- 巴羅莎谷紅酒 Barossa Valley
                  </span>
                  <p>by admin l 2024.02.10</p>
                </div>
              </div>
              <div className="favorite-a-card">
                <div className="favorite-a-img">
                  <Image
                    src="/images/member/fav-a1.jpeg"
                    alt=""
                    width={80}
                    height={80}
                    className="favorite-a-img"
                  />
                  {/* <i class="fa-solid fa-bookmark"></i> */}
                  <svg
                    className="svg-bookmark"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={25}
                    viewBox="0 0 20 25"
                    fill="none"
                  >
                    <path
                      d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                      fill="#FF4F4F"
                      stroke="white"
                    />
                  </svg>
                </div>
                <div className="favorite-a-detail">
                  <div className="a-category">⬩酒類介紹</div>
                  <span>
                    澳洲紅酒產區葡萄酒特色介紹-- 巴羅莎谷紅酒 Barossa Valley
                  </span>
                  <p>by admin l 2024.02.10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rwd */}
      <div className="d-block d-lg-none" id="favorite-content-rwd">
        <div className="d-flex  align-items-center">
          <div className="search ">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search_icon" />
            <input id="search" type="search" placeholder="搜 尋 關 鍵 字 " />
          </div>
          {/* 篩選-畫布 */}
          <button
            className=" favorite-filter"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight2"
            aria-controls="offcanvasRight2"
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight2"
            aria-labelledby="offcanvasRightLabel2"
          >
            {/* 畫布標題 */}
            <div className="offcanvas-header">
              <FontAwesomeIcon icon={faFilter} />
              <p id="offcanvasRightLabel2">篩選項目</p>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            {/* 畫布內容 */}
            <div className="offcanvas-body ">
              <p className="offcanvas-body-title">類別</p>
              <div className="mb-3">
                <select
                  defaultValue="option1"
                  className="form-select form-select-lg"
                  name=""
                  id=""
                >
                  <option value="option1">請選擇收藏類別</option>
                  <option value="">全部</option>
                  <option value="">商品</option>
                  <option value="">課程</option>
                  <option value="">文章</option>
                </select>
              </div>
              <p className="offcanvas-body-title">收藏日期</p>
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
        <div className="favorite-list-rwd container-fluid">
          {/* 商品收藏 */}
          <div className="favorite-p-rwd">
            <span>商品收藏</span>
            <hr />
            <div className="favorite-p-group-rwd d-flex">
              <div className="favorite-p-card-rwd">
                <div className="favorite-p-img-rwd">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={80}
                    height={80}
                    className="favorite-p-img-rwd"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail-rwd">
                  <p className="favorite-p-name">
                    約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019
                  </p>
                  <p className="favorite-p-about">750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
              <div className="favorite-p-card-rwd">
                <div className="favorite-p-img-rwd">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={80}
                    height={80}
                    className="favorite-p-img-rwd"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail-rwd">
                  <p className="favorite-p-name">
                    約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019
                  </p>
                  <p className="favorite-p-about">750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
            </div>
          </div>
          {/* 課程收藏 */}
          <div className="favorite-c-rwd">
            <span>課程收藏</span>
            <hr />
            <div className="favorite-c-group ">
              <div className="favorite-c-card-rwd">
                {/* 課程資訊 */}
                <div className="d-flex">
                  <Image
                    src="/images/member/fav-c1.jpg"
                    alt=""
                    width={80}
                    height={80}
                    className="favorite-c-img-rwd"
                  />
                  <div className="favorite-c-detail-rwd">
                    <p>迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了</p>
                    <div className="favorite-c-title-rwd d-flex">
                      <div className="online">線上</div>
                      <p className="byTeacher">by 王淇</p>
                      <svg
                        className="svg-bookmark"
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={25}
                        viewBox="0 0 20 25"
                        fill="none"
                      >
                        <path
                          d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                          fill="#5B839A"
                          stroke="white"
                        />
                      </svg>
                    </div>
                    <div className="price d-flex">
                      <p className="oldPrice">NT$5,500</p>
                      <p className="nowPrice">NT$3,500</p>
                    </div>
                  </div>
                </div>
                {/* 進度條 */}
                <div className="div">
                  <div className="progress-detail d-flex justify-content-between ">
                    <p>課程時長-5小時</p>
                    <p>已完成90%</p>
                  </div>
                  <div className="progress" style={{ height: 10 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '90%' }}
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
              <div className="favorite-c-card-rwd">
                {/* 課程資訊 */}
                <div className="d-flex">
                  <Image
                    src="/images/member/fav-c1.jpg"
                    alt=""
                    width={80}
                    height={80}
                    className="favorite-c-img-rwd"
                  />
                  <div className="favorite-c-detail-rwd">
                    <p>迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了</p>
                    <div className="favorite-c-title-rwd d-flex">
                      <div className="online">線上</div>
                      <p className="byTeacher">by 王淇</p>
                      <svg
                        className="svg-bookmark"
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={25}
                        viewBox="0 0 20 25"
                        fill="none"
                      >
                        <path
                          d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                          fill="#5B839A"
                          stroke="white"
                        />
                      </svg>
                    </div>
                    <div className="price d-flex">
                      <p className="oldPrice">NT$5,500</p>
                      <p className="nowPrice">NT$3,500</p>
                    </div>
                  </div>
                </div>
                {/* 進度條 */}
                <div className="div">
                  <div className="progress-detail d-flex justify-content-between ">
                    <p>課程時長-5小時</p>
                    <p>已完成90%</p>
                  </div>
                  <div className="progress" style={{ height: 10 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '90%' }}
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 文章收藏 */}
          <div className="favorite-a">
            <span>文章收藏</span>
            <hr />
            <div className="favorite-a-group">
              <div className="favorite-a-card d-flex">
                <Image
                  src="/images/member/fav-a1.jpeg"
                  alt=""
                  width={125}
                  height={125}
                  className="favorite-a-img"
                />
                <div className="favorite-a-detail">
                  <div className="favorite-a-detail-title d-flex">
                    <div className="a-category">⬩酒類介紹</div>
                    <svg
                      className="svg-bookmark"
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={25}
                      viewBox="0 0 20 25"
                      fill="none"
                    >
                      <path
                        d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                        fill="#FF4F4F"
                        stroke="white"
                      />
                    </svg>
                  </div>
                  <span>
                    澳洲紅酒產區葡萄酒特色介紹-- 巴羅莎谷紅酒 Barossa Valley
                  </span>
                  <p>by admin l 2024.02.10</p>
                </div>
              </div>
              <div className="favorite-a-card d-flex">
                <Image
                  src="/images/member/fav-a1.jpeg"
                  alt=""
                  width={125}
                  height={125}
                  className="favorite-a-img"
                />
                <div className="favorite-a-detail">
                  <div className="favorite-a-detail-title d-flex">
                    <div className="a-category">⬩酒類介紹</div>
                    <svg
                      className="svg-bookmark"
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={25}
                      viewBox="0 0 20 25"
                      fill="none"
                    >
                      <path
                        d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                        fill="#FF4F4F"
                        stroke="white"
                      />
                    </svg>
                  </div>
                  <span>
                    澳洲紅酒產區葡萄酒特色介紹-- 巴羅莎谷紅酒 Barossa Valley
                  </span>
                  <p>by admin l 2024.02.10</p>
                </div>
              </div>
              <div className="favorite-a-card d-flex">
                <Image
                  src="/images/member/fav-a1.jpeg"
                  alt=""
                  width={125}
                  height={125}
                  className="favorite-a-img"
                />
                <div className="favorite-a-detail">
                  <div className="favorite-a-detail-title d-flex">
                    <div className="a-category">⬩酒類介紹</div>
                    <svg
                      className="svg-bookmark"
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={25}
                      viewBox="0 0 20 25"
                      fill="none"
                    >
                      <path
                        d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                        fill="#FF4F4F"
                        stroke="white"
                      />
                    </svg>
                  </div>
                  <span>
                    澳洲紅酒產區葡萄酒特色介紹-- 巴羅莎谷紅酒 Barossa Valley
                  </span>
                  <p>by admin l 2024.02.10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
