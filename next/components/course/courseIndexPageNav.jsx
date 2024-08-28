import React,{ useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";

export default function CourseIndexPageNav({courses, setCurrentPage}) {
    const [currentPage2, setCurrentPage2] = useState(1)
    const pageLimit = 8;
    const totalPages = Math.ceil(courses.length / pageLimit);
    
    function clickPage(e){
      setCurrentPage(parseInt(e.target.textContent))
      setCurrentPage2(parseInt(e.target.textContent))
      console.log(parseInt(e.target.textContent));
    }
    function clickPre(){
        if(currentPage2>1){
            const currentPageCal = currentPage2
            setCurrentPage(currentPageCal-1)
            setCurrentPage2(currentPageCal-1)
        }else{
            setCurrentPage(1)
            setCurrentPage2(1)
        }
    }
    function clickNext(){
        if(currentPage2<totalPages){
            const currentPageCal = currentPage2
            setCurrentPage(currentPageCal+1)
            setCurrentPage2(currentPageCal+1)
        }else{
            setCurrentPage(totalPages)
            setCurrentPage2(totalPages)
        }

    }
    return (
        <>
            <div className='col-auto d-flex gap-2'>
                <button className='btn btn-light-pageNav rounded-0 d-flex justify-content-center align-items-center' onClick={clickPre}>
                    <i class="fa-solid fa-chevron-left px-1 emmit1"></i>
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} className={`btn btn-light-pageNav rounded-0 emmit1 ${index+1===currentPage2?"active":""}`} onClick={clickPage}>
                    {index + 1}
                </button>
                ))}

                <button className='btn btn-light-pageNav rounded-0 d-flex justify-content-center align-items-center' onClick={clickNext}>
                    <i class="fa-solid fa-chevron-right px-1 emmit1"></i>
                </button>
            </div>
        </>
    )
}