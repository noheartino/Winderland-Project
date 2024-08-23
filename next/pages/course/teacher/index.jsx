import React from "react";

export default function TeacherDetail() {
  return (
    <>
      <div className="course_wrap">
      <header></header>
        {/* course-nav start */}
        <div className="container-fluid course-homepage-nav d-flex align-items-center gap-4 flex-column justify-content-center">
          <div className="nav-header d-flex align-items-center flex-column justify-content-center">
            <h4 className="text-white spac-3">品酒課程</h4>
            <p className="text-white spac-2">Course</p>
          </div>
          <input
            type="search"
            className="course-search-input form-control rounded-5"
            placeholder="搜尋關鍵字"
            aria-label="搜尋關鍵字"
            aria-describedby="basic-addon2"
          />
          <div className="row px-0 m-0 justify-content-center">
            <div className="col-11 col-md-6 d-flex justify-content-center flex-wrap">
              <a href="/" className="nav-tag">
                品酒
              </a>
              <a href="/" className="nav-tag">
                挑選酒
              </a>
              <a href="/" className="nav-tag">
                認證課程
              </a>
              <a href="/" className="nav-tag">
                法國
              </a>
              <a href="/" className="nav-tag">
                SFM
              </a>
              <a href="/" className="nav-tag">
                BWC布根地
              </a>
              <a href="/" className="nav-tag">
                CIVB波爾多葡萄酒學院
              </a>
              <a href="/" className="nav-tag d-none d-md-block">
                CIVA
              </a>
              <a href="/" className="nav-tag d-none d-md-block">
                阿爾薩斯
              </a>
              <a href="/" className="nav-tag d-none d-md-block">
                葡萄牙公會
              </a>
              <a href="/" className="nav-tag d-none d-md-block">
                葡萄酒學者認證
              </a>
              <a href="/" className="nav-tag d-none d-md-block">
                IWS
              </a>
            </div>
          </div>
        </div>
        {/* course-nav end */}

        {/* teacher-list start */}
        <div className="container-fluid">
          <div className="container-sm py-5">
            <div className="row px-10px justify-content-center">
              <div className="col-auto col-md-12 course-card-header d-flex align-items-center">
                <span className="col-auto h4 pe-2 spac-2 m-0">
                  <strong>教師列表</strong>
                </span>
                <span className="col-auto text-gray-light spac-1">
                  ｜&nbsp;品酒領域的專家們
                </span>
              </div>
            </div>
            <div className="row row-gap-5">
              {/* teacher-list-card start */}
              <div className="col-12 col-sm-4 col-lg-3 px-10px">
                <div className="row flex-row flex-md-column align-items-center justify-content-center bg-light-gray shadow rounded-4 py-4">
                  <a className="teacher-head col-auto px-0" href="/">
                    <img
                      className="course-img21"
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

        {/* page-nav-bar start */}
        <div className="container-fluid py-3">
            <div className="container-sm">
                <div className="row justify-content-between">
                    <a className="col-auto" href="">
                      <span className="h5 text-prim-text-prim spac-1">查看所有講師<i className="fa-solid fa-chevron-right ms-2 text-prim-text-prim"></i></span>
                    </a>
                    <div className="col-auto">page-nav</div>
                </div>
            </div>
        </div>
        {/* page-nav-bar end */}
        
        <footer></footer>
      </div>
    </>
  );
}
