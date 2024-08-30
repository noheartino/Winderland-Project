import CourseList from "@/components/course/course-list";
import CourseNav from "@/components/course/course-nav";
import { useRouter } from "next/router";
import CourseBox from "@/components/course/course-courseBox";
import { useState, useEffect, useRef } from "react";
import CourseCardSm from '@/components/course/course-card-sm'
import Link from "next/link";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";

export default function CourseIndex() {
  const router = useRouter();
  const { search, view } = router.query;
  let apiUrl = `http://localhost:3005/api/course`
  const [courses, setCourses] = useState([]);
  const [comments, setComments] = useState([]);
  const [classAssigns, setClassAssigns] = useState([]);
  const [myFavoriteCourse, setMyFavoriteCourse] = useState([]);
  const [myCourse, setMyCourse] = useState([]);
  const [myFirstFavoriteCourse, setmyFirstFavoriteCourse] = useState({});
  const [firstMyCourse, setFirstMyCourse] = useState({});
  const [isHomePage, setIsHomePage] = useState(true);
  const [courseBtn, setCourseBtn] = useState("");

  const courseBtn01 = useRef(null)
  const courseBtn02 = useRef(null)
  const courseBtn03 = useRef(null)

  useEffect(() => {
    // const includeImages = false;
    console.log("search 或 view 偵測到變動");
    if(!search && !view){
      apiUrl=`http://localhost:3005/api/course`
      console.log("送出1");
    }
    if(search){
      apiUrl=`http://localhost:3005/api/course?search=${search}`
      console.log("送出2");
    }
    if(view){
      apiUrl=`http://localhost:3005/api/course?view=${view}`
      console.log("送出3, view值為"+view);
    }
    console.log(apiUrl);
    // 當組件掛載時執行 fetch 請求 紀錄0823 0451
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        console.log(response.json);
        return response.json();
      })
      .then((data) => {
        const { courses, comments, classAssigns, myFavoriteCourse, myCourse } =
          data;
        // 處理 courses 資料，將 images 字段轉換為數組
        const processedCourses = courses.map((course) => ({
          ...course,
          images: course.path ? course.path : [],
        }));
        setComments(comments);
        setCourses(processedCourses);
        setClassAssigns(classAssigns);
        setMyFavoriteCourse(myFavoriteCourse);
        setMyCourse(myCourse);
        setmyFirstFavoriteCourse(...myFavoriteCourse.slice(0, 1));
        setFirstMyCourse(...myCourse.slice(0, 1));
        // if(isHomePage){clearBtnHref()}
      })
      .catch((error) => {
        console.log(error);
      });
  }, [view, search]);
  // console.log(myFirstFavoriteCourse[0]);

  function clickCourseBtn(e, btnRef) {
    const buttonText = e.target.textContent;
    setCourseBtn(buttonText);
    courseBtn01.current.classList.remove('active');
    courseBtn02.current.classList.remove('active');
    courseBtn03.current.classList.remove('active');

    // 讓按鈕獲得焦點
    btnRef.current.focus();

    // 添加 active 類別到所選按鈕
    btnRef.current.classList.add('active');
  }

  useEffect(() => {
    if (courseBtn) {
      courseBtnHref(courseBtn);
    }
  }, [courseBtn]);

  function courseBtnHref(buttonText) {
      router.push({
        pathname: '/course',
        query: { view: buttonText },
      }, undefined, {scroll: false});
      console.log("推一個路由: /course?view="+buttonText+"，courseBtn="+courseBtn+"，buttonText="+buttonText);
  }
  function clearQuery() {
    router.push({
      pathname: '/course',
      query: {},
    });
}
  
  return (
    <>
    

      <title>課程首頁</title>
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
        <div className={`container-fluid course-first-page ${isHomePage?'d-block':'d-none'}`}>
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
                          className="fa-solid fa-chevron-right text-sec-orange"
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
                    <CourseBox myBox={firstMyCourse} classAssigns={classAssigns} setIsHomePage={setIsHomePage} />
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
                          className="fa-solid fa-chevron-right text-sec-orange"
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
                    {<CourseBox myBox={myFirstFavoriteCourse} classAssigns={classAssigns} />}
                  </div>
                  {/* myfavorite course box online end */}
                </div>
              </div>
            </div>
          </div>
          {/* page one 我的課程&收藏課程 end */}

          <CourseList
            courses={courses}
            comments={comments}
            classAssigns={classAssigns}
          />
        </div>
        {/* first page end */}

        {/* page two 我的課程 start */}
        <div className={`container-fluid px-0 ${isHomePage?'d-none':'d-block'}`}>
          <div className="container-sm px-0 my-5">
            <div className="px-10px">
              <div className="row px-0 m-0 justify-content-center justify-content-md-start course-card-header-page2 align-items-center">
                <span className="col-auto h4 pe-2 spac-2 m-0">
                  <strong>我的課程</strong>
                </span>
                <span className="col-auto text-gray-light spac-1">
                  ｜&nbsp;正在學習中的課程內容
                </span>
              </div>
              <div className="row px-0 m-0 mb-5 gap-2 justify-content-center justify-content-md-start">
                <div type="button" className="btn-light-to-prim active btn py-1 px-3 spac-1" ref={courseBtn01} onClick={(e) => clickCourseBtn(e, courseBtn01)}>
                  全部
                </div>
                <div type="button" className="btn-light-to-prim btn py-1 px-3 spac-1" ref={courseBtn02} onClick={(e) => clickCourseBtn(e, courseBtn02)}>
                  線上
                </div>
                <div type="button" className="btn-light-to-prim btn py-1 px-3 spac-1" ref={courseBtn03} onClick={(e) => clickCourseBtn(e, courseBtn03)}>
                  實體
                </div>
              </div>
            </div>
            <div className="row px-0 m-0 course-mycourse-box row-gap-5">
              {/* card-sm online start */}
              {myCourse && myCourse.length>0 ? 
                myCourse.map((course) => {
                const { class_id } = course;
                let averageRating = 0;
                let classAssignsQ = 0;
                  const filteredComments = comments.filter(comment => comment.entity_type === "class" && comment.entity_id === class_id);
                  if(filteredComments){
                    const ratings = filteredComments.map(comment => comment.rating);
                    averageRating = (ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length).toFixed(1);;
                  }else{
                    averageRating = 0
                  }
                  const filteredclassAssigns = classAssigns.filter(classAssign => classAssign.class_id === class_id && classAssign.status !== 'cancelled');
                  if(filteredclassAssigns){
                    classAssignsQ = filteredclassAssigns.length;
                  }else{
                    classAssignsQ = 0
                  }
                  
                  function handleHref(e, class_id) {
                    e.preventDefault();
                    router.push(`/course/${class_id}`);
                  }

              return (
                <div key={class_id} onClick={(e)=>handleHref(e, class_id)} className='col-12 col-md-4 col-lg-3 px-10px d-flex flex-column align-items-center justify-content-between'>
                  <CourseCardSm course={course} averageRating={averageRating} classAssignsQ={classAssignsQ}/>
                </div> 
              );
            })
               :
               <div className='col-12 col-md-4 col-lg-3 px-10px'><h5 className="spac-1 text-gray">目前尚無課程<i className="ms-2 fa-solid fa-wine-glass-empty"></i></h5></div>}
              {/* card-sm online end */}
              
            </div>
            <div className="spac-1 btn-border-wine btn mt-4" onClick={(e)=>{setIsHomePage(true);clearQuery()}}><i className="fa-solid fa-chevron-left me-1"></i>回到課程首頁</div>
          </div>
        </div>
        {/* page two 我的課程 end */}

        {/* page-nav-bar start */}
        <div className={`container-fluid py-3 ${isHomePage?'d-block':'d-none'}`}>
          <div className="container-sm">
            <div className="row justify-content-between">
              <div className="col-auto">
              <Link href="/course/teacher"> 
                <span className="h5 text-prim-text-prim spac-1">
                  查看所有講師
                  <i className="fa-solid fa-chevron-right ms-2 text-prim-text-prim"></i>
                </span>
              </Link>
                
              </div>
              <div className="col-auto">page-nav</div>
            </div>
          </div>
        </div>
        {/* page-nav-bar end */}
        {/* <footer></footer> */}
        {/* Bootstrap JavaScript Libraries */}
      </div>

       {/* Footer */}
       <Footer />
    </>
  );
}
