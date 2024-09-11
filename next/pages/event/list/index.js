import { useEffect, useState } from "react";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import EventHeader from "@/components/event/event-header";
import Noresult from "@/components/event/noresult";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import Head from "next/head";

export default function Applyevent() {
  const router = useRouter();
  // const { id } = router.query;
  const [infodata, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const authData = useAuth().auth;
  const UserData = authData.userData;
  const useridis = UserData ? UserData.id : 0;

  useEffect(() => {
    if (useridis) {
      fetch(`https://winderland.shop/api/event/list/${useridis}`)
        .then((response) => response.json())
        .then((infodata) => setInfo(infodata))
        .catch((error) => console.error("Error:", error));
    }
  }, [useridis]);

  const myallevent = infodata?.myallevent ?? [];
  const myowner = infodata?.myowner ?? [];
  const myallapply = infodata?.myallapply ?? [];

  const arrt = [
    { text: 1 },
    { text: 2 },
    { text: 3 },
    { text: 4 },
    { text: 5 },
  ];
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [scaleYIndexes, setScaleYIndexes] = useState([]);

  const handleClick = (index) => {
    setActiveIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    setTimeout(() => {
      setScaleYIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }, 100);
  };

  function filtertheevent(index) {
    return myallevent.filter((i) => i.id === index)[0];
  }

  function filterapply(index) {
    return myallapply.filter((i) => i.event_id === index);
  }

  // if (loading) return <div>Loading...</div>
  // if (!infodata) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>醺迷仙園｜活動管理列表</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />
      <EventHeader />
      {/* {myowner ? <pre>{JSON.stringify(myowner, null, 2)}</pre> : 'Loading...'} */}

      <>
        <div className="eventManageNav">
          <div className="container">
            <div className="ManageNavT">開團活動管理</div>
            <div className="ManageNavList">
              <Link href="/event/create" className="Armall">
                <div className="NavListLi">新增活動</div>
              </Link>
              <Link href="/event/list" className="Armall">
                <div className="NavListLi NowUnderLI">活動管理</div>
              </Link>
              <Link href="/event/pastevent" className="Armall">
                <div className="NavListLi">已結束活動</div>
              </Link>
            </div>
          </div>
        </div>

        {myowner.length === 0 && <Noresult text={"沒有任何結果"} />}

        <div
          className={`eventMDetailArea ${myowner.length === 0 && "noheight"}`}
        >
          <div className="container">
            {myowner.map((t, i) => {
              const eventdata = filtertheevent(t.event_id);

              const applydata = filterapply(t.event_id);

              const allage = applydata.reduce(
                (sum, person) => sum + person.age,
                0
              );

              const allpeople = applydata.length;

              const allfemale = applydata.filter(
                (person) => person.gender === 1
              ).length;

              const allmale =
                allpeople -
                applydata.filter((person) => person.gender === 1).length;

              return (
                <div
                  className={`eventDetailist ${eventdata.status === 0 ? "d-none" : ""
                    }`}
                  key={i}
                >
                  <div
                    className={`DetailistBox ${eventdata.status === 1 ? "applyEnd" : ""
                      }`}
                  >
                    <img
                      src={`https://winderland.shop/uploads/event/${eventdata.event_cover_image}`}
                      alt=""
                      className="DetailistBoxPic"
                    />
                    <div className="DetailistBoxT">
                      <div className="DetailistBoxTitle">
                        <div className={`Eventstatus`}>
                          {eventdata.status === 1 ? "報名已截止" : "開放報名中"}
                        </div>
                        <div className="EventTitle">{eventdata.event_name}</div>
                      </div>
                      <div className="DetailistBoxInfo">
                        活動日期 - {eventdata.event_date}{" "}
                        {eventdata.event_time_start.substring(0, 5)}~
                        {eventdata.event_time_end.substring(0, 5)}
                        <br />
                        活動地點 - {eventdata.event_city}
                      </div>
                    </div>
                    <div
                      className="DetailistBoxArr"
                      onClick={() => handleClick(i)}
                    >
                      <div
                        className={`lineA ${activeIndexes.includes(i) ? "" : "active"
                          }`}
                      />
                      <div
                        className={`lineB ${activeIndexes.includes(i) ? "" : "active"
                          }`}
                      />
                    </div>
                  </div>
                  <div
                    className={`DetailistToggleBox ${activeIndexes.includes(i) ? "active" : ""
                      } ${scaleYIndexes.includes(i) ? "scaleY" : ""}`}
                  >
                    <div className="row gx-5 mb-3">
                      <div className="col-12">
                        <div className="ListInformationT">活動資訊</div>
                      </div>
                      <div className="col-10">
                        <div className="ListInfoEventT">
                          <div className="mb-3">
                            活動標題 : {eventdata.event_name}
                          </div>
                          <div>
                            活動日期 : {eventdata.event_date}{" "}
                            {eventdata.event_time_start.substring(0, 5)}~
                            {eventdata.event_time_end.substring(0, 5)}
                          </div>
                          <div>活動地點 : {eventdata.event_address}</div>
                          <div>活動地標 : {eventdata.event_venue}</div>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="eventEditIcon">
                          <Link
                            href={`/event/edit/${eventdata.id}`}
                            className="Armallc d-flex align-items-center"
                          >
                            <div className="eventEditIconT d-none d-lg-block">
                              編輯活動
                            </div>
                            <i className="fa-solid fa-pen-to-square EditIconI" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="row gx-5">
                      <div className="col-12">
                        <div className="eventListStatisT">參加人統計</div>
                      </div>
                      <div className="col-12 col-md-6 mb-4">
                        <div className="eventLimit">
                          <div className="eventLimiText">
                            <div>目前人數 : {allpeople}人</div>
                            <div>人數上限 : {eventdata.people_limit}人</div>
                          </div>
                          <div className="eventLimitLine">
                            <div
                              className="eventLimitLinedata"
                              style={{
                                width: `${(allpeople / eventdata.people_limit) * 100
                                  }%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 mb-4">
                        <div className="eventAge">
                          <div className="eventAgeText">
                            <div>
                              平均年齡 : {Math.round(allage / allpeople)}歲
                            </div>
                          </div>
                          <div className="eventAgeLine">
                            <div
                              className="eventAgeLinedata"
                              style={{
                                width: `${Math.round(allage / allpeople) * 2}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 mb-4">
                        <div className="eventGender">
                          <div className="eventGenderText">
                            <div className="male">男性 : {allmale}人</div>
                            <div className="female">女性 : {allfemale}人</div>
                          </div>
                          <div className="eventGenderLine">
                            <div
                              className="eventGenderLinedata"
                              style={{
                                width: `${(allmale / allpeople) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4 gx-5">
                      <div className="col-12">
                        <div className="eventListInfoT">參加人資訊</div>
                      </div>
                      <div className="col-12">
                        <div className="ListInfoComment">
                          {applydata.map((t, i) => (
                            <div className="eventPList">
                              <div className="eventPListInfo">
                                ▪ {t.neckname} &nbsp;[{" "}
                                {t.gender === 1 ? "女" : "男"} / {t.age}歲 ]
                              </div>
                              <div className="ListPComment">{t.introduce}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>

      <Footer />
    </>
  );
}

// import { useEffect, useState } from 'react';
// import Nav from '@/components/Header/Header'
// import Footer from '@/components/footer/footer'
// import EventHeader from '@/components/event/event-header'
// import Noresult from '@/components/event/noresult';
// import { useRouter } from 'next/router';
// import { useAuth } from '@/hooks/use-auth';
// import Link from "next/link";

// export default function Applyevent() {
//     const router = useRouter();
//     const [infodata, setInfo] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const authData = useAuth().auth;
//     const UserData = authData?.userData;
//     const useridis = UserData?.id || 0;

//     useEffect(() => {
//         if (useridis) {
//             fetch(`https://winderland.shop/api/event/list/${useridis}`)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error(`HTTP error! status: ${response.status}`);
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     setInfo(data);
//                     setLoading(false); // 数据加载完成
//                 })
//                 .catch(error => {
//                     console.error('Fetch error:', error);
//                     setLoading(false); // 确保加载状态最终设为 false
//                 });
//         }
//     }, [useridis]);

//     // 使用可选链和空值合并操作符处理数据
//     const myallevent = infodata?.myallevent ?? [];
//     const myowner = infodata?.myowner ?? [];
//     const myallapply = infodata?.myallapply ?? [];

//     const [activeIndexes, setActiveIndexes] = useState([]);
//     const [scaleYIndexes, setScaleYIndexes] = useState([]);

//     const handleClick = (index) => {
//         setActiveIndexes(prev =>
//             prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
//         );

//         setTimeout(() => {
//             setScaleYIndexes(prev =>
//                 prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
//             );
//         }, 100);
//     };

//     const filtertheevent = (index) => {
//         return myallevent.find(event => event.id === index) || {};
//     };

//     const filterapply = (index) => {
//         return myallapply.filter(application => application.event_id === index);
//     };

//     if (loading) return <div>Loading...</div>;

//     return (
//         <>
//             <Nav />
//             <EventHeader />
//             {myowner.length === 0 ? <Noresult text={'沒有任何結果'} /> : (
//                 <>
//                     <div className="eventManageNav">
//                         <div className="container">
//                             <div className="ManageNavT">開團活動管理</div>
//                             <div className="ManageNavList">
//                                 <Link href='/event/create' className='Armall'>
//                                     <div className="NavListLi">新增活動</div>
//                                 </Link>
//                                 <Link href='/event/list' className='Armall'>
//                                     <div className="NavListLi NowUnderLI">活動管理</div>
//                                 </Link>
//                                 <Link href='/event/pastevent' className='Armall'>
//                                     <div className="NavListLi">已結束活動</div>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>

//                     <div className={`eventMDetailArea ${myowner.length === 0 ? 'noheight' : ''}`}>
//                         <div className="container">
//                             {myowner.map((t, i) => {
//                                 const eventdata = filtertheevent(t.event_id);
//                                 const applydata = filterapply(t.event_id);

//                                 const allage = applydata.reduce((sum, person) => sum + (person.age || 0), 0);
//                                 const allpeople = applydata.length;
//                                 const allfemale = applydata.filter(person => person.gender === 1).length;
//                                 const allmale = allpeople - allfemale;

//                                 return (
//                                     <div className={`eventDetailist ${eventdata.status === 0 ? 'd-none' : ''}`} key={i}>
//                                         <div className={`DetailistBox ${eventdata.status === 1 ? 'applyEnd' : ''}`}>
//                                             <img src={`https://winderland.shop/uploads/${eventdata.event_cover_image}`} alt="" className="DetailistBoxPic" />
//                                             <div className="DetailistBoxT">
//                                                 <div className="DetailistBoxTitle">
//                                                     <div className={`Eventstatus`}>{eventdata.status === 1 ? '報名已截止' : '開放報名中'}</div>
//                                                     <div className="EventTitle">
//                                                         {eventdata.event_name}
//                                                     </div>
//                                                 </div>
//                                                 <div className="DetailistBoxInfo">
//                                                     活動日期 - {eventdata.event_date} {eventdata.event_time_start?.substring(0, 5)}~{eventdata.event_time_end?.substring(0, 5)}
//                                                     <br />
//                                                     活動地點 - {eventdata.event_city}
//                                                 </div>
//                                             </div>
//                                             <div className="DetailistBoxArr" onClick={() => handleClick(i)}>
//                                                 <div className={`lineA ${activeIndexes.includes(i) ? '' : 'active'}`} />
//                                                 <div className={`lineB ${activeIndexes.includes(i) ? '' : 'active'}`} />
//                                             </div>
//                                         </div>
//                                         <div className={`DetailistToggleBox ${activeIndexes.includes(i) ? 'active' : ''} ${scaleYIndexes.includes(i) ? 'scaleY' : ''}`}>
//                                             <div className="row gx-5 mb-3">
//                                                 <div className="col-12">
//                                                     <div className="ListInformationT">活動資訊</div>
//                                                 </div>
//                                                 <div className="col-10">
//                                                     <div className="ListInfoEventT">
//                                                         <div className="mb-3">
//                                                             活動標題 : {eventdata.event_name}
//                                                         </div>
//                                                         <div>活動日期 : {eventdata.event_date} {eventdata.event_time_start?.substring(0, 5)}~{eventdata.event_time_end?.substring(0, 5)}</div>
//                                                         <div>活動地點 : {eventdata.event_address}</div>
//                                                         <div>活動地標 : {eventdata.event_venue}</div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-2">
//                                                     <div className="eventEditIcon">
//                                                         <Link href={`/event/edit/${eventdata.id}`} className='Armallc d-flex align-items-center'>
//                                                             <div className='eventEditIconT d-none d-lg-block'>編輯活動</div>
//                                                             <i className="fa-solid fa-pen-to-square EditIconI" />
//                                                         </Link>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="row gx-5">
//                                                 <div className="col-12">
//                                                     <div className="eventListStatisT">參加人統計</div>
//                                                 </div>
//                                                 <div className="col-12 col-md-6 mb-4">
//                                                     <div className="eventLimit">
//                                                         <div className="eventLimiText">
//                                                             <div>目前人數 : {allpeople}人</div>
//                                                             <div>人數上限 : {eventdata.people_limit}人</div>
//                                                         </div>
//                                                         <div className="eventLimitLine">
//                                                             <div className="eventLimitLinedata" style={{ width: `${(allpeople / eventdata.people_limit) * 100}%` }} />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-12 col-md-6 mb-4">
//                                                     <div className="eventAge">
//                                                         <div className="eventAgeText">
//                                                             <div>平均年齡 : {allpeople ? Math.round(allage / allpeople) : 0}歲</div>
//                                                         </div>
//                                                         <div className="eventAgeLine">
//                                                             <div className="eventAgeLinedata" style={{ width: `${allpeople ? Math.round(allage / allpeople) * 2 : 0}%` }} />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-12 col-md-6 mb-4">
//                                                     <div className="eventGender">
//                                                         <div className="eventGenderText">
//                                                             <div className="male">男性 : {allmale}人</div>
//                                                             <div className="female">女性 : {allfemale}人</div>
//                                                         </div>
//                                                         <div className="eventGenderLine">
//                                                             <div className="eventGenderLinedata" style={{ width: `${allpeople ? (allmale / allpeople) * 100 : 0}%` }} />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="row mt-4 gx-5">
//                                                 <div className="col-12">
//                                                     <div className="eventListInfoT">參加人資訊</div>
//                                                 </div>
//                                                 <div className="col-12">
//                                                     <div className="ListInfoComment">
//                                                         {applydata.map((t, i) => (
//                                                             <div className="eventPList" key={i}>
//                                                                 <div className="eventPListInfo">
//                                                                     ▪ {t.neckname} &nbsp;[ {t.gender === 1 ? '女' : '男'} / {t.age}歲 ]
//                                                                 </div>
//                                                                 <div className="ListPComment">
//                                                                     {t.introduce}
//                                                                 </div>
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </>
//             )}
//             <Footer />
//         </>
//     );
// }
