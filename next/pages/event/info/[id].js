import React from "react";
import Nav from "@/components/Header/Header";
import EventHeader from "@/components/event/event-header";
import Footer from "@/components/footer/footer";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Einfo() {

  const router = useRouter();
  const { id } = router.query;
  const [infodata, setInfo] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3005/api/event/info/${id}`)
        .then(response => response.json())
        .then(infodata => setInfo(infodata))
        .catch(error => console.error('Error:', error));
    }
  }, [id]);

  if (!infodata) return <div>Loading...</div>;

  return (
    <>
      <Nav />
      {/* {infodata ? <pre>{JSON.stringify(infodata, null, 2)}</pre> : 'Loading...'} */}
      <EventHeader />
      <div className="eventPageArea">
        <div className="eventPageAreaBg1 d-none d-lg-block" />
        <div className="eventPageAreaBg2 d-none d-lg-block" />
        <div className="container">
          <div className="row g-5">
            <div className="col-12 col-lg-5">
              <img src={`/event/${infodata[0].event_cover_image}`} alt="" className="eventPageimg" />
              <div className="eventduring">
                <div className="eventduring_box">開放報名中</div>
                <div className="eventduring_text">報名期間 : {infodata[0].apply_start.substring(5, 10).replace("-","/")}~{infodata[0].apply_end.substring(5, 10).replace("-","/")}</div>
              </div>
              <div className="eventLimit">
                <div className="eventLimiText">
                  <div>目前人數 : </div>
                  <div>人數上限 : {infodata[0].people_limit}人</div>
                </div>
                <div className="eventLimitLine">
                  <div className="eventLimitLinedata" />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="eventPageTexrArea">
                <div className="eventPageTitle">{infodata[0].event_name}</div>
                <div className="eventPageInfo">
                  活動日期 : {infodata[0].event_date} {infodata[0].event_time_start.substring(0, 5)}~{infodata[0].event_time_end.substring(0, 5)} <br />
                  活動地點 : {infodata[0].event_address} <br />
                  活動地標 : {infodata[0].event_venue}
                </div>
                <div className="eventPageR">
                  *入場請帶一隻500元以上的「葡萄酒」
                  如果來不及準備，也可以現場購買喔～
                </div>
                <button className="eventJoinB">填寫報名表單</button>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="eventStatistics">
                <div className="eventStatisticsT">參加人統計</div>
                <div className="eventAge">
                  <div className="eventAgeText">
                    <div>平均年齡 : 28歲</div>
                  </div>
                  <div className="eventAgeLine">
                    <div className="eventAgeLinedata" />
                  </div>
                </div>
                <div className="eventGender">
                  <div className="eventGenderText">
                    <div className="male">男性 : 12人</div>
                    <div className="female">女性 : 8人</div>
                  </div>
                  <div className="eventGenderLine">
                    <div className="eventGenderLinedata" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="eventOwner">
                <div className="eventOwnerT">開團人</div>
                <div className="eventOwnerInfo">
                  <img
                    src="/event/teacher_alex_tsai.jpg"
                    alt=""
                    className="eventOwnerPic"
                  />
                  <div className="eventOwnerInfoT">
                    蔡孝倫 <br />男 / 36歲
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="eventIntroduceT">活動介紹</div>
              <div className="eventIntroduce">
                <p style={{ whiteSpace: 'pre-wrap' }}>{infodata[0].event_introduce}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
