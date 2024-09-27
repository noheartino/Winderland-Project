// import { useEffect, useState } from 'react';
// import Nav from '@/components/Header/Header'
// import Footer from '@/components/footer/footer'
// import EventHeader from '@/components/event/event-header'
// import { useRouter } from 'next/router';
// import { useAuth } from '@/hooks/use-auth';
// import Link from "next/link";

// export default function Applyevent() {
//     const router = useRouter();

//     const [infodata, setInfo] = useState(null);
//     const authData = useAuth().auth
//     const UserData = authData.userData
//     const useridis = UserData ? UserData.id : 0
//     const birthday = UserData ? UserData.birthday : ''
//     const mygender = UserData?.gender === 'Female' ? 1 : 0
//     const myname = UserData ? UserData.user_name : ''

//     const [image, setImage] = useState("/event/depic.png"); // 存儲圖片 URL

//     const handleImageUpload = (event) => {
//       const file = event.target.files[0]; // 獲取選中的文件
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setImage(reader.result); // 設置圖片 URL 到狀態
//         };
//         reader.readAsDataURL(file); // 讀取文件為 data URL
//       }
//     };

//     useEffect(() => {
//         fetch(`https://winderland.shop/api/event-cin`)
//             .then(response => response.json())
//             .then(infodata => setInfo(infodata))
//             .catch(error => console.error('Error:', error));
//     }, []);

//     const eventcount = infodata ? infodata.applyon : [];
//     const noweventid = eventcount.length + 1

//     function calculateAge(birthday) {
//         const birthDate = new Date(birthday);
//         const today = new Date();
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const monthDifference = today.getMonth() - birthDate.getMonth();
//         const dayDifference = today.getDate() - birthDate.getDate();
//         if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
//           age--;
//         }
//         return age;
//       }
//     const myage = calculateAge(birthday);

//     return (
//         <>
//             <Nav />
//             <EventHeader />
//             {/* {noweventid}
//             {myage}and{mygender}and{myname}
//             {eventcount ? <pre>{JSON.stringify(eventcount, null, 2)}</pre> : 'Loading...'} */}

//             <div className="eventManageNav">
//                     <div className="container">
//                         <div className="ManageNavT">開團活動管理</div>
//                         <div className="ManageNavList">

//                             <Link href='/event/create' className='Armall'><div className="NavListLi NowUnderLI">新增活動</div></Link>
//                             <Link href='/event/list' className='Armall'><div className="NavListLi">活動管理</div></Link>
//                             <Link href='/event/pastevent' className='Armall'><div className="NavListLi">已結束活動</div></Link>

//                         </div>
//                     </div>
//                 </div>

//                 <div className="eventCreateWrite">
//                     <div className="container">
//                         <form action="https://winderland.shop/api/event-cin" method="post" encType="multipart/form-data">
//                             <div className="row">
//                                 <div className="col-12 col-lg-8">
//                                     <div className="row gx-2 gx-lg-4">
//                                         <div className="col-12">

//                                             <input type="hidden" name="noweventid" value={noweventid ? noweventid : ''} />
//                                             <input type="hidden" name="useridis" value={useridis ? useridis : ''} />
//                                             <input type="hidden" name="myname" value={myname ? myname : ''} />
//                                             <input type="hidden" name="mygender" value={mygender ? mygender : ''} />
//                                             <input type="hidden" name="myage" value={myage ? myage : ''} />
//                                             <input type="hidden" name="kotoba" value={`[開團人本人]`} />

