import { useEffect, useState } from 'react';
import Nav from '@/components/Header/Header'
import Footer from '@/components/footer/footer'
import TeacherManageHeader from '@/components/course/teacher-manage-header'
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import Link from "next/link";
import Swal from 'sweetalert2'

export default function ClassManIndex() {

  const router = useRouter();
  const districts = [{dId: 1, districtStr: "台北市"}, {dId: 2, districtStr: "新北市"}, {dId: 3, districtStr: "桃園市"}, {dId: 4, districtStr: "台中市"}, {dId: 5, districtStr: "台南市"}, {dId: 6, districtStr: "高雄市"}, {dId: 7, districtStr: "新竹縣"}, {dId: 8, districtStr: "苗栗縣"}, {dId: 9, districtStr: "彰化縣"}, {dId: 10, districtStr: "南投縣"}, {dId: 11, districtStr: "雲林縣"}, {dId: 12, districtStr: "嘉義縣"}, {dId: 13, districtStr: "屏東縣"}, {dId: 14, districtStr: "宜蘭縣"}, {dId: 15, districtStr: "花蓮縣"}, {dId: 16, districtStr: "台東縣"}, {dId: 17, districtStr: "澎湖縣"}, {dId: 18, districtStr: "金門縣"}, {dId: 19, districtStr: "連江縣"}, {dId: 20, districtStr: "基隆市"}, {dId: 21, districtStr: "新竹市"}, {dId: 22, districtStr: "嘉義市"}]
  const [onOrUnderline, setOnOrUnderline] = useState(null)

  // 抓取 user 資料
  const authData = useAuth().auth.userData
  const [userId, setUserId] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if (authData && authData.id > 0) {
      setUserId(authData.id)
      setIsAdmin(true)
      console.log("----> set UserId = " + authData.id);
    }
  }, [authData])
  // 驗證登入者有權限

  // 抓取所有教師資料
  const [teachers, setTeachers] = useState([])
  useEffect(()=>{
    fetch(`http://localhost:3005/api/course/teacher/management/getTeacherData`)
        .then(response => response.json())
        .then((data) => {
          const { teachers } = data
          setTeachers(teachers)
        })
        .catch(error => console.error('Error:', error));
  }, [])
  // 23 : {id: 24, name: '蘭居岳'}


  // 選擇上傳圖片
  const [Cimage, setCImage] = useState("/images/course_and_tarot/classImgDefault.png");
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
  

  // 選擇上傳影片
  const [Cvideo, setCvideo] = useState(null); // 存儲圖片 URL
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

  // 字數限制提醒
  const [remindMsgBox, setRemindMsgBox] = useState({})
  const handleWordsLimit = (e, wordLimit) => {
  let currentWordsNum = e.target.value.length;
  let columnName = '';
  if (e.target.id === 'className') {
      columnName = '課程名稱';
      document.querySelector('#classNameWordNum').textContent = currentWordsNum;
  }
  if (e.target.id === 'classCityDetail') {
      columnName = '詳細開課地址';
      document.querySelector('#CmanageCreateTagWordNum').textContent = currentWordsNum;
  }
  if (e.target.id === 'classSummary') {
    columnName = '課程摘要';
    document.querySelector('#classSummaryWordNum').textContent = currentWordsNum;
  }
  if (e.target.id === 'classIntro') {
    columnName = '課程內容';
    document.querySelector('#classIntroWordNum').textContent = currentWordsNum;
  }
  if (parseInt(currentWordsNum) <= wordLimit) {
    const currentIdStr = e.target.id;
    setRemindMsgBox(prev => ({...prev, [currentIdStr]: ``}))
    return;
  }
  if (parseInt(currentWordsNum) > wordLimit) {
      const currentIdStr = e.target.id;
      setRemindMsgBox(prev => ({...prev, [currentIdStr]: `提醒: ${columnName}欄位已達字數上限 ${wordLimit}`}))
      e.target.value = e.target.value.slice(0, wordLimit);

      // 更新字數顯示
      if (e.target.id === 'className') {
          document.querySelector('#classNameWordNum').textContent = wordLimit;
      }
      if (e.target.id === 'classCityDetail') {
          document.querySelector('#CmanageCreateTagWordNum').textContent = wordLimit;
      }
      if (e.target.id === 'classSummary') {
        document.querySelector('#classSummaryWordNum').textContent = wordLimit;
      }
      if (e.target.id === 'classIntro') {
        document.querySelector('#classIntroWordNum').textContent = wordLimit;
      }
    }
  }

  const handleOnlineClickClear = ()=>{
    setOnOrUnderline(1)
    console.log(onOrUnderline);
    // 清除實體課程才有的欄位
    const onlyShowWhenUnderline = ["studentLimit", "classStartDate", "classEndDate", "assignStartDate", "assignEndDate", "dailyStartTime", "dailyEndTime", "classCity", "classCityDetail"]
    onlyShowWhenUnderline.forEach((elm)=>{
      const currentElm = document.getElementById(`${elm}`)
      currentElm.value=""
    })
  }

  const handleUnderlineClickClear = ()=>{
    setOnOrUnderline(0)
    console.log(onOrUnderline);
    // 清除線上課程才有的欄位
    const onlyShowWhenOnline = ["classVdio"]
    onlyShowWhenOnline.forEach((elm)=>{
      const currentElm = document.getElementById(`${elm}`)
      currentElm.value=""
    })
  }
  useEffect(() => {
    if(onOrUnderline != null){
      console.log("現在的onOrUnderline是"+onOrUnderline);
      const onlineRadio = document.getElementById('onLine');
      const underlineRadio = document.getElementById('underLine');

      if (onOrUnderline === 1) {
        onlineRadio.checked = true;
      } else if (onOrUnderline === 0) {
        underlineRadio.checked = true;
      }
    }
  }, [onOrUnderline]);

  
