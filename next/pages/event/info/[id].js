import React from "react";
import Nav from "@/components/Header/Header";
import EventHeader from "@/components/event/event-header";
import Footer from "@/components/footer/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import ClipLoader from "react-spinners/ClipLoader";


export default function Einfo() {
  const router = useRouter();
  const { id } = router.query;
  const [infodata, setInfo] = useState(null);

  // const [ownerimg, setOwnerimg] = useState("https://winderland.shop/images/member/avatar/4.png");

  // setOwnerimg("https://winderland.shop/images/member/avatar/4.png")

  useEffect(() => {
    if (id) {
      fetch(`https://winderland.shop/api/event/info/${id}`)
        .then((response) => response.json())
        .then((infodata) => setInfo(infodata))
        .catch((error) => console.error("Error:", error));
    }
  }, [id]);

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

  const eventinfo = infodata.eventinfo[0] || [];
  const applyinfo = infodata.applyinfo || [];
  const imginfo = infodata.userimg || [];
  const Nowid = applyinfo[0].user_id || 0;

  const limitper = Math.round(
    (applyinfo.length / eventinfo.people_limit) * 100
  );

  let age = 0;
  applyinfo.forEach((i) => (age += i.age));
  let agesum = Math.round(age / applyinfo.length);

  const females = applyinfo.filter((p) => p.gender === 1).length;
  const males = applyinfo.filter((p) => p.gender === 0).length;
  const gavg = Math.round((males / (males + females)) * 100);



  // function ownerpic(index){
  //   return imginfo.filter((e) => e.user_id === index )
  // }
  // const imageInfo = ownerpic(Nowid);

  // const imageUrl = `/images/member/avatar/${ownerpic(Nowid).img}`;

  // function watchimg(){
  //   setOwnerimg(`/images/member/avatar/${ownerpic(Nowid).img}`)
  // }

  return (
    <>
      <Head>
        <title>醺迷仙園｜{eventinfo.event_name}</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />

      {/* {Nowid ? <pre>{JSON.stringify(Nowid, null, 2)}</pre> : 'Loading...'} */}

      <EventHeader />
      <div className="eventPageArea">
        <div className="eventPageAreaBg1 d-none d-lg-block" />
        <div className="eventPageAreaBg2 d-none d-lg-block" />
        <div className="container">
          <div className="row g-5">
            <div className="col-12 col-lg-5">
              <img
                src={`https://winderland.shop/uploads/event/${eventinfo.event_cover_image}`}
                alt=""
                className="eventPageimg"
              />
              <div className="eventduring">
                <div
                  className={`eventduring_box ${eventinfo.status === 1 ? "applyend" : ""
                    }`}
                >
                  {eventinfo.status === 1
                    ? "報名已截止"
                    : applyinfo.length >= eventinfo.people_limit
                      ? "目前名額已滿"
                      : "開放報名中"}
                </div>
                {eventinfo.status === 2 && (
                  <div className="eventduring_text">
                    報名期間 :{" "}
                    {eventinfo.apply_start.substring(5, 10).replace("-", "/")}~
                    {eventinfo.apply_end.substring(5, 10).replace("-", "/")}
                  </div>
                )}
              </div>
              <div className="eventLimit">
                <div className={`eventLimiText ${limitper > 85 && "limit"}`}>
                  <div>目前人數 : {applyinfo.length}人</div>
                  <div>人數上限 : {eventinfo.people_limit}人</div>
                </div>
                <div className={`eventLimitLine ${limitper > 85 && "limit"}`}>
                  <div
                    className="eventLimitLinedata"
                    style={{ width: `${limitper}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="eventPageTexrArea">
                <div className="eventPageTitle">{eventinfo.event_name}</div>
                <div className="eventPageInfo">
                  活動日期 : {eventinfo.event_date}{" "}
                  {eventinfo.event_time_start.substring(0, 5)}~
                  {eventinfo.event_time_end.substring(0, 5)} <br />
                  活動地點 : {eventinfo.event_address} <br />
                  活動地標 : {eventinfo.event_venue}
                </div>
                <div className="eventPageR">
                  *入場請帶一隻500元以上的「葡萄酒」
                  如果來不及準備，也可以現場購買喔～
                </div>

                {eventinfo.status === 2 &&
                  applyinfo.length < eventinfo.people_limit && (
                    <Link href={`/event/apply/${id}`} className="Armallmt">
                      <button className="eventJoinB">填寫報名表單</button>
                    </Link>
                  )}
                {eventinfo.status === 2 &&
                  applyinfo.length >= eventinfo.people_limit && (
                    <button className="eventJoinB mta">
                      名額已滿，目前停止開放報名
                    </button>
                  )}
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="eventStatistics">
                <div className="eventStatisticsT">參加人統計</div>
                <div className="eventAge">
                  <div className="eventAgeText">
                    <div>平均年齡 : {agesum}歲</div>
                  </div>
                  <div className="eventAgeLine">
                    <div
                      className="eventAgeLinedata"
                      style={{ width: `${agesum * 2}%` }}
                    />
                  </div>
                </div>
                <div className="eventGender">
                  <div className="eventGenderText">
                    <div className="male">男性 : {males}人</div>
                    <div className="female">女性 : {females}人</div>
                  </div>
                  <div className="eventGenderLine">
                    <div
                      className="eventGenderLinedata"
                      style={{ width: `${gavg}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="eventOwner">
                <div className="eventOwnerT">開團人</div>
                <div className="eventOwnerInfo">
                  <img src={`https://winderland.shop/images/member/avatar/${Nowid}.png`} alt="" className="eventOwnerPic" onError={(e) => e.target.src = `https://winderland.shop/images/member/avatar/cat.png`} />
                  <div className="eventOwnerInfoT">
                    {applyinfo[0].neckname} <br />
                    {applyinfo[0].gender === 0 ? "男" : "女"} /{" "}
                    {applyinfo[0].age}歲
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="eventIntroduceT">活動介紹</div>
              <div className="eventIntroduce">
                <p style={{ whiteSpace: "pre-wrap" }}>
                  {eventinfo.event_introduce}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
