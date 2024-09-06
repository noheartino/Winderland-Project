import { useEffect, useState } from "react";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import EventHeader from "@/components/event/event-header";
import Noresult from "@/components/event/noresult";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import Head from "next/head";
import ClipLoader from "react-spinners/ClipLoader";


export default function Applyevent() {
  const router = useRouter();
  const [infodata, setInfo] = useState(null);

  const authData = useAuth().auth;
  const UserData = authData.userData;
  const useridis = UserData ? UserData.id : 0;

  useEffect(() => {
    if (useridis) {
      fetch(`http://localhost:3005/api/event/list/${useridis}`)
        .then((response) => response.json())
        .then((infodata) => setInfo(infodata))
        .catch((error) => console.error("Error:", error));
    }
  }, [useridis]);

  const myallevent = infodata ? infodata.myallevent : [];
  const myowner = infodata ? infodata.myowner : [];
  const myallapply = infodata ? infodata.myallapply : [];

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

  if (!infodata) {
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

  function filtertheevent(index) {
    return myallevent.filter((i) => i.id === index)[0];
  }

  function filterapply(index) {
    return myallapply.filter((i) => i.event_id === index);
  }

  return (
    <>
      <Head>
        <title>醺迷仙園｜已結束活動列表</title>

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
                <div className="NavListLi">活動管理</div>
              </Link>
              <Link href="/event/pastevent" className="Armall">
                <div className="NavListLi NowUnderLI">已結束活動</div>
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
                  className={`eventDetailist ${
                    eventdata.status === 0 ? "" : "d-none"
                  }`}
                  key={i}
                >
                  <div
                    className={`DetailistBox ${
                      eventdata.status === 1 ? "applyEnd" : ""
                    }`}
                  >
                    <img
                      src={`http://localhost:3005/uploads/event/${eventdata.event_cover_image}`}
                      alt=""
                      className="DetailistBoxPic"
                    />
                    <div className="DetailistBoxT">
                      <div className="DetailistBoxTitle">
                        <div className="Eventstatus past">已結束活動</div>
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
                        className={`lineA ${
                          activeIndexes.includes(i) ? "" : "active"
                        }`}
                      />
                      <div
                        className={`lineB ${
                          activeIndexes.includes(i) ? "" : "active"
                        }`}
                      />
                    </div>
                  </div>
                  <div
                    className={`DetailistToggleBox ${
                      activeIndexes.includes(i) ? "active" : ""
                    } ${scaleYIndexes.includes(i) ? "scaleY" : ""}`}
                  >
                    <div className="row gx-5 mb-3">
                      <div className="col-12">
                        <div className="ListInformationT">活動資訊</div>
                      </div>
                      <div className="col-12">
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
                    </div>
                    <div className="row gx-5">
                      <div className="col-12">
                        <div className="eventListStatisT">參加人統計</div>
                      </div>
                      <div className="col-12 col-md-6 mb-4">
                        <div className="eventLimit">
                          <div className="eventLimiText">
                            <div>參加人數 : {allpeople}人</div>
                            <div>人數上限 : {eventdata.people_limit}人</div>
                          </div>
                          <div className="eventLimitLine">
                            <div
                              className="eventLimitLinedata"
                              style={{
                                width: `${
                                  (allpeople / eventdata.people_limit) * 100
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
