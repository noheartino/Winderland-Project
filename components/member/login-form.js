import React from 'react'
import styles from '@/components/member/member.module.css'
import Image from 'next/image'
import GoogleLogo from '@/components/icons/google-logo'
import { Tab, Tabs } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function LoginForm() {
  return (
    <>
      <main className={styles.main}>
        {/* desk */}
        <div className={`${styles.bg} d-none d-lg-block`}>
          <div className={styles.loginBox}>
            <div>
              <Tabs
                defaultActiveKey="login"
                id="login-tabs"
                className={`${styles.navTabs} `}
              >
                <Tab eventKey="login" title="會員登入">
                  <div className={`${styles.tabContent} ms-5`}>
                    {/* 01-login */}
                    <div
                      className={`${styles.tabPane} ${styles.fade} ${styles.show} ${styles.active} ${styles.loginContent}`}
                      id="login"
                      role="tabpanel"
                      aria-labelledby="login-tab"
                    >
                      <label className={styles.label} htmlFor="mailLabel">
                        會員帳號／電子郵件
                      </label>{' '}
                      <br />
                      <input
                        type="text"
                        name="account"
                        id="account"
                        className={styles.loginInput}
                      />
                      <br />
                      <span className={`${styles.span} d-none`}>
                        請輸入有效的帳號／電子郵件。
                      </span>
                      <br />
                      <div
                        className={`d-flex justify-content-between align-items-center ${styles.pwdNotice}`}
                      >
                        <label className={styles.label} htmlFor="pwdLabel">
                          會員密碼
                        </label>{' '}
                        <br />
                        <div
                          className={`${styles.formCheck} align-items-center d-flex`}
                        >
                          <input
                            className={`${styles.formCheckInput} me-2`}
                            type="checkbox"
                            defaultValue=""
                            id="showPassword"
                          />
                          <label
                            className={styles.formCheckLabel}
                            htmlFor="showPassword"
                          >
                            顯示密碼
                          </label>
                        </div>
                      </div>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className={styles.loginInput}
                      />
                      <span className={`${styles.span} d-none`}>
                        請輸入密碼。
                      </span>
                      <div
                        className={`d-flex justify-content-between align-items-center ${styles.forgetPwd}`}
                      >
                        <div
                          className={`${styles.formCheck} align-items-center d-flex`}
                        >
                          <input
                            className={`${styles.formCheckInput} me-2`}
                            type="checkbox"
                            defaultValue=""
                            id="rememberPassword"
                          />
                          <label
                            className={styles.formCheckLabel}
                            htmlFor="rememberPassword"
                          >
                            {' '}
                            記住我的登入
                          </label>
                        </div>
                        <a href="" className={styles.aBtn}>
                          忘記密碼?
                        </a>
                      </div>
                      <button className={styles.button}>登入</button>
                      <div
                        className={`d-flex justify-content-center ${styles.noAccount}`}
                      >
                        <p>目前還沒有帳號嗎？</p>{' '}
                        <a href="" className={styles.aBtn}>
                          立即加入
                        </a>
                      </div>
                      <div className={styles.fastLogin}>
                        <hr className={styles.hr} />
                        <div className={styles.buttonGruop}>
                          <button
                            className={`${styles.googleLogin} d-flex justify-content-center align-items-center`}
                          >
                            <GoogleLogo className="mx-3" />
                            使用GOOGLE登入
                          </button>
                          <button
                            className={`${styles.lineLogin} d-flex justify-content-center align-items-center`}
                          >
                            <Image
                              src="/images/member/LINE_Brand_icon.png"
                              alt="Line登入"
                              width={50}
                              height={50}
                              className={`${styles.img} mx-2`}
                            />
                            使用LINE登入
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="register" title="會員註冊">
                  <div className={`${styles.tabContent} ms-5`}>
                    {/* 02-register */}
                    <div
                      className={`${styles.tabPane} ${styles.fade} ${styles.registerContent}`}
                      id="register"
                      role="tabpanel"
                      aria-labelledby="register-tab"
                    >
                      {/* mail */}
                      <div className={styles.mail}>
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="mailLabel" className={styles.label}>
                            * 電子郵件
                          </label>{' '}
                          <span className={styles.span}>
                            請輸入有效電子郵件。
                          </span>
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className={styles.registerInput}
                        />
                      </div>
                      {/* pwd */}
                      <div className={styles.pwd}>
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="pwdLabel" className={styles.label}>
                            * 會員密碼
                          </label>
                        </div>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className={styles.registerInput}
                          placeholder="請輸入長度8-12字元"
                        />
                      </div>
                      {/* pwd2 */}
                      <div className={styles.pwd2}>
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="pwd2Label" className={styles.label}>
                            * 再次輸入會員密碼
                          </label>
                          <span className={styles.span}>密碼輸入不符。</span>
                        </div>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className={styles.registerInput}
                        />
                      </div>
                      {/* name&tel */}
                      <div className="d-flex align-items-center">
                        <label htmlFor=" " className={styles.labelName}>
                          * 姓名
                        </label>
                        <label htmlFor="telLabel" className={styles.labelTel}>
                          手機
                        </label>
                      </div>
                      <div className="d-flex align-items-center justify-contents-between">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className={`${styles.registerInput2} me-5`}
                        />
                        <input
                          type="tel"
                          name="tel"
                          id="tel"
                          className={`${styles.registerInput2} ${styles.rRegisterInput}`}
                          placeholder="09-xxx-xxx"
                        />
                      </div>
                      {/* birthday&gender */}
                      <div className="d-flex align-items-center">
                        <label htmlFor=" " className={styles.labelName}>
                          生日
                        </label>
                        <label
                          htmlFor="genderLabel"
                          className={styles.labelGender}
                        >
                          性別
                        </label>
                      </div>
                      <div className="d-flex align-items-center">
                        <input
                          type="date"
                          name="birthday"
                          id="birthday"
                          className={`${styles.registerInput2} me-5`}
                        />
                        <div className="mb-3">
                          <select
                            className={`form-select form-select-lg ${styles.select}`}
                            name=""
                            id=""
                          >
                            <option selected="">性別</option>
                            <option value="">男性</option>
                            <option value="">女性</option>
                            <option value="">不願透露</option>
                          </select>
                        </div>
                      </div>
                      <button className={styles.button}>註冊</button>
                      <br />
                      <div
                        className={`d-flex justify-content-center ${styles.btnBack}`}
                      >
                        <a href="" className={styles.aBtn}>
                          返回首頁
                        </a>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>

        {/* RWD */}
        <div className="d-block d-lg-none">
          <div>
            <Tabs defaultActiveKey="login" id="login-tabs" className="mb-3">
              <Tab eventKey="login" title="會員登入">
                <div className={`${styles.tabContent} ms-5`}>
                  {/* login */}
                  <div
                    className={`tab-pane fade show active ${styles.loginContent}`}
                    id="login-rwd"
                    role="tabpanel"
                    aria-labelledby="login-tab-rwd"
                  >
                    <label htmlFor="mailLabel">會員帳號／電子郵件</label> <br />
                    <input
                      type="text"
                      name="account"
                      id="account"
                      className={styles.loginInput}
                    />
                    <br />
                    <span className="d-none">請輸入有效的帳號／電子郵件。</span>
                    <br />
                    <div
                      className={`d-flex justify-content-between align-items-center ${styles.pwdNotice}`}
                    >
                      <label htmlFor="pwdLabel">會員密碼</label> <br />
                      <div
                        className={`form-check align-items-center d-flex ${styles.formCheck}`}
                      >
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id=""
                        />
                        <label
                          className={`form-check-label ${styles.formCheckLabel}`}
                          htmlFor=""
                        >
                          {' '}
                          顯示密碼
                        </label>
                      </div>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className={styles.loginInput}
                    />
                    <span className="d-none">請輸入密碼。</span>
                    <div
                      className={`d-flex justify-content-between align-items-center ${styles.forgetPwd}`}
                    >
                      <div
                        className={`form-check align-items-center d-flex ${styles.formCheck}`}
                      >
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id=""
                        />
                        <label
                          className={`form-check-label ${styles.formCheckLabel}`}
                          htmlFor=""
                        >
                          {' '}
                          記住我的登入
                        </label>
                      </div>
                      <a href="">忘記密碼?</a>
                    </div>
                    <button className={styles.loginButton}>登入</button>
                    <div
                      className={`d-flex justify-content-center ${styles.noAccount}`}
                    >
                      <p>目前還沒有帳號嗎？</p> <a href="">立即加入</a>
                    </div>
                    <div className={styles.fastLogin}>
                      <hr />
                      <div className={styles.buttonGroup}>
                        <button
                          className={`${styles.googleLogin} d-flex justify-content-center align-items-center`}
                        >
                          <GoogleLogo className="mx-3" />
                          使用GOOGLE登入
                        </button>
                        <button
                          className={`${styles.lineLogin} d-flex justify-content-center align-items-center`}
                        >
                          <Image
                            src="/images/member/LINE_Brand_icon.png"
                            alt="Line登入"
                            width={50}
                            height={50}
                            className={styles.img}
                          />
                          使用LINE登入
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="register" title="會員註冊">
                <div className={`${styles.tabContent} ms-5`}>
                  {/* 02-register */}
                  <div
                    className={`${styles.tabPane} ${styles.fade} ${styles.registerContent}`}
                    id="register"
                    role="tabpanel"
                    aria-labelledby="register-tab"
                  >
                    {/* mail */}
                    <div className={styles.mail}>
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="mailLabel" className={styles.label}>
                          * 電子郵件
                        </label>{' '}
                        <span className={styles.span}>
                          請輸入有效電子郵件。
                        </span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={styles.registerInput}
                      />
                    </div>
                    {/* pwd */}
                    <div className={styles.pwd}>
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="pwdLabel" className={styles.label}>
                          * 會員密碼
                        </label>
                      </div>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className={styles.registerInput}
                        placeholder="請輸入長度8-12字元"
                      />
                    </div>
                    {/* pwd2 */}
                    <div className={styles.pwd2}>
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="pwd2Label" className={styles.label}>
                          * 再次輸入會員密碼
                        </label>
                        <span className={styles.span}>密碼輸入不符。</span>
                      </div>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className={styles.registerInput}
                      />
                    </div>
                    {/* name&tel */}
                    <div className="d-flex align-items-center">
                      <label htmlFor=" " className={styles.labelName}>
                        * 姓名
                      </label>
                      <label htmlFor="telLabel" className={styles.labelTel}>
                        手機
                      </label>
                    </div>
                    <div className="d-flex align-items-center justify-contents-between">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className={`${styles.registerInput2} me-5`}
                      />
                      <input
                        type="tel"
                        name="tel"
                        id="tel"
                        className={`${styles.registerInput2} ${styles.rRegisterInput}`}
                        placeholder="09-xxx-xxx"
                      />
                    </div>
                    {/* birthday&gender */}
                    <div className="d-flex align-items-center">
                      <label htmlFor=" " className={styles.labelName}>
                        生日
                      </label>
                      <label
                        htmlFor="genderLabel"
                        className={styles.labelGender}
                      >
                        性別
                      </label>
                    </div>
                    <div className="d-flex align-items-center">
                      <input
                        type="date"
                        name="birthday"
                        id="birthday"
                        className={`${styles.registerInput2} me-5`}
                      />
                      <div className="mb-3">
                        <select
                          className={`form-select form-select-lg ${styles.select}`}
                          name=""
                          id=""
                        >
                          <option selected="">性別</option>
                          <option value="">男性</option>
                          <option value="">女性</option>
                          <option value="">不願透露</option>
                        </select>
                      </div>
                    </div>
                    <button className={styles.button}>註冊</button>
                    <br />
                    <div
                      className={`d-flex justify-content-center ${styles.btnBack}`}
                    >
                      <a href="" className={styles.aBtn}>
                        返回首頁
                      </a>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  )
}
