import React from 'react'
import styles from './footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={`d-none d-lg-block ${styles.ftlg}`} >
        <div className="container">
          <div className={`row ${styles.ft}`}>
            <div className="col-3">
              <img src="/nav-footer/nav_logo.png" alt="" width={200} />
            </div>
            <div className="col-3">
              <ul className={styles.ftlgul}>
                <li className={styles.li_h}>客戶服務</li>
                <a href="" className={styles.ftlgA}>
                  <li>會員常見問題</li>
                </a>
                <a href="" className={styles.ftlgA}>
                  <li>會員等級問題</li>
                </a>
                <a href="" className={styles.ftlgA}>
                  <li>購物常見問題</li>
                </a>
                <a href="" className={styles.ftlgA}>
                  <li>服務條款</li>
                </a>
                <a href="" className={styles.ftlgA}>
                  <li>隱私權政策</li>
                </a>
                <a href="" className={styles.ftlgA}>
                  <li>165反詐騙宣導</li>
                </a>
                <a href="" className={styles.ftlgA}>
                  <li>W Points 回饋計畫</li>
                </a>
              </ul>
            </div>
            <div className="col-3">
              <ul className={styles.ftlgul}>
                <li className={styles.li_h}>本站資訊</li>
                <a href="" className={styles.ftlgA}>
                  <li>品牌介紹</li>
                </a>
                <a href="" className={styles.ftlgA}>
                  <li>門市資訊</li>
                </a>
                <a href="" className={styles.ftlgA}>
                  <li>客服信箱</li>
                </a>
                <a href="" className={styles.ftlgA}>
                  <li>關於我們</li>
                </a>
                <a href="" className={styles.ftlgA}>
                  <li>最新活動消息</li>
                </a>
              </ul>
            </div>
            <div className={`col-3 ${styles.footerFollow}`}>
              <p className={styles.Pli_h}>關注我們</p>
              <ul className={styles.footerFollowUl}>
                <a href="">
                  <li>
                    <img src="/nav-footer/fb.png" alt="" className={styles.footerFollowImg}/>
                  </li>
                </a>
                <a href="">
                  <li>
                    <img src="/nav-footer/ig.png" alt="" className={styles.footerFollowImg}/>
                  </li>
                </a>
                <a href="">
                  <li>
                    <img src="/nav-footer/ln.png" alt="" className={styles.footerFollowImg}/>
                  </li>
                </a>
              </ul>
            </div>
            <div className={`col-12 mt-4 ${styles.ft_b}`}>
              <div className={styles.ft_bline} />
              <p className={styles.ftP}>© 2024 Winederland. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      <footer className={`d-block d-lg-none ${styles.ftsm}`}>
        <div className={`container-fluid ${styles.ftsmc}`}>
          <div className="row">
            <div className={`col-6 ${styles.ftsmCol6}`}>
              <ul className={styles.ftsmcul}>
                <li className={styles.li_b}>客戶服務</li>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>會員常見問題</li>
                </a>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>會員等級問題</li>
                </a>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>購物常見問題</li>
                </a>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>服務條款</li>
                </a>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>隱私權政策</li>
                </a>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>165反詐騙宣導</li>
                </a>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>W Points 回饋計畫</li>
                </a>
              </ul>
            </div>
            <div className={`col-6 ${styles.ftsmCol6}`}>
              <ul className={styles.ulr}>
                <li className={styles.li_b}>本站資訊</li>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>品牌介紹</li>
                </a>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>門市資訊</li>
                </a>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>客服信箱</li>
                </a>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>關於我們</li>
                </a>
                <a href="" className={styles.ftsmA}>
                  <li className={styles.ftsmli}>最新活動消息</li>
                </a>
              </ul>
              <div className={styles.footerfollowsm}>
                <p className={styles.li_b}>關注我們</p>
                <ul className={styles.footerfollowsmul}>
                  <a href="" className={styles.ftsmA}>
                    <li className={styles.ftsmli}>
                      <img src="/nav-footer/fb.png" alt="" className={styles.footerfollowimg}/>
                    </li>
                  </a>
                  <a href="" className={styles.ftsmA}>
                    <li className={styles.ftsmli}>
                      <img src="/nav-footer/ig.png" alt="" className={styles.footerfollowimg}/>
                    </li>
                  </a>
                  <a href="" className={styles.ftsmA}>
                    <li className={styles.ftsmli}>
                      <img src="/nav-footer/ln.png" alt="" className={styles.footerfollowimg}/>
                    </li>
                  </a>
                </ul>
              </div>
            </div>
            <div className={`col-12 ${styles.ftsmb}`}>
              <div className={styles.line} />
              <div className={styles.img}>
                <img src="/nav-footer/nav_logo.png" alt="" width={140} />
              </div>
              <p className={styles.ftP}>© 2024 Winederland. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
