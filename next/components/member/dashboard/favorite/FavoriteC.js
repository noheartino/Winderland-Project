import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link';

// 格式化價格輔助函數
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function FavoriteC() {
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.isAuth) {
      fetchFavoriteCourses();
    }
  }, [auth.isAuth]);

  // @ 獲取收藏課程
  const fetchFavoriteCourses = async () => {
    try {
      const response = await fetch('https://winderland.shop/api/favorites/courses', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.status === 'success') {
        setFavoriteCourses(data.data);
      }
    } catch (error) {
      console.error('獲取收藏課程時出錯:', error);
    }
  };

  // @ 移除收藏課程
  const removeFavorite = async (classId) => {
    try {
      const response = await fetch(`https://winderland.shop/api/favorites/courses/${classId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await response.json()
      if (data.status === 'success') {
        fetchFavoriteCourses() // 刷新列表
      }
    } catch (error) {
      console.error('移除收藏時出錯:', error)
    }
  }

  return (
    <>
      <span>課程收藏</span>
      <hr />
      {/* 空收藏庫邏輯 */}
      {favoriteCourses.length === 0 ? (
        <div className="no-favorites">目前還沒有任何收藏喔 .ᐟ.ᐟ.ᐟ </div>
      ) : (
        <div className="favorite-c-group d-flex flex-wrap">
          {favoriteCourses.map((course) => (
            <div key={course.class_id} className="favorite-c-card">

              <div className="favorite-c-img">
                <Image
                  src={course.image_path ? `https://winderland.shop/uploads/course_and_tarot/${course.image_path}` : "/images/member/fav-c1.jpg"}
                  alt={course.class_name}
                  width={265}
                  height={165}
                // className="favorite-c-img-rwd"
                />
                <svg
                  className="svg-bookmark"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={25}
                  viewBox="0 0 20 25"
                  fill="none"
                  onClick={() => removeFavorite(course.class_id)}
                  style={{ cursor: 'pointer' }}
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
                  <div className="online">{course.online ? "線上" : "實體"}</div>
                  <span>

                    <Link href={`/course/${course.class_id}`} className='classTitleLink' >
                      <span className='classTitleLink'>
                        {course.class_name}
                      </span>
                    </Link>

                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="byTeacher">by {course.teacher_name}</p>
                  <div className="stars">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    4.8
                  </div>
                </div>

                {/* 進度條 */}
                {/* <div className="progress-detail d-flex justify-content-between ">
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
                </div> */}

                <div className="price d-flex justify-content-end">
                  {course.sale_price && course.sale_price < course.price ? (
                    <>
                      <p className="nowPrice">NT${formatPrice(course.sale_price)}</p>
                      <p className="oldPrice">NT${formatPrice(course.price)}</p>
                    </>
                  ) : (
                    <p className="nowPrice">NT${formatPrice(course.price)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
