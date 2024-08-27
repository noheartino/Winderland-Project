import React from "react";

export default function TeacherListCard({ teacher, teacherScore }) {
  return (
    <>
      <div className="row flex-row flex-md-column align-items-center justify-content-center bg-light-gray shadow rounded-4 py-4 px-0 mx-0">
        <div className="teacher-head col-auto px-0 mb-2">
          <img src={`/images/course_and_tarot/${teacher?.teacher_path}`} alt="" />
        </div>
        <div className="teacher-text-box col-auto px-10px d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center my-1" style={{minHeight: "52px"}}>
            <div className="row teacher-card-name justify-content-center align-items-center gap-3 row-gap-1 mx-0" style={{width: '85%'}}>
              <h5 className="col-auto spac-1 text-prim-dark lh-15 px-0 elipes01">
                {teacher?.name}
              </h5>
              <div className="col-auto spac-1 text-prim-dark lh-15 px-0 emmit1 elipes01">
                {teacher?.name_en}
              </div>
            </div>
          </div>
          <div className="row flex-column justify-content-center align-items-center">
            <div className="col-auto stars mt-2 d-flex align-items-center">
              <i
                className={`fa-solid fa-star ${
                  teacherScore > 0.5 ? "star-with-score" : "star-without-score"
                }`}
              />
              <i
                className={`fa-solid fa-star ${
                  teacherScore > 1.5 ? "star-with-score" : "star-without-score"
                }`}
              />
              <i
                className={`fa-solid fa-star ${
                  teacherScore > 2.5 ? "star-with-score" : "star-without-score"
                }`}
              />
              <i
                className={`fa-solid fa-star ${
                  teacherScore > 3.5 ? "star-with-score" : "star-without-score"
                }`}
              />
              <i
                className={`fa-solid fa-star ${
                  teacherScore > 4.5 ? "star-with-score" : "star-without-score"
                }`}
              />
              <span
                className={`ms-2 spac-1 text-sec-dark-blue emmit1 ${
                  teacherScore > 0 ? "d-inline-block" : "d-none"
                }`}
              >
                {teacherScore>0 ? teacherScore : '未有評分'}
              </span>
            </div>
            <div
              className="col-auto d-flex justify-content-center align-items-center mt-3">
              <h6 className="spac-2 lh-15 me-2">講師詳情</h6>
              <i className="fa-solid fa-chevron-right" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
