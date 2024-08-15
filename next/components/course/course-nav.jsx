import React from 'react'

export default function CourseNav({setSearchWord}) {
    const onChangeInput= (e)=>{
        setSearchWord(e.target.value);
    }
  return (
    <>
        {/* course-nav start */}
        <div className="container-fluid course-homepage-nav d-flex align-items-center gap-4 flex-column justify-content-center">
          <div className="nav-header d-flex align-items-center flex-column justify-content-center">
            <h4 className="text-white spac-3">品酒課程</h4>
            <p className="text-white spac-2">Course</p>
          </div>
          <div className="course-search-box-width position-relative">
            <input
              type="search"
              className="course-search-input form-control rounded-5"
              placeholder="搜尋關鍵字"
              aria-label="搜尋關鍵字"
              aria-describedby="basic-addon2"
              onChange={onChangeInput}
            />
            <i class="fa-solid fa-magnifying-glass position-absolute course-search-icon"></i>
          </div>
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
    </>
  )
}
