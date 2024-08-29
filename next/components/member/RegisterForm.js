// @ 導入
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/components/member/register.module.css'
import Link from 'next/link'
import Swal from 'sweetalert2'


// @ 預設導出
export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    user_name: '',
    phone: '',
    birthday: '',
    gender: '',
    account: '',
    password: '',
    password2: '',
  });

  const [errors, setErrors] = useState({
    account: '',
    password: '',
    password2: '',
    user_name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // 即時驗證
    let newErrors = { ...errors };

    if (name === 'password') {
      if (value.length < 6 || value.length > 12) {
        newErrors.password = '密碼長度必須在6-12字元之間';
      } else {
        newErrors.password = '';
      }
    }
    if (name === 'password2') {
      if (value !== formData.password) {
        newErrors.password2 = '密碼輸入不符';
      } else {
        newErrors.password2 = '';
      }
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.account) {
      newErrors.account = '請輸入會員帳號';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = '請輸入密碼';
      isValid = false;
    } else if (formData.password.length < 6 || formData.password.length > 12) {
      newErrors.password = '密碼長度必須在6-12字元之間';
      isValid = false;
    }

    if (formData.password !== formData.password2) {
      newErrors.password2 = '密碼輸入不符';
      isValid = false;
    }

    if (!formData.user_name) {
      newErrors.user_name = '請輸入姓名';
      isValid = false;
    }

    setErrors(newErrors);

    // 顯示所有錯誤訊息
    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: '填寫資料錯誤',
        html: Object.values(newErrors).map(error => `<p>${error}</p>`).join(''),  // 使用HTML顯示多行錯誤訊息
        showConfirmButton: true,
      });
    }


    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm) {
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
        // alert('註冊成功！');
        await Swal.fire({
          icon: 'success',
          title: '註冊成功',
          text: '歡迎成為醺迷仙園會員，請先登入',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => router.push('/member/login'), 1000)
      } else {
        // 處理後端返回的錯誤
        if (result.message === '會員帳號已存在') {
          setErrors({ ...errors, account: '會員帳號已存在' });
        } else {
          // alert(result.message || '註冊失敗，請稍後再試');
          await Swal.fire({
            icon: 'error',
            title: '註冊失敗',
            text: result.message || '註冊失敗，請稍後再試',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('發生錯誤，請稍後再試');
      await Swal.fire({
        icon: 'success',
        title: '註冊失敗',
        text: '發生錯誤，請稍後再試',
        showConfirmButton: false,
        timer: 1500
      });
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

            {/* 帳號 */}
            <div className={styles.mail}>
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="register-mail" className={styles.label}>
                  * 會員帳號
                </label>{' '}
                {/* 錯誤訊息 */}
                {errors.account && <span className={styles.span}>{errors.account}</span>}

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
                {errors.password && <span className={styles.span}>{errors.password}</span>}
              </div>
              <input
                type="password"
                name="password"
                className={styles.registerInput}
                placeholder="請輸入長度6-12字元"
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
                {/* 錯誤訊息 */}
                {errors.password2 && <span className={styles.span}>{errors.password2}</span>}
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
              {errors.user_name && <span className={styles.span}>{errors.user_name}</span>}
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
                  // defaultValue="option1"
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
                  {/* 錯誤訊息 */}
                  {errors.account && <span className={styles.span}>{errors.account}</span>}
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
                  {/* 錯誤訊息 */}
                  {errors.pwd2 && <span className={styles.span}>{errors.pwd2}</span>}
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
                    // defaultValue="option1"
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
                <Link href="/member/login" className={styles.red} >
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