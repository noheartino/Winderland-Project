import React,{ useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";

export default function CourseNav({setSearchWord}) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const router = useRouter();
    const onChangeInput= (e)=>{
        setSearchWord(e.target.value);
    }
  // 處理搜尋輸入
  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push({
        pathname: '/course',
        query: { search: searchTerm },
      });
    }
  };
  // 處理鍵盤事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    const tagText = e.target.textContent;
    if (tagText.trim()) {
      router.push({
        pathname: '/course',
        query: { search: tagText },
      });
    }
  };
  const handleClickSearchIcon = (e) => {
    e.preventDefault();
    searchInputRef.current.focus()
    const tagText = searchInputRef.current.value;
    console.log(e.target.value);
    if (tagText.trim()) {
      router.push({
        pathname: '/course',
        query: { search: tagText },
      });
    }
  };

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
              ref={searchInputRef}
              type="text"
              className="course-search-input form-control rounded-5"
              placeholder="搜尋關鍵字"
              aria-label="搜尋關鍵字"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass position-absolute course-search-icon" onClick={handleClickSearchIcon}></i>
            <i className="fa-solid fa-xmark position-absolute"></i>
          </div>
          <div className="row px-0 m-0 justify-content-center">
            <div className="col-11 col-md-6 d-flex justify-content-center flex-wrap">
              <a href="/" className="nav-tag" onClick={handleClick}>
                品酒
              </a>
              <a href="/" className="nav-tag" onClick={handleClick}>
                挑選酒
              </a>
              <a href="/" className="nav-tag" onClick={handleClick}>
                認證課程
              </a>
              <a href="/" className="nav-tag" onClick={handleClick}>
                法國
              </a>
              <a href="/" className="nav-tag" onClick={handleClick}>
                SFM
              </a>
              <a href="/" className="nav-tag" onClick={handleClick}>
                BWC布根地
              </a>
              <a href="/" className="nav-tag" onClick={handleClick}>
                CIVB波爾多葡萄酒學院
              </a>
              <a href="/" className="nav-tag d-none d-md-block" onClick={handleClick}>
                CIVA
              </a>
              <a href="/" className="nav-tag d-none d-md-block" onClick={handleClick}>
                阿爾薩斯
              </a>
              <a href="/" className="nav-tag d-none d-md-block" onClick={handleClick}>
                葡萄牙公會
              </a>
              <a href="/" className="nav-tag d-none d-md-block" onClick={handleClick}>
                葡萄酒學者認證
              </a>
              <a href="/" className="nav-tag d-none d-md-block" onClick={handleClick}>
                IWS
              </a>
            </div>
          </div>
        </div>
        {/* course-nav end */}
    </>
  )
}
