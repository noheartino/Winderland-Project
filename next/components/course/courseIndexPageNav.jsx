import React,{ useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";

export default function CourseIndexPageNav({courses, currentPage, setCurrentPage, pageLimit}) {
    const totalPages = Math.ceil(courses.length / pageLimit);
    
    function clickPage(e){
      setCurrentPage(parseInt(e.target.textContent))
      console.log(parseInt(e.target.textContent));
    }
    function clickPre(){
        if(currentPage>1){
            const currentPageCal = currentPage
            setCurrentPage(currentPageCal-1)
        }else{
            setCurrentPage(1)
        }
    }
    function clickNext(){
        if(currentPage<totalPages){
            const currentPageCal = currentPage
            setCurrentPage(currentPageCal+1)
        }else{
            setCurrentPage(totalPages)
        }

    }
    return (
        <>
            <div className='col-auto d-flex gap-2'>
                <button className='btn btn-light-pageNav rounded-0 d-flex justify-content-center align-items-center' onClick={clickPre}>
                    <i className="fa-solid fa-chevron-left px-1 emmit1-pageNav"></i>
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} className={`btn btn-light-pageNav rounded-0 emmit1-pageNav ${index+1===currentPage?"active":""}`} onClick={clickPage}>
                    {index + 1}
                </button>
                ))}

                <button className='btn btn-light-pageNav rounded-0 d-flex justify-content-center align-items-center' onClick={clickNext}>
                    <i className="fa-solid fa-chevron-right px-1 emmit1-pageNav"></i>
                </button>
            </div>
        </>
    )
}