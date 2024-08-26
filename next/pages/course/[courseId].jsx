import React from "react";
import Comment from "@/components/course/course-comment";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CourseIndex() {
  const router = useRouter();
  const { courseId } = router.query;
  const [course, setCourse] = useState([]);
  const [theCourseAssigned, setCourseAssigned] = useState([]);

  let apiUrl = `http://localhost:3005/api/course/${courseId}`;

  useEffect(() => {
    if (courseId) {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response not ok");
          }
          return response.json();
        })
        .then((data) => {
          const { course, theCourseAssigned } = data;
          setCourse(course[0]);
          setCourseAssigned(theCourseAssigned[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [courseId]);

  function handleStartTimeStr(startTime) {
    const startDate=new Date(startTime)
    const today = new Date();
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    if (startDate < sixMonthsAgo) {
      return "半年前";
    } else if (startDate < threeMonthsAgo) {
      return "三個月前";
    } else if (startDate < oneMonthAgo) {
      return "一個月前";
    } else {
      return startTime;
    }
  }

  return (
    <>
      <title>課程詳情</title>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <div className="course_wrap">
        <header></header>

        {/* page three course-detail start */}
        <div className="container-fluid px-0 m-0">
          <div className="container-fluid px-0">
            <div className="container-sm px-0">
              <div className="row px-0 m-0 pt-5 mb-4 d-none d-md-flex">
                <div className="col px-10px">
                  <span
                    className={`me-4 py-2 px-3 h6 ${
                      course?.online === 1 ? "online-tag" : "underline-tag"
                    }`}
                  >
                    {course?.online === 1 ? "線上" : "實體"}
                  </span>
                  <span className="text-prim-dark spac-1 me-5 h6">
                    {course?.class_name}
                  </span>
                  <span className="text-prim-dark spac-1 h6">
                    <i className="bi bi-clock-history me-2" />
                    {handleStartTimeStr(course?.appointment_start)}
                  </span>
                </div>
              </div>
              {/* course-detail md 寬度時顯示 start */}
              <div className="container-fluid px-0 d-none d-md-block">
                <div
                  className="row px-0 m-0 md-screen-show d-none d-md-flex"
                  style={{ paddingBottom: "280px" }}
                >
                  <div className="col-8 px-10px">
                    <div className="course-body d-flex align-items-center w-100">
                      <div className="course-leftcontent w-100 course-mycourse-box">
                        <div
                          className="course-video-video rounded-md-0 overflow-hidden w-100 position-relative"
                          href=""
                        >
                          <img
                            className="course-img21"
                            src="/images/course_and_tarot/rectangle128.png"
                            alt=""
                          />
                          <div className="absolute-t0-l0 w-100 h-100 d-flex justify-content-center align-items-center">
                            <a href="">
                              <i className="fa-solid fa-circle-play text-white opacity-50 course-detail-player" />
                            </a>
                          </div>
                        </div>
                        <div className="progress-bar-area">
                          <div className="course-process-header d-flex justify-content-between mt-4">
                            <span className="h6 text-sec-dark-blue spac-1">
                              課程時長-5小時
                            </span>
                            <span className="h6 text-sec-dark-blue spac-1">
                              已完成0%
                            </span>
                          </div>
                          <div
                            className="progress mt-3 bg-sec-blue"
                            role="progressbar"
                            aria-label=""
                            aria-valuenow={0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ height: "5px" }}
                          >
                            <div
                              className="progress-bar bg-sec-blue-dark"
                              style={{ width: "0%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="course-body-2 col px-10px ms-3 h-100">
                    <h2 className="spac-2 lh-15 text-prim-text-prim">
                      <strong>
                        迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                      </strong>
                    </h2>

                    <div className="row align-items-center mt-3 justify-content-between mx-0">
                      <h5 className="col-auto text-prim-text-prim spac-1">
                        by 蔡孝倫
                      </h5>
                      <div className="col-auto stars mt-2 d-flex align-items-center px-0">
                        <i className="fa-solid fa-star star-with-score" />
                        <i className="fa-solid fa-star star-with-score" />
                        <i className="fa-solid fa-star star-with-score" />
                        <i className="fa-solid fa-star star-with-score" />
                        <i className="fa-solid fa-star star-with-score" />
                        <span className="ms-2 spac-1 text-sec-dark-blue">
                          4.8
                        </span>
                      </div>
                    </div>
                    <div className="row mx-0 text-sec-dark-blue spac-1 mt-4">
                      <div className="col-12 p-0">
                        <p className="text-sec-dark-blue emmit1">
                          <i className="fa-regular fa-calendar-days me-1"></i>
                          上課日期：2024年8月24日-2024年8月25日
                        </p>
                      </div>
                    </div>
                    <div className="row mx-0 text-sec-dark-blue spac-1 mt-2">
                      <div className="col-12 p-0">
                        <p className="text-sec-dark-blue emmit1">
                          <i
                            className="fa-regular fa-clock me-1"
                            style={{ fontSize: "0.7rem" }}
                          ></i>
                          上課時間：每日9:00-10:00
                        </p>
                      </div>
                    </div>
                    <div className="row mx-0 spac-1 mt-2">
                      <div className="col-12 p-0">
                        <p className="text-sec-dark-blue emmit1">
                          <i
                            className="fa-regular fa-compass me-1"
                            style={{ fontSize: "0.7rem" }}
                          ></i>
                          上課地點：台北市復興北路356號2F(酒訊品酒教室)
                        </p>
                      </div>
                    </div>

                    <div className="row mt-5 justify-content-between align-items-start">
                      <div className="col-auto">
                        <div className="h2 spac-2 text-sec-orange">
                          <strong>NT$3,500</strong>
                        </div>
                        <p className="text-gray-light h5 spac-2 mt-3">
                          <del>NT$5,500</del>
                        </p>
                      </div>
                      <a
                        href="/"
                        className="col-auto d-flex align-items-center mt-1"
                      >
                        <h5 className="text-prim-text-prim spac-2">收藏</h5>
                        <i
                          className="ms-2 fa-regular fa-bookmark text-prim-text-prim"
                          style={{ fontSize: "1.7rem" }}
                        />
                      </a>
                    </div>
                    <div className="row h-100">
                      <div className="col-12 d-flex align-items-end">
                        <button className="btn spac-3 btn-sec-orange w-100 mt-3 py-4">
                          加入購物車
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 置頂小卡 md 螢幕時顯示 start */}
                <div
                  className="container-fluid px-0 position-relative d-none d-md-block"
                  style={{ marginBlock: "-200px" }}
                >
                  <div className="container-sm px-0">
                    <div className="container-fluid bg-light-gray rounded-5 w-100 shadow">
                      <div className="container-sm px-0 teacher-intro-card">
                        <div className="row p-2 p-md-4 mx-2 align-items-center justify-content-center">
                          <a
                            className="teacher-head col-auto me-3 px-0"
                            href="/"
                          >
                            <img
                              className="course-img21"
                              src="/images/course_and_tarot/Ellipse 8.png"
                              alt=""
                            />
                          </a>
                          <div className="teacher-text-box col col-md-4 col-lg-7 ms-3">
                            <div className="row align-items-center">
                              <div className="teacher-card-name col">
                                <a href="">
                                  <h2 className="spac-2 text-prim-dark lh-15">
                                    蔡孝倫
                                  </h2>
                                </a>
                                <a href="">
                                  <h5 className="spac-2 text-prim-dark lh-15">
                                    Alex Tsai
                                  </h5>
                                </a>
                              </div>
                              <a className="col-auto" href="/">
                                <div className="teacher-more d-flex align-items-center">
                                  <h5 className="spac-2 text-prim-dark lh-15 me-2">
                                    講師詳情
                                  </h5>
                                  <i className="fa-solid fa-chevron-right text-prim-dark mt-1" />
                                </div>
                              </a>
                            </div>
                            <hr className="my-4" />
                            <h5 className="spac-2 text-prim-dark lh-15 text-justify teacher-intro-card-text">
                              原本從事生化研究，但在就讀英國萊斯特大學生化所博士班期間，發現自己興趣並不在做研究而放棄學位。在餐廳打工時發現自己對葡萄酒的興趣與服務的熱情，決定學習葡萄酒與西方飲食文化，並在倫敦通過WSET
                              Level 1 和 WSET Level
                              2認證後，正式從事侍酒師的工作。
                              回到台灣後，先在酒商任職，觀察並了解台灣的葡萄酒市場生態與消費者行為，之後任職於法式餐廳、本土五星級飯店與國際六星級飯店擔任侍酒師與管理工作。期間仍積極參與各項品酒講座與教學，並陸續通過國際專業葡萄酒課程認證。專長是餐酒搭配、葡萄酒教學與侍酒師教育訓練。現為台北文華東方酒店義大利廳副理。
                              經歷： 長榮桂冠酒坊 門市銷售 (Nov/2009-May/2011)
                              品爵生活法式小館 侍酒師 (Jun/2011-Sep/2012)
                              維多麗亞酒店
                              餐飲部副理兼首席侍酒師(Apr/2013-Jul/2014)
                              台北文華東方酒店
                              餐飲部Bencotto義大利餐廳副理(Jul/2014 to date)
                              專業認證： 英國WSET (Wine and Spirit Education
                              Trust葡萄酒與烈酒教育基金會) Level 1 初級, Level 2
                              中級(2009) 與Level 3高級(2013) 品酒師認證
                              西班牙葡萄酒學院(The Wine Academy of Spain)
                              認證講師(2011) 國際侍酒師公會(ISG) Level 1 初級與
                              Level 2 高級(2012) 侍酒師認證
                              法國布根地葡萄酒公會BIVB(Bureau Interprofessionnel
                              des Vins de Bourgogne) 專家認證(2013): Honour of
                              Burgundy Wine Connoisseur Certificate 比賽經歷：
                              TSA台灣最佳侍酒師比賽決賽入圍(Sep. 2012) Sopexa
                              台灣最佳法國侍酒師競賽亞軍(Jul. 2015) Sopexa
                              亞洲最佳法國侍酒師比賽台灣代表, 準決賽入圍(Dec
                              2015) 媒體專訪： 好吃 雜誌 Vol.11, Winter 2013,
                              page 68-69 Wine Spectator Restaurant Award of
                              Excellence, Issue Aug. 2014, page 155
                              玩高爾夫雜誌One Golf, Issue 45, Oct. 2014 page
                              86-87 The Drink Business: Taipei’s Top Sommeliers,
                              16th February, 2016 by Lucy Jenkins
                            </h5>
                          </div>
                          <div className="teacher-starts col d-flex flex-column align-items-center justify-content-center pe-0">
                            <h1 className="spac-2 text-prim-text-prim ms-2">
                              4.8
                            </h1>
                            {/* bigStar start */}
                            <div className="bigStar-box">
                              <i className="fa-solid fa-star bigStar bigStar-beneath  text-light-wine-border" />
                              <i
                                className="fa-solid fa-star bigStar bigStar-above"
                                style={{ width: "65%" }}
                              />
                            </div>
                            {/* bigStar end */}
                            <p className="text-prim-text-prim">教師平均評分</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 置頂小卡 md 螢幕時顯示 end */}
              </div>
              {/* course-detail md 寬度時顯示 end */}
              {/* course-detail 手機時顯示 start */}
              <div className="row small-screen-show d-flex d-md-none">
                <div className="col-12 d-flex flex-column align-items-center px-0">
                  <div
                    className="course-video-video position-relative mb-3"
                    href=""
                  >
                    <img
                      className="course-img21"
                      src="/images/course_and_tarot/rectangle128.png"
                      alt=""
                    />
                    <div className="absolute-t0-l0 w-100 h-100 d-flex justify-content-center align-items-center">
                      <a href="">
                        <i className="fa-solid fa-circle-play text-white opacity-50 course-detail-player" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="course-body-2 col px-10px h-100">
                  <h1 className="spac-2 lh-15 text-prim-text-prim">
                    <strong>
                      迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                    </strong>
                  </h1>

                  <div className="row mx-0 text-sec-dark-blue spac-1 mt-4">
                    <div className="col-12 p-0">
                      <p className="text-sec-dark-blue">
                        <i className="fa-regular fa-calendar-days me-1"></i>
                        上課日期：2024年8月24日-2024年8月25日
                      </p>
                    </div>
                  </div>
                  <div className="row mx-0 text-sec-dark-blue spac-1 mt-2">
                    <div className="col-12 p-0">
                      <p className="text-sec-dark-blue">
                        <i
                          className="fa-regular fa-clock me-1"
                          style={{ fontSize: "0.9rem" }}
                        ></i>
                        上課時間：每日9:00-10:00
                      </p>
                    </div>
                  </div>
                  <div className="row mx-0 spac-1 mt-2">
                    <div className="col-12 p-0">
                      <p className="text-sec-dark-blue">
                        <i
                          className="fa-regular fa-compass me-1"
                          style={{ fontSize: "0.9rem" }}
                        ></i>
                        上課地點：台北市復興北路356號2F(酒訊品酒教室)
                      </p>
                    </div>
                  </div>

                  <div className="row align-items-center mt-3 justify-content-between mx-0">
                    <h5 className="col-auto text-prim-text-prim spac-1">
                      by 蔡孝倫
                    </h5>
                    <div className="col-auto stars mt-2 d-flex align-items-center">
                      <i className="fa-solid fa-star star-with-score" />
                      <i className="fa-solid fa-star star-with-score" />
                      <i className="fa-solid fa-star star-with-score" />
                      <i className="fa-solid fa-star star-with-score" />
                      <i className="fa-solid fa-star star-with-score" />
                      <span className="ms-2 spac-1 text-sec-dark-blue">
                        4.8
                      </span>
                    </div>
                  </div>
                  <div className="row justify-content-between align-items-center mt-4 mx-0">
                    <span className="col-auto online-tag me-4 h6">線上</span>
                    <span className="col-auto h6">
                      <span className="p text-gray-light h5 spac-2 mt-3 me-4">
                        <del>NT$5,500</del>
                      </span>
                      <span className="h2 spac-2 text-sec-orange">
                        <strong>NT$3,500</strong>
                      </span>
                    </span>
                  </div>
                  <div className="progress-bar-area mb-5">
                    <div className="course-process-header d-flex justify-content-between mt-4">
                      <span className="h6 text-sec-dark-blue spac-1">
                        限額總數-50人
                      </span>
                      <span className="h6 text-sec-dark-blue spac-1">0%</span>
                    </div>
                    <div
                      className="progress mt-3 bg-sec-blue"
                      role="progressbar"
                      aria-label=""
                      aria-valuenow={0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ height: "8px" }}
                    >
                      <div
                        className="progress-bar bg-sec-blue-dark"
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                  <div className="row teacher-sm-introduce my-5">
                    <a className="teacher-head col-auto px-0" href="/">
                      <img
                        src="/images/course_and_tarot/Ellipse 8.png"
                        alt=""
                      />
                    </a>
                    <div className="teacher-text-box col px-4">
                      <div>
                        <span className="h3 spac-2 text-prim-dark lh-15">
                          蔡孝倫
                        </span>
                        <span className="h6 spac-2 text-prim-dark lh-15">
                          Alex Tsai
                        </span>
                        <i className="fa-solid fa-chevron-right text-prim-dark mt-1" />
                      </div>
                      <hr className="my-4" />
                      <p className="spac-1 text-prim-dark lh-15 text-justify teacher-intro-card-text">
                        原本從事生化研究，但在就讀英國萊斯特大學生化所博士班期間，發現自己興趣並不在做研究而放棄學位。在餐廳打工時發現自己對葡萄酒的興趣與服務的熱情，決定學習葡萄酒與西方飲食文化，並在倫敦通過WSET
                        Level 1 和 WSET Level 2認證後，正式從事侍酒師的工作。
                        回到台灣後，先在酒商任職，觀察並了解台灣的葡萄酒市場生態與消費者行為，之後任職於法式餐廳、本土五星級飯店與國際六星級飯店擔任侍酒師與管理工作。期間仍積極參與各項品酒講座與教學，並陸續通過國際專業葡萄酒課程認證。專長是餐酒搭配、葡萄酒教學與侍酒師教育訓練。現為台北文華東方酒店義大利廳副理。
                        經歷： 長榮桂冠酒坊 門市銷售 (Nov/2009-May/2011)
                        品爵生活法式小館 侍酒師 (Jun/2011-Sep/2012) 維多麗亞酒店
                        餐飲部副理兼首席侍酒師(Apr/2013-Jul/2014)
                        台北文華東方酒店 餐飲部Bencotto義大利餐廳副理(Jul/2014
                        to date) 專業認證： 英國WSET (Wine and Spirit Education
                        Trust葡萄酒與烈酒教育基金會) Level 1 初級, Level 2
                        中級(2009) 與Level 3高級(2013) 品酒師認證
                        西班牙葡萄酒學院(The Wine Academy of Spain)
                        認證講師(2011) 國際侍酒師公會(ISG) Level 1 初級與 Level
                        2 高級(2012) 侍酒師認證 法國布根地葡萄酒公會BIVB(Bureau
                        Interprofessionnel des Vins de Bourgogne)
                        專家認證(2013): Honour of Burgundy Wine Connoisseur
                        Certificate 比賽經歷：
                        TSA台灣最佳侍酒師比賽決賽入圍(Sep. 2012) Sopexa
                        台灣最佳法國侍酒師競賽亞軍(Jul. 2015) Sopexa
                        亞洲最佳法國侍酒師比賽台灣代表, 準決賽入圍(Dec 2015)
                        媒體專訪： 好吃 雜誌 Vol.11, Winter 2013, page 68-69
                        Wine Spectator Restaurant Award of Excellence, Issue
                        Aug. 2014, page 155 玩高爾夫雜誌One Golf, Issue 45, Oct.
                        2014 page 86-87 The Drink Business: Taipei’s Top
                        Sommeliers, 16th February, 2016 by Lucy Jenkins
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-between align-items-center my-3">
                    <a href="/" className="col-auto p-2">
                      <i
                        className="fa-regular fa-bookmark text-prim-text-prim"
                        style={{ fontSize: "2rem" }}
                      />
                    </a>
                    <div className="col pe-0">
                      <button className="btn w-100 spac-3 btn-sec-orange py-2">
                        <h6 className="text-white">加入購物車</h6>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* course-detail 手機時顯示 end */}
            </div>
          </div>
          <div className="container-fluid rounded-top-5 course-detail-content-text">
            <div className="container-sm px-0 d-flex flex-column align-items-center">
              <div className="course-detail-content-text-widthControl">
                <div className="d-flex justify-content-center justify-content-md-start align-items-center">
                  <i className="fa-solid fa-square me-3 d-inline-block d-md-none" />
                  <span className="h4 text-prim-dark lh-15 spac-2">
                    <strong>課程內容</strong>
                  </span>
                  <i className="fa-solid fa-square ms-3 d-inline-block d-md-none" />
                </div>
                <br />
                <h5 className="text-prim-dark lh-15 spac-2">
                  將葡萄酒知識應用在商務應酬或社交場合想更了解葡萄酒並進一步學習如何品飲想透過學習餐酒搭配、品酒禮儀提升生活品味學習依據場合購買適合的葡萄酒
                </h5>
                <br />
                <br />
                <br />
                <h5 className="text-prim-dark lh-25 spac-2">
                  <strong>* 葡萄酒釀造與風格探索</strong>
                  <br />
                  1-1 了解釀造的魔法，認識各式葡萄酒的差異
                  <br />
                  1-2 品飲葡萄酒的前置作業（開瓶、溫度、選酒杯）
                  <br />
                  1-3 認識葡萄酒的關鍵字！酸度、單寧怎麼形容？
                  <br />
                  1-4 品飲市面上的葡萄酒嚐出風味大方向-上
                  <br />
                  1-5 品飲市面上的葡萄酒嚐出風味大方向-下
                  <br />
                  1-6 辨別葡萄酒的好壞！有這些味道不要喝
                  <br />
                  <strong>* 生活場景認識葡萄酒</strong>
                  <br />
                  2-1 如何在餐廳點酒？了解產區與價格
                  <br />
                  2-2 葡萄酒搭餐小撇步！不是只能紅酒配紅肉
                  <br />
                  2-3 約會禮儀要注意，晃杯子到底行不行
                  <br />
                  2-4 喝不完怎麼辦？保存佳釀看這裡
                  <br />
                  <strong>* 葡萄酒採購指南</strong>
                  <br />
                  3-1 看懂酒標不困難！避免被行銷話術迷惑
                  <br />
                  3-2 解讀選酒 App 與各大評鑑指標
                  <br />
                  3-3 不同場合怎麼買酒？送禮要注意什麼嗎？
                  <br />
                  3-4 與客戶聊葡萄酒！認識五大酒莊及特殊酒款
                  <br />
                  <strong>* 深入瞭解葡萄酒知識</strong>
                  <br />
                  4-1 認識常見葡萄品種與風味基調
                  <br />
                  4-2 進一步認識產區與風味，規劃一場酒莊旅行
                  <br />
                  4-3 葡萄酒的未來趨勢？要怎麼更進一步學習甚至投資？
                  <br />
                  4-4 葡萄酒的分級制度！各地區不一樣怎麼分辨
                </h5>
              </div>
            </div>
          </div>

          {/* course detail 評論 start */}
          <div className="container-fluid course-detail-comment-bg py-5 px-10px">
            <div className="container-sm">
              <div className="course-comment-header d-flex flex-column justify-content-center flex-md-row justify-content-md-between align-items-center mt-3 mb-5 row-gap-3">
                <h4 className="text-prim-text-prim lh-15 spac-2 text-center text-md-start">
                  學員回饋&nbsp;|&nbsp;Comment
                </h4>
                <div className="btn-group course-comment-filter">
                  <button
                    type="button"
                    className="btn btn-border-prim dropdown-toggle rounded-5 px-20px"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="p spac-1 me-5 text-prim-prim">
                      默認排序
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="p spac-1 me-3 text-prim-prim">
                          依評分高→低
                        </span>
                        <i className="fa-solid fa-arrow-down-wide-short text-prim-prim"></i>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="p spac-1 me-3 text-prim-prim">
                          依評分低→高
                        </span>
                        <i className="fa-solid fa-arrow-up-wide-short text-prim-prim"></i>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="p spac-1 me-3 text-prim-prim">
                          依時間新→舊
                        </span>
                        <i className="fa-solid fa-sort-down text-prim-prim"></i>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="p spac-1 me-3 text-prim-prim">
                          依時間舊→新
                        </span>
                        <i className="fa-solid fa-sort-up text-prim-prim"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="course-comment-scorebars-box mb-5 row d-flex d-md-none">
                <div className="col-auto d-flex flex-column align-items-center justify-content-center">
                  <h1 className="spac-2 text-prim-text-prim ms-2">4.8</h1>
                  {/* bigStar start */}
                  <div className="bigStar-box">
                    <i className="fa-solid fa-star bigStar bigStar-beneath  text-light-wine-border" />
                    <i
                      className="fa-solid fa-star bigStar bigStar-above"
                      style={{ width: "65%" }}
                    />
                  </div>
                  {/* bigStar end */}
                  <p className="text-prim-text-prim">1531 則評論</p>
                </div>
                <div className="col course-comment-progress-bar d-flex flex-column justify-content-between">
                  {/* 單條評分bar start */}
                  <div className="row align-items-center">
                    <div className="col-10">
                      <div
                        className="progress bg-light-gray light-wine-border"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "0.65rem" }}
                      >
                        <div
                          className="progress-bar bg-sec-yellow"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">
                      <p className="text-sec-dark-blue">100</p>
                    </div>
                  </div>
                  {/* 單條評分bar end */}
                  {/* 單條評分bar start */}
                  <div className="row align-items-center">
                    <div className="col-10">
                      <div
                        className="progress bg-light-gray light-wine-border"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "0.65rem" }}
                      >
                        <div
                          className="progress-bar bg-sec-yellow"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">
                      <p className="text-sec-dark-blue">100</p>
                    </div>
                  </div>
                  {/* 單條評分bar end */}
                  {/* 單條評分bar start */}
                  <div className="row align-items-center">
                    <div className="col-10">
                      <div
                        className="progress bg-light-gray light-wine-border"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "0.65rem" }}
                      >
                        <div
                          className="progress-bar bg-sec-yellow"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">
                      <p className="text-sec-dark-blue">100</p>
                    </div>
                  </div>
                  {/* 單條評分bar end */}
                  {/* 單條評分bar start */}
                  <div className="row align-items-center">
                    <div className="col-10">
                      <div
                        className="progress bg-light-gray light-wine-border"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "0.65rem" }}
                      >
                        <div
                          className="progress-bar bg-sec-yellow"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">
                      <p className="text-sec-dark-blue">100</p>
                    </div>
                  </div>
                  {/* 單條評分bar end */}
                  {/* 單條評分bar start */}
                  <div className="row align-items-center">
                    <div className="col-10">
                      <div
                        className="progress bg-light-gray light-wine-border"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "0.65rem" }}
                      >
                        <div
                          className="progress-bar bg-sec-yellow"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">
                      <p className="text-sec-dark-blue">100</p>
                    </div>
                  </div>
                  {/* 單條評分bar end */}
                </div>
              </div>
              <Comment />
            </div>
          </div>
          {/* course detail 評論 end */}
        </div>
        {/* page three course-detail end */}

        {/* page-nav-bar start */}
        <div className="container-fluid py-3">
          <div className="container-sm">
            <div className="row justify-content-between">
              <a className="col-auto" href="">
                <span className="h5 text-prim-text-prim spac-1">
                  查看所有講師
                  <i className="fa-solid fa-chevron-right ms-2 text-prim-text-prim"></i>
                </span>
              </a>
            </div>
            <div className="col-auto">page-nav</div>
          </div>
        </div>
        {/* page-nav-bar end */}

        <footer></footer>
        {/* Bootstrap JavaScript Libraries */}
      </div>
    </>
  );
}
