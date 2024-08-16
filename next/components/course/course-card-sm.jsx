import React from 'react'
import { useRouter } from 'next/router';

export default function CourseCardSm({courses}) {
    const router = useRouter();
    // 列表顯示的課程，陣列中有多個陣列
    console.log("this is course-card-sm-component"+courses);
    // const [id, name, student_limit, teacher_id, price, online, address, appointment_start, appointment_end, course_start, course_end, description, status, image_id, path] = courses;

    function handleHref(e, id) {
        e.preventDefault();
        router.push(`/course/${id}`)
    }

  return (
    <>
        {courses.map((course)=>{
            const {id, name, student_limit, teacher_id, price, online, address, appointment_start, appointment_end, course_start, course_end, description, status, image_id, path} = course;
            const isOnline = parseInt(online)===0 ? false : true;
            return (
            <a key={id} onClick={(e)=>handleHref(e, id)} className="col-12 col-md-4 col-lg-3 px-10px d-flex flex-column align-items-center">
                  <div className="row px-0 m-0 flex-row flex-md-column w-100">
                    <div className="col-4 col-md-12 px-0">
                      <div className="course-video-video overflow-hidden">
                        <img
                          className="course-img21"
                          src="/images/course_and_tarot/rectangle128.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="card-md-body col-8 col-md-12">
                      <div className="course-body-header px-0">
                        <span className={`${isOnline===true ? 'online-tag' : 'underline-tag' } d-md-inline-block`}>
                          線上
                        </span>
                        <span
                          className="h6 spac-1 text-justify"
                          style={{ lineHeight: "35px" }}
                        >
                          迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                        </span>
                        <p className="text-gray-light mt-2 d-md-block">
                          by 王淇
                        </p>
                        <div className="sm-card-secondLine d-flex d-md-none justify-content-between mt-2">
                          <span className="sm-card-secondLine-left">
                            <span className="online-tag">線上</span>
                            <span className="text-gray-light">by 王淇</span>
                          </span>
                          <span className="sm-card-secondLine-right">
                            <i className="fa-solid fa-star star-with-score" />
                            <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                              4.8
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="course-body-footer d-md-block">
                        <div className="stars mt-2 d-flex align-items-center">
                          <i className="fa-solid fa-star star-with-score" />
                          <i className="fa-solid fa-star star-with-score" />
                          <i className="fa-solid fa-star star-with-score" />
                          <i className="fa-solid fa-star star-with-score" />
                          <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                            4.8
                          </span>
                        </div>
                        <div className="location mt-2 d-flex align-items-center">
                          <i className="fa-solid fa-location-dot text-sec-dark-blue" />
                          <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                            上課縣市-台北市
                          </span>
                        </div>
                        <div className="course-process-footer mt-2">
                          <span className="h5 spac-2 me-3">NT$3,500</span>
                          <span className="h6 text-gray-light spac-2 origin-price">
                            <del>NT$5,500</del>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row px-0 m-0 w-100">
                    <div className="col-12 course-process-header d-flex justify-content-between mt-3 px-0">
                      <span className="h6 text-sec-blue spac-1">
                        課程時長-5小時
                      </span>
                      <span className="h6 text-sec-blue spac-1">
                        已完成70%
                      </span>
                    </div>
                    <div
                      className="progress mt-2 bg-sec-blue px-0"
                      role="progressbar"
                      aria-label=""
                      aria-valuenow={75}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ height: "5px" }}
                    >
                      <div
                        className="progress-bar bg-sec-blue-dark"
                        style={{ width: "70%" }}
                      />
                    </div>
                  </div>
                </a>
            )
        })}
        
    </>
  )
}
