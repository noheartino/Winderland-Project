import CourseList from "@/components/course/course-list";
import CourseNav from "@/components/course/course-nav";
import { useRouter } from "next/router";
import CourseBox from "@/components/course/course-courseBox";
import { useState, useEffect, useRef } from "react";
import CourseCardSm from "@/components/course/course-card-sm";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import CourseIndexPageNav from "@/components/course/courseIndexPageNav";
import { useAuth } from "@/hooks/use-auth";
import Head from "next/head";

export default function CourseIndex() {
  const router = useRouter();
  const { auth } = useAuth();
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (auth.isAuth) {
      setUserId(auth.userData?.id);
      console.log("userId 是否已設定: " + auth?.isAuth);

      console.log("以下是auth內容");
      console.log(auth);
      console.log("======auth結束======");
      return;
    }
    console.log("userId 未設定成功");
  }, [auth]);

  let pageLimit = 8;
  const { search, view } = router.query;
  let apiUrl = ``;
  const [courses, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [comments, setComments] = useState([]);
  const [classAssigns, setClassAssigns] = useState([]);
  const [myFavoriteCourse, setMyFavoriteCourse] = useState([]);
  const [myCourse, setMyCourse] = useState([]);
  const [myFirstFavoriteCourse, setmyFirstFavoriteCourse] = useState({});
  const [firstMyCourse, setFirstMyCourse] = useState({});
  const [isHomePage, setIsHomePage] = useState(true);
  const [courseBtn, setCourseBtn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const courseBtn01 = useRef(null);
  const courseBtn02 = useRef(null);
  const courseBtn03 = useRef(null);

  // 篩選狀態
  const [score, setScore] = useState(0);
  const [onlineFilter, setOnlineFilter] = useState("全部");
  const [teacherSelect, setTeacherSelect] = useState("全部");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [priceStart, setPriceStart] = useState("");
  const [priceEnd, setPriceEnd] = useState("");
  const districts = [
    { dId: 1, districtStr: "台北市" },
    { dId: 2, districtStr: "新北市" },
    { dId: 3, districtStr: "桃園市" },
    { dId: 4, districtStr: "台中市" },
    { dId: 5, districtStr: "台南市" },
    { dId: 6, districtStr: "高雄市" },
    { dId: 7, districtStr: "新竹縣" },
    { dId: 8, districtStr: "苗栗縣" },
    { dId: 9, districtStr: "彰化縣" },
    { dId: 10, districtStr: "南投縣" },
    { dId: 11, districtStr: "雲林縣" },
    { dId: 12, districtStr: "嘉義縣" },
    { dId: 13, districtStr: "屏東縣" },
    { dId: 14, districtStr: "宜蘭縣" },
    { dId: 15, districtStr: "花蓮縣" },
    { dId: 16, districtStr: "台東縣" },
    { dId: 17, districtStr: "澎湖縣" },
    { dId: 18, districtStr: "金門縣" },
    { dId: 19, districtStr: "連江縣" },
    { dId: 20, districtStr: "基隆市" },
    { dId: 21, districtStr: "新竹市" },
    { dId: 22, districtStr: "嘉義市" },
    { dId: 23, districtStr: "" },
  ];
  const [districtArr, setDistrictArr] = useState([
    districts.map((district) => {
      return district.districtStr;
    }),
  ]);

  useEffect(() => {
    apiUrl = `http://localhost:3005/api/course?userId=${userId}`;
    router.push({
      pathname: "/course",
      query: {},
    });
  }, []);
  useEffect(() => {
    if (!view) {
      setIsHomePage(true);
    }
  }, [router.query]);
  useEffect(() => {
    setFilterCourses(courses);
  }, [courses]);
  useEffect(() => {
    const newCoursesArray = courses.filter(
      (course) =>
        districtArr.includes(course.address.slice(0, 3)) &&
        course.average_rating >= score &&
        (onlineFilter === "全部"
          ? true
          : onlineFilter === "實體"
          ? parseInt(course.online) == 0
          : onlineFilter === "線上"
          ? parseInt(course.online) == 1
          : true) &&
        (teacherSelect === "全部"
          ? true
          : course.teacher_name === teacherSelect) &&
        (!dateStart
          ? true
          : course.course_start > dateStart || !course.course_start) &&
        (!dateEnd ? true : course.course_end < dateEnd || !course.course_end) &&
        (!priceStart
          ? true
          : !course.sale_price
          ? course.price > priceStart
          : course.sale_price > priceStart) &&
        (!priceEnd
          ? true
          : !course.sale_price
          ? course.price < priceEnd
          : course.sale_price < priceEnd)
    );
    setFilterCourses(newCoursesArray);
  }, [
    districtArr,
    score,
    onlineFilter,
    teacherSelect,
    dateStart,
    dateEnd,
    priceStart,
    priceEnd,
  ]);

  useEffect(() => {
    if (!search && !view && auth.isAuth) {
      apiUrl = `http://localhost:3005/api/course?userId=${userId}`;
    }
    if (search && auth.isAuth) {
      apiUrl = `http://localhost:3005/api/course?search=${search}&userId=${userId}`;
    }
    if (view && auth.isAuth) {
      apiUrl = `http://localhost:3005/api/course?view=${view}&userId=${userId}`;
    }

    // const includeImages = false;
    console.log("search 或 view 偵測到變動");

    // 當組件掛載時執行 fetch 請求
    if (userId) {
      fetch(apiUrl)
        .then((response) => {
          console.log("送出fetch URL: " + apiUrl);
          if (!response.ok) {
            throw new Error("Network response not ok");
          }
          return response.json();
        })
        .then((data) => {
          const {
            courses,
            comments,
            classAssigns,
            myFavoriteCourse,
            myCourse,
            teachers,
          } = data;
          console.log("課程列表抓取到的資料數量:" + courses.length);
          // 處理 courses 資料，將 images 字段轉換為數組
          setComments(comments);
          setCourses(courses);
          setClassAssigns(classAssigns);
          setMyFavoriteCourse(myFavoriteCourse);
          setMyCourse(myCourse);
          setmyFirstFavoriteCourse(...myFavoriteCourse.slice(0, 1));
          setFirstMyCourse(...myCourse.slice(0, 1));
          setTeachers(teachers);
          console.log("myCourse----------");
          console.log(myCourse);
          // if(isHomePage){clearBtnHref()}
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [view, search, userId]);
  // console.log(myFirstFavoriteCourse[0]);

  function clickCourseBtn(e, btnRef) {
    const buttonText = e.target.textContent;
    setCourseBtn(buttonText);
    courseBtn01.current.classList.remove("active");
    courseBtn02.current.classList.remove("active");
    courseBtn03.current.classList.remove("active");

    // 讓按鈕獲得焦點
    btnRef.current.focus();

    // 添加 active 類別到所選按鈕
    btnRef.current.classList.add("active");
  }

  useEffect(() => {
    if (courseBtn) {
      courseBtnHref(courseBtn);
    }
  }, [courseBtn]);

  function courseBtnHref(buttonText) {
    router.push(
      {
        pathname: "/course",
        query: { view: buttonText },
      },
      undefined,
      { scroll: false }
    );
    console.log(
      "推一個路由: /course?view=" +
        buttonText +
        "，courseBtn=" +
        courseBtn +
        "，buttonText=" +
        buttonText
    );
  }
  function clearQuery() {
    router.push({
      pathname: "/course",
      query: {},
    });
  }
  function handlePressMoreMyCourse() {
    setIsHomePage(false);
    if (search) {
      router.push({
        pathname: "/course",
        query: {},
      });
    }
  }
  function handlePressMoreMyFavoriteC() {
    router.push({
      pathname: "/dashboard/favorite",
      query: {},
    });
  }
  return (
    <>
      <Head>
      <title>課程首頁</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <div className="course_wrap">
        {/* Header */}
        <Nav />

        <CourseNav setIsHomePage={setIsHomePage} isHomePage={isHomePage} />

        {/* first page start */}
        <div
          className={`container-fluid course-first-page ${
            isHomePage ? "d-block" : "d-none"
          }`}
        >
          {/* page one 我的課程&收藏課程 start */}
          <div className="container-fluid favorite-and-mycourse-area">
            <div className="container-lg p-0">
              <div className="row px-0 m-0 course-mycourse-box">
                <div className="col-6 d-flex flex-column px-10px">
                  <div className="row px-0 m-0 course-card-header d-flex align-items-center">
                    <div className="col-12 col-md-auto h4 pe-2 spac-2 m-0 mb-1 d-flex justify-content-between align-items-center">
                      <strong>我的課程</strong>
                      <div
                        className="d-flex d-md-none ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark align-items-center justify-content-center"
                        style={{ width: "20px", height: "20px" }}
                      >
                        <i
                          className="fa-solid fa-chevron-right text-sec-orange cursor-pointer"
                          onClick={handlePressMoreMyCourse}
                          style={{ fontSize: "9px" }}
                        />
                      </div>
                    </div>
                    <span className="d-none d-md-block col-auto text-gray-light spac-1 px-0 mb-1">
                      ｜
                    </span>
                    <span className="col-auto text-gray-light spac-1 px-0 mb-1 h7">
                      正在學習中的課程內容
                    </span>
                  </div>
                  {/* mycourse box underline start */}
                  <div className="row px-0 m-0 h-100 course-mycourse d-flex align-items-start">
                    <CourseBox
                      boxType={"mycourse"}
                      myBox={firstMyCourse}
                      classAssigns={classAssigns}
                      setIsHomePage={setIsHomePage}
                    />
                    {/* {console.log(myCourse[0].name)} */}
                  </div>
                  {/* mycourse box underline end */}
                </div>

                <div className="col-6 d-flex flex-column px-10px">
                  <div className="row px-0 m-0 course-card-header d-flex align-items-center">
                    <div className="col-12 col-md-auto h4 pe-2 spac-2 m-0 mb-1 d-flex justify-content-between align-items-center">
                      <strong>收藏課程</strong>
                      <div
                        className="d-flex d-md-none ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark align-items-center justify-content-center"
                        style={{ width: "20px", height: "20px" }}
                      >
                        <i
                          className="fa-solid fa-chevron-right text-sec-orange cursor-pointer"
                          onClick={handlePressMoreMyFavoriteC}
                          style={{ fontSize: "9px" }}
                        />
                      </div>
                    </div>
                    <span className="d-none d-md-block col-auto text-gray-light spac-1 px-0 mb-1">
                      ｜
                    </span>
                    <span className="col-auto text-gray-light spac-1 px-0 mb-1 h7">
                      感興趣的課程收藏內容
                    </span>
                  </div>
                  {/* myfavorite course box online start */}
                  <div className="row px-0 m-0 h-100 course-myfavorite-course d-flex align-items-start">
                    {/* {<CourseBox myFirstFavoriteCourse={myFirstFavoriteCourse ? myFirstFavoriteCourse: '123'} />} */}
                    {
                      <CourseBox
                        boxType={"favorite"}
                        myBox={myFirstFavoriteCourse}
                        classAssigns={classAssigns}
                      />
                    }
                  </div>
                  {/* myfavorite course box online end */}
                </div>
              </div>
            </div>
          </div>
          {/* page one 我的課程&收藏課程 end */}

          <CourseList
            courses={filterCourses}
            comments={comments}
            classAssigns={classAssigns}
            currentPage={currentPage}
            pageLimit={pageLimit}
            teachers={teachers}
            districts={districts}
            districtArr={districtArr}
            setDistrictArr={setDistrictArr}
            setCurrentPage={setCurrentPage}
            setScore={setScore}
            setOnlineFilter={setOnlineFilter}
            setTeacherSelect={setTeacherSelect}
            setDateStart={setDateStart}
            setDateEnd={setDateEnd}
            setPriceStart={setPriceStart}
            setPriceEnd={setPriceEnd}
            score={score}
            onlineFilter={onlineFilter}
            teacherSelect={teacherSelect}
            dateStart={dateStart}
            dateEnd={dateEnd}
            priceStart={priceStart}
            priceEnd={priceEnd}
          />
        </div>
        {/* first page end */}

        {/* page two 我的課程 start */}
        <div
          className={`container-fluid px-0 ${
            isHomePage ? "d-none" : "d-block"
          }`}
        >
          <div className="container-sm px-0 my-5">
            <div className="px-10px">
              <div
                className="spac-1 btn-border-wine btn mt-4"
                onClick={(e) => {
                  setIsHomePage(true);
                  clearQuery();
                }}
              >
                <i className="fa-solid fa-chevron-left me-1"></i>回到課程首頁
              </div>
              <div className="row px-0 m-0 justify-content-center justify-content-md-start course-card-header-page2 align-items-center">
                <span className="col-auto h4 pe-2 spac-2 m-0">
                  <strong>我的課程</strong>
                </span>
                <span className="col-auto text-gray-light spac-1">
                  ｜&nbsp;正在學習中的課程內容
                </span>
              </div>
              <div className="row px-0 m-0 mb-5 gap-2 justify-content-center justify-content-md-start">
                <div
                  type="button"
                  className="btn-light-to-prim active btn py-1 px-3 spac-1"
                  ref={courseBtn01}
                  onClick={(e) => clickCourseBtn(e, courseBtn01)}
                >
                  全部
                </div>
                <div
                  type="button"
                  className="btn-light-to-prim btn py-1 px-3 spac-1"
                  ref={courseBtn02}
                  onClick={(e) => clickCourseBtn(e, courseBtn02)}
                >
                  線上
                </div>
                <div
                  type="button"
                  className="btn-light-to-prim btn py-1 px-3 spac-1"
                  ref={courseBtn03}
                  onClick={(e) => clickCourseBtn(e, courseBtn03)}
                >
                  實體
                </div>
              </div>
            </div>
            <div className="row px-0 m-0 course-mycourse-box row-gap-5">
              {/* card-sm online start */}
              {myCourse && myCourse.length > 0 ? (
                myCourse.map((course) => {
                  const { class_id } = course;
                  let averageRating = 0;
                  let classAssignsQ = 0;
                  const filteredComments = comments.filter(
                    (comment) =>
                      comment.entity_type === "class" &&
                      comment.entity_id === class_id
                  );
                  if (filteredComments) {
                    const ratings = filteredComments.map(
                      (comment) => comment.rating
                    );
                    averageRating = (
                      ratings.reduce((acc, rating) => acc + rating, 0) /
                      ratings.length
                    ).toFixed(1);
                  } else {
                    averageRating = 0;
                  }
                  const filteredclassAssigns = classAssigns.filter(
                    (classAssign) =>
                      classAssign.class_id === class_id &&
                      classAssign.status !== "cancelled"
                  );
                  if (filteredclassAssigns) {
                    classAssignsQ = filteredclassAssigns.length;
                  } else {
                    classAssignsQ = 0;
                  }

                  function handleHref(e, class_id) {
                    e.preventDefault();
                    router.push(`/course/${class_id}`);
                  }

                  return (
                    <div
                      key={class_id}
                      onClick={(e) => handleHref(e, class_id)}
                      className="col-12 col-md-4 col-lg-3 px-10px d-flex flex-column align-items-center justify-content-between"
                    >
                      <CourseCardSm
                        course={course}
                        averageRating={averageRating}
                        classAssignsQ={classAssignsQ}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="row justify-content-center my-3">
                  <div
                    className="col-auto"
                    style={{
                      maxWidth: "370px",
                      maxHeight: "350px",
                      width: "100%",
                    }}
                  >
                    <Image
                      src={`/images/course_and_tarot/courses-no-result.png`}
                      alt="course list no result"
                      layout="responsive"
                      width={370}
                      height={350}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                  </div>
                </div>
              )}
              {/* card-sm online end */}
            </div>
          </div>
        </div>
        {/* page two 我的課程 end */}

        {/* page-nav-bar start */}
        <div
          className={`container-fluid py-3 ${
            isHomePage ? "d-block" : "d-none"
          }`}
        >
          <div className="container-sm">
            <div className="row justify-content-between">
              <div className="col-auto"></div>
              <div className="row justify-content-center justify-conten-md-end mt-3 mb-5">
                <CourseIndexPageNav
                  courses={filterCourses}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageLimit={pageLimit}
                />
              </div>
            </div>
          </div>
        </div>
        {/* page-nav-bar end */}
        {/* Bootstrap JavaScript Libraries */}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
