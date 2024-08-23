import React from 'react'


export default function EventHomeList({ events }) {
    
    const applyon = events.applyon || [];
    const applyoff = events.applyoff || [];

    return (
        <>
            <div className="eventHomeBoxArea">
                <div className="container">
                    <div className="eventHomeBoxAreaTitle d-none d-lg-flex">
                        <div className="eventHomeBoxAreaTitlel">
                            什麼是一支會？
                            <br />
                            <br />
                            就像英文的potluck，一人帶一道菜去聚會，一支會就是一人帶一支酒來聚會，您可以帶來您珍藏的好酒與酒友們一同分享喜悅。
                        </div>
                        <button className="eventHomeBoxAreaTitleB">我要開團</button>
                    </div>
                    <div className="eventHomeBoxAreaTitleRwd d-flex d-lg-none">
                        <div className="eventHomeBoxAreaTitlelRwd">
                            什麼是一支會？
                            <br />
                            <br />
                            就像英文的potluck，一人帶一道菜去聚會，一支會就是一人帶一支酒來聚會，您可以帶來您珍藏的好酒與酒友們一同分享喜悅。
                        </div>
                        <button className="eventHomeBoxAreaTitleBRwd">我要開團</button>
                    </div>
                    <div className="eventHomeBoxAreaBox row">
                        {
                            [...applyon].map((t, i) => (
                                <div className="col-12 col-lg-4 mb-4" key={i}>
                                    <div className="eventHomeBox_able">
                                        <div className="apply_able">開放報名中</div>
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
                                            <a className='A-rmpre' href={`event/info/${t.id}`}>
                                            <div className="into">
                                                <div className="intoT">我有興趣</div>
                                                <div className="intoarr">
                                                    <div className="lineH" />
                                                    <div className="lineV" />
                                                </div>
                                            </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            [...applyoff].map((t, i) => (
                                <div className="col-12 col-lg-4 mb-4" key={i}>
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
                                            <div className="into">
                                                <div className="intoT">我有興趣</div>
                                                <div className="intoarr">
                                                    <div className="lineH" />
                                                    <div className="lineV" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>

        </>
    )
}