// *欄位檢查:

// 正整數檢查

// 開始日期不可晚於結束日期

// 開始時間不可晚於結束時間

// 檔案格式檢查(圖片、影片)


// *檔案上傳函數

  const [mustBeValued, setMustBeValued] = useState({
    className: '',
      teacherId: '',
      studentLimit: '',
      on_and_underline: '',
      classStartDate: '',
      classEndDate: '',
      assignStartDate: '',
      assignEndDate: '',
      dailyStartTime: '',
      dailyEndTime: '',
      classCity: '',
      classCityDetail: '',
      classPrice: '',
      classIntro: '',
      classVdio: '',
  })
  // 檢查 mustBeValued 有有效鍵值對: Object.entries(mustBeValued).filter(([key, value]) => value != "")

  function handleReset(){
    clearIsEmpty();
    setOnOrUnderline(null)
    setCImage("/images/course_and_tarot/classImgDefault.png")
    setCvideo(null)
    setRemindMsgBox({})
    setMustBeValued({
      className: '',
        teacherId: '',
        studentLimit: '',
        on_and_underline: '',
        classStartDate: '',
        classEndDate: '',
        assignStartDate: '',
        assignEndDate: '',
        dailyStartTime: '',
        dailyEndTime: '',
        classCity: '',
        classCityDetail: '',
        classPrice: '',
        classIntro: '',
        classVdio: '',
    })
    router.push('create')
  }

  // 清除 isEmpty 樣式
  const clearIsEmpty = ()=>{
    document.querySelectorAll('.CourseCreateInput').forEach(element => {
      element.classList.remove('isEmpty');
    });
    document.querySelectorAll('.CM-check-input').forEach(element => {
      element.classList.remove('isEmpty');
    });
    document.querySelectorAll('.classIntro').forEach(element => {
      element.classList.remove('isEmpty');
    });
    document.querySelectorAll('.vidAndImg-input').forEach(element => {
      element.classList.remove('isEmpty');
    });
  }
  // 處理送出表單
  const handleSubmit = async (event) => {
    event.preventDefault(); // 防止默認的表單提交
    // if(){
    //   return;
    // }
    const formData = new FormData(event.target); // 獲取表單數據

    // 錯誤檢查狀態

    // 表單檢查--- START ---
    
    // !! 這邊是必填欄位檢查區~
    const newMustBeValuedArr = {
      className: '',
      teacherId: '',
      studentLimit: '',
      on_and_underline: '',
      classStartDate: '',
      classEndDate: '',
      assignStartDate: '',
      assignEndDate: '',
      dailyStartTime: '',
      dailyEndTime: '',
      classCity: '',
      classCityDetail: '',
      classPrice: '',
      classIntro: '',
      classVdio: '',
    }
    if(!document.querySelector("#className").value){
      newMustBeValuedArr.className=`課程名稱為必填欄位`;
    }
    if(!document.querySelector("#teacherId").value){
      newMustBeValuedArr.teacherId=`請選擇授課教師!`;
    }
    if(!document.querySelector('input[name="on_and_underline"]:checked')){
      newMustBeValuedArr.on_and_underline=`請選擇開課性質!`;
    }
    if(document.querySelector('#underLine').checked){
      if(!(document.querySelector("#studentLimit").value)){
        newMustBeValuedArr.studentLimit=`實體課程必須輸入報名人數上限!`;
      }
      if(!(document.querySelector("#classStartDate").value)){
        newMustBeValuedArr.classStartDate=`實體課程必須選擇開課日期!`;
      }
      if(!(document.querySelector("#classEndDate").value)){
        newMustBeValuedArr.classEndDate=`實體課程必須選擇課程結束日期!`;
      }
      if(!(document.querySelector("#assignStartDate").value)){
        newMustBeValuedArr.assignStartDate=`實體課程必須選擇開始報名日期!`;
      }
      if(!(document.querySelector("#assignEndDate").value)){
        newMustBeValuedArr.assignEndDate=`實體課程必須選擇報名截止日期!`;
      }
      if(!(document.querySelector("#dailyStartTime").value)){
        newMustBeValuedArr.dailyStartTime=`實體課程必須選擇上課時間!`;
      }
      if(!(document.querySelector("#dailyEndTime").value)){
        newMustBeValuedArr.dailyEndTime=`實體課程必須選擇下課時間!`;
      }
      if((!document.querySelector("#classCity").value)){
        newMustBeValuedArr.classCity=`實體課程必須選擇開課縣市!`;
      }
      if((!document.querySelector("#classCityDetail").value)){
        newMustBeValuedArr.classCityDetail=`實體課程必須填寫詳細開課地址!`;
      }
    }
    if(!document.querySelector("#classPrice").value){
      newMustBeValuedArr.classPrice=`課程金額是必填欄位!`;
    }
    if(!document.querySelector("#classIntro").value){
      newMustBeValuedArr.classIntro=`課程內容是必填欄位!`;
    }
    if(document.querySelector('#onLine').checked){
      if((document.querySelector('#classVdio').files.length === 0)){
        newMustBeValuedArr.classVdio=`線上課程必須上傳課程影片!`;
      }
    }

    const firstEmptyErrMsg = (Object.values(newMustBeValuedArr).filter(value => value !== ''))[0]
    console.log(Object.values(newMustBeValuedArr).filter(value => value !== ''));
    console.log("應該要有錯誤訊息: "+firstEmptyErrMsg);

    setMustBeValued(newMustBeValuedArr)

    // 如果送出時必填欄位為空，則將所有有問題的必填欄位改紅色底
    const newMustBeValuedCheckArr = Object.entries(newMustBeValuedArr).filter(([key, value]) => value != "");

    clearIsEmpty();
    
    if(newMustBeValuedCheckArr && newMustBeValuedCheckArr.length>0){
      newMustBeValuedCheckArr.forEach((elm, i)=>{
        let elementSelect
        if(elm[0] === "on_and_underline"){
          elementSelect = document.querySelectorAll(`[name="on_and_underline"]`);
          elementSelect.forEach((e)=>{
            e.classList.add('isEmpty')
          })
        }else{
          elementSelect = document.querySelector(`#${elm[0]}`);
          elementSelect.classList.add('isEmpty');
        }
      })
    }

    // console.log("檢查mustbevalued");
    // 這是 mustbevalued 去除空值的物件
    // console.log(Object.fromEntries(Object.entries(mustBeValued).filter(([key, value]) => value !== "")));


    const mustBeHasErrors = Object.values(newMustBeValuedArr).some((v) => v)
    if (mustBeHasErrors) {
      await Swal.fire({
        icon: 'warning',
        title: '請檢查必填欄位!',
        text: firstEmptyErrMsg,
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    
    // 表單檢查--- END ---
    try{
        const createCourse = async ()=>{
          try {
            const response = await fetch('http://localhost:3005/api/course/teacher/management/create', {
              method: 'POST',
              body: formData,
              credentials: 'include',
            });
            const result = await response.json();
            console.log('送出成功: ', result);
            return result;
          } catch (error) {
            console.error('送出有問題!', error);
          }
        }
      const result = await createCourse()
      // 跳出新增成功or失敗

      if(result.status && result.status==='success'){
        await Swal.fire({
          icon: 'success',
          title: '課程新增成功',
          text: result.message,
          showConfirmButton: false,
          timer: 1500
        });
        router.push({pathname: "/course/teacher/management"})
      }
      
    }catch (error) {
      console.error('新增課程發生錯誤:', error);
      await Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '新增課程發生錯誤',
      });
    }
  };

  return (
    <>
      <div className='course-manage-wrap'>
        <Nav />
        <TeacherManageHeader />

        <div className="CManageNav">
          <div className="container">
            <div className="CManageNavT">新增課程</div>
            <div className="CManageNavList">
              <Link href='/course/teacher/management' className='CArmallc'><div className="CNavListLi">課程管理</div></Link>
              <Link href='/course/teacher/management/create' className='CArmall'><div className="CNavListLi CNowUnderLI">新增課程</div></Link>
            </div>
          </div>
        </div>

        <div className="eventCreateWrite">
          <div className="container">
          <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row row-gap-3">
                <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                  <div className="row gx-2 gx-lg-4 row-gap-3">
                    
                    <div className={`col-12 flex-column gap-1 text-danger spac-1 ${Object.values(mustBeValued).some(value => value !== "") ? 'd-flex' : 'd-none'}`}>* 請檢查必填欄位 !!</div>
                    <div className="col-12 d-flex flex-column gap-1">

                      {/* 用來寫入不顯示的資料 */}
                      <input type="hidden" name="onlineValue" value={onOrUnderline}/>

                      <label htmlFor="className" className="CmanageCreateTag">
                        課程名稱 (<span id='classNameWordNum'>0</span>/25)
                      </label>
                      <input type="text" name="class_name" id="className" className="CourseCreateInput" onChange={(e) => handleWordsLimit(e, 25)} />
                      <div className={`text-gray-light spac-1 emmit1 ${remindMsgBox['className']?"d-block":"d-none"}`}>* {remindMsgBox['className']?remindMsgBox['className']:""}</div>
                    </div>
                  </div>
                  <div className="row gx-2 gx-lg-4 row-gap-3">
                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="teacherId" className="CmanageCreateTag">
                        授課教師
                      </label>

                      <select className="form-select form-select-sm CourseCreateInput" aria-label="Small select example" name="teacher_id" id="teacherId" defaultValue="">
                        <option value="" disabled>--請選擇授課教師</option>
                        {teachers.map((teacher)=>{
                          return (
                            <option key={teacher?.id} value={teacher?.id}>{teacher?.name}</option>
                          )
                        })}
                      </select>

                    </div>
                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="onAndUnderLine" className="CmanageCreateTag">
                        開課性質
                      </label>
                      <div className='d-flex gap-3'>
                        <div className="form-check CM-check-box">
                          <input className="form-check-input CM-check-input" type="radio" name="on_and_underline" id="onLine" onClick={handleOnlineClickClear}/>
                          <label className="form-check-label CmanageCreateTag" htmlFor="onLine">
                            線上
                          </label>
                        </div>
                        <div className="form-check CM-check-box">
                          <input className="form-check-input CM-check-input" type="radio" name="on_and_underline" id="underLine" onClick={handleUnderlineClickClear}/>
                          <label className="form-check-label CmanageCreateTag" htmlFor="underLine">
                            實體
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className={`col-4 flex-column gap-1 ${onOrUnderline && onOrUnderline === 1 ? 'd-none' : 'd-flex'}`}>
                      <label htmlFor="studentLimit" className="CmanageCreateTag">
                        人數上限
                      </label>
                      <input
                        type="number"
                        name="student_limit"
                        id="studentLimit"
                        className="CourseCreateInput"
                      />
                      {/* 檢查數字必須是大於0的整數 */}
                    </div>
                  </div>
                  <div className={`row gx-2 gx-lg-4 row-gap-3 ${onOrUnderline && onOrUnderline === 1 ? 'd-none' : 'd-flex'}`}>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="courseStartDate" className="CmanageCreateTag">
                        開始上課日期
                        {/* 實體不可晚於結束日期 */}
                      </label>
                      <input
                        type="date"
                        name="class_start_date"
                        id="classStartDate"
                        className="CourseCreateInput"
                      />
                    </div>
                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="courseEndDate" className="CmanageCreateTag">
                        課程結束日期
                      </label>
                      <input
                        type="date"
                        name="class_end_date"
                        id="classEndDate"
                        className="CourseCreateInput"
                      />
                    </div>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="assignStartDate" className="CmanageCreateTag">
                        報名開始日期
                        {/* 不可晚於結束日期 */}
                      </label>
                      <input
                        type="date"
                        name="assign_start_date"
                        id="assignStartDate"
                        className="CourseCreateInput"
                      />
                    </div>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="assignEndDate" className="CmanageCreateTag">
                        報名截止日期
                      </label>
                      <input
                        type="date"
                        name="assign_end_date"
                        id="assignEndDate"
                        className="CourseCreateInput"
                      />
                    </div>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="dailyStartTime" className="CmanageCreateTag">
                        上課時間
                        {/* 不可晚於結束時間 */}
                      </label>
                      <input
                        type="time"
                        name="daily_start_time"
                        id="dailyStartTime"
                        className="CourseCreateInput"
                      />
                    </div>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="dailyEndTime" className="CmanageCreateTag">
                        下課時間
                      </label>
                      <input
                        type="time"
                        name="daily_end_time"
                        id="dailyEndTime"
                        className="CourseCreateInput"
                      />
                    </div>

                  </div>
                  <div className={`row gx-2 gx-lg-4 row-gap-3 ${onOrUnderline && onOrUnderline === 1 ? 'd-none' : 'd-flex'}`}>
                    <div className="col-4 d-flex flex-column gap-1">
                      
                      <label htmlFor="classCity" className="CmanageCreateTag">
                        開課縣市
                      </label>
                      <select className="form-select form-select-sm CourseCreateInput" aria-label="Small select example" name="class_city" id="classCity" defaultValue="">
                          <option value="" disabled>--請選擇縣市</option>
                          {districts.map((district)=>{
                            return (
                              <option key={district?.dId} value={district?.districtStr}>{district?.districtStr}</option>
                            )
                          })}
                      </select>
                    </div>

                    <div className="col-8 d-flex flex-column gap-1">
                      <label htmlFor="classCityDetail" className="CmanageCreateTag">
                        詳細開課地址 (<span id='CmanageCreateTagWordNum'>0</span>/40)
                      </label>
                      <input
                        type="text"
                        name="class_city_detail"
                        id="classCityDetail"
                        className="CourseCreateInput"
                        placeholder="--請輸入不包含縣市在內的詳細地點"
                        onChange={(e) => handleWordsLimit(e, 40)}
                      />
                      <div className={`text-gray-light spac-1 emmit1 ${remindMsgBox['classCityDetail']?"d-block":"d-none"}`}>* {remindMsgBox['classCityDetail']?remindMsgBox['classCityDetail']:""}</div>
                    </div>
                  </div>
                  
                  <div className='row gx-2 gx-lg-4 row-gap-3'>
                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="classPrice" className="CmanageCreateTag">
                        課程金額
                      </label>
                      <input
                        type="text"
                        name="class_price"
                        id="classPrice"
                        className="CourseCreateInput"
                        placeholder="--請輸入課程原價"
                      />
                      {/* 需要是正整數 */}
                    </div>

                    <div className="col-4 d-flex flex-column gap-1">
                      <label htmlFor="classSalePrice" className="CmanageCreateTag">
                        課程優惠金額
                      </label>
                      <input
                        type="text"
                        name="class_sale_price"
                        id="classSalePrice"
                        className="CourseCreateInput"
                        placeholder="--請選擇性輸入折扣後金額"
                      />
                      {/* 不可大於課程原價，需要是正整數 */}
                    </div>
                  </div>

                </div>
                <div className="col-12 col-lg-4 d-flex flex-column gap-1">
                  <label htmlFor="classPic" className="form-label CmanageCreateTag">
                    課程縮圖
                  </label>
                  <img src={Cimage} alt="" className="Cprevpic" />
                  {/* <input
                    className="form-control vidAndImg-input"
                    type="file"
                    id="classPic"
                    name="fileUpload"
                    onChange={handleImageUpload}
                  /> */}
                  <input
                    className="form-control vidAndImg-input"
                    type="file"
                    id="classPic"
                    name="classPic"
                    onChange={handleImageUpload}
                  />
                  {/* 只能上傳圖片格式(jpg,jpeg,png,gif,webp,svg,) */}
                  <div className={`${onOrUnderline && onOrUnderline === 0 ? 'd-none' : 'd-block'}`}>
                    <label htmlFor="classVdio" className="form-label CmanageCreateTag mt-2">
                      課程影片
                    </label>
                    {/* <input
                      className="form-control vidAndImg-input"
                      type="file"
                      id="classVdio"
                      name="fileUpload"
                      onChange={handleVdioUpload}
                    /> */}
                    <input
                      className="form-control vidAndImg-input"
                      type="file"
                      id="classVdio"
                      name="classVdio"
                      onChange={handleVdioUpload}
                    />
                  </div>
                  {/* 只能上傳影片格式 */}
                </div>
                <div className="col-12 d-flex flex-column gap-1">
                  <label htmlFor="classSummary" className="CmanageCreateTag">
                    課程摘要 (<span id='classSummaryWordNum'>0</span>/500)
                  </label>
                  <div className={`text-gray-light spac-1 emmit1 ${remindMsgBox['classSummary']?"d-block":"d-none"}`}>* {remindMsgBox['classSummary']?remindMsgBox['classSummary']:""}</div>
                  <textarea
                    name="classSummary"
                    id="classSummary"
                    placeholder="請輸入課程摘要"
                    onChange={(e) => handleWordsLimit(e, 500)}
                  />
                </div>
                <div className="col-12 d-flex flex-column gap-1">
                  <label htmlFor="classIntro" className="CmanageCreateTag">
                    課程內容 (<span id='classIntroWordNum'>0</span>/1500)
                  </label>
                  <div className={`text-gray-light spac-1 emmit1 ${remindMsgBox['classIntro']?"d-block":"d-none"}`}>* {remindMsgBox['classIntro']?remindMsgBox['classIntro']:""}</div>
                  <textarea
                    className='classIntro'
                    name="classIntro"
                    id="classIntro"
                    placeholder="請輸入課程內容"
                    onChange={(e) => handleWordsLimit(e, 1500)}
                  />
                </div>
                <div className="col-12 d-flex gap-1 justify-content-end mt-3">
                  <button type="reset" className="CeventCR" onClick={handleReset}>
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

