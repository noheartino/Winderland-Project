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
  // const { id } = router.query;
  const [infodata, setInfo] = useState(null);

  const authData = useAuth().auth;
  const UserData = authData.userData;
  const useridis = UserData ? UserData.id : 0;

  useEffect(() => {
    if (useridis) {
      fetch(`http://localhost:3005/api/event/invitation/${useridis}`)
        .then((response) => response.json())
        .then((infodata) => setInfo(infodata))
        .catch((error) => console.error("Error:", error));
    }
  }, [useridis]);

  if (!infodata) return <div>Loading...</div>;

  const myinvitation = infodata.myinvitation[0] || [];
  const allinvitation = infodata.allinvitation[0] || [];

  return (
    <>
      <Head>
        <title>醺迷仙園｜活動邀請函</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />
      {/* {allinvitation ? <pre>{JSON.stringify(allinvitation, null, 2)}</pre> : 'Loading...'} */}

      <div className="container">
        <div className="eventpageCard d-none d-lg-flex">
          <div className="eventCardTitle">您已成功送出申請，請收取邀請函</div>
          <div className="eventCardOuter">
            <img
              className="eventCardPic"
              src={`http://localhost:3005/uploads/event/${allinvitation.event_cover_image}`}
              alt=""
            ></img>
            <div className="eventCardInfo">
              <div className="Infotitle">{allinvitation.event_name}</div>
              <div className="InfoT">
                活動日期 - {allinvitation.event_date} &nbsp; (
                {allinvitation.event_time_start.substring(0, 5)}~
                {allinvitation.event_time_end.substring(0, 5)}) <br />
                活動地點 - {allinvitation.event_city}
              </div>
              <div className="InfoP">
                [ 參加者資訊 ] <br />
                {allinvitation.neckname} /{" "}
                {allinvitation.gender === 1
                  ? "女"
                  : allinvitation.gender === 0
                  ? "男"
                  : "性別不詳"}
              </div>
            </div>
          </div>
          <div className="eventCardWarn">
            <div className="WarnT">注意事項</div>
            <div className="WarnLine">
              <div className="dot" />
              <div>
                請以截圖方式保存好此邀請函，於抵達活動現場後，本團開團者會先進行身分確認，請於身分確認時出示出本邀請函予開團者查看，以表示本人身分。
              </div>
            </div>
            <div className="WarnLine">
              <div className="dot" />
              <div>
                您於本次活動所填寫資料，只供開團者掌握參與者資訊，不作為其他用途。
              </div>
            </div>
            <div className="WarnLine">
              <div className="dot" />
              <div>
                本活動預設不收取參加費用，惟餐廳所花費之餐點費用，皆為AA制，故無餐點免費之情事。
              </div>
            </div>
            <div className="WarnLine">
              <div className="dot" />
              <div>
                自帶酒類請以分享心態來場交流，勿以彼此酒類之價值高低使之比較。
              </div>
            </div>
          </div>
          <Link className="A-rmpre" href="/event">
            <button className="eventGoHome">回活動首頁</button>
          </Link>
        </div>
        <div className="eventpageCardRwd d-block d-lg-none">
          <div className="eventCardTitleR">您已成功送出申請，請收取邀請函</div>
          <div className="eventCardOuterR">
            <img
              className="eventCardPicR"
              src={`/event/${allinvitation.event_cover_image}`}
              alt=""
            />
            <div className="eventCardInfoR">
              <div className="InfotitleR">{allinvitation.event_name}</div>
              <div className="InfoTR">
                活動日期 - {allinvitation.event_date} &nbsp; (
                {allinvitation.event_time_start.substring(0, 5)}~
                {allinvitation.event_time_end.substring(0, 5)}) <br />
                活動地點 - {allinvitation.event_city}
              </div>
              <div className="InfoPR">
                [ 參加者資訊 ] <br />
                {allinvitation.neckname} /{" "}
                {allinvitation.gender === 1 ? "女" : "男"}
              </div>
            </div>
          </div>
          <div className="eventCardWarn">
            <div className="WarnT">注意事項</div>
            <div className="WarnLine">
              <div>
                ▪️
                請以截圖方式保存好此邀請函，於抵達活動現場後，本團開團者會先進行身分確認，請於身分確認時出示出本邀請函予開團者查看，以表示本人身分。
              </div>
            </div>
            <div className="WarnLine">
              <div>
                ▪️
                您於本次活動所填寫資料，只供開團者掌握參與者資訊，不作為其他用途。
              </div>
            </div>
            <div className="WarnLine">
              <div>
                ▪
                本活動預設不收取參加費用，惟餐廳所花費之餐點費用，皆為AA制，故無餐點免費之情事。
              </div>
            </div>
            <div className="WarnLine">
              <div>
                ▪️
                自帶酒類請以分享心態來場交流，勿以彼此酒類之價值高低使之比較。
              </div>
            </div>
          </div>
          <Link className="A-rmpre" href="/event">
            <button className="eventGoHomeR">回活動首頁</button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
