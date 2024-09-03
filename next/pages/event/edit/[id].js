import { useEffect, useState } from "react";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import EventHeader from "@/components/event/event-header";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";

export default function Applyevent() {
  const router = useRouter();
  const { id } = router.query;

  const [infodata, setInfo] = useState(null);
  const authData = useAuth().auth;
  const UserData = authData.userData;
  const useridis = UserData ? UserData.id : 0;
  // const birthday = UserData ? UserData.birthday : ''
  // const mygender = UserData?.gender === 'Female' ? 1 : 0
  // const myname = UserData ? UserData.user_name : ''

  // 存儲圖片 URL

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0]; // 獲取選中的文件
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImage(reader.result); // 設置圖片 URL 到狀態
  //     };
  //     reader.readAsDataURL(file); // 讀取文件為 data URL
  //   }
  // };

  useEffect(() => {
    fetch(`http://localhost:3005/api/event-edit/${id}`)
      .then((response) => response.json())
      .then((infodata) => setInfo(infodata))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const myeventdata = infodata?.myevent || [];
  const allapplydata = infodata?.allapply || [];
  const myevent = myeventdata[0] || {};
  const ownerusers = allapplydata[0] || {};
  const ownerid = ownerusers.user_id || 0;

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(
    `http://localhost:3005/uploads/${myevent.event_cover_image}`
  );
  const [formData, setFormData] = useState({
    event_name: "",
    event_date: "",
    event_time_start: "",
    event_time_end: "",
    apply_start: "",
    apply_end: "",
    event_city: "",
    event_venue: "",
    event_address: "",
    people_limit: "",
    event_introduce: "",
  });

  useEffect(() => {
    if (infodata) {
      setImage(`http://localhost:3005/uploads/${myevent.event_cover_image}`);
      setFormData({
        event_name: myevent.event_name || "",
        event_date: myevent.event_date || "",
        event_time_start: myevent.event_time_start || "",
        event_time_end: myevent.event_time_end || "",
        apply_start: myevent.apply_start || "",
        apply_end: myevent.apply_end || "",
        event_city: myevent.event_city || "",
        event_venue: myevent.event_venue || "",
        event_address: myevent.event_address || "",
        people_limit: myevent.people_limit || 0,
        event_introduce: myevent.event_introduce || "",
      });
    }
  }, [infodata]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    // 將 formData 狀態添加到 FormData
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      // 發送 PUT 請求
      const response = await axios({
        method: "PUT",
        url: `http://localhost:3005/api/event-edit/edit/${id}`,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data", // 設置 Content-Type 為 multipart/form-data
        },
      });

      console.log("Success:", response.data);

      router.push("/event/list");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const todelete = async (event) => {
    event.preventDefault();

    try {
      const response = await axios({
        method: "PUT",
        url: `http://localhost:3005/api/event-edit/delete/${id}`,
      });

      console.log("Success:", response.data);

      router.push("/event/pastevent");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    if (infodata && useridis) {
      // const ownerid = infodata.allapply?.[0]?.user_id || 0;

      const allapply = infodata.allapply || [];
      const ownerid = allapply.length > 0 ? allapply[0]?.user_id || 0 : 0;

      console.log("Current User ID:", useridis);
      console.log("Owner ID:", ownerid);

      if (useridis !== ownerid) {
        console.log("Redirecting to login...");
        router.push("/member/login");
      }
    }
  }, [infodata, useridis, router]);

  // const myeventdata = infodata?.myevent || [];
  // const allapplydata = infodata?.allapply || [];
  // const myevent = myeventdata[0] || {};
  // const ownerusers = allapplydata[0] || {};
  // const ownerid = ownerusers.user_id || 0;

  // const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     try {
  //         // 使用 FormData 封裝數據
  //         const data = new FormData();
  //         for (const key in formData) {
  //             data.append(key, formData[key]);
  //         }

  //         const response = await axios.put(`http://localhost:3005/api/event-edit/edit/${id}`, data, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data', // 設置 Content-Type 為 multipart/form-data
  //             },
  //         });

  //         console.log('Success:', response.data);

  //     } catch (error) {
  //         console.error('Error:', error);
  //     }

  // };

  //   const handleUpdateQuantity = async (itemId, newQuantity) => {
  //     try {
  //       const response = await fetch(`http://localhost:3005/api/cart/${itemId}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ product_quantity: newQuantity }),
  //       });

  //       if (response.ok) {
  //         setProductData((prevData) =>
  //           prevData.map((item) =>
  //             item.cart_item_id === itemId
  //               ? { ...item, product_quantity: newQuantity }
  //               : item
  //           )
  //         );
  //       } else {
  //         const errorData = await response.json();
  //         console.error("无法更新数量:", errorData);
  //       }
  //     } catch (error) {
  //       console.error("更新数量时发生错误:", error);
  //     }
  //   };

  // const formDataConverted = {
  //     event_name: formData.event_name,
  //     event_date: formData.event_date,
  //     event_time_start: formData.event_time_start,
  //     event_time_end: formData.event_time_end,
  //     apply_start: formData.apply_start,
  //     apply_end: formData.apply_end,
  //     event_city: formData.event_city,
  //     event_venue: formData.event_venue,
  //     event_address: formData.event_address,
  //     people_limit: parseInt(formData.people_limit, 10),
  //     event_introduce: formData.event_introduce,
  // };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const response = await fetch(`http://localhost:3005/api/event-edit/${id}`, {
  //             method: 'POST',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify(formDataConverted),
  //         });
  //         if (response.ok) {
  //             router.push('/event/invitation');
  //         } else {
  //             throw new Error('Failed to create event');
  //         }
  //     } catch (error) {
  //         console.error('Error:', error);
  //     }
  // };

  // useEffect(() => {
  //     if(useridis != ownerid){
  //         router.push('/member/login')
  //     }
  //  }, [ownerid, useridis]);

  return (
    <>
      <Head>
        <title>一支會活動編輯</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />
      <EventHeader />

      {/* {myevent ? <pre>{JSON.stringify(myevent, null, 2)}</pre> : 'Loading...'}
            {ownerid ? <pre>{JSON.stringify(ownerid, null, 2)}</pre> : 'Loading...'}
            {useridis ? <pre>{JSON.stringify(useridis, null, 2)}</pre> : 'Loading...'} */}

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
              <div className="NavListLi">已結束活動</div>
            </Link>
            <Link href="/event" className="Armall">
              <div className="NavListLi NowUnderLI">編輯活動</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="eventCreateWrite">
        <div className="container">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="row gx-2 gx-lg-4">
                  <div className="col-12">
                    <label htmlFor="eventName" className="CreateWriteT">
                      活動標題
                    </label>
                    <input
                      type="text"
                      name="event_name"
                      id="eventName"
                      className="EventCreateInput"
                      value={formData.event_name}
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="eventPic" className="form-label CreateWriteT">
                  活動形象圖
                </label>
                <img src={image} alt="" className="prevpic" />
                {/* <input
                                        className="form-control"
                                        type="file"
                                        id="eventPic"
                                        name="myfile"
                                        onChange={handleImageUpload}
                                    /> */}
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
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 d-flex justify-content-end mt-3">
                <button onClick={todelete} className="eventCRR">
                  <i class="fa-solid fa-trash-can"></i> 活動移除
                </button>

                <button type="submit" className="eventCS d-block">
                  變更活動
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
