import React from 'react'

import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function DashboardProfile() {
  return (
    <>
      <>
  {/* desk */}
  <div className="container d-none d-lg-block">
    {/* 個人資料區 */}
    <section className="name-card d-flex row">
      {/* 會員資料 */}
      <div className="name col-5">
        <div className="userName">椎名林檎</div>
        <div className="userID">ID：Ann_970412</div>
        <div className="userAge">女 / 28歲 / 1996.02.05</div>
        <div className="user-img" />
        <div className="membership">白金會員</div>
      </div>
      {/* 會員等級 */}
      <div className="membership-level d-flex  col-2">
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
      </div>
      {/* 會員期限 */}
      <div className="membership-detail col-2">
        <p className="membership-exp">白金會員到期日 - 2025.07.10</p>
        <div className="upgrade">升級攻略</div>
      </div>
    </section>
    <hr style={{ border: "3px solid var(--primary_color-light)" }} />
    {/* 修改區 */}
    <div className="edit-card d-flex  ">
      <section className="editAccount-card me-5 col-6">
        <h4 className="edit-card-title">修改會員資料</h4>
        <input
          type="text"
          name=""
          id=""
          placeholder="椎名林檎"
          style={{ width: "100%" }}
        />
        <br />
        <input
          type="datetime"
          name=""
          id=""
          placeholder="1996-02-05"
          style={{ width: "50%" }}
        />
        <select name="" id="" style={{ width: "45%" }}>
          <option value="">男</option>
          <option value="" selected="">
            女
          </option>
          <option value="">不願透露</option>
        </select>
        <input type="tel"  placeholder="輸入手機號碼" style={{ width: "50%" }} />
        <br />
        <input
          type="text"
          placeholder="桃園市中壢區新生路二段421號"
          style={{ width: "100%" }}
        />
      </section>
      <section className="editPwd-card col-6">
        <h4 className="edit-card-title">修改密碼</h4>
        <label htmlFor="">舊密碼</label> <span>*舊密碼輸入錯誤</span>
        <input
          type="text"
          name=""
          id=""
          placeholder="********"
          style={{ width: "93%" }}
        />
        <br />
        <label htmlFor="">新密碼</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="********"
          style={{ width: "93%" }}
        />
        <br />
        <label htmlFor="">再次輸入新密碼</label> <span>*密碼內容輸入錯誤</span>
        <input
          type="text"
          name=""
          id=""
          placeholder="********"
          style={{ width: "93%" }}
        />
      </section>
    </div>
    {/* 按鈕區 */}
    <div className="btn-group d-flex justify-content-end">
      <button>清空</button>
      <button type="submit" className="button-send">
        送出更改
      </button>
    </div>
  </div>
  {/* rwd */}
  <div
    className="container-fluid d-block d-lg-none  d-fluid"
    id="account-content-rwd"
  >
    {/* 個人資料區 */}
    <section className="name-card-rwd ">
      {/* 會員資料 */}
      <div className="d-flex">
        <div className="name-rwd">
          <div className="userName-rwd">椎名林檎</div>
          <div className="userID-rwd">ID：Ann_970412</div>
          <div className="userAge-rwd">女 / 28歲 / 1996.02.05</div>
        </div>
        <div className="user-img-rwd" />
      </div>
      <hr style={{ border: "3px solid var(--primary_color-light)" }} />
      <div className="membership-detail-rwd d-flex">
        <div className="membership-rwd">白金會員</div>
        <p className="membership-exp-rwd">白金會員到期日 - 2025.07.10</p>
      </div>
      <hr style={{ border: "3px solid var(--primary_color-light)" }} />
    </section>
    {/* 修改區 */}
    <div className="edit-card edit-card-rwd">
      <section className="editAccount-card-rwd me-5 ">
        <h2 className="edit-card-title">修改會員資料</h2>
        <input
          type="text"
          name=""
          id=""
          placeholder="椎名林檎"
          style={{ width: "100%" }}
        />
        <br />
        <input
          type="datetime"
          name=""
          id=""
          placeholder="1996-02-05"
          style={{ width: "45%" }}
        />
        <select name="" id="" style={{ width: "45%" }}>
          <option value="">男</option>
          <option value="" selected="">
            女
          </option>
          <option value="">不願透露</option>
        </select>
        <input type="tel"   placeholder="輸入手機號碼" style={{ width: "50%" }} />
        <br />
        <input
          type="text"
          placeholder="桃園市中壢區新生路二段421號"
          style={{ width: "100%", marginBottom: 41 }}
        />
      </section>
      <section className="editPwd-card-rwd ">
        <h2 className="edit-card-title">修改密碼</h2>
        <label htmlFor="">舊密碼</label> <span>*舊密碼輸入錯誤</span>
        <input
          type="text"
          name=""
          id=""
          placeholder="********"
          style={{ width: "100%" }}
        />
        <br />
        <label htmlFor="">新密碼</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="********"
          style={{ width: "100%" }}
        />
        <br />
        <label htmlFor="">再次輸入新密碼</label> <span>*密碼內容輸入錯誤</span>
        <input
          type="text"
          name=""
          id=""
          placeholder="********"
          style={{ width: "100%" }}
        />
      </section>
    </div>
    {/* 按鈕區 */}
    <div className="btn-group d-lg-flex justify-content-center d-none d-lg-block">
      <button>清空</button>
      <button type="submit" className="u1-button-send">
        送出更改
      </button>
    </div>
    {/* rwd */}
    <div className="btn-group-rwd d-flex justify-content-center d-block d-lg-none ">
      <button>清空</button>
      <button type="submit" className="button-send">
        送出更改
      </button>
    </div>
  </div>
</>

    </>
  );
}