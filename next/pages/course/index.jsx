import React from 'react'

export default function Course() {
  return (
    <>
  <title>課程首頁</title>
  {/* Required meta tags */}
  <meta charSet="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  <div className="course_wrap">
    <header />
    {/* course-nav start */}
    <div className="container-fluid p-0 course-homepage-nav d-flex align-items-center gap-4 flex-column justify-content-center d-none">
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
      <div className="row justify-content-center">
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
    {/* first page start */}
    <div className="container-fluid p-0 course-first-page d-none">
      {/* page one 我的課程&收藏課程 start */}
      <div className="container-fluid p-0 favorite-and-mycourse-area">
        <div className="container-lg">
          <div className="row course-mycourse-box">
            {/* 我的課程 start */}
            {/* 我的課程 underline start */}
            <div className="col-6 course-mycourse d-flex flex-column px-10px d-none">
              <div className="row course-card-header d-flex align-items-center">
                <a
                  href="/"
                  className="col-12 col-md-auto h4 pe-2 spac-2 m-0 mb-1 d-flex justify-content-between align-items-center"
                >
                  <strong>我的課程</strong>
                  <div
                    className="d-flex d-md-none ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark align-items-center justify-content-center"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <i
                      className="fa-solid fa-chevron-right text-sec-orange"
                      style={{ fontSize: '0.562rem' }}
                    />
                  </div>
                </a>
                <span className="d-none d-md-block col-auto text-gray spac-1 p-0 mb-1">
                  ｜
                </span>
                <span className="col-auto text-gray spac-1 p-0 mb-1 h7">
                  正在學習中的課程內容
                </span>
              </div>
              <div className="row h-100 course-body d-flex align-items-start">
                <a
                  className="course-leftcontent col-12 col-md-8 p-0"
                  type="button"
                  href="/"
                >
                  <div className="course-video-video overflow-hidden position-relative">
                    <img
                      className="course-img21"
                      src="/images/course_and_tarot/rectangle128.png"
                      alt=""
                    />
                    <div className="d-flex d-md-none justify-content-center align-items-center w-100 h-100 absolute-t0-l0">
                      <p className="text-white z-1 fw-thin spac-1 px-2 text-center">
                        迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                      </p>
                      <div className="opacity-50 w-100 h-100 bg-text-dark color-cover position-absolute" />
                    </div>
                  </div>
                  <div className="course-body d-none d-md-block">
                    <span className="underline-tag">實體</span>
                    <span className="h5 spac-1" style={{ lineHeight: '35px' }}>
                      迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                    </span>
                    <div
                      className="progress mt-2 bg-sec-blue"
                      role="progressbar"
                      aria-label=""
                      aria-valuenow={75}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ height: '5px' }}
                    >
                      <div
                        className="progress-bar bg-sec-blue-dark"
                        style={{ width: "70%" }}
                      />
                    </div>
                  </div>
                </a>
                <a
                  className="course-more col h-100 ms-3 d-none d-md-flex justify-content-center align-items-center"
                  href="/"
                >
                  <div className="spac-2 text-prim-dark h6">查看更多</div>
                  <div
                    className="ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark d-flex align-items-center justify-content-center"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <i
                      className="fa-solid fa-chevron-right text-sec-orange"
                      style={{ fontSize: '9px' }}
                    />
                  </div>
                </a>
                <div className="course-no-content col h-100 d-flex flex-column flex-md-row row-gap-3 justify-content-center align-items-center d-none">
                  <i className="fa-regular fa-face-meh me-2 text-prim-dark h5" />
                  <div className="spac-2 text-prim-dark h6">尚無課程內容</div>
                </div>
              </div>
            </div>
            {/* 我的課程 underline end */}
            {/* 我的課程 online start */}
            <div className="col-6 course-mycourse d-flex flex-column px-10px">
              <div className="row course-card-header d-flex align-items-center">
                <a
                  href="/"
                  className="col-12 col-md-auto h4 pe-2 spac-2 m-0 mb-1 d-flex justify-content-between align-items-center"
                >
                  <strong>我的課程</strong>
                  <div
                    className="d-flex d-md-none ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark align-items-center justify-content-center"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <i
                      className="fa-solid fa-chevron-right text-sec-orange"
                      style={{ fontSize: '9px' }}
                    />
                  </div>
                </a>
                <span className="d-none d-md-block col-auto text-gray spac-1 p-0 mb-1">
                  ｜
                </span>
                <span className="col-auto text-gray spac-1 p-0 mb-1 h7">
                  正在學習中的課程內容
                </span>
              </div>
              <div className="row h-100 course-body d-flex align-items-start">
                <a
                  className="course-leftcontent col-12 col-md-8 p-0"
                  type="button"
                  href="/"
                >
                  <div className="course-video-video overflow-hidden position-relative">
                    <img
                      className="course-img21"
                      src="/images/course_and_tarot/rectangle128.png"
                      alt=""
                    />
                    <div className="d-flex d-md-none justify-content-center align-items-center w-100 h-100 absolute-t0-l0">
                      <p className="text-white z-1 fw-thin spac-1 px-2 text-center">
                        迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                      </p>
                      <div className="opacity-50 w-100 h-100 bg-text-dark color-cover position-absolute" />
                    </div>
                  </div>
                  <div className="course-body d-none d-md-block">
                    <span className="online-tag">線上</span>
                    <span className="h5 spac-1" style={{ lineHeight: '35px' }}>
                      迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                    </span>
                  </div>
                </a>
                <a
                  className="course-more col h-100 ms-3 d-none d-md-flex justify-content-center align-items-center"
                  href="/"
                >
                  <div className="spac-2 text-prim-dark h6">查看更多</div>
                  <div
                    className="ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark d-flex align-items-center justify-content-center"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <i
                      className="fa-solid fa-chevron-right text-sec-orange"
                      style={{ fontSize: '9px' }}
                    />
                  </div>
                </a>
                <div className="course-no-content col h-100 d-flex flex-column flex-md-row row-gap-3 justify-content-center align-items-center d-none">
                  <i className="fa-regular fa-face-meh me-2 text-prim-dark h5" />
                  <div className="spac-2 text-prim-dark h6">尚無課程內容</div>
                </div>
              </div>
            </div>
            {/* 我的課程 online end */}
            {/* 我的課程 end */}
            {/* 收藏課程 start */}
            {/* 我的課程 underline start */}
            <div className="col-6 course-myfavorite-course d-flex flex-column px-10px d-none">
              <div className="row course-card-header d-flex align-items-center">
                <a
                  href="/"
                  className="col-12 col-md-auto h4 pe-2 spac-2 m-0 mb-1 d-flex justify-content-between align-items-center"
                >
                  <strong>我的課程</strong>
                  <div
                    className="d-flex d-md-none ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark align-items-center justify-content-center"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <i
                      className="fa-solid fa-chevron-right text-sec-orange"
                      style={{ fontSize: '9px' }}
                    />
                  </div>
                </a>
                <span className="d-none d-md-block col-auto text-gray spac-1 p-0 mb-1">
                  ｜
                </span>
                <span className="col-auto text-gray spac-1 p-0 mb-1 h7">
                  正在學習中的課程內容
                </span>
              </div>
              <div className="row h-100 course-body d-flex align-items-start">
                <a
                  className="course-leftcontent col-12 col-md-8 p-0"
                  type="button"
                  href="/"
                >
                  <div className="course-video-video overflow-hidden position-relative">
                    <img
                      className="course-img21"
                      src="/images/course_and_tarot/rectangle128.png"
                      alt=""
                    />
                    <div className="d-flex d-md-none justify-content-center align-items-center w-100 h-100 absolute-t0-l0">
                      <p className="text-white z-1 fw-thin spac-1 px-2 text-center">
                        迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                      </p>
                      <div className="opacity-50 w-100 h-100 bg-text-dark color-cover position-absolute" />
                    </div>
                  </div>
                  <div className="course-body d-none d-md-block">
                    <span className="underline-tag">實體</span>
                    <span className="h5 spac-1" style={{ lineHeight: '35px' }}>
                      迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                    </span>
                    <div
                      className="progress mt-2 bg-sec-blue"
                      role="progressbar"
                      aria-label=""
                      aria-valuenow={75}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ height: '5px' }}
                    >
                      <div
                        className="progress-bar bg-sec-blue-dark"
                        style={{ width: "70%" }}
                      />
                    </div>
                  </div>
                </a>
                <a
                  className="course-more col h-100 ms-3 d-none d-md-flex justify-content-center align-items-center"
                  href="/"
                >
                  <div className="spac-2 text-prim-dark h6">查看更多</div>
                  <div
                    className="ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark d-flex align-items-center justify-content-center"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <i
                      className="fa-solid fa-chevron-right text-sec-orange"
                      style={{ fontSize: '9px' }}
                    />
                  </div>
                </a>
                <div className="course-no-content col h-100 d-flex flex-column flex-md-row row-gap-3 justify-content-center align-items-center d-none">
                  <i className="fa-regular fa-face-meh me-2 text-prim-dark h5" />
                  <div className="spac-2 text-prim-dark h6">尚無課程內容</div>
                </div>
              </div>
            </div>
            {/* 我的課程 underline end */}
            {/* 我的課程 online start */}
            <div className="col-6 course-myfavorite-course d-flex flex-column px-10px">
              <div className="row course-card-header d-flex align-items-center">
                <a
                  href="/"
                  className="col-12 col-md-auto h4 pe-2 spac-2 m-0 mb-1 d-flex justify-content-between align-items-center"
                >
                  <strong>我的課程</strong>
                  <div
                    className="d-flex d-md-none ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark align-items-center justify-content-center"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <i
                      className="fa-solid fa-chevron-right text-sec-orange"
                      style={{ fontSize: '9px' }}
                    />
                  </div>
                </a>
                <span className="d-none d-md-block col-auto text-gray spac-1 p-0 mb-1">
                  ｜
                </span>
                <span className="col-auto text-gray spac-1 p-0 mb-1 h7">
                  正在學習中的課程內容
                </span>
              </div>
              <div className="row h-100 course-body d-flex align-items-start">
                <a
                  className="course-leftcontent col-12 col-md-8 p-0"
                  type="button"
                  href="/"
                >
                  <div className="course-video-video overflow-hidden position-relative">
                    <img
                      className="course-img21"
                      src="/images/course_and_tarot/rectangle128.png"
                      alt=""
                    />
                    <div className="d-flex d-md-none justify-content-center align-items-center w-100 h-100 absolute-t0-l0">
                      <p className="text-white z-1 fw-thin spac-1 px-2 text-center">
                        迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                      </p>
                      <div className="opacity-50 w-100 h-100 bg-text-dark color-cover position-absolute" />
                    </div>
                  </div>
                  <div className="course-body d-none d-md-block">
                    <span className="online-tag">線上</span>
                    <span className="h5 spac-1" style={{ lineHeight: '35px' }}>
                      迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                    </span>
                  </div>
                </a>
                <a
                  className="course-more col h-100 ms-3 d-none d-md-flex justify-content-center align-items-center"
                  href="/"
                >
                  <div className="spac-2 text-prim-dark h6">查看更多</div>
                  <div
                    className="ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark d-flex align-items-center justify-content-center"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <i
                      className="fa-solid fa-chevron-right text-sec-orange"
                      style={{ fontSize: '9px' }}
                    />
                  </div>
                </a>
                <div className="course-no-content col h-100 d-flex flex-column flex-md-row row-gap-3 justify-content-center align-items-center d-none">
                  <i className="fa-regular fa-face-meh me-2 text-prim-dark h5" />
                  <div className="spac-2 text-prim-dark h6">尚無課程內容</div>
                </div>
              </div>
            </div>
            {/* 我的課程 online end */}
            {/* 收藏課程 end */}
          </div>
        </div>
      </div>
      {/* page one 我的課程&收藏課程 end */}
      {/* page one 推薦課程 start */}
      <div className="container-fluid p-0">
        <div className="container-sm p-0 mb-5">
          <div className="row px-10px justify-content-center">
            <div className="col-auto col-md-12 course-card-header d-flex align-items-center">
              <span className="col-auto h4 pe-2 spac-2 m-0">
                <strong>推薦課程</strong>
              </span>
              <span className="col-auto text-gray spac-1">
                ｜&nbsp;推薦您可能感興趣的課程
              </span>
            </div>
          </div>
          <div className="row course-mycourse-box row-gap-5">
            {/* card-sm online start */}
            <a
              href="/"
              className="col-12 col-md-4 col-lg-3 course-mycourse px-10px d-flex flex-column align-items-center"
            >
              <div className="row flex-row flex-md-column">
                <div className="col-4 col-md-12 p-0">
                  <div className="course-video-video overflow-hidden">
                    <img
                      className="course-img21"
                      src="/images/course_and_tarot/rectangle128.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="card-md-body col-8 col-md-12">
                  <div className="course-body-header p-0">
                    <span className="online-tag d-none d-md-inline-block">
                      線上
                    </span>
                    <span
                      className="h5 spac-1 text-justify"
                      style={{ lineHeight: '35px' }}
                    >
                      迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                    </span>
                    <p className="text-gray mt-2 d-none d-md-block">by 王淇</p>
                    <div className="sm-card-secondLine d-flex d-md-none justify-content-between mt-2">
                      <span className="sm-card-secondLine-left">
                        <span className="online-tag">線上</span>
                        <span className="text-gray">by 王淇</span>
                      </span>
                      <span className="sm-card-secondLine-right">
                        <i className="fa-solid fa-star fa-star-style" />
                        <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                          4.8
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="course-body-footer d-none d-md-block">
                    <div className="stars mt-2 d-flex align-items-center">
                      <i className="fa-solid fa-star fa-star-style" />
                      <i className="fa-solid fa-star fa-star-style" />
                      <i className="fa-solid fa-star fa-star-style" />
                      <i className="fa-solid fa-star fa-star-style" />
                      <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                        4.8
                      </span>
                    </div>
                    <div className="location mt-2 d-flex align-items-center d-none">
                      <i className="fa-solid fa-location-dot text-sec-dark-blue" />
                      <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                        上課縣市-台北市
                      </span>
                    </div>
                    <div className="course-process-footer mt-2">
                      <span className="h5 spac-2 me-3">NT$3,500</span>
                      <span className="h6 text-gray spac-2 origin-price">
                        <del>NT$5,500</del>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row w-100">
                <div className="col-12 course-process-header d-flex justify-content-between mt-3 p-0">
                  <span className="h6 text-sec-blue spac-1">
                    課程時長-5小時
                  </span>
                  <span className="h6 text-sec-blue spac-1 d-none">
                    已完成70%
                  </span>
                </div>
                <div
                  className="progress mt-2 bg-sec-blue p-0 d-none"
                  role="progressbar"
                  aria-label=""
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ height: '5px' }}
                >
                  <div
                    className="progress-bar bg-sec-blue-dark"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </a>
            {/* card-sm online end */}
            {/* card-sm underline start */}
            <a
              href="/"
              className="col-12 col-md-4 col-lg-3 course-mycourse px-10px d-flex flex-column align-items-center"
            >
              <div className="row flex-row flex-md-column">
                <div className="col-4 col-md-12 p-0">
                  <div className="course-video-video overflow-hidden">
                    <img
                      className="course-img21"
                      src="/images/course_and_tarot/rectangle128.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="card-md-body col-8 col-md-12">
                  <div className="course-body-header p-0">
                    <span className="underline-tag d-none d-md-inline-block">
                      實體
                    </span>
                    <span
                      className="h5 spac-1 text-justify"
                      style={{ lineHeight: '35px' }}
                    >
                      迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                    </span>
                    <p className="text-gray mt-2 d-none d-md-block">by 王淇</p>
                    <div className="sm-card-secondLine d-flex d-md-none justify-content-between mt-2">
                      <span className="sm-card-secondLine-left">
                        <span className="underline-tag">實體</span>
                        <span className="text-gray">by 王淇</span>
                      </span>
                      <span className="sm-card-secondLine-right">
                        <i className="fa-solid fa-star fa-star-style" />
                        <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                          4.8
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="course-body-footer d-none d-md-block">
                    <div className="location mt-2 d-flex align-items-center">
                      <i className="fa-solid fa-location-dot text-sec-dark-blue" />
                      <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                        上課縣市-台北市
                      </span>
                    </div>
                    <div className="course-process-footer mt-2">
                      <span className="h5 spac-2 me-3">NT$3,500</span>
                      <span className="h6 text-gray spac-2 origin-price">
                        <del>NT$5,500</del>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row w-100">
                <div className="col-12 course-process-header d-flex justify-content-between mt-3 p-0">
                  <span className="h6 text-sec-blue spac-1">限額總數-20人</span>
                  <span className="h6 text-sec-blue spac-1">70%</span>
                </div>
                <div
                  className="progress mt-2 bg-sec-blue p-0"
                  role="progressbar"
                  aria-label=""
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ height: '5px' }}
                >
                  <div
                    className="progress-bar bg-sec-blue-dark"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </a>
            {/* card-sm underline end */}
          </div>
        </div>
      </div>
      {/* page one 推薦課程 end */}
    </div>
    {/* first page end */}
    {/* page two 我的課程&我的收藏 start */}
    <div className="container-fluid p-0 d-none">
      <div className="container-sm p-0 my-5">
        <div className="px-10px">
          <div className="row justify-content-center justify-content-md-start course-card-header-page2 align-items-center">
            <span className="col-auto h4 pe-2 spac-2 m-0">
              <strong>我的課程//我的收藏</strong>
            </span>
            <span className="col-auto text-gray spac-1">
              ｜&nbsp;正在學習中的課程內容
            </span>
          </div>
          <div className="row mb-5 gap-2 justify-content-center justify-content-md-start">
            <a
              href="/"
              type="button"
              className="btn-light-to-prim btn py-1 px-3 spac-1"
            >
              全部
            </a>
            <a
              href="/"
              type="button"
              className="btn-light-to-prim btn py-1 px-3 spac-1"
            >
              線上
            </a>
            <a
              href="/"
              type="button"
              className="btn-light-to-prim btn py-1 px-3 spac-1"
            >
              實體
            </a>
          </div>
        </div>
        <div className="row course-mycourse-box row-gap-5">
          {/* 課程卡片 start */}
          {/* card-sm online start */}
          <a
            href="/"
            className="col-12 col-md-4 col-lg-3 course-mycourse px-10px d-flex flex-column align-items-center"
          >
            <div className="row flex-row flex-md-column">
              <div className="col-4 col-md-12 p-0">
                <div className="course-video-video overflow-hidden">
                  <img
                    className="course-img21"
                    src="/images/course_and_tarot/rectangle128.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="card-md-body col-8 col-md-12">
                <div className="course-body-header p-0">
                  <span className="online-tag d-none d-md-inline-block">
                    線上
                  </span>
                  <span
                    className="h5 spac-1 text-justify"
                    style={{ lineHeight: '35px' }}
                  >
                    迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                  </span>
                  <p className="text-gray mt-2 d-none d-md-block">by 王淇</p>
                  <div className="sm-card-secondLine d-flex d-md-none justify-content-between mt-2">
                    <span className="sm-card-secondLine-left">
                      <span className="online-tag">線上</span>
                      <span className="text-gray">by 王淇</span>
                    </span>
                    <span className="sm-card-secondLine-right">
                      <i className="fa-solid fa-star fa-star-style" />
                      <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                        4.8
                      </span>
                    </span>
                  </div>
                </div>
                <div className="course-body-footer d-none d-md-block">
                  <div className="stars mt-2 d-flex align-items-center">
                    <i className="fa-solid fa-star fa-star-style" />
                    <i className="fa-solid fa-star fa-star-style" />
                    <i className="fa-solid fa-star fa-star-style" />
                    <i className="fa-solid fa-star fa-star-style" />
                    <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                      4.8
                    </span>
                  </div>
                  <div className="location mt-2 d-flex align-items-center d-none">
                    <i className="fa-solid fa-location-dot text-sec-dark-blue" />
                    <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                      上課縣市-台北市
                    </span>
                  </div>
                  <div className="course-process-footer mt-2">
                    <span className="h5 spac-2 me-3">NT$3,500</span>
                    <span className="h6 text-gray spac-2 origin-price">
                      <del>NT$5,500</del>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row w-100">
              <div className="col-12 course-process-header d-flex justify-content-between mt-3 p-0">
                <span className="h6 text-sec-blue spac-1">課程時長-5小時</span>
                <span className="h6 text-sec-blue spac-1 d-none">
                  已完成70%
                </span>
              </div>
              <div
                className="progress mt-2 bg-sec-blue p-0 d-none"
                role="progressbar"
                aria-label=""
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ height: '5px' }}
              >
                <div
                  className="progress-bar bg-sec-blue-dark"
                  style={{ width: "70%" }}
                />
              </div>
            </div>
          </a>
          {/* card-sm online end */}
          {/* card-sm underline start */}
          <a
            href=""
            className="col-12 col-md-4 col-lg-3 course-mycourse px-10px d-flex flex-column align-items-center"
          >
            <div className="row flex-row flex-md-column">
              <div className="col-4 col-md-12 p-0">
                <div className="course-video-video overflow-hidden">
                  <img
                    className="course-img21"
                    src="/images/course_and_tarot/rectangle128.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="card-md-body col-8 col-md-12">
                <div className="course-body-header p-0">
                  <span className="underline-tag d-none d-md-inline-block">
                    實體
                  </span>
                  <span
                    className="h5 spac-1 text-justify"
                    style={{ lineHeight: '35px' }}
                  >
                    迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                  </span>
                  <p className="text-gray mt-2 d-none d-md-block">by 王淇</p>
                  <div className="sm-card-secondLine d-flex d-md-none justify-content-between mt-2">
                    <span className="sm-card-secondLine-left">
                      <span className="underline-tag">實體</span>
                      <span className="text-gray">by 王淇</span>
                    </span>
                    <span className="sm-card-secondLine-right">
                      <i className="fa-solid fa-star fa-star-style" />
                      <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                        4.8
                      </span>
                    </span>
                  </div>
                </div>
                <div className="course-body-footer d-none d-md-block">
                  <div className="location mt-2 d-flex align-items-center">
                    <i className="fa-solid fa-location-dot text-sec-dark-blue" />
                    <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                      上課縣市-台北市
                    </span>
                  </div>
                  <div className="course-process-footer mt-2">
                    <span className="h5 spac-2 me-3">NT$3,500</span>
                    <span className="h6 text-gray spac-2 origin-price">
                      <del>NT$5,500</del>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row w-100">
              <div className="col-12 course-process-header d-flex justify-content-between mt-3 p-0">
                <span className="h6 text-sec-blue spac-1">限額總數-20人</span>
                <span className="h6 text-sec-blue spac-1">70%</span>
              </div>
              <div
                className="progress mt-2 bg-sec-blue p-0"
                role="progressbar"
                aria-label=""
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ height: '5px' }}
              >
                <div
                  className="progress-bar bg-sec-blue-dark"
                  style={{ width: "70%" }}
                />
              </div>
            </div>
          </a>
          {/* card-sm underline end */}
          {/* 課程卡片 end */}
        </div>
      </div>
    </div>
    {/* page two 我的課程&我的收藏 end */}
    {/* page three course-detail start */}
    <div className="container-fluid p-0 m-0 d-none">
      <div className="container-fluid p-0">
        <div className="container-sm p-0">
          <div className="row pt-5 mb-4 d-none d-md-flex">
            <div className="col px-10px">
              <span className="online-tag me-4 h6">線上</span>
              <span className="text-prim-dark spac-1 me-5 h6">
                迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
              </span>
              <span className="text-prim-dark spac-1 h6">
                <i className="bi bi-clock-history me-2" />
                半年前
              </span>
            </div>
          </div>
          {/* course-detail md 寬度時顯示 start */}
          <div className="container-fluid p-0 d-none d-md-block">
            <div
              className="row md-screen-show d-none d-md-flex"
              style={{ paddingBottom: '280px' }}
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
                    <div className="progress-bar-area">
                      <div className="course-process-header d-flex justify-content-between mt-4">
                        <span className="h6 text-sec-dark-blue spac-1">
                          課程時長-5小時
                        </span>
                        <span className="h6 text-sec-dark-blue spac-1">
                          已完成0%
                        </span>
                      </div>
                      <div
                        className="progress mt-3 bg-sec-blue"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: '5px' }}
                      >
                        <div
                          className="progress-bar bg-sec-blue-dark"
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="course-body-2 col px-10px ms-3 h-100">
                <h2 className="spac-2 lh-15 text-prim-text-prim">
                  <strong>
                    迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                  </strong>
                </h2>
                <div className="row align-items-center mt-3 justify-content-between">
                  <h5 className="col-auto text-prim-text-prim spac-1">
                    by 蔡孝倫
                  </h5>
                  <div className="col-auto stars mt-2 d-flex align-items-center">
                    <i className="fa-solid fa-star fa-star-style" />
                    <i className="fa-solid fa-star fa-star-style" />
                    <i className="fa-solid fa-star fa-star-style" />
                    <i className="fa-solid fa-star fa-star-style" />
                    <i className="fa-solid fa-star fa-star-style" />
                    <span className="ms-2 spac-1 text-sec-dark-blue">4.8</span>
                  </div>
                </div>
                <div className="row mt-5 justify-content-between align-items-start">
                  <div className="col-auto">
                    <div className="h2 spac-2 text-sec-orange">
                      <strong>NT$3,500</strong>
                    </div>
                    <p className="text-gray h5 spac-2 mt-3">
                      <del>NT$5,500</del>
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
              className="container-fluid p-0 position-relative d-none d-md-block"
              style={{ marginBlock: "-200px" }}
            >
              <div className="container-sm p-0">
                <div className="container-fluid bg-light-gray rounded-5 w-100 shadow">
                  <div className="container-sm p-0 teacher-intro-card">
                    <div className="row p-2 p-md-4 mx-2 align-items-center justify-content-center">
                      <a className="teacher-head col-auto me-3 p-0" href="/">
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
                                蔡孝倫
                              </h2>
                            </a>
                            <a href="">
                              <h5 className="spac-2 text-prim-dark lh-15">
                                Alex Tsai
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
                          原本從事生化研究，但在就讀英國萊斯特大學生化所博士班期間，發現自己興趣並不在做研究而放棄學位。在餐廳打工時發現自己對葡萄酒的興趣與服務的熱情，決定學習葡萄酒與西方飲食文化，並在倫敦通過WSET
                          Level 1 和 WSET Level 2認證後，正式從事侍酒師的工作。
                          回到台灣後，先在酒商任職，觀察並了解台灣的葡萄酒市場生態與消費者行為，之後任職於法式餐廳、本土五星級飯店與國際六星級飯店擔任侍酒師與管理工作。期間仍積極參與各項品酒講座與教學，並陸續通過國際專業葡萄酒課程認證。專長是餐酒搭配、葡萄酒教學與侍酒師教育訓練。現為台北文華東方酒店義大利廳副理。
                          經歷： 長榮桂冠酒坊 門市銷售 (Nov/2009-May/2011)
                          品爵生活法式小館 侍酒師 (Jun/2011-Sep/2012)
                          維多麗亞酒店 餐飲部副理兼首席侍酒師(Apr/2013-Jul/2014)
                          台北文華東方酒店 餐飲部Bencotto義大利餐廳副理(Jul/2014
                          to date) 專業認證： 英國WSET (Wine and Spirit
                          Education Trust葡萄酒與烈酒教育基金會) Level 1 初級,
                          Level 2 中級(2009) 與Level 3高級(2013) 品酒師認證
                          西班牙葡萄酒學院(The Wine Academy of Spain)
                          認證講師(2011) 國際侍酒師公會(ISG) Level 1 初級與
                          Level 2 高級(2012) 侍酒師認證
                          法國布根地葡萄酒公會BIVB(Bureau Interprofessionnel des
                          Vins de Bourgogne) 專家認證(2013): Honour of Burgundy
                          Wine Connoisseur Certificate 比賽經歷：
                          TSA台灣最佳侍酒師比賽決賽入圍(Sep. 2012) Sopexa
                          台灣最佳法國侍酒師競賽亞軍(Jul. 2015) Sopexa
                          亞洲最佳法國侍酒師比賽台灣代表, 準決賽入圍(Dec 2015)
                          媒體專訪： 好吃 雜誌 Vol.11, Winter 2013, page 68-69
                          Wine Spectator Restaurant Award of Excellence, Issue
                          Aug. 2014, page 155 玩高爾夫雜誌One Golf, Issue 45,
                          Oct. 2014 page 86-87 The Drink Business: Taipei’s Top
                          Sommeliers, 16th February, 2016 by Lucy Jenkins
                        </h5>
                      </div>
                      <div className="teacher-starts col d-flex flex-column align-items-center justify-content-center pe-0">
                        <h1 className="spac-2">4.8</h1>
                        <i
                          className="fa-solid fa-star fa-star-style"
                          style={{ fontSize: '3.125rem', marginBlock: '15px' }}
                        />
                        <p>教師平均評分</p>
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
            <div className="col-12 d-flex flex-column align-items-center p-0">
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
                <strong>迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解</strong>
              </h1>
              <div className="row align-items-center mt-3 justify-content-between">
                <h5 className="col-auto text-prim-text-prim spac-1">
                  by 蔡孝倫
                </h5>
                <div className="col-auto stars mt-2 d-flex align-items-center">
                  <i className="fa-solid fa-star fa-star-style" />
                  <i className="fa-solid fa-star fa-star-style" />
                  <i className="fa-solid fa-star fa-star-style" />
                  <i className="fa-solid fa-star fa-star-style" />
                  <i className="fa-solid fa-star fa-star-style" />
                  <span className="ms-2 spac-1 text-sec-dark-blue">4.8</span>
                </div>
              </div>
              <div className="row justify-content-between align-items-center mt-4">
                <span className="col-auto online-tag me-4 h6">線上</span>
                <span className="col-auto h6">
                  <span className="p text-gray h5 spac-2 mt-3 me-4">
                    <del>NT$5,500</del>
                  </span>
                  <span className="h2 spac-2 text-sec-orange">
                    <strong>NT$3,500</strong>
                  </span>
                </span>
              </div>
              <div className="progress-bar-area mb-5">
                <div className="course-process-header d-flex justify-content-between mt-4">
                  <span className="h6 text-sec-dark-blue spac-1">
                    限額總數-50人
                  </span>
                  <span className="h6 text-sec-dark-blue spac-1">0%</span>
                </div>
                <div
                  className="progress mt-3 bg-sec-blue"
                  role="progressbar"
                  aria-label=""
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ height: '8px' }}
                >
                  <div
                    className="progress-bar bg-sec-blue-dark"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
              <div className="row teacher-sm-introduce my-5">
                <a className="teacher-head col-auto p-0" href="/">
                  <img
                    src="/images/course_and_tarot/Ellipse 8.png"
                    alt=""
                  />
                </a>
                <div className="teacher-text-box col px-4">
                  <div>
                    <span className="h3 spac-2 text-prim-dark lh-15">
                      蔡孝倫
                    </span>
                    <span className="h6 spac-2 text-prim-dark lh-15">
                      Alex Tsai
                    </span>
                    <i className="fa-solid fa-chevron-right text-prim-dark mt-1" />
                  </div>
                  <hr className="my-4" />
                  <p className="spac-1 text-prim-dark lh-15 text-justify teacher-intro-card-text">
                    原本從事生化研究，但在就讀英國萊斯特大學生化所博士班期間，發現自己興趣並不在做研究而放棄學位。在餐廳打工時發現自己對葡萄酒的興趣與服務的熱情，決定學習葡萄酒與西方飲食文化，並在倫敦通過WSET
                    Level 1 和 WSET Level 2認證後，正式從事侍酒師的工作。
                    回到台灣後，先在酒商任職，觀察並了解台灣的葡萄酒市場生態與消費者行為，之後任職於法式餐廳、本土五星級飯店與國際六星級飯店擔任侍酒師與管理工作。期間仍積極參與各項品酒講座與教學，並陸續通過國際專業葡萄酒課程認證。專長是餐酒搭配、葡萄酒教學與侍酒師教育訓練。現為台北文華東方酒店義大利廳副理。
                    經歷： 長榮桂冠酒坊 門市銷售 (Nov/2009-May/2011)
                    品爵生活法式小館 侍酒師 (Jun/2011-Sep/2012) 維多麗亞酒店
                    餐飲部副理兼首席侍酒師(Apr/2013-Jul/2014) 台北文華東方酒店
                    餐飲部Bencotto義大利餐廳副理(Jul/2014 to date) 專業認證：
                    英國WSET (Wine and Spirit Education
                    Trust葡萄酒與烈酒教育基金會) Level 1 初級, Level 2
                    中級(2009) 與Level 3高級(2013) 品酒師認證
                    西班牙葡萄酒學院(The Wine Academy of Spain) 認證講師(2011)
                    國際侍酒師公會(ISG) Level 1 初級與 Level 2 高級(2012)
                    侍酒師認證 法國布根地葡萄酒公會BIVB(Bureau
                    Interprofessionnel des Vins de Bourgogne) 專家認證(2013):
                    Honour of Burgundy Wine Connoisseur Certificate 比賽經歷：
                    TSA台灣最佳侍酒師比賽決賽入圍(Sep. 2012) Sopexa
                    台灣最佳法國侍酒師競賽亞軍(Jul. 2015) Sopexa
                    亞洲最佳法國侍酒師比賽台灣代表, 準決賽入圍(Dec 2015)
                    媒體專訪： 好吃 雜誌 Vol.11, Winter 2013, page 68-69 Wine
                    Spectator Restaurant Award of Excellence, Issue Aug. 2014,
                    page 155 玩高爾夫雜誌One Golf, Issue 45, Oct. 2014 page
                    86-87 The Drink Business: Taipei’s Top Sommeliers, 16th
                    February, 2016 by Lucy Jenkins
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
        <div className="container-sm p-0 d-flex flex-column align-items-center">
          <div className="course-detail-content-text-widthControl">
            <div className="d-flex justify-content-center justify-content-md-start align-items-center">
              <i className="fa-solid fa-square me-3 d-inline-block d-md-none" />
              <span className="h4 text-prim-dark lh-15 spac-2">
                <strong>課程內容</strong>
              </span>
              <i className="fa-solid fa-square ms-3 d-inline-block d-md-none" />
            </div>
            <br />
            <h5 className="text-prim-dark lh-15 spac-2">
              將葡萄酒知識應用在商務應酬或社交場合想更了解葡萄酒並進一步學習如何品飲想透過學習餐酒搭配、品酒禮儀提升生活品味學習依據場合購買適合的葡萄酒
            </h5>
            <br />
            <br />
            <br />
            <h5 className="text-prim-dark lh-25 spac-2">
              <strong>* 葡萄酒釀造與風格探索</strong>
              <br />
              1-1 了解釀造的魔法，認識各式葡萄酒的差異
              <br />
              1-2 品飲葡萄酒的前置作業（開瓶、溫度、選酒杯）
              <br />
              1-3 認識葡萄酒的關鍵字！酸度、單寧怎麼形容？
              <br />
              1-4 品飲市面上的葡萄酒嚐出風味大方向-上
              <br />
              1-5 品飲市面上的葡萄酒嚐出風味大方向-下
              <br />
              1-6 辨別葡萄酒的好壞！有這些味道不要喝
              <br />
              <strong>* 生活場景認識葡萄酒</strong>
              <br />
              2-1 如何在餐廳點酒？了解產區與價格
              <br />
              2-2 葡萄酒搭餐小撇步！不是只能紅酒配紅肉
              <br />
              2-3 約會禮儀要注意，晃杯子到底行不行
              <br />
              2-4 喝不完怎麼辦？保存佳釀看這裡
              <br />
              <strong>* 葡萄酒採購指南</strong>
              <br />
              3-1 看懂酒標不困難！避免被行銷話術迷惑
              <br />
              3-2 解讀選酒 App 與各大評鑑指標
              <br />
              3-3 不同場合怎麼買酒？送禮要注意什麼嗎？
              <br />
              3-4 與客戶聊葡萄酒！認識五大酒莊及特殊酒款
              <br />
              <strong>* 深入瞭解葡萄酒知識</strong>
              <br />
              4-1 認識常見葡萄品種與風味基調
              <br />
              4-2 進一步認識產區與風味，規劃一場酒莊旅行
              <br />
              4-3 葡萄酒的未來趨勢？要怎麼更進一步學習甚至投資？
              <br />
              4-4 葡萄酒的分級制度！各地區不一樣怎麼分辨
            </h5>
          </div>
        </div>
      </div>
      {/* course detail 評論 start */}
      <div className="container-fluid"></div>
      {/* course detail 評論 end */}
    </div>
    {/* page three course-detail end */}
    {/* page four teacher-detail start */}
    <div className="fourth-page-wrap">
      <header></header>
      <div className="container-fluid p-0 teacher-detail-banner rounded-bottom-5 overflow-hidden d-flex justify-content-center align-items-center pb-5">
        <div className="d-flex flex-column align-items-center gap-4">
          <a className="teacher-detail-head col-auto me-3 p-0" href="/">
            <img
              className="course-img21"
              src="/images/course_and_tarot/Ellipse 8.png"
              alt=""
            />
          </a>
          <div className="teacher-card-name d-flex flex-column align-items-center">
            <div className="display-6 spac-2 text-white lh-15">蔡孝倫</div>
            <h5 className="spac-2 text-white lh-15">Alex Tsai</h5>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 position-relative teacher-detail-contentBox-margin-minus-control">
        <div className="container-sm">
          <div className="teacher-detail-content-box w-100 rounded-5 m-auto">
            <h6 className="text-prim-dark spac-2 lh-20 teacher-intro-text mb-5">
              原本從事生化研究，但在就讀英國萊斯特大學生化所博士班期間，發現自己興趣並不在做研究而放棄學位。在餐廳打工時發現自己對葡萄酒的興趣與服務的熱情，決定學習葡萄酒與西方飲食文化，並在倫敦通過WSET
              Level 1 和 WSET Level 2認證後，正式從事侍酒師的工作。
            </h6>
            <h6 className="text-prim-dark spac-2 lh-20 teacher-intro-text mb-5">
              回到台灣後，先在酒商任職，觀察並了解台灣的葡萄酒市場生態與消費者行為，之後任職於法式餐廳、本土五星級飯店與國際六星級飯店擔任侍酒師與管理工作。期間仍積極參與各項品酒講座與教學，並陸續通過國際專業葡萄酒課程認證。專長是餐酒搭配、葡萄酒教學與侍酒師教育訓練。現為台北文華東方酒店義大利廳副理。
            </h6>
            <div className="h6 spac-2 lh-15 teacher-intro-text">
              <h6 className="mt-5 mb-4">經歷：</h6>
              <ul className="ps-4">
                <li>長榮桂冠酒坊 門市銷售 (Nov/2009-May/2011)</li>
                <li>品爵生活法式小館 侍酒師 (Jun/2011-Sep/2012)</li>
                <li>維多麗亞酒店 餐飲部副理兼首席侍酒師(Apr/2013-Jul/2014)</li>
                <li>
                  台北文華東方酒店 餐飲部Bencotto義大利餐廳副理(Jul/2014 to
                  date)
                </li>
              </ul>
              <h6 className="mt-5 mb-4">專業認證：</h6>
              <ul className="ps-4">
                <li>
                  英國WSET (Wine and Spirit Education
                  Trust葡萄酒與烈酒教育基金會) Level 1 初級, Level 2 中級(2009)
                  與Level 3高級(2013) 品酒師認證
                </li>
                <li>
                  西班牙葡萄酒學院(The Wine Academy of Spain) 認證講師(2011)
                </li>
                <li>
                  國際侍酒師公會(ISG) Level 1 初級與 Level 2 高級(2012)
                  侍酒師認證
                </li>
                <li>
                  法國布根地葡萄酒公會BIVB(Bureau Interprofessionnel des Vins de
                  Bourgogne) 專家認證(2013): Honour of Burgundy Wine Connoisseur
                </li>
                <li>Certificate</li>
              </ul>
              <h6 className="mt-5 mb-4">比賽經歷：</h6>
              <ul className="ps-4">
                <li>TSA台灣最佳侍酒師比賽決賽入圍(Sep. 2012)</li>
                <li>Sopexa 台灣最佳法國侍酒師競賽亞軍(Jul. 2015)</li>
                <li>
                  Sopexa 亞洲最佳法國侍酒師比賽台灣代表, 準決賽入圍(Dec 2015)
                </li>
              </ul>
              <h6 className="mt-5 mb-4">媒體專訪：</h6>
              <ul className="ps-4">
                <li>好吃 雜誌 Vol.11, Winter 2013, page 68-69</li>
                <li>
                  Wine Spectator Restaurant Award of Excellence, Issue Aug.
                  2014, page 155
                </li>
                <li>玩高爾夫雜誌One Golf, Issue 45, Oct. 2014 page 86-87</li>
                <li>
                  The Drink Business: Taipei’s Top Sommeliers, 16th February,
                  2016 by Lucy Jenkins
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid my-5 p-0">
          <div className="container-sm">
            <div className="w-100 bg-white rounded-5 m-auto teacher-detail-suggest-course">
              {/* 講師其他課程 start */}
              <div className="my-5 border-5">
                <div className="col-auto h3 pe-2 spac-2 m-0 text-prim-text-prim px-10px mb-5 text-center text-md-start">
                  <strong>教師相關課程</strong>
                </div>
                <div className="row course-mycourse-box row-gap-5">
                  {/* teacher-detail-suggest 課程卡片 start */}
                  {/* card-sm online start */}
                  <a
                    href="/"
                    className="col-12 col-md-4 col-lg-3 course-mycourse px-10px d-flex flex-column align-items-center"
                  >
                    <div className="row flex-row flex-md-column">
                      <div className="col-4 col-md-12 p-0">
                        <div className="course-video-video overflow-hidden">
                          <img
                            className="course-img21"
                            src="/images/course_and_tarot/rectangle128.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="card-md-body col-8 col-md-12">
                        <div className="course-body-header p-0">
                          <span className="online-tag d-none d-md-inline-block">
                            線上
                          </span>
                          <span
                            className="h5 spac-1 text-justify"
                            style={{ lineHeight: '35px' }}
                          >
                            迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                          </span>
                          <p className="text-gray mt-2 d-none d-md-block">
                            by 王淇
                          </p>
                          <div className="sm-card-secondLine d-flex d-md-none justify-content-between mt-2">
                            <span className="sm-card-secondLine-left">
                              <span className="online-tag">線上</span>
                              <span className="text-gray">by 王淇</span>
                            </span>
                            <span className="sm-card-secondLine-right">
                              <i className="fa-solid fa-star fa-star-style" />
                              <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                                4.8
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="course-body-footer d-none d-md-block">
                          <div className="stars mt-2 d-flex align-items-center">
                            <i className="fa-solid fa-star fa-star-style" />
                            <i className="fa-solid fa-star fa-star-style" />
                            <i className="fa-solid fa-star fa-star-style" />
                            <i className="fa-solid fa-star fa-star-style" />
                            <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                              4.8
                            </span>
                          </div>
                          <div className="location mt-2 d-flex align-items-center d-none">
                            <i className="fa-solid fa-location-dot text-sec-dark-blue" />
                            <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                              上課縣市-台北市
                            </span>
                          </div>
                          <div className="course-process-footer mt-2">
                            <span className="h5 spac-2 me-3">NT$3,500</span>
                            <span className="h6 text-gray spac-2 origin-price">
                              <del>NT$5,500</del>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-12 course-process-header d-flex justify-content-between mt-3 p-0">
                        <span className="h6 text-sec-blue spac-1">
                          課程時長-5小時
                        </span>
                        <span className="h6 text-sec-blue spac-1 d-none">
                          已完成70%
                        </span>
                      </div>
                      <div
                        className="progress mt-2 bg-sec-blue p-0 d-none"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: '5px' }}
                      >
                        <div
                          className="progress-bar bg-sec-blue-dark"
                          style={{ width: "70%" }}
                        />
                      </div>
                    </div>
                  </a>
                  {/* card-sm online end */}
                  {/* card-sm underline start */}
                  <a
                    href="/"
                    className="col-12 col-md-4 col-lg-3 course-mycourse px-10px d-flex flex-column align-items-center"
                  >
                    <div className="row flex-row flex-md-column">
                      <div className="col-4 col-md-12 p-0">
                        <div className="course-video-video overflow-hidden">
                          <img
                            className="course-img21"
                            src="/images/course_and_tarot/rectangle128.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="card-md-body col-8 col-md-12">
                        <div className="course-body-header p-0">
                          <span className="underline-tag d-none d-md-inline-block">
                            實體
                          </span>
                          <span
                            className="h5 spac-1 text-justify"
                            style={{ lineHeight: '35px' }}
                          >
                            迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                          </span>
                          <p className="text-gray mt-2 d-none d-md-block">
                            by 王淇
                          </p>
                          <div className="sm-card-secondLine d-flex d-md-none justify-content-between mt-2">
                            <span className="sm-card-secondLine-left">
                              <span className="underline-tag">實體</span>
                              <span className="text-gray">by 王淇</span>
                            </span>
                            <span className="sm-card-secondLine-right">
                              <i className="fa-solid fa-star fa-star-style" />
                              <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                                4.8
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="course-body-footer d-none d-md-block">
                          <div className="location mt-2 d-flex align-items-center">
                            <i className="fa-solid fa-location-dot text-sec-dark-blue" />
                            <span className="ms-2 spac-1 text-sec-dark-blue emmit1">
                              上課縣市-台北市
                            </span>
                          </div>
                          <div className="course-process-footer mt-2">
                            <span className="h5 spac-2 me-3">NT$3,500</span>
                            <span className="h6 text-gray spac-2 origin-price">
                              <del>NT$5,500</del>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-12 course-process-header d-flex justify-content-between mt-3 p-0">
                        <span className="h6 text-sec-blue spac-1">
                          限額總數-20人
                        </span>
                        <span className="h6 text-sec-blue spac-1">70%</span>
                      </div>
                      <div
                        className="progress mt-2 bg-sec-blue p-0"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: '5px' }}
                      >
                        <div
                          className="progress-bar bg-sec-blue-dark"
                          style={{ width: "70%" }}
                        />
                      </div>
                    </div>
                  </a>
                  {/* card-sm underline end */}
                  {/* teacher-detail-suggest 課程卡片 end */}
                </div>
              </div>
            </div>
            {/* 講師其他課程 end */}
          </div>
        </div>
        <footer></footer>
      </div>
      {/* page four teacher-detail end */}
      {/* page-nav-bar start */}
      <div
        className="container-fluid p-0"
        style={{ height: '100px', backgroundColor: "pink" }}
      >
        <div className="container-sm p-0 pb-3">這邊放page-nav</div>
      </div>
      {/* page-nav-bar end */}
      <footer />
    </div>
    {/* Bootstrap JavaScript Libraries */}
  </div>
</>

  )
}
