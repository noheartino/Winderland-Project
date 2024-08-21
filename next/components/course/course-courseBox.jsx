import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

export default function CourseList({ firstMyCourse, firstMyFavoriteCourse }) {
    return (
        <>
            <a className={`course-leftcontent col-12 col-md-8 px-0 {myCourse.length>0 ? 'd-block' : 'd-none'}`} type="button" href="/">
                <div className="course-video-video overflow-hidden position-relative">
                    <img
                        className="course-img21"
                        src="/images/course_and_tarot/rectangle128.png"
                        alt=""
                    />
                    <div className="d-flex d-md-none justify-content-center align-items-center w-100 h-100 absolute-t0-l0">
                        <p className="text-white z-1 fw-thin spac-1 px-2 text-center">
                            ???
                        </p>
                        <div className="opacity-50 w-100 h-100 bg-text-dark color-cover position-absolute" />
                    </div>
                </div>
                <div className="course-body d-none d-md-block">
                    <span className="underline-tag">實體</span>
                    <span
                        className="h5 spac-1"
                        style={{ lineHeight: "35px" }}
                    >
                        ???
                    </span>
                    <div
                        className="progress mt-2 bg-sec-blue"
                        role="progressbar"
                        aria-label=""
                        aria-valuenow={75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ height: "5px" }}
                    >
                        <div
                            className="progress-bar bg-sec-blue-dark"
                            style={{ width: "70%" }}
                        />
                    </div>
                </div>
            </a>
            <a
                className={`course-more col h-100 ms-3 d-none d-md-flex justify-content-center align-items-center {myCourse.length>0 ? 'd-flex' : 'd-none'}`}
                href="/"
            >
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
            </a>
            <div className={`course-no-content col h-100 flex-column flex-md-row px-0 m-0 row-gap-3 justify-content-center align-items-center {myCourse.length>0 ? 'd-none' : 'd-flex'}`}>
                <i className="fa-regular fa-face-meh me-2 text-prim-dark h5" />
                <div className="spac-2 text-prim-dark h6">
                    尚無課程內容
                </div>
            </div>
        </>
    )
}