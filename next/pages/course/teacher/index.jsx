import React from "react";

export default function TeacherIndex() {
  return (
    
    <>
    <div className="course_wrap">
        <header></header>
        

        {/* page four teacher-detail start */}
        <div className="fourth-page-wrap pb-5">
          <div className="container-fluid px-0 teacher-detail-banner rounded-bottom-5 overflow-hidden d-flex justify-content-center align-items-center pb-5">
          </div>
          <div className="container-fluid px-0 position-relative teacher-index-contentBox-margin-minus-control">
            <div className="container-sm">
              
            </div>
            <div className="container-fluid px-0">
              <div className="container-sm">
                <div className="w-100 bg-white rounded-5 m-auto teacher-detail-suggest-course">
                  {/* teacher-list start */}
        <div className="container-fluid">
          <div className="container-sm pb-5 pt-3">

          <div className="row px-10px justify-content-center justify-content-lg-between mb-5 flex-column flex-lg-row align-items-center row-gap-3">
              <div className="col-auto d-flex align-items-center">
                <span className="h4 pe-2 spac-2 m-0">
                  <strong>教師列表</strong>
                </span>
                <span className="text-gray-light spac-1">
                  ｜&nbsp;品酒領域的專家們
                </span>
              </div>
              <div className="col-auto teacher-search-box-width position-relative" style={{minWidth: "300px"}}>
              <input
                type="text"
                className="course-search-input form-control rounded-5 shadow"
                placeholder="搜尋關鍵字"
                aria-label="搜尋關鍵字"
                aria-describedby="basic-addon2"
              />
              <i className="fa-solid fa-magnifying-glass position-absolute teacher-search-icon"></i>
              <i className="fa-solid fa-xmark fa-xmark-teacher position-absolute"></i>
            </div>
            </div>

            <div className="row row-gap-5 gap-4">
              {/* teacher-list-card start */}
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 px-10px">
                <div className="row flex-row flex-md-column align-items-center justify-content-center bg-light-gray shadow rounded-4 py-4">
                  <a className="teacher-head col-auto px-0" href="/">
                    <img
                      src="/images/course_and_tarot/Ellipse 8.png"
                      alt=""
                    />
                  </a>
                  <div className="teacher-text-box col-auto px-10px d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center align-items-center row-gap-1 mt-2">
                      <div className="row teacher-card-name col px-0 justify-content-center align-items-center gap-3">
                        <h5 className="col-auto spac-1 text-prim-dark lh-15 px-0">
                          蔡孝倫
                        </h5>
                        <p className="col-auto spac-1 text-prim-dark lh-15 px-0">
                          Alex Tsai
                        </p>
                      </div>
                    </div>
                    <div className="row flex-column justify-content-center align-items-center">
                      <div className="col-auto stars mt-2 d-flex align-items-center">
                        <i className="fa-solid fa-star star-with-score" />
                        <i className="fa-solid fa-star star-with-score" />
                        <i className="fa-solid fa-star star-with-score" />
                        <i className="fa-solid fa-star star-with-score" />
                        <i className="fa-solid fa-star star-with-score" />
                        <span className="ms-2 spac-1 text-sec-dark-blue">
                          4.8
                        </span>
                      </div>
                      <a
                        className="col-auto d-flex justify-content-center align-items-center mt-3"
                        href="/"
                      >
                        <h6 className="spac-2 lh-15 me-2">講師詳情</h6>
                        <i className="fa-solid fa-chevron-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* teacher-list-card end */}
              
            </div>
          </div>
        </div>
        {/* teacher-list end */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* page four teacher-detail end */}

        <footer></footer>
      </div>

    </>
  );
}
