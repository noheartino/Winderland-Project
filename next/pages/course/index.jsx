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
import Arrtotop from "@/components/Header/arr";

export default function CourseIndex() {
  //獲取userId
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
  const { search, view, order } = router.query;
  let apiUrl = `http://winderland.shop/api/course`;
  const [courses, setCourses] = useState([]);
  const [courseOrigin, setCourseOrigin] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [comments, setComments] = useState([]);
  const [classAssigns, setClassAssigns] = useState([]);
  const [myFavoriteCourse, setMyFavoriteCourse] = useState([]);
  const [myCourse, setMyCourse] = useState([]);
  const [myFirstFavoriteCourse, setmyFirstFavoriteCourse] = useState(null);
  const [firstMyCourse, setFirstMyCourse] = useState(null);
  const [isHomePage, setIsHomePage] = useState(true);
  const [courseBtn, setCourseBtn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // 執行清除篩選
  // function handleClearAllSort(){
  //   setOnlineFilter("全部")
  //   setTeacherSelect("全部")
  //   setDateStart("")
  //   setDateEnd("")
  //   setPriceStart("")
  //   setPriceEnd("")
  //   const newArr = districts.map((district)=>{
  //           return district.districtStr
  //       })
  //   setDistrictArr(newArr)
  //   document.querySelector(['#districtAll']).checked=true
  //   router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
  // }

  // 篩選要傳遞的 QUERY
  const { query } = router;
  if (!search && !view) {

    apiUrl = `http://winderland.shop/api/course`;
    if (userId) {
      apiUrl += `?userId=${userId}`
      if (order) {
        apiUrl += `&order=${order}`
      }
    } else {
      if (!order) {
        delete { ...query }.order;
      }
    }
    console.log(apiUrl);
  }
  if (search) {
    apiUrl = `http://winderland.shop/api/course?search=${search}`;

    if (auth.isAuth) {
      apiUrl += `&userId=${userId}`
      if (order) {
        apiUrl += `&order=${order}`
      }
    } else {
      if (order) {
        apiUrl += `&order=${order}`
      } else {
        apiUrl = `http://winderland.shop/api/course?search=${search}`;
      }
    }
  }
  if (view) {
    apiUrl = `http://winderland.shop/api/course?view=${view}`;
    if (auth.isAuth) {
      apiUrl += `&userId=${userId}`
      if (order) {
        apiUrl += `&order=${order}`
      }
    } else {
      if (order) {
        apiUrl += `&order=${order}`
      } else {
        apiUrl = `http://winderland.shop/api/course?view=${view}`;
      }
    }
  }

  useEffect(() => {

    // const includeImages = false;
    console.log("search 或 view 偵測到變動");
    console.log("course首頁送出Fetch: " + apiUrl);

    // 當組件掛載時執行 fetch 請求
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
          courseOrigin,
        } = data;
        // 處理 courses 資料，將 images 字段轉換為數組
        setComments(comments);
        setCourses(courses);
        setCourseOrigin(courseOrigin);
        setClassAssigns(classAssigns);
        setMyFavoriteCourse(myFavoriteCourse);
        setMyCourse(myCourse);
        setmyFirstFavoriteCourse(myFavoriteCourse[0]);
        setFirstMyCourse(myCourse[0]);
        setTeachers(teachers);
        // console.log("myCourse----------");
        // console.log(myCourse);
        // if(isHomePage){clearBtnHref()}
      })
      .catch((error) => {
        console.log(error);
      });
  }, [view, search, userId, apiUrl, auth]);
  // console.log(myFirstFavoriteCourse[0]);

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
  const [districts, setDistricts] = useState([])

  console.log("地區列表製做:");
  console.log(districts);

  const [districtArr, setDistrictArr] = useState([])

  useEffect(() => {
    if (districts.length > 0) {
      setDistrictArr(
        districts.map((district) => {
          return district.districtStr;
        })
      );
      const testArr = districts.map((district) => {
        return district.districtStr;
      })
      // console.log("設置了districtArr: ");
      // console.log(testArr);
      // console.log(districts);
    }
  }, [courses, districts, courseOrigin, auth])

  useEffect(() => {
    apiUrl = `http://winderland.shop/api/course?userId=${userId}`;
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
  }, [courses, courseOrigin]);


  useEffect(() => {
    console.log(courseOrigin);
    console.log(courses);
    if (courseOrigin.length > 0) {
      console.log(courseOrigin);
      const newArr = []
      const allAddressV = courseOrigin.map((course) => { if (course.address) { return course.address.slice(0, 3) } })
      const onlyVaddressArr = Array.from(new Set(allAddressV))
      onlyVaddressArr.map((eachCity, index) => {
        const districtsObj = { 'dId': index + 1, 'districtStr': eachCity ? eachCity : "" }
        newArr.push(districtsObj)
        setDistricts(newArr)
      })
    }
  }, [courses, courseOrigin, auth])

  // 篩選
  useEffect(() => {
    const newCoursesArray = courses.filter(
      (course) =>

        (!course.address ? true : districtArr.includes(course.address.slice(0, 3))) &&
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
          : course.appointment_start > dateStart || !course.appointment_start) &&
        (!dateEnd ? true : course.appointment_end < dateEnd || !course.appointment_end) &&
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
  // 清除搜尋結果
  const handleClear = (e) => {
    setSearchTerm("")
    router.push({
      pathname: '/course',
      query: {},
    }, undefined, { scroll: false });
    setIsHomePage(true)
    setCurrentPage(1)
  }
  return (
    <>
      <Head>
        <title>醺迷仙園｜課程首頁</title>
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
        <Arrtotop />

        <CourseNav setIsHomePage={setIsHomePage} isHomePage={isHomePage} setCurrentPage={setCurrentPage} />

        {/* first page start */}
        <div
          className={`container-fluid course-first-page ${isHomePage ? "d-block" : "d-none"
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
            userId={userId}
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
            handleNavClear={handleClear}
          />
        </div>
        {/* first page end */}

        {/* page two 我的課程 start */}
        <div
          className={`container-fluid px-0 ${isHomePage ? "d-none" : "d-block"
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
                      src={`http://winderland.shop/uploads/course_and_tarot/courses-no-result.png`}
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
          className={`container-fluid py-3 ${isHomePage ? "d-block" : "d-none"
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
