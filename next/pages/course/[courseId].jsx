import Comment from "@/components/course/course-comment";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function CourseIndex() {
  const router = useRouter();
  const { courseId, series } = router.query;
  const [course, setCourse] = useState([]);
  const [theCourseAssigned, setCourseAssigned] = useState([]);
  const [comments, setComments] = useState([]);
  let averageRating = 0;

  const seriesDefaultBtn = useRef(null);
  

  let apiUrl = `http://localhost:3005/api/course/${courseId}`;

  function querySeries01(e) {
    router.push({
        pathname: `/course/${courseId}`,
        query: {}
    }, undefined, { scroll: false });
    seriesDefaultBtn.current.focus();
    seriesDefaultBtn.current.textContent = e.target.textContent;
}

function querySeries02(e) {
    router.push({
        pathname: `/course/${courseId}`,
        query: { series: 'timeOldToNew' }
    }, undefined, { scroll: false });
    seriesDefaultBtn.current.focus();
    seriesDefaultBtn.current.textContent = e.target.textContent;
}

function querySeries03(e) {
    router.push({
        pathname: `/course/${courseId}`,
        query: { series: 'scoreHtoL' }
    }, undefined, { scroll: false });
    seriesDefaultBtn.current.focus();
    seriesDefaultBtn.current.textContent = e.target.textContent;
}

function querySeries04(e) {
    router.push({
        pathname: `/course/${courseId}`,
        query: { series: 'scoreLtoH' }
    }, undefined, { scroll: false });
    seriesDefaultBtn.current.focus();
    seriesDefaultBtn.current.textContent = e.target.textContent;
}


  useEffect(()=>{
    if(series==='timeOldToNew'){
      apiUrl = `http://localhost:3005/api/course/${courseId}?series=timeOldToNew`;
    }else if(series==='scoreHtoL'){
      apiUrl = `http://localhost:3005/api/course/${courseId}?series=scoreHtoL`;
    }else if(series==='scoreLtoH'){
      apiUrl = `http://localhost:3005/api/course/${courseId}?series=scoreLtoH`;
    }else{
      apiUrl = `http://localhost:3005/api/course/${courseId}`;
    }
  }, [series])

  useEffect(() => {
    if (courseId) {
      fetch(apiUrl)
        .then((response) => {
          console.log("送出fetch，URL="+apiUrl);
          if (!response.ok) {
            throw new Error("Network response not ok");
          }
          return response.json();
        })
        .then((data) => {
          const { course, theCourseAssigned, comments } = data;
          setCourse(course[0]);
          setCourseAssigned(theCourseAssigned);
          setComments(comments);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [courseId, series]);

  if (comments.length>0) {
    averageRating = (
      comments.reduce((acc, v) => acc + v.rating, 0) / comments.length
    ).toFixed(1);
  } else {
    averageRating = '0'
  }
  function handleStartTimeStr(startTime) {
    const startDate = new Date(startTime);
    const today = new Date();
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    if (startDate < sixMonthsAgo) {
      return "半年前";
    } else if (startDate < threeMonthsAgo) {
      return "三個月前";
    } else if (startDate < oneMonthAgo) {
      return "一個月前";
    } else {
      return startTime;
    }
  }
  function handleDateFormat(dateStr){
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month}月${day}號`;
    }
  function handleTimeFormat(timeStr){
    const timeVar = String(timeStr)
    return timeVar.split(":").slice(0,2).join(":")
  }

  return (
    <>
      <title>課程詳情</title>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <div className="course_wrap">
        <header></header>

        {/* page three course-detail start */}
        <div className="container-fluid px-0 m-0">
          <div className="container-fluid px-0">
            <div className="container-sm px-0">
              <div className="row px-0 m-0 pt-5 mb-4 d-none d-md-flex">
                <div className="col px-10px">
                  <span
                    className={`me-4 py-2 px-3 h6 ${
                      course?.online === 1 ? "online-tag" : "underline-tag"
                    }`}
                  >
                    {course?.online === 1 ? "線上" : "實體"}
                  </span>
                  <span className="text-prim-dark spac-1 me-5 h6">
                    {course?.class_name}
                  </span>
                  <span className="text-prim-dark spac-1 h6">
                    <i className="bi bi-clock-history me-2" />
                    {handleStartTimeStr(course?.appointment_start)}
                  </span>
                </div>
              </div>
              {/* course-detail md 寬度時顯示 start */}
              <div className="container-fluid px-0 d-none d-md-block">
                <div
                  className="row px-0 m-0 md-screen-show d-none d-md-flex"
                  style={{ paddingBottom: "280px" }}
                >
                  <div className="col-8 px-10px">
                    <div className="course-body d-flex align-items-center w-100">
                      <div className="course-leftcontent w-100 course-mycourse-box">
                        <div
                          className="course-video-video rounded-md-0 overflow-hidden w-100 position-relative"
                          href=""
                        >
                          <img
                            className="course-img21"
                            src="/images/course_and_tarot/rectangle128.png"
                            alt=""
                          />
                          <div className="absolute-t0-l0 w-100 h-100 d-flex justify-content-center align-items-center">
                            <a href="">
                              <i className="fa-solid fa-circle-play text-white opacity-50 course-detail-player" />
                            </a>
                          </div>
                        </div>
                        <div
                          className={`progress-bar-area ${
                            course?.online === 1 ? "d-none" : "d-block"
                          }`}
                        >
                          <div className="course-process-header d-flex justify-content-between mt-4">
                            <span className="h6 text-sec-dark-blue spac-1">
                              限額總數-{course?.student_limit}人
                            </span>
                            <span className="h6 text-sec-dark-blue spac-1">
                              已報名-
                              {theCourseAssigned.length > 0
                                ? (
                                    (theCourseAssigned.length /
                                      course.student_limit) *
                                    100
                                  ).toFixed(0)
                                : "0"}
                              %
                            </span>
                          </div>
                          <div
                            className="progress mt-3 bg-sec-blue"
                            role="progressbar"
                            aria-label=""
                            aria-valuenow={0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ height: "5px" }}
                          >
                            <div
                              className="progress-bar bg-sec-blue-dark"
                              style={{
                                width: `${
                                  theCourseAssigned.length > 0
                                    ? (
                                        (theCourseAssigned.length /
                                          course.student_limit) *
                                        100
                                      ).toFixed(0)
                                    : "0"
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="course-body-2 col px-10px ms-3 h-100">
                    <h2 className="spac-2 lh-15 text-prim-text-prim">
                      <strong>{course?.class_name}</strong>
                    </h2>

                    <div className="row align-items-center mt-3 justify-content-between mx-0">
                      <h5 className="col-auto text-prim-text-prim spac-1">
                        by {course?.name}
                      </h5>
                      <div className="col-auto stars mt-2 d-flex align-items-center px-0">
                        <i
                          className={`fa-solid fa-star ${
                            averageRating > 0.5
                              ? "star-with-score"
                              : "star-without-score"
                          }`}
                        />
                        <i
                          className={`fa-solid fa-star ${
                            averageRating > 1.5
                              ? "star-with-score"
                              : "star-without-score"
                          }`}
                        />
                        <i
                          className={`fa-solid fa-star ${
                            averageRating > 2.5
                              ? "star-with-score"
                              : "star-without-score"
                          }`}
                        />
                        <i
                          className={`fa-solid fa-star ${
                            averageRating > 3.5
                              ? "star-with-score"
                              : "star-without-score"
                          }`}
                        />
                        <i
                          className={`fa-solid fa-star ${
                            averageRating > 4.5
                              ? "star-with-score"
                              : "star-without-score"
                          }`}
                        />
                        <span
                          className={`ms-2 spac-1 text-sec-dark-blue emmit1 ${
                            averageRating > 0 ? "d-inline-block" : "d-none"
                          }`}
                        >
                          {averageRating}
                        </span>
                      </div>
                    </div>
                    <div className={`row mx-0 text-sec-dark-blue spac-1 mt-4 ${course?.online===1 ? "d-none" :"d-flex"}`}>
                      <div className="col-12 p-0">
                        <p className="text-sec-dark-blue emmit1">
                          <i className="fa-regular fa-calendar-days me-1"></i>
                          上課日期：{handleDateFormat(course?.course_start)}-{handleDateFormat(course?.course_end)}
                        </p>
                      </div>
                    </div>
                    <div className={`row mx-0 text-sec-dark-blue spac-1 mt-2 ${course?.online===1 ? "d-none" :"d-flex"}`}>
                      <div className="col-12 p-0">
                        <p className="text-sec-dark-blue emmit1">
                          <i
                            className="fa-regular fa-clock me-1"
                            style={{ fontSize: "0.7rem" }}
                          ></i>
                          上課時間：{handleTimeFormat(course?.daily_start_time)}-{handleTimeFormat(course?.daily_end_time)}
                        </p>
                      </div>
                    </div>
                    <div className={`row mx-0 spac-1 mt-2 ${course?.online===1 ? "d-none" :"d-flex"}`}>
                      <div className="col-12 p-0">
                        <p className="text-sec-dark-blue emmit1">
                          <i
                            className="fa-regular fa-compass me-1"
                            style={{ fontSize: "0.7rem" }}
                          ></i>
                          上課地點：{course?.address}
                        </p>
                      </div>
                    </div>

                    <div className="row mt-5 justify-content-between align-items-start">
                      <div className="col-auto">
                        <div className="h2 spac-2 text-sec-orange">
                          <strong>NT${course.price && course.sale_price===0 ? course.price.toLocaleString() : course.sale_price>0 ? course.sale_price.toLocaleString() : 0 }</strong>
                        </div>
                        <p className={`text-gray-light h5 spac-2 mt-3 ${course.sale_price===0 ? "d-none" :"d-block" }`}>
                          <del>NT${course.sale_price>0 ? course.price.toLocaleString() : 0}</del>
                        </p>
                      </div>
                      <a
                        href="/"
                        className="col-auto d-flex align-items-center mt-1"
                      >
                        <h5 className="text-prim-text-prim spac-2">收藏</h5>
                        <i
                          className="ms-2 fa-regular fa-bookmark text-prim-text-prim"
                          style={{ fontSize: "1.7rem" }}
                        />
                      </a>
                    </div>
                    <div className="row h-100">
                      <div className="col-12 d-flex align-items-end">
                        <button className="btn spac-3 btn-sec-orange w-100 mt-3 py-4">
                          加入購物車
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 置頂小卡 md 螢幕時顯示 start */}
                <div
                  className="container-fluid px-0 position-relative d-none d-md-block"
                  style={{ marginBlock: "-200px" }}
                >
                  <div className="container-sm px-0">
                    <div className="container-fluid bg-light-gray rounded-5 w-100 shadow">
                      <div className="container-sm px-0 teacher-intro-card">
                        <div className="row p-2 p-md-4 mx-2 align-items-center justify-content-center">
                          <a
                            className="teacher-head col-auto me-3 px-0"
                            href="/"
                          >
                            <img
                              className="course-img21"
                              src="/images/course_and_tarot/Ellipse 8.png"
                              alt=""
                            />
                          </a>
                          <div className="teacher-text-box col col-md-4 col-lg-7 ms-3">
                            <div className="row align-items-center">
                              <div className="teacher-card-name col">
                                <a href="">
                                  <h2 className="spac-2 text-prim-dark lh-15">
                                    {course?.name}
                                  </h2>
                                </a>
                                <a href="">
                                  <h5 className="spac-2 text-prim-dark lh-15">
                                    {course?.name_en}
                                  </h5>
                                </a>
                              </div>
                              <a className="col-auto" href="/">
                                <div className="teacher-more d-flex align-items-center">
                                  <h5 className="spac-2 text-prim-dark lh-15 me-2">
                                    講師詳情
                                  </h5>
                                  <i className="fa-solid fa-chevron-right text-prim-dark mt-1" />
                                </div>
                              </a>
                            </div>
                            <hr className="my-4" />
                            <h5 className="spac-2 text-prim-dark lh-15 text-justify teacher-intro-card-text">
                              {course?.description}
                            </h5>
                          </div>
                          <div className="teacher-starts col d-flex flex-column align-items-center justify-content-center pe-0">
                            <h1 className="spac-2 text-prim-text-prim ms-2">
                              {averageRating}
                            </h1>
                            {/* bigStar start */}
                            <div className="bigStar-box">
                              <i className="fa-solid fa-star bigStar bigStar-beneath  text-light-wine-border" />
                              <i
                                className="fa-solid fa-star bigStar bigStar-above"
                                style={{ width: `${(averageRating / 5) * 100}%` }}
                              />
                            </div>
                            {/* bigStar end */}
                            <p className="text-prim-text-prim">教師平均評分</p>
                            <p className="text-prim-text-prim">({comments.length>0 ?comments.length:0}&nbsp;則評分)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 置頂小卡 md 螢幕時顯示 end */}
              </div>
              {/* course-detail md 寬度時顯示 end */}
              {/* course-detail 手機時顯示 start */}
              <div className="row small-screen-show d-flex d-md-none">
                <div className="col-12 d-flex flex-column align-items-center px-0">
                  <div
                    className="course-video-video position-relative mb-3"
                    href=""
                  >
                    <img
                      className="course-img21"
                      src="/images/course_and_tarot/rectangle128.png"
                      alt=""
                    />
                    <div className="absolute-t0-l0 w-100 h-100 d-flex justify-content-center align-items-center">
                      <a href="">
                        <i className="fa-solid fa-circle-play text-white opacity-50 course-detail-player" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="course-body-2 col px-10px h-100">
                  <h1 className="spac-2 lh-15 text-prim-text-prim">
                    <strong>
                      {course?.class_name}
                    </strong>
                  </h1>

                  <div className="row mx-0 text-sec-dark-blue spac-1 mt-4">
                    <div className="col-12 p-0">
                      <p className="text-sec-dark-blue">
                        <i className={`fa-regular fa-calendar-days me-1 ${course?.online===1 ? "d-none" :"d-flex"}`}></i>
                        上課日期：{handleDateFormat(course?.course_start)}-{handleDateFormat(course?.course_end)}
                      </p>
                    </div>
                  </div>
                  <div className={`row mx-0 text-sec-dark-blue spac-1 mt-2 ${course?.online===1 ? "d-none" :"d-flex"}`}>
                    <div className="col-12 p-0">
                      <p className="text-sec-dark-blue">
                        <i
                          className="fa-regular fa-clock me-1"
                          style={{ fontSize: "0.9rem" }}
                        ></i>
                        上課時間：{handleTimeFormat(course?.daily_start_time)}-{handleTimeFormat(course?.daily_end_time)}
                      </p>
                    </div>
                  </div>
                  <div className={`row mx-0 spac-1 mt-2 ${course?.online===1 ? "d-none" :"d-flex"}`}>
                    <div className="col-12 p-0">
                      <p className="text-sec-dark-blue">
                        <i
                          className="fa-regular fa-compass me-1"
                          style={{ fontSize: "0.9rem" }}
                        ></i>
                        上課地點：{course?.address}
                      </p>
                    </div>
                  </div>

                  <div className="row align-items-center mt-3 justify-content-between mx-0">
                    <h5 className="col-auto text-prim-text-prim spac-1">
                      by {course?.name}
                    </h5>
                    <div className="col-auto stars mt-2 d-flex align-items-center">
                      <i className="fa-solid fa-star star-with-score" />
                      <i className="fa-solid fa-star star-with-score" />
                      <i className="fa-solid fa-star star-with-score" />
                      <i className="fa-solid fa-star star-with-score" />
                      <i className="fa-solid fa-star star-with-score" />
                      <span className="ms-2 spac-1 text-sec-dark-blue">
                          {averageRating}
                      </span>
                    </div>
                  </div>
                  <div className="row justify-content-between align-items-center mt-4 mx-0">
                    <span className={`col-auto online-tag me-4 h6 ${
                      course?.online === 1 ? "online-tag" : "underline-tag"
                    }`}>
                    {course?.online === 1 ? "線上" : "實體"}</span>

                    <span className="col-auto h6">
                      <span className={`text-gray-light h5 spac-2 mt-3 me-4 ${course.sale_price===0 ? "d-none" :"d-inline-block" }`}>
                      <del>NT${course.sale_price>0 ? course.price.toLocaleString() : 0}</del>
                      </span>
                      <span className="h2 spac-2 text-sec-orange">
                      <strong>NT${course.price && course.sale_price===0 ? course.price.toLocaleString() : course.sale_price>0 ? course.sale_price.toLocaleString() : 0 }</strong>
                      </span>
                    </span>
                  </div>

                  <div className={`progress-bar-area mb-5 ${course?.online === 1 ? "d-none" : "d-block"}`}>
                    <div className="course-process-header d-flex justify-content-between mt-4">
                      <span className="h6 text-sec-dark-blue spac-1">
                      限額總數-{course?.student_limit}人
                      </span>
                      <span className="h6 text-sec-dark-blue spac-1">已報名-
                              {theCourseAssigned.length > 0
                                ? (
                                    (theCourseAssigned.length /
                                      course.student_limit) *
                                    100
                                  ).toFixed(0)
                                : "0"}
                              %</span>
                    </div>
                    <div
                      className="progress mt-3 bg-sec-blue"
                      role="progressbar"
                      aria-label=""
                      aria-valuenow={0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ height: "8px" }}
                    >
                      <div
                        className="progress-bar bg-sec-blue-dark"
                        style={{
                                width: `${
                                  theCourseAssigned.length > 0
                                    ? (
                                        (theCourseAssigned.length /
                                          course.student_limit) *
                                        100
                                      ).toFixed(0)
                                    : "0"
                                }%`,
                              }}
                      />
                    </div>
                  </div>

                  <div className="row teacher-sm-introduce my-5">
                    <a className="teacher-head col-auto px-0" href="/">
                      <img
                        src="/images/course_and_tarot/Ellipse 8.png"
                        alt=""
                      />
                    </a>
                    <div className="teacher-text-box col px-4">
                      <div>
                        <span className="h3 spac-2 text-prim-dark lh-15">
                          {course?.name}
                        </span>
                        <span className="h6 spac-2 text-prim-dark lh-15">
                          {course?.name_en}
                        </span>
                        <i className="fa-solid fa-chevron-right text-prim-dark mt-1" />
                      </div>
                      <hr className="my-4" />
                      <p className="spac-1 text-prim-dark lh-15 text-justify teacher-intro-card-text">
                        {course?.description}
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-between align-items-center my-3">
                    <a href="/" className="col-auto p-2">
                      <i
                        className="fa-regular fa-bookmark text-prim-text-prim"
                        style={{ fontSize: "2rem" }}
                      />
                    </a>
                    <div className="col pe-0">
                      <button className="btn w-100 spac-3 btn-sec-orange py-2">
                        <h6 className="text-white">加入購物車</h6>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* course-detail 手機時顯示 end */}
            </div>
          </div>
          <div className="container-fluid rounded-top-5 course-detail-content-text">
            <div className="container-sm px-0 d-flex flex-column align-items-center">
              <div className="course-detail-content-text-widthControl">

                <div className={`justify-content-center justify-content-md-start align-items-center ${course.class_summary ? 'd-flex' : 'd-none'}`}>
                  <i className="fa-solid fa-square me-3 d-inline-block d-md-none" />
                  <span className="h4 text-prim-dark lh-15 spac-2">
                    <strong>課程摘要</strong>
                  </span>
                  <i className="fa-solid fa-square ms-3 d-inline-block d-md-none" />
                  <br /><br /><br /><br />
                </div>
                <h5 className="text-prim-dark lh-15 spac-2" style={{whiteSpace: "pre-line"}}>
                  {course.class_summary ? course.class_summary : ''}
                </h5>
                <br /><br /><br /><br />
                <div className={`justify-content-center justify-content-md-start align-items-center ${course.class_description ? 'd-flex' : 'd-none'}`}>
                  <i className="fa-solid fa-square me-3 d-inline-block d-md-none" />
                  <span className="h4 text-prim-dark lh-15 spac-2">
                    <strong>課程內容</strong>
                  </span>
                  <i className="fa-solid fa-square ms-3 d-inline-block d-md-none" />
                  <br /><br /><br /><br />
                </div>
                <h5 className="text-prim-dark lh-25 spac-2" style={{whiteSpace: "pre-line"}}>
                  {course.class_description ? course.class_description : ''}
                </h5>
                <br />
              </div>
            </div>
          </div>

          {/* course detail 評論 start */}
          <div className="container-fluid course-detail-comment-bg py-5 px-10px">
            <div className="container-sm">
              <div className="course-comment-header d-flex flex-column justify-content-center flex-md-row justify-content-md-between align-items-center mt-3 mb-5 row-gap-3">
                <h4 className="text-prim-text-prim lh-15 spac-2 text-center text-md-start">
                  學員回饋&nbsp;|&nbsp;Comment
                </h4>
                <div className="btn-group course-comment-filter">
                  <button
                    type="button"
                    className="btn btn-border-prim dropdown-toggle rounded-5 px-20px"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="p spac-1 text-prim-prim" ref={seriesDefaultBtn}>
                      預設排序     
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li className="dropdown-item p spac-1 text-prim-prim px-2 py-2 cursor-pointer" onClick={querySeries01}>
                          依時間新→舊<i className="fa-solid fa-sort-down text-prim-prim ms-2"></i>
                    </li>
                    <li className="dropdown-item p spac-1 text-prim-prim px-2 py-2 cursor-pointer" onClick={querySeries02}>
                      依時間舊→新<i className="fa-solid fa-sort-up text-prim-prim ms-2"></i>
                    </li>
                    <li className="dropdown-item p spac-1 text-prim-prim px-2 py-2 cursor-pointer" onClick={querySeries03}>
                      依評分高→低<i className="fa-solid fa-arrow-down-wide-short text-prim-prim ms-2"></i>
                    </li>
                    <li className="dropdown-item p spac-1 text-prim-prim px-2 py-2 cursor-pointer" onClick={querySeries04}>
                      依評分低→高<i className="fa-solid fa-arrow-up-wide-short text-prim-prim ms-2"></i>
                    </li>
                    
                  </ul>
                </div>
              </div>
              <div className="course-comment-scorebars-box mb-5 row d-flex d-md-none">
                <div className="col-auto d-flex flex-column align-items-center justify-content-center">
                  <h1 className="spac-2 text-prim-text-prim ms-2">{averageRating}</h1>
                  {/* bigStar start */}
                  <div className="bigStar-box">
                    <i className="fa-solid fa-star bigStar bigStar-beneath  text-light-wine-border" />
                    <i
                      className="fa-solid fa-star bigStar bigStar-above"
                      style={{ width: `${(averageRating / 5) * 100}%` }}
                    />
                  </div>
                  {/* bigStar end */}
                  <p className="text-prim-text-prim">{comments?.length} 則評論</p>
                </div>
                <div className="col course-comment-progress-bar d-flex flex-column justify-content-between">
                  {/* 單條評分bar start */}
                  <div className="row align-items-center">
                    <div className="col-10">
                      <div
                        className="progress bg-light-gray light-wine-border"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "0.65rem" }}
                      >
                        <div
                          className="progress-bar bg-sec-yellow"
                          style={{ width: `${(comments.filter((v) => v.rating === 5).length)/comments?.length*100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">
                      <p className="text-sec-dark-blue">
                      {comments.filter((v) => v.rating === 5).length}
                      </p>
                    </div>
                  </div>
                  {/* 單條評分bar end */}
                  {/* 單條評分bar start */}
                  <div className="row align-items-center">
                    <div className="col-10">
                      <div
                        className="progress bg-light-gray light-wine-border"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "0.65rem" }}
                      >
                        <div
                          className="progress-bar bg-sec-yellow"
                          style={{ width: `${(comments.filter((v) => v.rating === 4).length)/comments?.length*100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">
                      <p className="text-sec-dark-blue">
                      {comments.filter((v) => v.rating === 4).length}
                      </p>
                    </div>
                  </div>
                  {/* 單條評分bar end */}
                  {/* 單條評分bar start */}
                  <div className="row align-items-center">
                    <div className="col-10">
                      <div
                        className="progress bg-light-gray light-wine-border"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "0.65rem" }}
                      >
                        <div
                          className="progress-bar bg-sec-yellow"
                          style={{ width: `${(comments.filter((v) => v.rating === 3).length)/comments?.length*100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">
                      <p className="text-sec-dark-blue">
                      {comments.filter((v) => v.rating === 3).length}
                      </p>
                    </div>
                  </div>
                  {/* 單條評分bar end */}
                  {/* 單條評分bar start */}
                  <div className="row align-items-center">
                    <div className="col-10">
                      <div
                        className="progress bg-light-gray light-wine-border"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "0.65rem" }}
                      >
                        <div
                          className="progress-bar bg-sec-yellow"
                          style={{ width: `${(comments.filter((v) => v.rating === 2).length)/comments?.length*100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">
                      <p className="text-sec-dark-blue">
                      {comments.filter((v) => v.rating === 2).length}
                      </p>
                    </div>
                  </div>
                  {/* 單條評分bar end */}
                  {/* 單條評分bar start */}
                  <div className="row align-items-center">
                    <div className="col-10">
                      <div
                        className="progress bg-light-gray light-wine-border"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "0.65rem" }}
                      >
                        <div
                          className="progress-bar bg-sec-yellow"
                          style={{ width: `${(comments.filter((v) => v.rating === 1).length)/comments?.length*100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">
                      <p className="text-sec-dark-blue">
                      {comments.filter((v) => v.rating === 1).length}
                      </p>
                    </div>
                  </div>
                  {/* 單條評分bar end */}
                  
                </div>
              </div>
              {comments?.map((comment, index)=>{
                return(
                    <div key={comment.id} className="course-comment-area" style={{margin: "0 0 40px 0"}}>
                      <Comment comment={comment} index={index + 1}/>
                    </div>
                    )
              })}
              
            </div>
          </div>
          {/* course detail 評論 end */}
        </div>
        {/* page three course-detail end */}

        {/* page-nav-bar start */}
        <div className="container-fluid py-3">
          <div className="container-sm">
            <div className="row justify-content-between">
              <a className="col-auto" href="">
                <span className="h5 text-prim-text-prim spac-1">
                  查看所有講師
                  <i className="fa-solid fa-chevron-right ms-2 text-prim-text-prim"></i>
                </span>
              </a>
            </div>
            <div className="col-auto">page-nav</div>
          </div>
        </div>
        {/* page-nav-bar end */}

        <footer></footer>
        {/* Bootstrap JavaScript Libraries */}
      </div>
    </>
  );
}
