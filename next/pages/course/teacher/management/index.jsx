import { useEffect, useState } from 'react';
import Nav from '@/components/Header/Header'
import Footer from '@/components/footer/footer'
import TeacherManageHeader from '@/components/course/teacher-manage-header'
import Noresult from '@/components/event/noresult';
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
  const myallapply = infodata ? infodata.myallapply : [];


  const arrt = [{ text: 1 }, { text: 2 }, { text: 3 }, { text: 4 }, { text: 5 }]
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

  function filtertheevent(index) {
    return myallevent.filter((i) => (i.id === index))[0]
  }

  function filterapply(index) {
    return myallapply.filter((i) => (i.event_id === index))
  }



  return (
    <>
      <div className='course-manage-wrap'>
        <Nav />
        <TeacherManageHeader />
        {/* {myowner ? <pre>{JSON.stringify(myowner, null, 2)}</pre> : 'Loading...'} */}

        <div className="CManageNav">
          <div className="container">
            <div className="CManageNavT">課程管理</div>
            <div className="CManageNavList">
              <Link href='/course/teacher/management' className='CArmallc'><div className="CNavListLi CNowUnderLI">課程管理</div></Link>
              <Link href='/course/teacher/management/create' className='CArmall'><div className="CNavListLi">新增課程</div></Link>
            </div>
          </div>
        </div>

        <div className={`courseMDetailArea`}>
          <div className="container">


                  <div className={`classMDetailist`}>
                    <div className={`CMDetailistBox CMapplyEnd`}>
                      <img src={``} alt="" className="CMDetailistBoxPic" />
                      <div className="CMDetailistBoxT">
                        <div className="CMDetailistBoxTitle">
                          <div className={`CMstatus`}>開放報名中</div>
                          <div className="CMclassTitle">
                            活動標題
                          </div>
                        </div>
                        <div className="CMDetailistBoxInfo">
                          活動日期 - 
                          <br />
                          活動地點 - 
                        </div>
                      </div>
                      <div className="CMDetailistBoxArr" onClick={() => handleClick(1)}>
                        <div className={`CMlineA active`} />
                        <div className={`CMlineB active`} />
                      </div>
                    </div>
                    <div className={`CMDetailistToggleBox active scaleY`}>
                      <div className="row gx-5 mb-3">
                        <div className="col-12">
                          <div className="CMListInformationT">活動資訊</div>
                        </div>
                        <div className="col-10">
                          <div className="CMListInfoEventT">
                            <div className="mb-3">
                              活動標題 :
                            </div>
                            <div>活動日期 : </div>
                            <div>活動地點 : </div>
                            <div>活動地標 : </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="CMEditIcon">
                            <Link href={`/course/teacher/management/manage/12`} className='CArmallc d-flex align-items-center'>
                              <div className='CMEditIconT d-none d-lg-block'>編輯活動</div>
                              <i className="fa-solid fa-pen-to-square CMEditIconI" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-5">
                        <div className="col-12">
                          <div className="CMListStatisT">參加人統計</div>
                        </div>
                        <div className="col-12 col-md-6 mb-4">
                          <div className="classMLimit">
                            <div className="classMLimiText">
                              <div>目前人數 : 人</div>
                              <div>人數上限 : 人</div>
                            </div>
                            <div className="classMLimitLine">
                              <div className="classMLimitLinedata" style={{ width: `33%` }} />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}