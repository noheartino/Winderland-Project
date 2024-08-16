import React, { useState,  useEffect } from 'react'
import { useRouter } from 'next/router';

export default function CourseList({auth}) {

  const router = useRouter();
  const { search } = router.query;

  const [courses, setCourses] = useState([]);
  const [firstCourse, setFirstCourse] = useState([]);
  const [remainCourses, setRemainCourses] = useState([]);

  useEffect(() => {
    // const includeImages = false;
    const apiUrl = search
      ? `http://localhost:3005/api/course?search=${encodeURIComponent(search)}`
      : "http://localhost:3005/api/course";
    // 當組件掛載時執行 fetch 請求
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        console.log(response.json);
        return response.json();
      })
      .then((data) => {
        // 處理 courses 資料，將 images 字段轉換為數組
        const processedCourses = data.map((course) => ({ auth: auth,
          ...course,
          images: course.images ? course.images.split(",") : [],
        }));
        setCourses(processedCourses);
        console.log("courses data: "+processedCourses)
        console.log("first Course: "+firstCourse);
        setFirstCourse(processedCourses.slice(0, 1));
        setRemainCourses(processedCourses.slice(2));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  return (
    <>
      {/* mycourse box underline start */}
      <div className={`row px-0 m-0 h-100 wait-to-fill d-flex align-items-start`}>
                    <a
                      className="course-leftcontent col-12 col-md-8 px-0"
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
                        <span
                          className="h5 spac-1"
                          style={{ lineHeight: "35px" }}
                        >
                          迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                        </span>
                        <div
                          className="progress mt-2 bg-sec-blue"
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
                    <a
                      className="course-more col h-100 ms-3 d-none d-md-flex justify-content-center align-items-center"
                      href="/"
                    >
                      <div className="spac-2 text-prim-dark h6">查看更多</div>
                      <div
                        className="ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark d-flex align-items-center justify-content-center"
                        style={{ width: "20px", height: "20px" }}
                      >
                        <i
                          className="fa-solid fa-chevron-right text-sec-orange"
                          style={{ fontSize: "9px" }}
                        />
                      </div>
                    </a>
                    <div className="course-no-content col h-100 d-flex flex-column flex-md-row px-0 m-0 row-gap-3 justify-content-center align-items-center d-none">
                      <i className="fa-regular fa-face-meh me-2 text-prim-dark h5" />
                      <div className="spac-2 text-prim-dark h6">
                        尚無課程內容
                      </div>
                    </div>
                  </div>
                  {/* mycourse box underline end */}
    </>
  )
}