//                                             <label htmlFor="eventName" className="CreateWriteT">
//                                                 活動標題
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 name="event_name"
//                                                 id="eventName"
//                                                 className="EventCreateInput"
//                                             />
//                                         </div>
//                                         <div className="col-4">
//                                             <label htmlFor="eventDate" className="CreateWriteT">
//                                                 活動日期
//                                             </label>
//                                             <input
//                                                 type="date"
//                                                 name="event_date"
//                                                 id="eventDate"
//                                                 className="EventCreateInput pe-2"
//                                             />
//                                         </div>
//                                         <div className="col-4">
//                                             <label htmlFor="eventTimeS" className="CreateWriteT">
//                                                 活動開始時間
//                                             </label>
//                                             <input
//                                                 type="time"
//                                                 name="event_time_start"
//                                                 id="eventTimeS"
//                                                 className="EventCreateInput pe-2"
//                                             />
//                                         </div>
//                                         <div className="col-4">
//                                             <label htmlFor="eventTimeE" className="CreateWriteT">
//                                                 活動結束時間
//                                             </label>
//                                             <input
//                                                 type="time"
//                                                 name="event_time_end"
//                                                 id="eventTimeE"
//                                                 className="EventCreateInput pe-2"
//                                             />
//                                         </div>
//                                         <div className="col-4">
//                                             <label htmlFor="eventApplyS" className="CreateWriteT">
//                                                 報名開始日
//                                             </label>
//                                             <input
//                                                 type="date"
//                                                 name="apply_start"
//                                                 id="eventApplyS"
//                                                 className="EventCreateInput pe-2"
//                                             />
//                                         </div>
//                                         <div className="col-4">
//                                             <label htmlFor="eventApplyE" className="CreateWriteT">
//                                                 報名截止日
//                                             </label>
//                                             <input
//                                                 type="date"
//                                                 name="apply_end"
//                                                 id="eventApplyE"
//                                                 className="EventCreateInput pe-2"
//                                             />
//                                         </div>
//                                         <div className="col-4">
//                                             <label htmlFor="eventLimit" className="CreateWriteT">
//                                                 人數上限
//                                             </label>
//                                             <input
//                                                 type="number"
//                                                 name="people_limit"
//                                                 id="eventLimit"
//                                                 className="EventCreateInput pe-2"
//                                                 min={5}
//                                             />
//                                         </div>
//                                         <div className="col-4">
//                                             <label htmlFor="eventCity" className="CreateWriteT">
//                                                 活動城市
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 name="event_city"
//                                                 id="eventCity"
//                                                 className="EventCreateInput"
//                                                 placeholder="市+區"
//                                             />
//                                         </div>
//                                         <div className="col-8">
//                                             <label htmlFor="eventShop" className="CreateWriteT">
//                                                 活動地標名
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 name="event_venue"
//                                                 id="eventShop"
//                                                 className="EventCreateInput"
//                                                 placeholder="餐酒館的店名or地標"
//                                             />
//                                         </div>
//                                         <div className="col-12">
//                                             <label htmlFor="eventAdress" className="CreateWriteT">
//                                                 活動詳細地址
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 name="event_address"
//                                                 id="eventAdress"
//                                                 className="EventCreateInput"
//                                                 placeholder="活動地點的具體地址"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-12 col-lg-4">
//                                     <label htmlFor="eventPic" className="form-label CreateWriteT">
//                                         活動形象圖
//                                     </label>
//                                     <img src={image} alt="" className="prevpic" />
//                                     <input
//                                         className="form-control"
//                                         type="file"
//                                         id="eventPic"
//                                         name="myfile"
//                                         onChange={handleImageUpload}
//                                     />
//                                 </div>
//                                 <div className="col-12 mt-3 mt-lg-0">
//                                     <label htmlFor="eventIntro" className="CreateWriteT">
//                                         活動介紹
//                                     </label>
//                                     <textarea
//                                         name="event_introduce"
//                                         id="eventIntro"
//                                         placeholder="活動詳細說明"
//                                     />
//                                 </div>
//                                 <div className="col-12 d-flex justify-content-end mt-3">
//                                     <button type="reset" className="eventCR">
//                                         清空
//                                     </button>

//                                     <button type="submit" className="eventCS d-block">
//                                         新增活動
//                                     </button>

//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//                 <Footer />
//             </>

//     );
// }

import { useEffect, useState } from "react";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import EventHeader from "@/components/event/event-header";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import Head from "next/head";

