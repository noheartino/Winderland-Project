import React, { useState,  useEffect } from 'react'
import { useRouter } from 'next/router';
import CourseCardSm from '@/components/course/course-card-sm'


export default function CourseList() {

  const router = useRouter();
  const { search } = router.query;

  const [courses, setCourses] = useState([]);
  const [firstCourse, setFirstCourse] = useState([]);
  const [remainCourses, setRemainCourses] = useState([]);

  useEffect(() => {
    // const includeImages = false;
    const apiUrl = search
      ? `http://localhost:3005/api/courseList?search=${search}`
      : "http://localhost:3005/api/courseList";
    // 當組件掛載時執行 fetch 請求
    fetch(apiUrl).then((response) => {
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      console.log(response.json);
      return response.json();
    })
    .then((data) => {
      // 處理 courses 資料，將 images 字段轉換為數組
      const processedCourses = data.map((course) => ({...course,
        images: course.path ? course.path : [],
      }));
      setCourses(processedCourses);
      console.log("courses data: "+processedCourses)
      console.log("first Course: "+firstCourse);
    })
    .catch((error) => {
      console.log(error);
    });
}, [search]);
      

  return (
    <>
      <div className="container-fluid px-0">
            <div className="container-sm px-0 mb-5">
              <div className="row px-0 m-0 px-10px justify-content-center">
                <div className="col-auto col-md-12 course-card-header d-flex align-items-center">
                  <span className="col-auto h4 pe-2 spac-2 m-0">
                    <strong>推薦課程</strong>
                  </span>
                  <span className="col-auto text-gray-light spac-1">
                    ｜&nbsp;推薦您可能感興趣的課程
                  </span>
                </div>
              </div>
              <div className="row px-0 m-0 course-mycourse-box row-gap-5">
                <CourseCardSm courses={courses} />
              </div>
            </div>
          </div>
    </>
  )
}
