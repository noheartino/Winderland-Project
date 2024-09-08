import React,{ useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";

export default function CourseNav({setIsHomePage, isHomePage, setCurrentPage}) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);
  
  useEffect(()=>{
    if(isHomePage===false){
      setSearchTerm("")
      setCurrentPage(1)
    }
  }, [isHomePage])
  

  const router = useRouter();
  const handleSearch = () => {
    console.log(searchTerm);
    if (searchTerm.trim()) {
      router.push({
        pathname: '/course',
        query: { search: searchTerm },
      });
      setIsHomePage(true)
      setCurrentPage(1)
    }
    if(searchTerm.trim().length<1){
      router.push({
        pathname: '/course',
        query: {},
      });
      setIsHomePage(true)
      setCurrentPage(1)
    }
  };

  //處理清空搜尋
  const handleClear=(e)=>{
    setSearchTerm("")
    router.push({
      pathname: '/course',
      query: {},
    });
    setIsHomePage(true)
    setCurrentPage(1)
  }
  // 處理鍵盤事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleClick = (e) => {
    const tagText = e.target.textContent.slice(1);
    setIsHomePage(true)
    setCurrentPage(1)
    if (tagText.trim()) {
      router.push({
        pathname: '/course',
        query: { search: tagText },
      });
    }
  };
  const handleClickSearchIcon = (e) => {
    searchInputRef.current.focus()
    setSearchTerm(searchInputRef.current.value)
    handleSearch();
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
            <i className="fa-solid fa-xmark fa-xmark-course position-absolute" onClick={handleClear}></i>
          </div>
          <div className="row px-0 m-0 justify-content-center">
            <div className="col-11 col-md-6 d-flex justify-content-center flex-wrap">
              <span className="nav-tag cursor-pointer" onClick={handleClick}>
                #品酒
              </span>
              <span className="nav-tag cursor-pointer" onClick={handleClick}>
                #認證課程
              </span>
              <span className="nav-tag cursor-pointer" onClick={handleClick}>
                #法國
              </span>
              <span className="nav-tag cursor-pointer" onClick={handleClick}>
                #SFM
              </span>
              <span className="nav-tag cursor-pointer" onClick={handleClick}>
                #BWC布根地
              </span>
              <span className="nav-tag cursor-pointer" onClick={handleClick}>
                #CIVB波爾多葡萄酒學院
              </span>
              <span className="nav-tag cursor-pointer d-none d-md-block" onClick={handleClick}>
                #CIVA
              </span>
              <span className="nav-tag cursor-pointer d-none d-md-block" onClick={handleClick}>
                #阿爾蕯斯
              </span>
              <span className="nav-tag cursor-pointer d-none d-md-block" onClick={handleClick}>
                #葡萄牙公會
              </span>
              <span className="nav-tag cursor-pointer d-none d-md-block" onClick={handleClick}>
                #葡萄酒學者認證
              </span>
              <span className="nav-tag cursor-pointer d-none d-md-block" onClick={handleClick}>
                #IWS
              </span>
            </div>
          </div>
        </div>
        {/* course-nav end */}
    </>
  )
}
