import { useEffect, useState } from "react";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import TeacherManageHeader from "@/components/course/teacher-manage-header";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import Head from "next/head";
import ClipLoader from "react-spinners/ClipLoader";

export default function Applyevent() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  // 抓取 user 資料
  const authData = useAuth().auth.userData
  const [userId, setUserId] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (authData && authData.id === 100) {
      setUserId(authData.id)
      setIsAdmin(true)
    }
  }, [useAuth()])

  // useEffect(() => {
  //   if (auth.isAuth) {
  //     setUserId(auth.userData?.id);
  //     console.log("userId 是否已設定: " + auth?.isAuth);

  //     console.log("以下是auth內容");
  //     console.log(auth);
  //     console.log("======auth結束======");
  //     return;
  //   }
  //   console.log("userId 未設定成功");
  // }, [auth]);
  // 驗證登入者有權限

  // 確定登入者有權限後，送出GET fetch: /api/course/teacher/management
  useEffect(() => {
    if (userId && isAdmin) {
      console.log("登入者確認為admin有權限者");

      fetch(`http://localhost:3005/api/course/teacher/management`)
        .then((response) => response.json())
        .then((data) => {
          const { courses } = data;
          setCourses(courses);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [userId, isAdmin]);

  // const handleClick = (index) => {
  //   setActiveIndexes((prev) =>
  //     prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
  //   );
  //   setTimeout(() => {
  //     setScaleYIndexes((prev) =>
  //       prev.includes(index)
  //         ? prev.filter((i) => i !== index)
  //         : [...prev, index]
  //     );
  //   }, 100);
  // };

  if (courses.length === 0) {
    return (
      <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ClipLoader
          color="#851931"
          loading={true}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
   
  if (!isAdmin){
    return (
      <>
        <div className="container-fluid">
          <div>請登入有權限的帳號</div>
          <Link href="/">
            <div
              type="button"
              className="btn-warning btn my-2" style={{textDecoration: 'none'}}>
              回首頁<i className="fa-solid fa-chevron-right ms-2"></i>
            </div>
          </Link>
        </div>
      </>
    )
  } 

  return (
    <>
      <Head>
        <title>醺迷仙園｜課程管理</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="course-manage-wrap">
        <Nav />
        <TeacherManageHeader />

        <div className="CManageNav">
          <div className="container">
            <div className="CManageNavT">課程管理</div>
            <div className="CManageNavList">
              <Link href="/course/teacher/management" className="CArmallc">
                <div className="CNavListLi CNowUnderLI">課程管理</div>
              </Link>
              <Link
                href="/course/teacher/management/create"
                className="CArmall"
              >
                <div className="CNavListLi">新增課程</div>
              </Link>
            </div>
          </div>
        </div>

        <div className={`courseMDetailArea`}>
          <div className="container">
            {courses?.map((course) => {
              function handleDateFormat(dateStr) {
                const date = new Date(dateStr);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return `${year}年${month}月${day}號`;
              }
              function handleTimeFormat(timeStr) {
                const timeVar = String(timeStr);
                return timeVar.split(":").slice(0, 2).join(":");
              }
              function handleScale() {
                const CMlineA = document.querySelector(
                  `#CMlineA_${course?.class_id}`
                );
                const CMlineB = document.querySelector(
                  `#CMlineB_${course?.class_id}`
                );
                const CMDetailistToggleBox = document.querySelector(
                  `#CMDetailistToggleBox_${course?.class_id}`
                );
                if (CMlineA.classList.contains("active")) {
                  CMlineA.classList.remove("active");
                  CMDetailistToggleBox.classList.remove("scaleY");
                  setTimeout(() => {
                    CMDetailistToggleBox.classList.remove("active");
                  }, 400);
                } else {
                  CMlineA.classList.add("active");
                  CMDetailistToggleBox.classList.add("active");
                  setTimeout(() => {
                    CMDetailistToggleBox.classList.add("scaleY");
                  }, 1);
                }
                if (CMlineB.classList.contains("active")) {
                  CMlineB.classList.remove("active");
                  CMDetailistToggleBox.classList.remove("scaleY");
                  setTimeout(() => {
                    CMDetailistToggleBox.classList.remove("active");
                  }, 400);
                } else {
                  CMlineB.classList.add("active");
                  CMDetailistToggleBox.classList.add("active");
                  setTimeout(() => {
                    CMDetailistToggleBox.classList.add("scaleY");
                  }, 1);
                }
              }
              return (
                <div className={`classMDetailist`} key={course?.class_id}>
                  <div className={`CMDetailistBox d-flex`}>
                    <div className="CMDetailistBoxPic">
                      <img
                        src={`http://localhost:3005/uploads/course_and_tarot/${!course.class_path ? 'classImgDefault.png' : course?.class_path}`}
                        alt=""
                        className=""
                      />
                      
                    </div>
                    <div className="CMDetailistBoxT d-flex flex-column gap-3">
                      <div className="CMDetailistBoxTitle row flex-wrap row-gap-3 gap-2 px-3">
                        <span
                          className={`CMonlineTag col-auto ${
                            course.online === 1
                              ? "CMonlineTag-online"
                              : "CMonlineTag-underline"
                          }`}
                        >
                          {course.online === 1 ? "線上" : "實體"}
                        </span>
                        <span
                          className={`CMstatus col-auto ${
                            course.class_status === 0
                              ? "past"
                              : course.class_status === 2
                              ? "future"
                              : ""
                          }`}
                        >
                          {course.class_status === 0
                            ? "報名已截止"
                            : course.class_status === 2
                            ? "報名尚未開始"
                            : "開放報名中"}
                        </span>
                        <span className="CMclassTitle col-12 col-lg-auto px-0">
                          {course?.class_name}
                        </span>
                      </div>
                      <span className="CMclassSubTitle col-12 px-0">
                        開課教師 : {course?.teacher_name}
                      </span>
                    </div>

                    <div className="CMDetailistBoxArr" onClick={handleScale}>
                      <div
                        className={`CMlineA`}
                        id={`CMlineA_${course?.class_id}`}
                      />
                      <div
                        className={`CMlineB`}
                        id={`CMlineB_${course?.class_id}`}
                      />
                    </div>
                  </div>
                  <div
                    className={`CMDetailistToggleBox`}
                    id={`CMDetailistToggleBox_${course?.class_id}`}
                  >
                    <div className="row gx-5 mb-3">
                      <div className="col-12">
                        <div className="CMListInformationT">課程資訊</div>
                      </div>
                      <div className="col-10">
                        <div className="CMListInfoEventT">
                          <div className="mb-1">
                            課程名稱 : {course?.class_name}
                          </div>
                          <div className="CMDetailistBoxInfo">
                            報名日期 -{" "}
                            {handleDateFormat(course?.appointment_start)}~
                            {handleDateFormat(course?.appointment_end)}
                            <br />
                            開課日期 - {handleDateFormat(course?.course_start)}~
                            {handleDateFormat(course?.course_end)}
                            <br />
                            課程地點 - {course?.address}
                            <br />
                            上課時間 -{" "}
                            {handleTimeFormat(course?.daily_start_time)}-
                            {handleTimeFormat(course?.daily_end_time)}
                          </div>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="CMEditIcon">
                          <Link
                            href={`/course/teacher/management/manage/${course?.class_id}`}
                            className="CArmallc d-flex align-items-center"
                          >
                            <div className="CMEditIconT d-none d-lg-block">
                              編輯課程
                            </div>
                            <i className="fa-solid fa-pen-to-square CMEditIconI" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="row gx-5">
                      <div className="col-12">
                        <div className="CMListStatisT">報名人數統計</div>
                      </div>
                      <div className="col-12 col-md-6 mb-4">
                        <div className="classMLimit">
                          <div className="classMLimiText">
                            <div>目前已報名 : {course?.assigned} 人</div>
                            <div>人數上限 : {course?.student_limit} 人</div>
                          </div>
                          <div className="classMLimitLine">
                            <div
                              className="classMLimitLinedata"
                              style={{
                                width: `${
                                  course.assigned > 0 &&
                                  course.student_limit > 0
                                    ? (course.assigned / course.student_limit) *
                                      100
                                    : 0
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
