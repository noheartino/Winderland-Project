import React, { useState } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";


export default function EventHomeList({ events, userlv, onSortChange, currentSort, onpage, currentpage }) {

    const applyon = events.applyon || [];
    const applyoff = events.applyoff || [];
    const router = useRouter();
    const [newPage, setnewp] = useState(1)

    const alldatais = applyon.length;

    const toggleSort = () => {
        const newSort = currentSort === 'asc' ? 'desc' : 'asc';
        onSortChange(newSort);
    }

    // const clickpage = (e) => {
    //     currentpage = setnewp(e.target.value);

    //     onpage(newPage);
    //     console.log(newPage);

    // }

    const clickpage = (e) => {
        const selectedPage = parseInt(e.target.value, 10);
        setnewp(selectedPage);
        onpage(selectedPage);
        console.log(selectedPage);
    }

    const clickarrprev = () => {
        const previousPage = newPage > 1 ? newPage - 1 : 1;
        console.log(previousPage)
        setnewp(previousPage);
        onpage(previousPage);
    }

    const clickarrnext = () => {
        const nextiousPage = newPage + 1;
        console.log(nextiousPage)
        setnewp(nextiousPage);
        onpage(nextiousPage);
    }

    return (
        <>
            {/* {alldatais ? <pre>{JSON.stringify(alldatais, null, 2)}</pre> : 'Loading...'} */}
            <div className="eventHomeBoxArea">
                <div className="container">
                    <div className="eventHomeBoxAreaTitle d-none d-lg-flex">
                        <div className="eventHomeBoxAreaTitlel">
                            什麼是一支會？
                            <br />
                            <br />
                            就像英文的potluck，一人帶一道菜去聚會，一支會就是一人帶一支酒來聚會，您可以帶來您珍藏的好酒與酒友們一同分享喜悅。
                        </div>

                        <div className='AreaTitleRArea'>

                            <button className='ascto' onClick={toggleSort}>
                                {currentSort === 'asc' ? '最早▴' : '最新▾'}
                            </button>

                            {userlv < 3 ? <button
                                type="button"
                                className="eventHomeBoxAreaTitleB"
                                data-bs-toggle="modal"
                                data-bs-target="#eventCreateModal"
                            >
                                開團管理
                            </button> : <Link href='/event/create'><button
                                type="button"
                                className="eventHomeBoxAreaTitleB"
                            >
                                開團管理
                            </button></Link>}

                        </div>

                        <div
                            className="modal fade"
                            id="eventCreateModal"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered p-0">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5 lvtext" id="exampleModalLabel">
                                            提醒視窗
                                        </h1>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body lvtext mb-1">
                                        <p>目前您的會員等級不足，請確認您的會員等級為黃金會員 (Lv.3) 或以上，本功能僅供進階會員使用。</p>
                                        <p>您仍可以選擇參與活動，參與本站活動沒有會員等級之限制。</p>
                                        <div className='d-flex align-items-center mt-4 mb-2'>支援會員等級：<div className='lv3mark'>黃金會員</div><div className='lv4mark'>白金會員</div></div>

                                    </div>
                                </div>
                            </div>
                        </div>





                    </div>
                    <div className="eventHomeBoxAreaTitleRwd d-flex d-lg-none">
                        <div className="eventHomeBoxAreaTitlelRwd">
                            什麼是一支會？
                            <br />
                            <br />
                            就像英文的potluck，一人帶一道菜去聚會，一支會就是一人帶一支酒來聚會，您可以帶來您珍藏的好酒與酒友們一同分享喜悅。
                        </div>

                        {userlv >= 3 && <Link href='/event/create' className='BRwdA'><button className="eventHomeBoxAreaTitleBRwd">開團管理</button></Link>}
                        <button className='ascto' onClick={toggleSort}>
                            {currentSort === 'asc' ? '最早▴' : '最新▾'}
                        </button>


                    </div>
                    <div className="eventHomeBoxAreaBox row">
                        {
                            [...applyon].map((t, i) => (
                                <div className="col-12 col-lg-4 mb-4" key={i}>
                                    <div className="eventHomeBox_able">
                                        <div className="apply_able">報名期間內</div>
                                        <img src={`http://winderland.shop/uploads/event/${t.event_cover_image}`} alt="" className="eventHomeBoxImg" />
                                        <div className="eventHomeBox_text">
                                            <div className="title">{t.event_name}</div>
                                            <div className="info">
                                                活動日期 - {t.event_date} &nbsp; ({t.event_time_start.substring(0, 5)}~{t.event_time_end.substring(0, 5)}) <br />
                                                活動地點 - {t.event_city}
                                            </div>
                                            <div className="des">
                                                {t.event_introduce}
                                            </div>

                                            <Link className='A-rmpre' href={`event/info/${t.id}`}>
                                                <div className="into">
                                                    <div className="intoT">我想參加</div>
                                                    <div className="intoarr">
                                                        <div className="lineH" />
                                                        <div className="lineV" />
                                                    </div>
                                                </div>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            [...applyoff].map((t, i) => (
                                <div className={`col-12 col-lg-4 mb-4 ${alldatais >= 6 ? 'd-none' : ''}`} key={i}>
                                    <div className="eventHomeBox_disable">
                                        <div className="apply_disable">報名已截止</div>
                                        <img src={`/event/${t.event_cover_image}`} alt="" className="eventHomeBoxImg" />
                                        <div className="eventHomeBox_text">
                                            <div className="title">{t.event_name}</div>
                                            <div className="info">
                                                活動日期 - {t.event_date} &nbsp; ({t.event_time_start.substring(0, 5)}~{t.event_time_end.substring(0, 5)}) <br />
                                                活動地點 - {t.event_city}
                                            </div>
                                            <div className="des">
                                                {t.event_introduce}
                                            </div>
                                            <Link className='A-rmpre' href={`event/info/${t.id}`}>
                                                <div className="into">
                                                    <div className="intoT">查看活動</div>
                                                    <div className="intoarr">
                                                        <div className="lineH" />
                                                        <div className="lineV" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                    </div>


                    <div className="eventPagearea">

                        <button className='EventPage-toarr' onClick={clickarrprev}>
                            <i className="fa-solid fa-chevron-left px-1 emmit1-pageNav"></i>
                        </button>

                        <button className='EventPage-to' value={1} onClick={clickpage}>
                            1
                        </button>

                        <button className='EventPage-to' value={2} onClick={clickpage}>
                            2
                        </button>

                        <button className='EventPage-toarr' onClick={clickarrnext} disabled={alldatais < 6}>
                            <i className="fa-solid fa-chevron-right px-1 emmit1-pageNav"></i>
                        </button>

                    </div>



                </div>
            </div>



        </>
    )
}
