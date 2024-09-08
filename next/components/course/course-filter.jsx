import React,{ useEffect, useState } from 'react'
import { useRouter } from 'next/router';

export default function CourseFilter({teachers, setScore
    , districts
    , districtArr
    , setDistrictArr
    , setOnlineFilter
    , setTeacherSelect
    , setDateStart
    , setDateEnd
    , setPriceStart
    , setPriceEnd
    , score
    , onlineFilter
    , teacherSelect
    , dateStart
    , dateEnd
    , priceStart
    , priceEnd
    ,setCurrentPage}) {

    const router = useRouter()

    // districts: ; districtArr: 目前勾選的地區
    console.log(districts.length);
    console.log(districtArr);
  function handleCheckDistrict(e){
    // 點下之後，等於切換checked
    const value = e.target.value;
    if (!districtArr.includes(value)) {
      setDistrictArr([...districtArr, value]);
      setCurrentPage(1)
    } else {
      const updatedArr = districtArr.filter((item) => item !== value);
      setDistrictArr(updatedArr);
      setCurrentPage(1)
    }
  }
  useEffect(()=>{
    const newArr = districts.map((district)=>{
    return district.districtStr
    })
    setDistrictArr(newArr)
    document.querySelector(['#districtAll']).checked=true
  }, [])

  useEffect(()=>{
    console.log(districtArr);
    console.log("執行權選或反選");
    if(districtArr.length!=districts.length){
        document.querySelector(['#districtAll']).checked=false
        console.log("反選");
        console.log(districtArr.lenth+"&&&&&"+districts.length);
    }else{
        document.querySelector(['#districtAll']).checked=true
        console.log("全選");
    }
  }, [districtArr])

  function handleDistrictAll(e){
    router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
    if(e.target.checked){
        const newArr = districts.map((district)=>{
            return district.districtStr
        })
        setDistrictArr(newArr)
    } else {
        const emptyArr = []
        setDistrictArr(emptyArr)
    }
  }

  function handelSetScore(e){
    setScore(Math.floor(e.target.value));
    setCurrentPage(1)
    // router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
  }
  
  function handleOnlineRadio(e){
    setOnlineFilter(e.target.textContent);
    setCurrentPage(1)
    // router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
  }

  function handleTeacherSelect(e){
    setTeacherSelect(e.target.value)
    setCurrentPage(1)
    // router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
  }

  function handleDateStart(e) {
    setDateStart(e.target.value);
    setCurrentPage(1)
    // router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
  }

  function handleDateEnd(e) {
    const newDateEnd = e.target.value;
    setDateEnd(newDateEnd);
    setCurrentPage(1)
    // router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
  }

  function handlePriceStart(e) {
    if(Math.floor(e.target.value)===0){
        setPriceStart("")
        return;
    }
    const newPriceStart = Math.floor(e.target.value);
    setPriceStart(newPriceStart);
    setCurrentPage(1)
    // router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
  }

  function handlePriceEnd(e) {
    if(Math.floor(e.target.value)===0){
        setPriceEnd("")
        return;
    }
    const newPriceEnd = Math.floor(e.target.value);
    setPriceEnd(newPriceEnd);
    setCurrentPage(1)
    // router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
  }

  function handleClearPrice(){
    setPriceEnd("")
    setPriceStart("")
    // router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
  }
  useEffect(()=>{
    document.querySelector(["#priceStart"]).value=priceStart
    document.querySelector(["#priceEnd"]).value=priceEnd
  },[priceStart,priceEnd])

  function handleClearAllSort(){
    setOnlineFilter("全部")
    setTeacherSelect("全部")
    setDateStart("")
    setDateEnd("")
    setPriceStart("")
    setPriceEnd("")
    setScore(0)
    const newArr = districts.map((district)=>{
            return district.districtStr
        })
    setDistrictArr(newArr)
    document.querySelector(['#districtAll']).checked=true
    // router.push({pathname: '/course', query: {}}, undefined, {scroll: false})
  }
  return (
    <>  
        <div className='row mx-0 px-10px mb-3 spac-1 text-prim-text-prim fw-bold justify-content-between  d-flex d-md-none'>
          <div className='col-auto cursor-pointer btn-border-wine btn' onClick={handleClearAllSort}>清除篩選<i className="fa-solid fa-xmark ms-2"></i></div>
        </div>
        <div className='row mx-0 px-10px mb-3 spac-1 text-prim-text-prim fw-bold justify-content-between'>
                    
                    <div className='col-auto d-flex flex-row align-items-center list-group'>
                        <span>勾選欲篩選的地區：</span>
                        <span className='list-group-item border-0 p-1'>
                            <input className="form-check-input me-1" type="checkbox" id={`districtAll`} onClick={handleDistrictAll}></input>
                            <label className="form-check-label stretched-link spac-1 text-gray" htmlFor={`districtAll`}>全部 (包含線上課程)</label>
                        </span>
                    </div>
                    <div className='col-auto cursor-pointer btn-border-wine btn d-none d-md-block' onClick={handleClearAllSort}>清除篩選<i className="fa-solid fa-xmark ms-2"></i></div>
                    
        </div>
                    
        <div className='row mx-0 px-10px flex-wrap gap-3 row-gap-0'>
            {districts.map((district)=>{
                return (
                    <div key={district.dId} className={`col-auto list-group ${district.districtStr===""?"d-none":'d-flex'}`}>
                        <div className='list-group-item border-0 p-1'>
                            <input className="form-check-input me-1" type="checkbox" value={district.districtStr} id={`CheckboxStretched${district.dId}`} onChange={handleCheckDistrict} checked={districtArr.includes(district.districtStr)?true:false}></input>
                            <label className="form-check-label stretched-link spac-1 text-gray" htmlFor={`CheckboxStretched${district.dId}`}>{!district.districtStr?"無地址(線上課程)":district.districtStr}</label>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className='row mx-0 px-10px mb-3 spac-1 text-prim-text-prim fw-bold mt-4 row-gap-3'>
            <div className={`col-12 col-xl-6 mx-0 px-0 d-flex align-items-center me-5 gap-3`}>
                <span className='text-nowrap me-2 my-0 p-0'>請選取實體及線上：</span>
                <button className={`btn btn-light-to-prim ${onlineFilter==='全部'?'active':''}`} onClick={handleOnlineRadio}>全部</button>
                <button className={`btn btn-light-to-prim ${onlineFilter==='實體'?'active':''}`} onClick={handleOnlineRadio}>實體</button>
                <button className={`btn btn-light-to-prim ${onlineFilter==='線上'?'active':''}`} onClick={handleOnlineRadio}>線上</button>
            </div>
            <div className={`col-8 col-lg-6 col-xl-4 mx-0 px-0 d-flex align-items-center`}>
                <span className='text-nowrap me-2 my-0 p-0'>依評分篩選：</span>
                <select className="form-select" aria-label="Default select example" id="starsFilter" value={score} onChange={handelSetScore}>
                    <option value="0">全部</option>
                    <option value="1">一星及以上</option>
                    <option value="2">二星及以上</option>
                    <option value="3">三星及以上</option>
                    <option value="4">四星及以上</option>
                    <option value="5">五星</option>
                </select>
                <div className={`stars mt-2 d-flex align-items-center mb-2 ms-3`}>
                    <i className={`fa-solid fa-star ${score>0?'star-with-score':'star-without-score'}`}/>
                    <i className={`fa-solid fa-star ${score>1?'star-with-score':'star-without-score'}`}/>
                    <i className={`fa-solid fa-star ${score>2?'star-with-score':'star-without-score'}`}/>
                    <i className={`fa-solid fa-star ${score>3?'star-with-score':'star-without-score'}`}/>
                    <i className={`fa-solid fa-star ${score>4?'star-with-score':'star-without-score'}`}/>
                </div>
            </div>
        </div>
        <div className='row mx-0 px-10px mb-3 spac-1 text-prim-text-prim fw-bold mt-4 row-gap-3 gap-5'>
        
            <div className={`col-12 mx-0 px-0 d-flex align-items-center flex-wrap row-gap-2`}>
                <span className='d-flex flex-column align-items-center'>
                    <p className='text-nowrap me-2 my-0 p-0'>選擇開放報名時間：</p>
                    <p className='text-nowrap me-2 my-0 p-0 emmit1 text-gray'>(包含線上課程)</p>
                </span>
                <span className='d-flex align-items-center'>
                  <input type="date" className="form-control w-50" placeholder="選擇開課時間" aria-label="選擇開課時間" onChange={handleDateStart} value={dateStart}/>
                  <span className="mx-2">~</span>
                  <input type="date" className="form-control w-50" placeholder="選擇結束時間" aria-label="選擇結束時間" onChange={handleDateEnd} value={dateEnd}/>
                </span>
                {(dateStart && dateEnd && dateStart>dateEnd)?<span className='text-nowrap ms-3 text-prim-wine'>* 開始時間不得大於結束時間!!</span>:""}
            </div>
            
        </div>
        
        <div className='row mx-0 px-10px mb-3 spac-1 text-prim-text-prim fw-bold mt-4 row-gap-3 gap-3'>
            <div className={`col-12 mx-0 px-0 d-flex align-items-center flex-wrap row-gap-2`}>
                <span className='text-nowrap me-2 my-0 p-0'>選擇課程費用區間：</span>
                <span className="d-flex align-items-center">
                  NT$ <input type="text" className="form-control w-35" placeholder="最低金額..." aria-label="最低課程金額" value={priceStart} onChange={handlePriceStart} id={`priceStart`}/>
                  <span className="mx-2">~</span>
                  NT$ <input type="text" className="form-control w-35" placeholder="最高金額..." aria-label="最高課程金額" value={priceEnd} onChange={handlePriceEnd} id={`priceEnd`}/>
                  <i className="fa-solid fa-xmark mx-2 cursor-pointer" onClick={handleClearPrice}></i>
                </span>
                
                {(priceStart && priceEnd && Number(priceStart)>Number(priceEnd))?<span className='text-nowrap ms-3 text-prim-wine'>* 最小金額不得大於最大金額!!</span>:""}
            </div>
            
        </div>
        <div className='row mx-0 px-10px mb-3 spac-1 text-prim-text-prim fw-bold mt-4 row-gap-3 gap-5'>
            <div className={`col-12 col-xl-4 mx-0 px-0 d-flex align-items-center`}>
                        <span className='text-nowrap me-2 my-0 p-0'>依教師篩選：</span>
                        <select className="form-select" aria-label="Default select example" id="teacherFilter" onChange={handleTeacherSelect}>
                            <option value="全部">全部</option>
                        {teachers.map((teacher)=>{
                            return (
                                <option key={teacher?.id} value={teacher?.name}>{teacher?.name}</option>
                            )
                        })}
                        </select>
            </div>
        </div>
    </>
  )
}
