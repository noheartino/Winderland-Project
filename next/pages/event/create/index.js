import { useEffect, useState } from 'react';
import Nav from '@/components/Header/Header'
import Footer from '@/components/footer/footer'
import EventHeader from '@/components/event/event-header'
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import Link from "next/link";


export default function Applyevent() {
    const router = useRouter();
    // const { id } = router.query;
    const [infodata, setInfo] = useState(null);

    const authData = useAuth().auth
    const UserData = authData.userData
    const useridis = UserData ? UserData.id : 0


    useEffect(() => {
        if (useridis) {
            fetch(`http://localhost:3005/api/event/invitation/${useridis}`)
                .then(response => response.json())
                .then(infodata => setInfo(infodata))
                .catch(error => console.error('Error:', error));
        }
    }, [useridis]);

    if (!infodata) return <div>Loading...</div>;

    const myinvitation = infodata.myinvitation[0] || [];
    const allinvitation = infodata.allinvitation[0] || [];



    return (
        <>
            <Nav />
            <EventHeader />
            {/* {allinvitation ? <pre>{JSON.stringify(allinvitation, null, 2)}</pre> : 'Loading...'} */}
            <>
                <div className="eventManageNav">
                    <div className="container">
                        <div className="ManageNavT">開團活動管理</div>
                        <div className="ManageNavList">
                            <div className="NavListLi NowUnderLI">新增活動</div>
                            <div className="NavListLi">活動管理</div>
                            <div className="NavListLi">已結束活動</div>
                        </div>
                    </div>
                </div>
                <div className="eventCreateWrite">
                    <div className="container">
                        <form action="" method="post">
                            <div className="row">
                                <div className="col-12 col-lg-8">
                                    <div className="row gx-2 gx-lg-4">
                                        <div className="col-12">
                                            <label htmlFor="eventName" className="CreateWriteT">
                                                活動標題
                                            </label>
                                            <input
                                                type="text"
                                                name="eventname"
                                                id="eventName"
                                                className="EventCreateInput"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="eventDate" className="CreateWriteT">
                                                活動日期
                                            </label>
                                            <input
                                                type="date"
                                                name="eventDate"
                                                id="eventDate"
                                                className="EventCreateInput pe-2"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="eventTimeS" className="CreateWriteT">
                                                活動開始時間
                                            </label>
                                            <input
                                                type="time"
                                                name="eventTimeS"
                                                id="eventTimeS"
                                                className="EventCreateInput pe-2"
                                                defaultValue="18:00"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="eventTimeE" className="CreateWriteT">
                                                活動結束時間
                                            </label>
                                            <input
                                                type="time"
                                                name="eventTimeE"
                                                id="eventTimeE"
                                                className="EventCreateInput pe-2"
                                                defaultValue="21:00"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="eventApplyS" className="CreateWriteT">
                                                報名開始日
                                            </label>
                                            <input
                                                type="date"
                                                name="eventApplyS"
                                                id="eventApplyS"
                                                className="EventCreateInput pe-2"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="eventApplyE" className="CreateWriteT">
                                                報名截止日
                                            </label>
                                            <input
                                                type="date"
                                                name="eventApplyE"
                                                id="eventApplyE"
                                                className="EventCreateInput pe-2"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="eventLimit" className="CreateWriteT">
                                                人數上限
                                            </label>
                                            <input
                                                type="number"
                                                name="eventLimit"
                                                id="eventLimit"
                                                className="EventCreateInput pe-2"
                                                min={5}
                                                defaultValue={20}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="eventCity" className="CreateWriteT">
                                                活動城市
                                            </label>
                                            <input
                                                type="text"
                                                name="eventCity"
                                                id="eventCity"
                                                className="EventCreateInput"
                                                placeholder="市+區"
                                            />
                                        </div>
                                        <div className="col-8">
                                            <label htmlFor="eventShop" className="CreateWriteT">
                                                活動地標名
                                            </label>
                                            <input
                                                type="text"
                                                name="eventShop"
                                                id="eventShop"
                                                className="EventCreateInput"
                                                placeholder="餐酒館的店名or地標"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="eventAdress" className="CreateWriteT">
                                                活動詳細地址
                                            </label>
                                            <input
                                                type="text"
                                                name="eventAdress"
                                                id="eventAdress"
                                                className="EventCreateInput"
                                                placeholder="活動地點的具體地址"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <label htmlFor="eventPic" className="form-label CreateWriteT">
                                        活動形象圖
                                    </label>
                                    <img src="/event/e02.jpg" alt="" className="prevpic" />
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="eventPic"
                                        name="eventpic"
                                    />
                                </div>
                                <div className="col-12 mt-3 mt-lg-0">
                                    <label htmlFor="eventIntro" className="CreateWriteT">
                                        活動介紹
                                    </label>
                                    <textarea
                                        name="eventIntro"
                                        id="eventIntro"
                                        placeholder="活動詳細說明"
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="col-12 d-flex justify-content-end mt-3">
                                    <button type="reset" className="eventCR">
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
            </>


            <Footer />
        </>
    );
}