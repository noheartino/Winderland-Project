// @ 導入
import React, { useState } from 'react'
import styles from '@/components/member/member.module.css'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'


// @ 預設導出
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    user_name: '',
    phone: '',
    birthday: '',
    gender: '',
    account: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.account || !formData.password || !formData.user_name) {
      alert('請填寫所有必要資料');
      return;
    }
    try {
      const response = await fetch('http://localhost:3005/api/member/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('註冊成功！');
      } else {
        const errorData = await response.json();
        alert(errorData.message || '註冊失敗，請稍後再試');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>

      {/* desk */}
      <div className={` d-none d-lg-block`}>
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
                  * 會員帳號
                </label>{' '}
                <span className={styles.span}>
                  會員帳號已有人使用。
                </span>
              </div>
              <input
                type="text"
                name="account"
                value={formData.account}
                onChange={handleChange}
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
                className={styles.registerInput}
                placeholder="請輸入長度8-12字元"
                value={formData.password}
                onChange={handleChange}
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
                name="password2"
                className={styles.registerInput}
                value={formData.password2}
                onChange={handleChange}
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
                name="user_name"
                className={`${styles.registerInput2} me-5`}
                value={formData.user_name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                className={`${styles.registerInput2} ${styles.rRegisterInput}`}
                placeholder="09-xxx-xxx"
                value={formData.phone}
                onChange={handleChange}
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
                className={`${styles.registerInput2} me-5`}
                value={formData.birthday}
                onChange={handleChange}
              />
              <div className="mb-3">
                <select
                  className={`form-select form-select-lg ${styles.select}`}
                  name="gender"
                  defaultValue="option1"
                  value={formData.gender}
                  onChange={handleChange}
                >
                <option value="option1">性別</option>
                    <option value="Male">男性</option>
                    <option value="Female">女性</option>
                    <option value="Other">不願透露</option>
                </select>
              </div>
            </div>
            <button type="submit" className={styles.button}>註冊</button>
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
                    * 會員帳號
                  </label>{' '}
                  <span className={styles.span}>
                    會員帳號已有人使用
                  </span>
                </div>
                <input
                  type="text"
                  name="account"
                  className={styles.registerInput}
                  value={formData.account}
                  onChange={handleChange}
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
                  className={styles.registerInput}
                  placeholder="請輸入長度8-12字元"
                  value={formData.password}
                  onChange={handleChange}
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
                  className={styles.registerInput}
                  value={formData.password}
                  onChange={handleChange}
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
                  name="user_name"
                  className={`${styles.registerInput2} me-5`}
                  value={formData.user_name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  className={`${styles.registerInput2} ${styles.rRegisterInput}`}
                  placeholder="09-xxx-xxx"
                  value={formData.phone}
                  onChange={handleChange}
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
                  className={`${styles.registerInput2} me-5`}
                  value={formData.birthday}
                  onChange={handleChange}
                />
                <div className="mb-3">
                  <select
                    className={`form-select form-select-lg ${styles.select}`}
                    name="gender"
                    defaultValue="option1"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="option1">性別</option>
                    <option value="Male">男性</option>
                    <option value="Female">女性</option>
                    <option value="Other">不願透露</option>
                  </select>
                </div>
              </div>
              <button type="submit" className={styles.button}>註冊</button>
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