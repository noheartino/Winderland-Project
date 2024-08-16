// @ 導入
import React, { useState } from 'react'
import styles from '@/components/member/member.module.css'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';
import GoogleLogo from '@/components/icons/google-logo'
import { Tab, Tabs } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/router'

// @ 預設導出
export default function RegisterForm() {
  // 路由
  const router = useRouter()
  // 狀態設置
  const [user, setUser] = useState({
    account: '',
    password: '',
  })

  // const [account, setAccount] = useState("");
  // const [password, setPassword] = useState("");
  // 記錄欄位錯誤訊息用
  const [errors, setErrors] = useState({
    account: '',
    password: '',
  })
  // 顯示密碼用
  const [showPassword, setShowPassword] = useState(false)

  // 多欄位共用事件處理函式
  const handleFieldChange = (e) => {
    // 可以用e.target來觀察或檢測是哪個欄位觸發事件
    // console.log(e.target.name, e.target.type, e.target.value)

    // ES6中的特性: Computed Property Names(計算得出來的屬性名稱)
    // [e.target.name]: e.target.value
    // ^^^^^^^^^^^^^^^ 這裡可以動態代入變數值或表達式，計算出物件屬性名稱(字串)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // 表單送出事件處理函式
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Account:', user.account);
    console.log('Password:', user.password);

    // ! 表單檢查--- START ---
    // 建立一個新的錯誤訊息物件
    const newErrors = { account: '', password: '' }

    // 開始檢查
    if (!user.account) {
      newErrors.account = '帳號為必填'
    }

    if (!user.password) {
      newErrors.password = '密碼為必填'
    }

    if (user.password.length < 5 || user.password.length > 10) {
      newErrors.password ||= '密碼最少6個字元至多10字元'
    }

    // 檢查完成後設定到錯誤狀態
    setErrors(newErrors)

    // newErrors物件中如果有屬性值不是空白字串時，代表有錯誤發生
    const hasErrors = Object.values(newErrors).some((v) => v)

    // 如果有錯誤發生，停止接下來的送到伺服器程式碼
    if (hasErrors) {
      alert('有檢查到錯誤')
      return // 在函式內作流程控制用，執行到這會跳出函式執行
    }
    // ! 表單檢查--- END ---

    // 檢查都沒問題才會到這裡執行
    try {
      const url = 'http://localhost:3005/api/member/login'
      const res = await fetch(url, {
        credentials: 'include', // 設定cookie或是存取隱私資料時要加這個參數
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
    

      const resData = await res.json()
      console.log(resData)

      // 假設後端返回 success 字段表示登入成功
      if (resData.status === 'success') { 
        alert('登入成功')
        router.push('/dashboard/profile')
      } else {
        alert('登入失敗：' + resData.message)
      }
    } catch (e) {
      console.error(e)
      alert('登入過程中發生錯誤')
    }
  }

  // @ 渲染
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
                    <form onSubmit={handleSubmit} >
                      <div
                        className={`${styles.tabPane} ${styles.fade} ${styles.show} ${styles.active} ${styles.loginContent}`}
                        id="login"
                        role="tabpanel"
                        aria-labelledby="login-tab"
                      >
                        <label className={styles.label} htmlFor="login-account">
                          會員帳號
                        </label>{' '}
                        <br />
                        <input
                          type="text"
                          name="account"
                          value={user.account}
                          id="login-account"
                          className={styles.loginInput}
                          onChange={handleFieldChange}
                        />
                        <br />
                        <span className={`${styles.span} `}>
                          請輸入有效的會員帳號。{errors.account}
                        </span>
                        {/* <div className="error">{errors.username}</div> */}
                        <br />
                        <div
                          className={`d-flex justify-content-between align-items-center ${styles.pwdNotice}`}
                        >
                          <label className={styles.label} htmlFor="login-pwd">
                            會員密碼
                          </label>{' '}
                          <br />
                          {/* 顯示密碼checkbox */}
                          <div
                            className={`${styles.formCheck} align-items-center d-flex`}
                          >
                            <input
                              className={`${styles.formCheckInput} me-2`}
                              type="checkbox"
                              checked={showPassword}
                              onChange={() => {
                                setShowPassword(!showPassword)
                              }}
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
                        {/* 密碼輸入欄 */}
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          id="login-pwd"
                          className={styles.loginInput}
                          value={user.password}
                          onChange={handleFieldChange}
                        />
                        <span className={`${styles.span} d-none`}>
                          請輸入密碼。{errors.password}
                        </span>
                        {/* <div className="error">{errors.password}</div> */}

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
                          <Link
                            href="/member/forget-password"
                            className={styles.red}
                          >
                            忘記密碼？
                          </Link>
                        </div>
                        {/* 登入按鈕 */}
                        <button
                          type="submit"
                          className={styles.button}
                          onClick={(e) => {
                            // LoginForm()
                            // 登入後跳轉到個人資料頁(使用router)
                            // router.push('/dashboard/profile')
                            e.preventDefault(); // 防止表單默認提交
                            handleSubmit(e); // 調用表單提交處理函數
                          }}>
                          登入
                        </button>

                        <div
                          className={`d-flex justify-content-center ${styles.noAccount}`}
                        >
                          <p>目前還沒有帳號嗎？</p>{' '}
                          <Link href="/member/register"
                            className={styles.red}>加入我們</Link>
                        </div>
                        {/* 第三方登入 */}
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
                    </form>
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
                          <label htmlFor="register-mail" className={styles.label}>
                            * 電子郵件
                          </label>{' '}
                          <span className={styles.span}>
                            請輸入有效電子郵件。
                          </span>
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="register-mail"
                          className={styles.registerInput}
                        />
                      </div>
                      {/* pwd */}
                      <div className={styles.pwd}>
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="register-pwd" className={styles.label}>
                            * 會員密碼
                          </label>
                        </div>
                        <input
                          type="password"
                          name="password"
                          id="register-pwd"
                          className={styles.registerInput}
                          placeholder="請輸入長度8-12字元"
                        />
                      </div>
                      {/* pwd2 */}
                      <div className={styles.pwd2}>
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="register-pwd2" className={styles.label}>
                            * 再次輸入會員密碼
                          </label>
                          <span className={styles.span}>密碼輸入不符。</span>
                        </div>
                        <input
                          type="password"
                          name="password"
                          id="register-pwd2"
                          className={styles.registerInput}
                        />
                      </div>
                      {/* name&tel */}
                      <div className="d-flex align-items-center">
                        <label htmlFor="register-name " className={styles.labelName}>
                          * 姓名
                        </label>
                        <label htmlFor="register-tel" className={styles.labelTel}>
                          手機
                        </label>
                      </div>
                      <div className="d-flex align-items-center justify-contents-between">
                        <input
                          type="text"
                          name="name"
                          id="register-name"
                          className={`${styles.registerInput2} me-5`}
                        />
                        <input
                          type="tel"
                          name="tel"
                          id="register-tel"
                          className={`${styles.registerInput2} ${styles.rRegisterInput}`}
                          placeholder="09-xxx-xxx"
                        />
                      </div>
                      {/* birthday&gender */}
                      <div className="d-flex align-items-center">
                        <label htmlFor="register-birthday " className={styles.labelName}>
                          生日
                        </label>
                        <label
                          htmlFor="register-gender"
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
                            defaultValue="option1"
                          >
                            <option value="option1">性別</option>
                            <option value="">男性</option>
                            <option value="">女性</option>
                            <option value="">不願透露</option>
                          </select>
                        </div>
                      </div>
                      <button className={styles.button}>註冊</button>
                      <br />
                      <p>
                        已經是會員了嗎？
                        <Link href="/member/login" className={styles.red}>
                          登入
                        </Link>。
                      </p>
                      <div
                        className={`d-flex justify-content-center ${styles.btnBack}`}
                      >

                        <Link
                          href="/"
                          className={styles.red}
                        >
                          返回首頁
                        </Link>
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
                  <form onSubmit={handleSubmit}>
                    <div
                      className={`tab-pane fade show active ${styles.loginContent}`}
                      id="login-rwd"
                      role="tabpanel"
                      aria-labelledby="login-tab-rwd"
                    >
                      <label htmlFor="login-account">會員帳號</label> <br />
                      <input
                        type="text"
                        name="account"
                        id="login-account"
                        className={styles.loginInput}
                      />
                      <br />
                      <span className="d-none">請輸入有效的電子郵件。</span>
                      <br />
                      <div
                        className={`d-flex justify-content-between align-items-center ${styles.pwdNotice}`}
                      >
                        <label htmlFor="login-pwd">會員密碼</label> <br />
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
                        id="login-pwd"
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

                        <Link
                          href="/member/forget-password"
                          className={styles.red}
                        >
                          忘記密碼？
                        </Link>
                      </div>
                      <button className={styles.loginButton}>登入</button>
                      <div
                        className={`d-flex justify-content-center ${styles.noAccount}`}
                      >
                        <p>目前還沒有帳號嗎？</p>
                        <Link href="/member/register"
                          className={styles.red}>加入我們</Link>

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
                  </form>
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
                        <label htmlFor="register-mail" className={styles.label}>
                          * 電子郵件
                        </label>{' '}
                        <span className={styles.span}>
                          請輸入有效電子郵件。
                        </span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="register-mail"
                        className={styles.registerInput}
                      />
                    </div>
                    {/* pwd */}
                    <div className={styles.pwd}>
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="register-pwd" className={styles.label}>
                          * 會員密碼
                        </label>
                      </div>
                      <input
                        type="password"
                        name="password"
                        id="register-pwd"
                        className={styles.registerInput}
                        placeholder="請輸入長度8-12字元"
                      />
                    </div>
                    {/* pwd2 */}
                    <div className={styles.pwd2}>
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="register-pwd2" className={styles.label}>
                          * 再次輸入會員密碼
                        </label>
                        <span className={styles.span}>密碼輸入不符。</span>
                      </div>
                      <input
                        type="password"
                        name="password"
                        id="register-pwd2"
                        className={styles.registerInput}
                      />
                    </div>
                    {/* name&tel */}
                    <div className="d-flex align-items-center">
                      <label htmlFor="register-name " className={styles.labelName}>
                        * 姓名
                      </label>
                      <label htmlFor="register-tel" className={styles.labelTel}>
                        手機
                      </label>
                    </div>
                    <div className="d-flex align-items-center justify-contents-between">
                      <input
                        type="text"
                        name="name"
                        id="register-name"
                        className={`${styles.registerInput2} me-5`}
                      />
                      <input
                        type="tel"
                        name="tel"
                        id="register-tel"
                        className={`${styles.registerInput2} ${styles.rRegisterInput}`}
                        placeholder="09-xxx-xxx"
                      />
                    </div>
                    {/* birthday&gender */}
                    <div className="d-flex align-items-center">
                      <label htmlFor="register-birthday" className={styles.labelName}>
                        生日
                      </label>
                      <label
                        htmlFor="register-gender"
                        className={styles.labelGender}
                      >
                        性別
                      </label>
                    </div>
                    <div className="d-flex align-items-center">
                      <input
                        type="date"
                        name="birthday"
                        id="register-birthday"
                        className={`${styles.registerInput2} me-5`}
                      />
                      <div className="mb-3">
                        <select
                          className={`form-select form-select-lg ${styles.select}`}
                          name=""
                          id=""
                          defaultValue="option1"
                        >
                          <option value="option1">性別</option>
                          <option value="">男性</option>
                          <option value="">女性</option>
                          <option value="">不願透露</option>
                        </select>
                      </div>
                    </div>
                    <button className={styles.button}>註冊</button>
                    <br />
                    <p>
                      已經是會員了嗎？
                      <Link href="/member/login" className={styles.red}>
                        登入
                      </Link>。
                    </p>
                    <div
                      className={`d-flex justify-content-center ${styles.btnBack}`}
                    >

                      <Link
                        href="/"
                        className={styles.red}
                      >
                        返回首頁
                      </Link>
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
