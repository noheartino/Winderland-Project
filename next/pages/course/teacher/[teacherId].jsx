import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import CourseCardSm from "@/components/course/course-card-sm";
import Head from "next/head";

export default function TeacherDetail() {
  // 需要資料: 目前teacher & 目前teacher的comments 、 courses中此teacher的課程列表=>card-sm:{當前課程 / 當前課程平均得分 / 課程已報名人數}
  const router = useRouter();
  const { teacherId } = router.query;

  let apiUrl = `http://localhost:3005/api/course/teacher/${teacherId}`;
  // const [comments, setComments] = useState([])
  const [teacher, setTeacher] = useState([]);
  const [teacherComments, setTeacherComments] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState([]);

  useEffect(() => {
    if (teacherId) {
      fetch(apiUrl)
        .then((response) => {
          console.log("送出fetch，URL=" + apiUrl);
          if (!response.ok) {
            throw new Error("Network response not ok");
          }
          console.log("送出的URL: " + apiUrl);
          return response.json();
        })
        .then((data) => {
          const { teacher, teacherComments, teacherCourses } = data;
          console.log(teacher, teacherComments, teacherCourses);
          setTeacher(teacher[0]);
          setTeacherComments(teacherComments);
          setTeacherCourses(teacherCourses);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [teacherId]);

  // 教師平均得分
  let averageRating = 0;
  if (teacherComments && teacherComments.length > 0) {
    averageRating = (
      teacherComments.reduce((acc, v) => acc + v.rating, 0) /
      teacherComments.length
    ).toFixed(1);
  }
  return (
    <>
      <Head>
        <title>醺迷仙園｜講師: {teacher?.name}</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="course_wrap">
        {/* Header */}
        <Nav />
        {/* page four teacher-detail start */}
        <div className="fourth-page-wrap">
          <div className="container-fluid px-0 teacher-detail-banner rounded-bottom-5 overflow-hidden d-flex justify-content-center align-items-center pb-5">
            <div className="d-flex flex-column align-items-center gap-4">
              <div className="teacher-detail-head col-auto me-3 px-0">
                <Image
                  src={`http://localhost:3005/uploads/course_and_tarot/${teacher?.teacher_path}`}
                  width={100}
                  height={100}
                  alt=""
                />
              </div>
              <div className="teacher-card-name d-flex flex-column align-items-center">
                <div className="display-6 spac-2 text-white lh-15">
                  {teacher?.name}
                </div>
                <h5 className="spac-2 text-white lh-15">{teacher?.name_en}</h5>
                <div
                  className={`stars mt-2 d-flex d-md-none align-items-center`}
                >
                  <i
                    className={`fa-solid fa-star ${
                      averageRating > 0.5
                        ? "star-with-score"
                        : "star-without-score"
                    }`}
                  />
                  <i
                    className={`fa-solid fa-star ${
                      averageRating > 1.5
                        ? "star-with-score"
                        : "star-without-score"
                    }`}
                  />
                  <i
                    className={`fa-solid fa-star ${
                      averageRating > 2.5
                        ? "star-with-score"
                        : "star-without-score"
                    }`}
                  />
                  <i
                    className={`fa-solid fa-star ${
                      averageRating > 3.5
                        ? "star-with-score"
                        : "star-without-score"
                    }`}
                  />
                  <i
                    className={`fa-solid fa-star ${
                      averageRating > 4.5
                        ? "star-with-score"
                        : "star-without-score"
                    }`}
                  />
                  <span
                    className={`ms-2 spac-1 text-sec-dark-blue emmit1 ${
                      averageRating > 0 ? "d-inline-block" : "d-none"
                    }`}
                  >
                    {averageRating}
                  </span>
                </div>
              </div>
              <Link
                href={`/course/teacher`}
                className="spac-1 btn-border-white btn mb-5 px-4 py-2 rounded-4"
              >
                <i className="fa-solid fa-chevron-left me-1"></i>回到教師列表
              </Link>
            </div>
          </div>
          <div className="container-fluid px-0 position-relative teacher-detail-contentBox-margin-minus-control">
            <div className="container-sm">
              <div className="teacher-detail-content-box w-100 rounded-5 m-auto">
                <div className="d-none d-md-flex flex-column justify-content-center align-items-center">
                  <div className="h5 spac-2 m-0 text-prim-text-prim text-center">
                    <strong>講師課程平均評價</strong>
                  </div>
                  <div className={`stars mt-2 d-flex align-items-center`}>
                    <i
                      className={`fa-solid fa-star ${
                        averageRating > 0.5
                          ? "star-with-score"
                          : "star-without-score"
                      }`}
                    />
                    <i
                      className={`fa-solid fa-star ${
                        averageRating > 1.5
                          ? "star-with-score"
                          : "star-without-score"
                      }`}
                    />
                    <i
                      className={`fa-solid fa-star ${
                        averageRating > 2.5
                          ? "star-with-score"
                          : "star-without-score"
                      }`}
                    />
                    <i
                      className={`fa-solid fa-star ${
                        averageRating > 3.5
                          ? "star-with-score"
                          : "star-without-score"
                      }`}
                    />
                    <i
                      className={`fa-solid fa-star ${
                        averageRating > 4.5
                          ? "star-with-score"
                          : "star-without-score"
                      }`}
                    />
                    <span
                      className={`ms-2 spac-1 text-sec-dark-blue emmit1 ${
                        averageRating > 0 ? "d-inline-block" : "d-none"
                      }`}
                    >
                      {averageRating}
                    </span>
                  </div>
                  <hr className="w-100 my-4"></hr>
                </div>
                <h6
                  className="text-prim-dark spac-2 lh-20 teacher-intro-text mb-5"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {teacher?.description}
                </h6>
              </div>
            </div>
            <div className="container-fluid mt-5 px-0 mx-0 pb-5">
              <div className="container-sm px-0">
                <div className="bg-white rounded-5 mx-auto teacher-detail-suggest-course w-100 row">
                  {/* 講師其他課程 start */}
                  <div className="col-12 col-md-10 my-5 mx-auto position-relative px-10px">
                    <div className="position-relative">
                      <div className="h3 pe-2 spac-2 m-0 text-prim-text-prim px-10px mb-5 text-center text-md-start">
                        <strong>教師相關課程</strong>
                      </div>
                      <div className="row px-0 mx-0 course-mycourse-box row-gap-5">
                        {/* teacher-detail-suggest 課程卡片 start */}
                        {/* card-sm online start */}
                        {teacherCourses.map((teacherCourse) => {
                          return (
                            <div
                              key={teacherCourse.id}
                              className="col-12 col-md-4 col-xl-3 px-20px d-flex flex-column align-items-center justify-content-between"
                            >
                              <CourseCardSm
                                course={teacherCourse}
                                averageRating={averageRating}
                                classAssignsQ={teacherCourse.assigned}
                              />
                            </div>
                          );
                        })}
                        {/* card-sm online end */}
                        {/* teacher-detail-suggest 課程卡片 end */}
                      </div>
                    </div>
                  </div>
                  {/* 講師其他課程 end */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* page four teacher-detail end */}

        {/* <footer></footer> */}
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
