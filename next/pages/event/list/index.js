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
            fetch(`http://localhost:3005/api/event/list/${useridis}`)
                .then(response => response.json())
                .then(infodata => setInfo(infodata))
                .catch(error => console.error('Error:', error));
        }
    }, [useridis]);

  

    const myallevent = infodata ? infodata.myallevent : [];
    const myowner = infodata ? infodata.myowner : [];
   

    const arrt = [{text:1},{text:2},{text:3},{text:4},{text:5}]
    const [activeIndexes, setActiveIndexes] = useState([]);
    const [scaleYIndexes, setScaleYIndexes] = useState([]);
  
    const handleClick = (index) => {
      setActiveIndexes(prev => 
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      )
  
      setTimeout(() => {
        setScaleYIndexes(prev => 
          prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
      }, 100);
    };

    if (!infodata) return <div>Loading...</div>;
    


    return (
        <>
            <Nav />
            <EventHeader />
            {myowner ? <pre>{JSON.stringify(myowner, null, 2)}</pre> : 'Loading...'}

            <>
                <div className="eventManageNav">
                    <div className="container">
                        <div className="ManageNavT">開團活動管理</div>
                        <div className="ManageNavList">
                            <div className="NavListLi">新增活動</div>
                            <div className="NavListLi NowUnderLI">活動管理</div>
                            <div className="NavListLi">已結束活動</div>
                        </div>
                    </div>
                </div>


                <div className="eventMDetailArea">
                    <div className="container">

                    {
                        arrt.map((t,i) => (
                            <div className="eventDetailist">
                            <div className="DetailistBox">
                                <img src="/event/e02.jpg" alt="" className="DetailistBoxPic" />
                                <div className="DetailistBoxT">
                                    <div className="DetailistBoxTitle">
                                        <div className="Eventstatus">開放報名中</div>
                                        <div className="EventTitle">
                                            桃園中壢新生酒店場一支會五周年狂歡派對
                                        </div>
                                    </div>
                                    <div className="DetailistBoxInfo">
                                        活動日期 - 08/24 19:00~22:00 <br />
                                        活動地點 - 桃園市中壢區
                                    </div>
                                </div>
                                <div className="DetailistBoxArr" onClick={() => handleClick(i)}>
                                    <div className={`lineA ${activeIndexes.includes(i) ? '' : 'active'}`} />
                                    <div className={`lineB ${activeIndexes.includes(i) ? '' : 'active'}`} />
                                </div>
                            </div>
                            <div className={`DetailistToggleBox ${activeIndexes.includes(i) ? 'active' : ''} ${scaleYIndexes.includes(i) ? 'scaleY' : ''}`}>
                                <div className="row gx-5 mb-3">
                                    <div className="col-12">
                                        <div className="ListInformationT">活動資訊</div>
                                    </div>
                                    <div className="col-10">
                                        <div className="ListInfoEventT">
                                            <div className="mb-3">
                                                活動標題 : 桃園中壢新生酒店場一支會五周年狂歡派對
                                                桃園中壢新生酒店場一支會五周年狂歡派對
                                            </div>
                                            <div>活動日期 : 2024/08/04 19:00~22:00</div>
                                            <div>活動地點 : 台北市萬華區西寧南路82巷2號</div>
                                            <div>活動地標 : ONCE Cafe&amp;Bar 無心戒酒互助會</div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="eventEditIcon">
                                            <i className="fa-solid fa-pen-to-square EditIconI" />
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
                                                <div>目前人數 : 12人</div>
                                                <div>人數上限 : 30人</div>
                                            </div>
                                            <div className="eventLimitLine">
                                                <div className="eventLimitLinedata" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-4">
                                        <div className="eventAge">
                                            <div className="eventAgeText">
                                                <div>平均年齡 : 28歲</div>
                                            </div>
                                            <div className="eventAgeLine">
                                                <div className="eventAgeLinedata" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-4">
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
                                <div className="row mt-4 gx-5">
                                    <div className="col-12">
                                        <div className="eventListInfoT">參加人資訊</div>
                                    </div>
                                    <div className="col-12">
                                        <div className="ListInfoComment">
                                            <div className="eventPList">
                                                <div className="eventPListInfo">
                                                    ▪ 花花公子哥 &nbsp;[ 男 / 36歲 ]
                                                </div>
                                                <div className="ListPComment">
                                                    大家好，我是
                                                    neck哥。很高興有機會在這裡與大家見面。我對酒品有著濃厚的興趣，尤其是那些具有獨特風味和故事的酒類。我喜歡在各種社交場合中，分享自己對酒品的認識和體驗，也很期待能夠從各位這裡學到更多關於酒的知識。我相信，這樣的活動不僅能讓我們品味到不同的酒品，還能促進我們之間的交流和了解。希望今晚能與大家共同探討和分享，讓我們一同度過一個愉快的夜晚。期待與大家的精彩交流！
                                                </div>
                                            </div>
                                            <div className="eventPList">
                                                <div className="eventPListInfo">
                                                    ▪ 花花公子哥 &nbsp;[ 男 / 36歲 ]
                                                </div>
                                                <div className="ListPComment">
                                                    大家好，我是
                                                    neck哥。很高興有機會在這裡與大家見面。我對酒品有著濃厚的興趣，尤其是那些具有獨特風味和故事的酒類。我喜歡在各種社交場合中，分享自己對酒品的認識和體驗，也很期待能夠從各位這裡學到更多關於酒的知識。我相信，這樣的活動不僅能讓我們品味到不同的酒品，還能促進我們之間的交流和了解。希望今晚能與大家共同探討和分享，讓我們一同度過一個愉快的夜晚。期待與大家的精彩交流！
                                                </div>
                                            </div>
                                            <div className="eventPList">
                                                <div className="eventPListInfo">
                                                    ▪ 花花公子哥 &nbsp;[ 男 / 36歲 ]
                                                </div>
                                                <div className="ListPComment">
                                                    大家好，我是
                                                    neck哥。很高興有機會在這裡與大家見面。我對酒品有著濃厚的興趣，尤其是那些具有獨特風味和故事的酒類。我喜歡在各種社交場合中，分享自己對酒品的認識和體驗，也很期待能夠從各位這裡學到更多關於酒的知識。我相信，這樣的活動不僅能讓我們品味到不同的酒品，還能促進我們之間的交流和了解。希望今晚能與大家共同探討和分享，讓我們一同度過一個愉快的夜晚。期待與大家的精彩交流！
                                                </div>
                                            </div>
                                            <div className="eventPList">
                                                <div className="eventPListInfo">
                                                    ▪ 花花公子哥 &nbsp;[ 男 / 36歲 ]
                                                </div>
                                                <div className="ListPComment">
                                                    大家好，我是
                                                    neck哥。很高興有機會在這裡與大家見面。我對酒品有著濃厚的興趣，尤其是那些具有獨特風味和故事的酒類。我喜歡在各種社交場合中，分享自己對酒品的認識和體驗，也很期待能夠從各位這裡學到更多關於酒的知識。我相信，這樣的活動不僅能讓我們品味到不同的酒品，還能促進我們之間的交流和了解。希望今晚能與大家共同探討和分享，讓我們一同度過一個愉快的夜晚。期待與大家的精彩交流！
                                                </div>
                                            </div>
                                            <div className="eventPList">
                                                <div className="eventPListInfo">
                                                    ▪ 花花公子哥 &nbsp;[ 男 / 36歲 ]
                                                </div>
                                                <div className="ListPComment">
                                                    大家好，我是
                                                    neck哥。很高興有機會在這裡與大家見面。我對酒品有著濃厚的興趣，尤其是那些具有獨特風味和故事的酒類。我喜歡在各種社交場合中，分享自己對酒品的認識和體驗，也很期待能夠從各位這裡學到更多關於酒的知識。我相信，這樣的活動不僅能讓我們品味到不同的酒品，還能促進我們之間的交流和了解。希望今晚能與大家共同探討和分享，讓我們一同度過一個愉快的夜晚。期待與大家的精彩交流！
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                        
                        


                        {/* 已截止 */}
                        {/* <div className="eventDetailist">
                            <div className="DetailistBox applyEnd">
                                <img src="/event/e02.jpg" alt="" className="DetailistBoxPic" />
                                <div className="DetailistBoxT">
                                    <div className="DetailistBoxTitle">
                                        <div className="Eventstatus">報名已截止</div>
                                        <div className="EventTitle">
                                            桃園中壢新生酒店場一支會五周年狂歡派對
                                        </div>
                                    </div>
                                    <div className="DetailistBoxInfo">
                                        活動日期 - 08/24 19:00~22:00 <br />
                                        活動地點 - 桃園市中壢區
                                    </div>
                                </div>
                                <div className="DetailistBoxArr">
                                    <div className="lineA active" />
                                    <div className="lineB active" />
                                </div>
                            </div>
                            <div className="DetailistToggleBox">
                                <div className="row gx-5 mb-3">
                                    <div className="col-12">
                                        <div className="ListInformationT">活動資訊</div>
                                    </div>
                                    <div className="col-12">
                                        <div className="ListInfoEventT">
                                            <div className="mb-3">
                                                活動標題 : 桃園中壢新生酒店場一支會五周年狂歡派對
                                                桃園中壢新生酒店場一支會五周年狂歡派對
                                            </div>
                                            <div>活動日期 : 2024/08/04 19:00~22:00</div>
                                            <div>活動地點 : 台北市萬華區西寧南路82巷2號</div>
                                            <div>活動地標 : ONCE Cafe&amp;Bar 無心戒酒互助會</div>
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
                                                <div>目前人數 : 12人</div>
                                                <div>人數上限 : 30人</div>
                                            </div>
                                            <div className="eventLimitLine">
                                                <div className="eventLimitLinedata" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-4">
                                        <div className="eventAge">
                                            <div className="eventAgeText">
                                                <div>平均年齡 : 28歲</div>
                                            </div>
                                            <div className="eventAgeLine">
                                                <div className="eventAgeLinedata" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-4">
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
                                <div className="row mt-4 gx-5">
                                    <div className="col-12">
                                        <div className="eventListInfoT">參加人資訊</div>
                                    </div>
                                    <div className="col-12">
                                        <div className="ListInfoComment">
                                            <div className="eventPList">
                                                <div className="eventPListInfo">
                                                    ▪ 花花公子哥 &nbsp;[ 男 / 36歲 ]
                                                </div>
                                                <div className="ListPComment">
                                                    大家好，我是
                                                    neck哥。很高興有機會在這裡與大家見面。我對酒品有著濃厚的興趣，尤其是那些具有獨特風味和故事的酒類。我喜歡在各種社交場合中，分享自己對酒品的認識和體驗，也很期待能夠從各位這裡學到更多關於酒的知識。我相信，這樣的活動不僅能讓我們品味到不同的酒品，還能促進我們之間的交流和了解。希望今晚能與大家共同探討和分享，讓我們一同度過一個愉快的夜晚。期待與大家的精彩交流！
                                                </div>
                                            </div>
                                            <div className="eventPList">
                                                <div className="eventPListInfo">
                                                    ▪ 花花公子哥 &nbsp;[ 男 / 36歲 ]
                                                </div>
                                                <div className="ListPComment">
                                                    大家好，我是
                                                    neck哥。很高興有機會在這裡與大家見面。我對酒品有著濃厚的興趣，尤其是那些具有獨特風味和故事的酒類。我喜歡在各種社交場合中，分享自己對酒品的認識和體驗，也很期待能夠從各位這裡學到更多關於酒的知識。我相信，這樣的活動不僅能讓我們品味到不同的酒品，還能促進我們之間的交流和了解。希望今晚能與大家共同探討和分享，讓我們一同度過一個愉快的夜晚。期待與大家的精彩交流！
                                                </div>
                                            </div>
                                            <div className="eventPList">
                                                <div className="eventPListInfo">
                                                    ▪ 花花公子哥 &nbsp;[ 男 / 36歲 ]
                                                </div>
                                                <div className="ListPComment">
                                                    大家好，我是
                                                    neck哥。很高興有機會在這裡與大家見面。我對酒品有著濃厚的興趣，尤其是那些具有獨特風味和故事的酒類。我喜歡在各種社交場合中，分享自己對酒品的認識和體驗，也很期待能夠從各位這裡學到更多關於酒的知識。我相信，這樣的活動不僅能讓我們品味到不同的酒品，還能促進我們之間的交流和了解。希望今晚能與大家共同探討和分享，讓我們一同度過一個愉快的夜晚。期待與大家的精彩交流！
                                                </div>
                                            </div>
                                            <div className="eventPList">
                                                <div className="eventPListInfo">
                                                    ▪ 花花公子哥 &nbsp;[ 男 / 36歲 ]
                                                </div>
                                                <div className="ListPComment">
                                                    大家好，我是
                                                    neck哥。很高興有機會在這裡與大家見面。我對酒品有著濃厚的興趣，尤其是那些具有獨特風味和故事的酒類。我喜歡在各種社交場合中，分享自己對酒品的認識和體驗，也很期待能夠從各位這裡學到更多關於酒的知識。我相信，這樣的活動不僅能讓我們品味到不同的酒品，還能促進我們之間的交流和了解。希望今晚能與大家共同探討和分享，讓我們一同度過一個愉快的夜晚。期待與大家的精彩交流！
                                                </div>
                                            </div>
                                            <div className="eventPList">
                                                <div className="eventPListInfo">
                                                    ▪ 花花公子哥 &nbsp;[ 男 / 36歲 ]
                                                </div>
                                                <div className="ListPComment">
                                                    大家好，我是
                                                    neck哥。很高興有機會在這裡與大家見面。我對酒品有著濃厚的興趣，尤其是那些具有獨特風味和故事的酒類。我喜歡在各種社交場合中，分享自己對酒品的認識和體驗，也很期待能夠從各位這裡學到更多關於酒的知識。我相信，這樣的活動不僅能讓我們品味到不同的酒品，還能促進我們之間的交流和了解。希望今晚能與大家共同探討和分享，讓我們一同度過一個愉快的夜晚。期待與大家的精彩交流！
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}



                    </div>
                </div>
            </>




            <Footer />
        </>
    );
}