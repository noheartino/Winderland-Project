import { useEffect, useState } from "react";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import TeacherManageHeader from "@/components/course/teacher-manage-header";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import Head from "next/head";

export default function ClassManIndex() {
  const router = useRouter();

  // 抓取 user 資料
  const authData = useAuth().auth.userData;
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (authData && authData.id > 0) {
      setUserId(authData.id);
      console.log("----> set UserId = " + authData.id);
    }
  }, [authData]);

  // 選擇上傳圖片
  const [Cimage, setCImage] = useState(
    "/images/course_and_tarot/classImgDefault.png"
  ); // 存儲圖片 URL
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // 獲取選中的文件
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCImage(reader.result); // 設置圖片 URL 到狀態
      };
      reader.readAsDataURL(file); // 讀取文件為 data URL
    }
  };
  function handleReset() {
    setCImage("/images/course_and_tarot/classImgDefault.png");
  }

  // 選擇上傳影片
  const [Cvideo, setCvideo] = useState(
    "/images/course_and_tarot/classImgDefault.png"
  ); // 存儲圖片 URL
  const handleVdioUpload = (event) => {
    const file = event.target.files[0]; // 獲取選中的文件
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvideo(reader.result); // 設置圖片 URL 到狀態
      };
      reader.readAsDataURL(file); // 讀取文件為 data URL
    }
  };

  return (
    <>
      <Head>
        <title>醺迷仙園｜課程編輯</title>

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
            <div className="CManageNavT">編輯課程</div>
            <div className="CManageNavList">
              <Link href="/course/teacher/management" className="CArmallc">
                <div className="CNavListLi">課程管理</div>
              </Link>
              <Link
                href="/course/teacher/management/create"
                className="CArmall"
              >
                <div className="CNavListLi">新增課程</div>
              </Link>
              <Link
                href="/course/teacher/management/manage/12"
                className="CArmall CNowUnderLI"
              >
                <div className="CNavListLi CNowUnderLI">編輯課程</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="eventCreateWrite">
          <div className="container">
            <form
              action="http://localhost:3005/course/teacher/management"
              method="post"
              encType="multipart/form-data"
            >
              <div className="row row-gap-3">
                <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                  <div className="row gx-2 gx-lg-4 row-gap-3">
                    <div className="col-12 d-flex flex-column gap-1">
                      {/* 用來寫入不顯示的資料 */}
                      {/* <input type="hidden" name="noweventid"/> */}

                      <label htmlFor="className" className="CmanageCreateTag">
                        課程名稱 (0/25)
                        {/* 必填、不可超過25字 */}
                      </label>
                      <input
                        type="text"
                        name="class_name"
                        id="className"
                        className="CourseCreateInput"
                      />
                    </div>
                  </div>
                  <div className="row gx-2 gx-lg-4 row-gap-3">
                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="teacherName" className="CmanageCreateTag">
                        授課教師
                        {/* 必填，改下拉選單 */}
                      </label>
                      <input
                        type="text"
                        name="teacher_name"
                        id="teacherName"
                        className="CourseCreateInput"
                      />
                    </div>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label
                        htmlFor="studentLimit"
                        className="CmanageCreateTag"
                      >
                        人數上限
                      </label>
                      <input
                        type="number"
                        name="student_limit"
                        id="studentLimit"
                        className="CourseCreateInput"
                      />
                      {/* 必填，檢查數字必須是大於0的整數 */}
                    </div>
                  </div>
                  <div className="row gx-2 gx-lg-4 row-gap-3">
                    <div className="col-4 d-flex flex-column gap-1">
                      <label
                        htmlFor="courseStartDate"
                        className="CmanageCreateTag"
                      >
                        開始上課日期
                        {/* 線上不顯示欄位。實體必填且不可晚於結束日期 */}
                      </label>
                      <input
                        type="date"
                        name="class_start_date"
                        id="classStartDate"
                        className="CourseCreateInput"
                      />
                    </div>
                    <div className="col-4 d-flex flex-column gap-1">
                      <label
                        htmlFor="courseEndDate"
                        className="CmanageCreateTag"
                      >
                        課程結束日期
                        {/* 線上不顯示欄位。實體必填 */}
                      </label>
                      <input
                        type="date"
                        name="class_end_date"
                        id="classEndDate"
                        className="CourseCreateInput"
                      />
                    </div>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label
                        htmlFor="assignStartDate"
                        className="CmanageCreateTag"
                      >
                        報名開始日期
                        {/* 線上不顯示欄位。實體必填且不可晚於結束日期 */}
                      </label>
                      <input
                        type="date"
                        name="assign_start_date"
                        id="assignStartDate"
                        className="CourseCreateInput"
                      />
                    </div>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label
                        htmlFor="assignEndDate"
                        className="CmanageCreateTag"
                      >
                        報名截止日期
                        {/* 線上不顯示欄位。實體必填 */}
                      </label>
                      <input
                        type="date"
                        name="assign_end_date"
                        id="assignEndDate"
                        className="CourseCreateInput"
                      />
                    </div>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label
                        htmlFor="dailyStartTime"
                        className="CmanageCreateTag"
                      >
                        上課時間
                        {/* 線上不顯示欄位。實體必填且不可晚於結束時間 */}
                      </label>
                      <input
                        type="time"
                        name="daily_start_time"
                        id="dailyStartTime"
                        className="CourseCreateInput"
                      />
                    </div>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label
                        htmlFor="dailyEndTime"
                        className="CmanageCreateTag"
                      >
                        下課時間
                        {/* 線上不顯示欄位。實體必填 */}
                      </label>
                      <input
                        type="time"
                        name="daily_end_time"
                        id="dailyEndTime"
                        className="CourseCreateInput"
                      />
                    </div>
                  </div>
                  <div className="row gx-2 gx-lg-4 row-gap-3">
                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="classCity" className="CmanageCreateTag">
                        開課縣市
                      </label>
                      <input
                        type="text"
                        name="class_city"
                        id="classCity"
                        className="CourseCreateInput"
                        placeholder="--請選擇縣市"
                      />
                      {/* 線上不顯示欄位。實體必填，改成下拉選單 */}
                    </div>

                    <div className="col-8 d-flex flex-column gap-1">
                      <label
                        htmlFor="classCityDetail"
                        className="CmanageCreateTag"
                      >
                        詳細開課地址 (0/40)
                      </label>
                      <input
                        type="text"
                        name="class_city_detail"
                        id="classCityDetail"
                        className="CourseCreateInput"
                        placeholder="--請輸入不包含縣市在內的詳細地點"
                      />
                      {/* 線上不顯示欄位。實體必填，不可超過50字元 */}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4 d-flex flex-column gap-1">
                  <label
                    htmlFor="classPic"
                    className="form-label CmanageCreateTag"
                  >
                    課程縮圖
                  </label>
                  <img src={Cimage} alt="" className="Cprevpic" />
                  <input
                    className="form-control"
                    type="file"
                    id="classPic"
                    name="classImgFile"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="classVdio"
                    className="form-label CmanageCreateTag mt-2"
                  >
                    課程影片
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="classVdio"
                    name="classVdioFile"
                    onChange={handleVdioUpload}
                  />
                  {/* 實體時隱藏欄位 */}
                </div>
                <div className="col-12 d-flex flex-column gap-1">
                  <label htmlFor="classSummary" className="CmanageCreateTag">
                    課程摘要 (0/500)
                  </label>
                  <textarea
                    name="classSummary"
                    id="classSummary"
                    placeholder="請輸入課程摘要"
                  />
                  {/* 非必填，字數檢查500字 */}
                </div>
                <div className="col-12 d-flex flex-column gap-1">
                  <label htmlFor="classIntro" className="CmanageCreateTag">
                    課程內容 (0/1500)
                  </label>
                  <textarea
                    name="classIntro"
                    id="classIntro"
                    placeholder="請輸入課程內容"
                  />
                  {/* 必填，字數檢查1500字 */}
                </div>
                <div className="col-12 d-flex gap-1 justify-content-end mt-3">
                  <button
                    type="reset"
                    className="CeventCR"
                    onClick={handleReset}
                  >
                    清空
                  </button>

                  <button type="submit" className="CeventCS d-block">
                    新增課程
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
