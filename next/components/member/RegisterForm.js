// @ 導入
import React, { useState } from 'react'
import styles from '@/components/member/member.module.css'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/router'


// @ 預設導出
export default function RegisterForm() {
  // ... 狀態和處理函數


  return (
    <form >
      {/* desk */}

      <div className={`${styles.bg} d-none d-lg-block`}>
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
      </div>

      {/* RWD */}
      <div className="d-block d-lg-none">
        <div>
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
        </div>
      </div>
    </form>
  )
}