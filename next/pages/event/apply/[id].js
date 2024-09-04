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
  const { id } = router.query;
  const [infodata, setInfo] = useState(null);

  const { auth, updateUserInfo } = useAuth();

  const authData = useAuth().auth;
  const UserData = authData.userData;

  const useridis = UserData ? UserData.id : 0;

  const [formData, setFormData] = useState({
    event_id: 0,
    neckname: "",
    gender: 0,
    age: 25,
    introduce: "",
  });

  useEffect(() => {
    if (!auth.isAuth) {
      router.push("/member/login");
    }
  }, [auth, router]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3005/api/event/apply/${id}`)
        .then((response) => response.json())
        .then((infodata) => setInfo(infodata))
        .catch((error) => console.error("Error:", error));
    }
  }, [id]);

  if (!infodata) return <div>Loading...</div>;

  const eventinfo = infodata.eventinfo[0] || [];
  const applyinfo = infodata.applyinfo[0] || [];
  const nowid = eventinfo.id;

  //form

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formDataConverted = {
    event_id: parseInt(nowid, 10),
    user_id: parseInt(useridis, 10),
    neckname: formData.neckname,
    gender: parseInt(formData.gender, 10),
    age: parseInt(formData.age, 10),
    introduce: formData.introduce,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3005/api/event/app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataConverted),
      });
      if (response.ok) {
        router.push("/event/invitation");
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Head>
        <title>一支會活動報名</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />
      <EventHeader />
      {/* {UserData ? <pre>{JSON.stringify(UserData, null, 2)}</pre> : 'Loading...'} */}
      {/* {eventinfo ? <pre>{JSON.stringify(eventinfo, null, 2)}</pre> : 'Loading...'} */}
      <div className="eventApplyArea">
        <div className="container">
          <div className="row g-5">
            <div className="col-12 col-lg-5">
              <img
                src={`http://localhost:3005/uploads/${eventinfo.event_cover_image}`}
                alt=""
                className="eventPageimg"
              />
              <div className="eventduring">
                <div className="eventduring_box">開放報名中</div>
                <div className="eventduring_text">
                  報名期間 :{" "}
                  {eventinfo.apply_start.substring(5, 10).replace("-", "/")}~
                  {eventinfo.apply_end.substring(5, 10).replace("-", "/")}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="eventApplyTextArea">
                <div className="eventApplyTitle">{eventinfo.event_name}</div>
                <div className="eventApplyInfo">
                  活動日期 : {eventinfo.event_date}{" "}
                  {eventinfo.event_time_start.substring(0, 5)}~
                  {eventinfo.event_time_end.substring(0, 5)} <br />
                  活動地點 : {eventinfo.event_address} <br />
                  活動地標 : {eventinfo.event_venue}
                </div>
                <div className="eventApplyR">
                  *入場請帶一隻500元以上的「葡萄酒」
                  如果來不及準備，也可以現場購買喔～
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row g-5 ApplyWrite">
              <div className="col-12 col-lg-5">
                <label htmlFor="eventApplyName" className="eventApplyQT">
                  名字 (本名或綽號皆可)
                </label>
                <input
                  type="text"
                  name="neckname"
                  value={formData.neckname}
                  onChange={handleChange}
                  id="eventApplyName"
                  required
                />
              </div>
              <div className="col-12 col-lg-7">
                <div className="genderage">
                  <div className="d-flex flex-column w-50 pe-4">
                    <label htmlFor="Applygender" className="eventApplyQT">
                      性別
                    </label>
                    <select
                      name="gender"
                      id="Applygender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value={2}>- 請選擇 -</option>
                      <option value={0}>男性</option>
                      <option value={1}>女性</option>
                    </select>
                  </div>
                  <div className="d-flex flex-column w-50 ps-4">
                    <label htmlFor="ApplyAge" className="eventApplyQT">
                      年齡
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      id="ApplyAge"
                      min={18}
                      max={60}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="Applycomment" className="eventApplyQT d-block">
                  自我介紹&amp;意見
                </label>
                <textarea
                  name="introduce"
                  value={formData.introduce}
                  onChange={handleChange}
                  id="Applycomment"
                  placeholder="我想跟開團人說 ... "
                  defaultValue={""}
                />
              </div>
              <div className="col-12 text-center">
                <button type="submit" id="eventApplySubmit">
                  送出報名
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
