import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

export default function CourseList({ myBox, classAssigns, toggleIsHomePage }) {
    const assigns = classAssigns?.filter((assign) => {
        return assign.class_id === myBox?.id;
      });
    const assignedQ = assigns?.length;
    return (
        <>
            <div className={`course-leftcontent col-12 col-md-8 h-100 px-0 ${myBox ? 'd-block' : 'd-none'}`} type="button">
                <div className="course-video-video overflow-hidden position-relative">
                    <img
                        className="course-img21"
                        src={`/images/course_and_tarot/${myBox?.class_path}`}
                        alt=""
                    />
                    <div className="d-flex d-md-none justify-content-center align-items-center w-100 h-100 absolute-t0-l0">
                        <p className="text-white z-1 fw-thin spac-1 px-2 text-center">
                        {myBox?.name}
                        </p>
                        <div className="opacity-50 w-100 h-100 bg-text-dark color-cover position-absolute" />
                    </div>
                </div>
                <div className="course-body row d-none d-md-flex flex-column align-items-center justify-content-between">
                    <div className="col-12 h-auto py-0 my-0">
                        <span className={`${myBox?.online===0?'online-tag':'underline-tag'}`}>{myBox?.online===0?'線上':'實體'}</span>
                        <span
                            className="h5 spac-1"
                            style={{ lineHeight: "35px" }}
                        >
                            {myBox?.name}
                            
                        </span>
                    </div>
                    <div className="col-12">
                    <div
                        className="progress bg-sec-blue"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "5px", marginTop: '15px' }}
                    >
                        <div
                        className="progress-bar bg-sec-blue-dark"
                        style={{ width: `${assignedQ}%` }}
                        />
                    </div>
                    </div>
                    
                </div>
            </div>
            <div className={`course-more col h-100 ms-3 justify-content-center align-items-center cursor-pointer ${myBox ? 'd-none d-md-flex' : 'd-none'}`} onClick={toggleIsHomePage}>
                <div className="spac-2 text-prim-dark h6">查看更多</div>
                <div
                    className="ms-2 rounded-circle overflow-hidden border-1 border border-prim-dark d-flex align-items-center justify-content-center"
                    style={{ width: "20px", height: "20px" }}
                >
                    <i
                        className="fa-solid fa-chevron-right text-sec-orange"
                        style={{ fontSize: "9px" }}
                    />
                </div>
            </div>
            <div className={`course-no-content col h-100 flex-column flex-md-row px-0 m-0 row-gap-3 justify-content-center align-items-center ${myBox ? 'd-none' : 'd-flex'}`} style={{minHeight: '278px'}}>
                <i className="fa-regular fa-face-meh me-2 text-prim-dark h5" />
                <div className="spac-2 text-prim-dark h6">
                    尚無課程內容
                </div>
            </div>
        </>
    )
}