export default function Applyevent() {
  const router = useRouter();
  const [infodata, setInfo] = useState(null);
  const authData = useAuth().auth;
  const UserData = authData.userData;
  const useridis = UserData ? UserData.id : 0;
  const birthday = UserData ? UserData.birthday : "";
  const mygender = UserData?.gender === "Female" ? 1 : 0;
  const myname = UserData ? UserData.user_name : "";

  const [image, setImage] = useState("/event/depic.png");
  const [formData, setFormData] = useState({
    event_name: "",
    event_date: "",
    event_time_start: "",
    event_time_end: "",
    apply_start: "",
    apply_end: "",
    people_limit: "",
    event_city: "",
    event_venue: "",
    event_address: "",
    event_introduce: "",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function TimeMessage() {
    swal("調整錯誤!", "結束時間無法早於開始時間!", "error");
  }

  function DateMessage() {
    swal("調整錯誤!", "截止日無法早於開始日!", "error");
  }

  function ApplyMessage() {
    swal("調整錯誤!", "報名期間日無法晚於活動日期!", "error");
  }

  const handleInputChange = (event) => {

    const { name, value } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    if (updatedFormData.event_time_start && updatedFormData.event_time_end) {
      const startTime = new Date(`1970-01-01T${updatedFormData.event_time_start}`);
      const endTime = new Date(`1970-01-01T${updatedFormData.event_time_end}`);

      if (startTime > endTime) {
        TimeMessage()
        updatedFormData.event_time_end = updatedFormData.event_time_start;
      }
    }

    if (new Date(updatedFormData.apply_start) > new Date(updatedFormData.apply_end)) {
      DateMessage()
      updatedFormData.apply_end = updatedFormData.apply_start;
    }

    if (new Date(updatedFormData.event_date) < new Date(updatedFormData.apply_start) || new Date(updatedFormData.event_date) < new Date(updatedFormData.apply_end)) {
      ApplyMessage()
      updatedFormData.apply_start = updatedFormData.event_date
      updatedFormData.apply_end = updatedFormData.event_date
    }

    setFormData(updatedFormData);
  };

  const clearhandleInput = () => {
    setFormData({
      event_name: "",
      event_date: "",
      event_time_start: "",
      event_time_end: "",
      apply_start: "",
      apply_end: "",
      people_limit: "",
      event_city: "",
      event_venue: "",
      event_address: "",
      event_introduce: "",
    });
  };

  useEffect(() => {
    fetch("https://winderland.shop/api/event-create")
      .then((response) => response.json())
      .then((infodata) => setInfo(infodata))
      .catch((error) => console.error("Error:", error));
  }, []);

  const nowEventId =
    infodata && infodata.applyon && Array.isArray(infodata.applyon)
      ? infodata.applyon.length + 1
      : "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("noweventid", nowEventId);
    data.append("useridis", useridis);
    data.append("myname", myname);
    data.append("mygender", mygender);
    data.append("myage", calculateAge(birthday));
    data.append("kotoba", `[開團人本人]`);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    // Add the file
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files[0]) {
      data.append("myfile", fileInput.files[0]);
    }

    try {
      const response = await fetch("https://winderland.shop/api/event-create", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        router.push("https://winderland.shop/event/list");
        // window.location.href = 'https://winderland.shop/event/list'
        console.log("Redirecting to /event/list");
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    return age;
  }

  return (
    <>
      <Head>
        <title>醺迷仙園｜一支會活動建立</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />
      <EventHeader />
      {/* {nowEventId ? <pre>{JSON.stringify(nowEventId, null, 2)}</pre> : 'Loading...'} */}

      <div className="eventManageNav">
        <div className="container">
          <div className="ManageNavT">開團活動管理</div>
          <div className="ManageNavList">
            <Link href="/event/create" className="Armall">
              <div className="NavListLi NowUnderLI">新增活動</div>
            </Link>
            <Link href="/event/list" className="Armall">
              <div className="NavListLi">活動管理</div>
            </Link>
            <Link href="/event/pastevent" className="Armall">
              <div className="NavListLi">已結束活動</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="eventCreateWrite">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="row gx-2 gx-lg-4">
                  <div className="col-12">
                    <input type="hidden" name="noweventid" value={nowEventId} />
                    <input type="hidden" name="useridis" value={useridis} />
                    <input type="hidden" name="myname" value={myname} />
                    <input type="hidden" name="mygender" value={mygender} />
                    <input
                      type="hidden"
                      name="myage"
                      value={calculateAge(birthday)}
                    />
                    <input type="hidden" name="kotoba" value={`[開團人本人]`} />

                    <label htmlFor="eventName" className="CreateWriteT">
                      活動標題
                    </label>
                    <input
                      type="text"
                      name="event_name"
                      id="eventName"
                      className="EventCreateInput"
                      value={formData.event_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="eventDate" className="CreateWriteT">
                      活動日期
                    </label>
                    <input
                      type="date"
                      name="event_date"
                      id="eventDate"
                      className="EventCreateInput pe-2"
                      value={formData.event_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="eventTimeS" className="CreateWriteT">
                      活動開始時間
                    </label>
                    <input
                      type="time"
                      name="event_time_start"
                      id="eventTimeS"
                      className="EventCreateInput pe-2"
                      value={formData.event_time_start}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="eventTimeE" className="CreateWriteT">
                      活動結束時間
                    </label>
                    <input
                      type="time"
                      name="event_time_end"
                      id="eventTimeE"
                      className="EventCreateInput pe-2"
                      value={formData.event_time_end}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="eventApplyS" className="CreateWriteT">
                      報名開始日
                    </label>
                    <input
                      type="date"
                      name="apply_start"
                      id="eventApplyS"
                      className="EventCreateInput pe-2"
                      value={formData.apply_start}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="eventApplyE" className="CreateWriteT">
                      報名截止日
                    </label>
                    <input
                      type="date"
                      name="apply_end"
                      id="eventApplyE"
                      className="EventCreateInput pe-2"
                      value={formData.apply_end}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="eventLimit" className="CreateWriteT">
                      人數上限
                    </label>
                    <input
                      type="number"
                      name="people_limit"
                      id="eventLimit"
                      className="EventCreateInput pe-2"
                      min={5}
                      value={formData.people_limit}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="eventCity" className="CreateWriteT">
                      活動城市
                    </label>
                    <input
                      type="text"
                      name="event_city"
                      id="eventCity"
                      className="EventCreateInput"
                      placeholder="市+區"
                      value={formData.event_city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-8">
                    <label htmlFor="eventShop" className="CreateWriteT">
                      活動地標名
                    </label>
                    <input
                      type="text"
                      name="event_venue"
                      id="eventShop"
                      className="EventCreateInput"
                      placeholder="餐酒館的店名or地標"
                      value={formData.event_venue}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="eventAdress" className="CreateWriteT">
                      活動詳細地址
                    </label>
                    <input
                      type="text"
                      name="event_address"
                      id="eventAdress"
                      className="EventCreateInput"
                      placeholder="活動地點的具體地址"
                      value={formData.event_address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="eventPic" className="form-label CreateWriteT">
                  活動形象圖
                </label>
                <img src={image} alt="" className="prevpic" />
                <input
                  className="form-control"
                  type="file"
                  id="eventPic"
                  name="myfile"
                  onChange={handleImageUpload}
                  required
                />
              </div>
              <div className="col-12 mt-3 mt-lg-0">
                <label htmlFor="eventIntro" className="CreateWriteT">
                  活動介紹
                </label>
                <textarea
                  name="event_introduce"
                  id="eventIntro"
                  placeholder="活動詳細說明"
                  value={formData.event_introduce}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12 d-flex justify-content-end mt-3">
                <button onClick={clearhandleInput} className="eventCR">
                  清空
                </button>
                <button type="submit" className="eventCS d-block">
                  新增活動
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
