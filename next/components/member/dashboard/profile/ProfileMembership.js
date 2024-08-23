import React, { useState, useEffect } from 'react'

export default function ProfileMembership() {

  return (
    <>
      <div className="levelList ">
                <div className="level">一般</div>
                <div className="level levelB">白銀</div>
                <div className="level levelC">黃金</div>
                <div className="level levelD">白金</div>
              </div>
              <div className="levelDetail">
                <span className="span-p">白金會員優惠</span>
                <ul>
                  <li>W Point 3.5倍回饋</li>
                  <li>每月5張自選優惠券</li>
                  <li>限量商品優先權</li>
                  <li>3倍活動抽獎券</li>
                </ul>
              </div>
    </>
  )
}
