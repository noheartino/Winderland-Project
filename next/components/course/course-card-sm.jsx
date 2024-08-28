import React from "react";

export default function CourseCardSm({ course, averageRating, classAssignsQ }) {
  // 當前課程 / 當前課程平均得分 / 課程已報名人數
  const {
    class_name='',
    student_limit,
    price=0,
    sale_price=0,
    online,
    address,
    teacher_name,
    class_path,
  } = course;
  const isOnline = parseInt(online) === 0 ? false : true;
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-between cursor-pointer">
        <div className="row px-0 m-0 flex-row flex-md-column w-100 sm-card-minH">
          <div className="col-4 col-md-12 px-0">
            <div className="course-video-video overflow-hidden">
              <img
                className="course-img21"
                src={`/images/course_and_tarot/${class_path}`}
                alt=""
              />
            </div>
          </div>
          <div className="card-md-body col-8 col-md-12">
            <div className="course-body-header px-0">
              <span
                className={`${
                  isOnline === true ? "online-tag" : "underline-tag"
                } d-none d-md-inline-block`}
              >
                {isOnline === true ? "線上" : "實體"}
              </span>
              <span
                className="h5 spac-1 text-justify"
                style={{ lineHeight: "35px" }}
              >
                {class_name}
              </span>
              <p className="text-gray-light mt-2 d-none d-md-block">
                by {teacher_name}
              </p>
              <div className="sm-card-secondLine d-flex d-md-none justify-content-between mt-2">
                <span className="sm-card-secondLine-left">
                  <span
                    className={`${
                      isOnline === true ? "online-tag" : "underline-tag"
                    }`}
                  >
                    {isOnline === true ? "線上" : "實體"}
                  </span>
                  <span className="text-gray-light">by {teacher_name}</span>
                </span>
                <span
                  className={`sm-card-secondLine-right mb-1 align-items-center ${
                    averageRating > 0 ? "d-flex" : "d-none"
                  }`}
                >
                  {/* bigStar start */}
                  <div className="bigStar-mini-box">
                    <i className="fa-solid fa-star bigStar-mini bigStar-beneath" />
                    <i
                      className="fa-solid fa-star bigStar-mini bigStar-above"
                      style={{ width: `${(averageRating / 5) * 100}%` }}
                    />
                  </div>
                  {/* bigStar end */}
                  <span
                    className={`ms-2 spac-1 text-sec-dark-blue emmit1 ${
                      averageRating > 0 ? "d-inline-block" : "d-none"
                    }`}
                  >
                    {averageRating}
                  </span>
                </span>
              </div>
            </div>
            <div className={`course-body-footer`}>
              <div
                className={`stars mt-2 d-none d-md-flex align-items-center mb-1`}
              >
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
              <div
                className={`location mt-2 align-items-center justify-content-end justify-content-md-start ${
                  isOnline === true ? "d-none" : "d-flex"
                }`}
              >
                <i className="fa-solid fa-location-dot text-sec-dark-blue" />
                <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                  上課縣市-{address.slice(0, 3)}
                </span>
              </div>
              <div className="course-process-footer mt-2 d-flex align-items-center justify-content-end justify-content-md-start flex-wrap row-gap-2 gap-3">
                <span
                  className={`h6 text-gray-light spac-2 origin-price mx-2 ${
                    sale_price > 0 ? "d-inline-block d-md-none" : "d-none"
                  }`}
                >
                  <del>NT${price.toLocaleString()}</del>
                </span>
                
                <span className="h5 spac-2">
                  NT$
                  {sale_price > 0
                    ? sale_price.toLocaleString()
                    : price.toLocaleString()}
                </span>
                <span
                  className={`h6 text-gray-light spac-2 origin-price ${
                    sale_price > 0 ? "d-none d-md-inline-block" : "d-none"
                  }`}
                >
                  <del>NT${price.toLocaleString()}</del>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`row px-0 m-0 w-100 ${
            isOnline === true ? "d-none" : "d-flex"
          }`}
        >
          <div className="col-12 course-process-header d-flex justify-content-between mt-3 px-0 flex-wrap row-gap-2">
            <span className="h6 text-sec-blue spac-1">
              限額總數 - {parseInt(student_limit)}人
            </span>
            {/* <span className="h6 text-sec-blue spac-1">
                        已報名 {classAssignsQ>0 ? classAssignsQ/student_limit*100 : '0'}%
                      </span> */}
            <span className="h6 text-sec-blue spac-1">
            已報名 {classAssignsQ > 0 ? `${((classAssignsQ / student_limit) * 100).toFixed(1)}%` : '0%'}
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
              style={{ width: `${(classAssignsQ / student_limit) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
