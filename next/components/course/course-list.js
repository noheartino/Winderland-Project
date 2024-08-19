import React, { useState,  useEffect } from 'react'
import { useRouter } from 'next/router';
import CourseCardSm from '@/components/course/course-card-sm'


export default function CourseList() {

  const router = useRouter();
  const { search } = router.query;

  const [courses, setCourses] = useState([]);
  const [comments, setComments] = useState([]);
  const [classAssigns, setClassAssigns] = useState([])

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
      let {courses, comments, classAssigns} = data;
      // 處理 courses 資料，將 images 字段轉換為數組
      const processedCourses = courses.map((course) => ({...course,
        images: course.path ? course.path : [],
      }));
      setComments(comments);
      setCourses(processedCourses);
      setClassAssigns(classAssigns);
    })
    .catch((error) => {
      console.log(error);
    });
}, [search]);


  function handleHref(e, class_id) {
    e.preventDefault();
    router.push(`/course/${class_id}`);
  }
      

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

              {courses.map((course) => {
                const { class_id, class_name, student_limit, teacher_id, price, online, address, appointment_start, appointment_end, course_start, course_end, description, status, i_class_id, i_teacher_id, path, teacher_name, class_path} = course;
                const isOnline = parseInt(online) === 0 ? false : true;
                let averageRating = 0;
                let classAssignsQ = 0;

                  const filteredComments = comments.filter(comment => comment.entity_type === "class" && comment.entity_id === class_id);
                  if(filteredComments){
                    const ratings = filteredComments.map(comment => comment.rating);
                    averageRating =  Math.round((ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length));
                  }else{
                    averageRating = 0
                  }

                  const filteredclassAssigns = classAssigns.filter(classAssign => classAssign.class_id === class_id && classAssign.status !== 'cancelled');
                  if(filteredclassAssigns){
                    classAssignsQ = filteredclassAssigns.length;
                  }else{
                    classAssignsQ = 0
                  }
                
                
              return (
                <a key={class_id} onClick={(e)=>handleHref(e, class_id)} className='col-12 col-md-4 col-lg-3 px-10px d-flex flex-column align-items-center justify-content-between'>
                  <CourseCardSm course={course} averageRating={averageRating} classAssigns={classAssigns} classAssignsQ={classAssignsQ}/>
                </a> 
              );
            })}
                

              </div>
            </div>
          </div>
    </>
  )
}
