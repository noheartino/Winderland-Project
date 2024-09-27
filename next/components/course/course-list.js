import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import CourseCardSm from '@/components/course/course-card-sm'
import Link from "next/link";
import CourseFilter from "@/components/course/course-filter"
import Image from 'next/image';


export default function CourseList({ userId, courses, comments, classAssigns, currentPage, pageLimit, teachers, setCurrentPage
  , districts
  , districtArr
  , setDistrictArr
  , setScore
  , setOnlineFilter
  , setTeacherSelect
  , setDateStart
  , setDateEnd
  , setPriceStart
  , setPriceEnd
  , score
  , onlineFilter
  , teacherSelect
  , dateStart
  , dateEnd
  , priceStart
  , priceEnd, handleNavClear, }) {
  const router = useRouter()

  function handleHref(e, class_id) {
    e.preventDefault();
    router.push(`/course/${class_id}`);
  }

  // page nav
  let finalPage = Math.ceil(courses.length / pageLimit)
  let firstItemIndex = (currentPage - 1) * pageLimit;
  let lastItemIndex = 7
  if (currentPage === finalPage) {
    lastItemIndex = courses.length - 1;
  } else {
    lastItemIndex = currentPage * pageLimit - 1;
  }

  // 
  const handleCourseOrder = (e, fetchStr) => {
    const { query, pathname } = router;
    const newOrderValue = fetchStr;
    const newQuery = { ...query };
    if (newOrderValue) {
      newQuery.order = newOrderValue;
    } else {
      delete newQuery.order;
    }
    const newUrl = {
      pathname,
      query: newQuery,
    };
    router.push(newUrl, undefined, { shallow: true, scroll: false });
  };

  const handleClearOrder = () => {
    const { query, pathname } = router;
    const { order, ...newQuery } = query;
    const newUrl = {
      pathname,
      query: newQuery,
    };
    router.push(newUrl, undefined, { shallow: true, scroll: false });
  };

  return (
    <>
      <div className="container-fluid px-0">
        <div className="container-sm px-0 mb-5">

          <div className="row px-10px m-0 justify-content-center">
            <div className="col-auto col-md-12 course-card-header d-flex align-items-center">
              <span className="col-auto h4 pe-2 spac-2 m-0">
                <strong>推薦課程</strong>
              </span>
              <span className="col-auto text-gray-light spac-1">
                ｜&nbsp;推薦您可能感興趣的課程
              </span>
            </div>
          </div>
          <div className='row px-10px m-0 justify-content-center justify-content-md-between mb-5'>
            {/* course-list buttoon area start */}
            <div className="col-12 mx-0 px-0">
              <div className='row justify-content-between'>
                <div className='col-auto d-flex gap-2'>
                  <div className="dropdown">
                    <button className="btn-light-to-prim btn py-2 px-3 spac-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      課程排序<i className="fa-solid fa-sort ms-2"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item w-100 spac-1 text-prim-text-prim d-flex justify-content-between" type="button" onClick={(e) => handleCourseOrder(e, 'earlyToLate')}>開課時間(早→晚)<i className="ms-4 fa-solid fa-arrow-down-short-wide"></i></button></li>
                      <li><button className="dropdown-item w-100 spac-1 text-prim-text-prim d-flex justify-content-between" type="button" onClick={(e) => handleCourseOrder(e, 'lateToEarly')}>開課時間(晚→早)<i className="ms-4 fa-solid fa-arrow-up-wide-short"></i></button></li>
                      <li><button className="dropdown-item w-100 spac-1 text-prim-text-prim d-flex justify-content-between" type="button" onClick={(e) => handleCourseOrder(e, 'pLowToHigh')}>金額(低→高)<i className="ms-4 fa-solid fa-arrow-up-9-1"></i></button></li>
                      <li><button className="dropdown-item w-100 spac-1 text-prim-text-prim d-flex justify-content-between" type="button" onClick={(e) => handleCourseOrder(e, 'pHightToLow')}>金額(高→低)<i className="ms-4 fa-solid fa-arrow-down-9-1"></i></button></li>
                      <li><button className="dropdown-item w-100 spac-1 text-prim-text-prim d-flex justify-content-between" type="button" onClick={handleClearOrder}>清除排序<i className="ms-4 fa-solid fa-xmark"></i></button></li>
                    </ul>
                  </div>
                  <div className="d-inline-flex gabutton-1">
                    <button className="btn-light-to-prim btn py-2 px-3 spac-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapes-courseFilter" aria-expanded="false" aria-controls="collapes-courseFilter">
                      課程篩選<i className="fa-solid fa-filter ms-2"></i>
                    </button>
                  </div>
                </div>
                <div className='col-auto d-flex gap-2 row-gap-2 flex-column flex-md-row'>
                  <Link className={`px-0 mx-0 ${userId === 100 ? 'd-block' : 'd-none'}`} href="/course/teacher/management/create">
                    <div
                      type="button"
                      className="btn-prim-to-light btn py-2 px-3 spac-1 d-flex justify-content-center align-items-center"
                    >
                      課程管理<i className="fa-solid fa-chevron-right ms-2"></i>
                    </div>
                  </Link>
                  <Link href="/course/teacher">
                    <div type="button" className="btn-light-to-prim btn py-2 px-3 spac-1 d-flex justify-content-center align-items-center">
                      查看所有講師<i className="fa-solid fa-chevron-right ms-2"></i>
                    </div>
                  </Link>
                  <div
                    type="button"
                    className={`btn-border-white-primText btn py-1 px-3 spac-1 justify-content-center align-items-center ${router.query.search ? 'd-flex' : 'd-none'}`} onClick={handleNavClear}
                  >
                    清除搜尋<i className="fa-solid fa-xmark ms-2"></i>
                  </div>
                </div>
              </div>
              <div className="collapse mt-3" id="collapes-courseFilter">
                <div className="card card-body">
                  <div>
                    <CourseFilter
                      districts={districts}
                      districtArr={districtArr}
                      setDistrictArr={setDistrictArr}
                      teachers={teachers}
                      setScore={setScore}
                      setOnlineFilter={setOnlineFilter}
                      setTeacherSelect={setTeacherSelect}
                      setDateStart={setDateStart}
                      setDateEnd={setDateEnd}
                      setPriceStart={setPriceStart}
                      setPriceEnd={setPriceEnd}
                      score={score}
                      onlineFilter={onlineFilter}
                      teacherSelect={teacherSelect}
                      dateStart={dateStart}
                      dateEnd={dateEnd}
                      priceStart={priceStart}
                      priceEnd={priceEnd}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>
              </div>

              <div>

              </div>
            </div>

            {/* course-list buttoon area end */}
          </div>

          <div className="row px-0 m-0 course-mycourse-box row-gap-5">

            {courses && courses.length > 0 ?
              courses.slice(firstItemIndex, lastItemIndex + 1).map((course) => {
                const { class_id } = course;
                let averageRating = 0;
                let classAssignsQ = 0;

                const filteredComments = comments.filter(comment => comment.entity_type === "class" && comment.entity_id === class_id);
                if (filteredComments) {
                  const ratings = filteredComments.map(comment => comment.rating);
                  averageRating = (ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length).toFixed(1);;
                } else {
                  averageRating = 0
                }

                const filteredclassAssigns = classAssigns.filter(classAssign => classAssign.class_id === class_id && classAssign.status !== 'cancelled');
                if (filteredclassAssigns) {
                  classAssignsQ = filteredclassAssigns.length;
                } else {
                  classAssignsQ = 0
                }


                return (
                  <div key={class_id} onClick={(e) => handleHref(e, class_id)} className='col-12 col-md-4 col-lg-3 px-10px d-flex flex-column align-items-center justify-content-between' title={`${course.class_id}`}>
                    <CourseCardSm userId={userId} course={course} averageRating={averageRating} classAssigns={classAssigns} classAssignsQ={classAssignsQ} />
                  </div>
                );
              })
              : <div className="row justify-content-center my-3">
                <div className="col-auto" style={{ maxWidth: '370px', maxHeight: '350px', width: '100%' }}>
                  <Image src={`https://winderland.shop/uploads/course_and_tarot/courses-no-result.png`} alt="course list no result" layout="responsive" width={370} height={350} style={{ width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
                </div>
              </div>}


          </div>
        </div>
      </div>
    </>
  )
}
