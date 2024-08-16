// @ 導入
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/components/member/member.module.css'
import Image from 'next/image'
import Link from 'next/link'
import GoogleLogo from '@/components/icons/google-logo'
import 'bootstrap/dist/css/bootstrap.min.css'

// @ 預設導出
export default function LoginForm() {
  // 路由
  const router = useRouter()
  // 狀態設置
  const [user, setUser] = useState({
    account: '',
    password: '',
  })

  // 記錄欄位錯誤訊息用
  const [errors, setErrors] = useState({
    account: '',
    password: '',
  })
  // 顯示密碼用
  const [showPassword, setShowPassword] = useState(false)

  // 多欄位共用事件處理函式
  const handleFieldChange = (e) => {
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
    } else if (user.password.length < 6 || user.password.length > 12) {
      newErrors.password = '密碼最少6個字元至多12字元'
    }

    // 檢查完成後設定到錯誤狀態
    setErrors(newErrors)

    // newErrors物件中如果有屬性值不是空白字串時，代表有錯誤發生
    const hasErrors = Object.values(newErrors).some((v) => v)

    // 如果有錯誤發生，停止接下來的送到伺服器程式碼
    if (hasErrors) {
      return // 直接返回，不再執行後續代碼
    }
    // ! 表單檢查--- END ---

    // 檢查都沒問題才會到這裡執行
    try {
      const url = 'http://localhost:3005/api/member/login'
      const res = await fetch(url, {
        credentials: 'include', // 設定cookie或是存取隱私資料時要加這個參數
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      const resData = await res.json()

      if (res.ok) {
        if (resData.status === 'success') {
          alert('登入成功')
          router.push('/dashboard')
        } else {
          alert('登入失敗：' + resData.message)
        }
      } else {
        switch (res.status) {
          case 400:
            alert('登入失敗：缺少必要資料')
            break
          case 401:
            alert('登入失敗：帳號或密碼錯誤')
            break
          case 404:
            alert('登入失敗：使用者不存在')
            break
          default:
            alert('登入失敗：' + (resData.message || '未知錯誤'))
        }
      }
    } catch (e) {
      console.error(e)
      alert('登入過程中發生錯誤')
    }
  }

  // @ 渲染
  return (
    <>
      {/* desk */}
      <div className={` d-none d-lg-block`}>
        <div>
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
                {/* 錯誤訊息 */}
                {errors.account && <span className={`${styles.error} ${styles.show} ${styles.errorAccount}`}>{errors.account}</span>}
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
                {/* <span className={`${styles.span} d-none`}>
                          請輸入密碼。{errors.password}
                        </span> */}
                {errors.password && <span className={`${styles.error} ${styles.show} ${styles.errorPwd}`}>{errors.password}</span>}
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
          </div> </div>
      </div>

      {/* RWD */}
      <div className="d-block d-lg-none">
        <div>
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
                  value={user.account}
                  id="login-account"
                  className={styles.loginInput}
                  onChange={handleFieldChange}
                />
                <br />
                {/* 錯誤訊息 */}
                {errors.account && <span className={`${styles.error} ${styles.show} ${styles.errorAccount}`}>{errors.account}</span>}
                <br />
                <div
                  className={`d-flex justify-content-between align-items-center ${styles.pwdNotice}`}
                >
                  <label htmlFor="login-pwd">會員密碼</label> <br />
                  <div
                    className={`form-check align-items-center d-flex ${styles.formCheck}`}
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
                      className={`form-check-label ${styles.formCheckLabel}`}
                      htmlFor="showPassword"
                    >
                      {' '}
                      顯示密碼
                    </label>
                  </div>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="login-pwd"
                  className={styles.loginInput}
                  value={user.password}
                  onChange={handleFieldChange}
                />
              {errors.password && <span className={`${styles.error} ${styles.show} ${styles.errorPwd}`}>{errors.password}</span>}
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
        </div>
      </div>
    </>
  )
}
