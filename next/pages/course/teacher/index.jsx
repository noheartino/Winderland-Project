import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import TeacherListCard from "@/components/course/teacher-list-card"

export default function TeacherIndex() {
let apiUrl = `http://localhost:3005/api/course/teacher`
const [comments, setComments] = useState([])
const [teachers, setTeachers] = useState([])
    useEffect(()=>{
      fetch(apiUrl)
        .then((response) => {
          console.log("送出fetch，URL="+apiUrl);
          if (!response.ok) {
            throw new Error("Network response not ok");
          }
          return response.json();
        })
        .then((data) => {
          const { teachers, comments } = data;
          setComments(comments);
          setTeachers(teachers);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [])

  return (
    
    <>
    <div className="course_wrap">
        <header></header>
        

        {/*teacher-detail start */}
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

                        <div className="row row-gap-5">
                          {/* teacher-list-card start */}
                          {teachers.map((teacher)=>{
                            let teacherScore
                            const commentFilter = comments.filter((comment)=>comment.teacher_id ===teacher.id)
                            if(commentFilter.length>0){
                              teacherScore = ((commentFilter.reduce((acc, v) => acc + v.rating, 0))/commentFilter.length).toFixed(1)
                            }else{
                              teacherScore = 0
                            }
                            return (
                              <div key={teacher.id} className="col-12 col-md-6 col-lg-4 col-xl-3 px-10px">
                                <TeacherListCard teacher={teacher} teacherScore={teacherScore} />
                              </div>
                          ) 
                          })}
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
        {/*teacher-detail end */}

        <footer></footer>
      </div>

    </>
  );
}
