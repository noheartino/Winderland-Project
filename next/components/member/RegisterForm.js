// @ 導入
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/components/member/register.module.css'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// 漂浮標籤
const FloatingLabelInput = React.memo(({ label, type, name, value, onChange, error, isPassword, togglePasswordVisibility, showPassword }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${styles.floatingLabelInput} position-relative mb-3`}>
      <input
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${styles.registerInput} ${error ? styles.inputError : ''} ${isFocused || value ? styles.hasContent : ''}`}
        placeholder=" "
      />
      <label className={styles.floatingLabel}>{label}</label>
      {isPassword && (
        <button
          type="button"
          className={styles.passwordToggle}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      {error && <span className={`${styles.error} ${styles.show}`}>{error}</span>}
    </div>
  );
});

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
    email: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    account: '',
    password: '',
    password2: '',
    user_name: '',
    email: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // 即時驗證
    let newErrors = { ...errors };

    if (name === 'password') {
      if (value.length < 6 || value.length > 12) {
        newErrors.password = '密碼長度須為6-12字元';
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
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        newErrors.email = '請輸入有效的電子郵件地址';
      } else {
        newErrors.email = '';
      }
    }
    if (name === 'agreeTerms') {
      if (!checked) {
        newErrors.agreeTerms = '請閱讀並同意會員服務條款與隱私權政策';
      } else {
        newErrors.agreeTerms = '';
      }
    }


    setErrors(newErrors);
  };

  // 表單驗證
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.account) {
      newErrors.account = '帳號為必填';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = '密碼為必填';
      isValid = false;
    } else if (formData.password.length < 6 || formData.password.length > 12) {
      newErrors.password = '密碼長度須為6-12字元';
      isValid = false;
    }

    if (formData.password !== formData.password2) {
      newErrors.password2 = '前後密碼輸入不符';
      isValid = false;
    }

    if (!formData.user_name) {
      newErrors.user_name = '姓名為必填';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = '電子郵件為必填';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = '請輸入有效的電子郵件地址';
        isValid = false;
      }
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '請閱讀並同意會員服務條款與隱私權政策';
      isValid = false;
    }


    setErrors(newErrors);

    // 顯示所有錯誤訊息
    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: '填寫資料錯誤',
        html: Object.values(newErrors).map(error => `<p>${error}</p>`).join(''),
        showConfirmButton: true,
      });
    }
    if (newErrors.agreeTerms) {
      Swal.fire({
        icon: 'warning',
        title: '尚未同意條款',
        text: '請閱讀並同意會員服務條款與隱私權政策',
        showConfirmButton: true,
      });
    }

    return isValid;
  };

  // 送出表單
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
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
        await Swal.fire({
          icon: 'success',
          title: '註冊成功',
          text: '歡迎成為醺迷仙園會員，請先登入',
          showConfirmButton: false,
          timer: 1000
        });
        // router.push('/member/login')
        setTimeout(() => router.push('/member/login'), 500)
      } else {
        // 處理後端返回的錯誤
        let errorMessage = result.message || '註冊失敗，請稍後再試';
        let errorDetails = [];

        if (result.message === '會員帳號已存在') {
          errorDetails.push('會員帳號已存在');
        }
        if (result.message === '此電子郵件已被使用') {
          errorDetails.push('此電子郵件已被使用');
        }
        if (errors.email) {
          errorDetails.push('請輸入有效的電子郵件地址');
        }
        if (errors.password2) {
          errorDetails.push('前後密碼輸入不符');
        }

        await Swal.fire({
          icon: 'error',
          title: '註冊失敗',
          html: `
            <p>${errorMessage}</p>
            
          `,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      await Swal.fire({
        icon: 'error',
        title: '註冊失敗',
        text: '發生錯誤，請稍後再試',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  // 顯示密碼
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  const togglePassword2Visibility = useCallback(() => {
    setShowPassword2(prev => !prev);
  }, []);


  return (
    <form onSubmit={handleSubmit}>

      {/* desk */}
      <div className={` d-none d-lg-block`}>
        <div className={`${styles.tabContent} ms-5`}>

          <div
            className={`${styles.tabPane} ${styles.fade} ${styles.registerContent}`}
            id="register"
            role="tabpanel"
            aria-labelledby="register-tab"
          >

            {/* 帳號 */}
            <FloatingLabelInput
              label="帳號 *"
              type="text"
              name="account"
              value={formData.account}
              onChange={handleChange}
              error={errors.account}
            />

            {/* pwd */}
            <FloatingLabelInput
              label="密碼 *"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              isPassword={true}
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
            />

            {/* pwd2 */}
            <FloatingLabelInput
              label="再次輸入密碼 *"
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              error={errors.password2}
              isPassword={true}
              togglePasswordVisibility={togglePassword2Visibility}
              showPassword={showPassword2}
            />

            {/* emaile */}
            <FloatingLabelInput
              label="電子郵件 *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            {/* name */}
            <FloatingLabelInput
              label="姓名 *"
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              error={errors.user_name}
            />

            {/* tel */}
            <FloatingLabelInput
              label="手機號碼 "
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            {/* birthday&gender */}
            <div className="d-flex ">
              <div className={`${styles.floatingLabelInput} ${styles.dateInputWrapper}`}>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className={`${styles.registerInput} ${styles.dateInput}`}
                />
                <label className={styles.floatingLabel}>生日</label>
              </div>

              <div className={`${styles.floatingLabelInput} ${styles.selectWrapper}`}>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`${styles.registerInput} ${styles.select}`}
                >
                  <option value=""></option>
                  <option value="Male">男性</option>
                  <option value="Female">女性</option>
                  <option value="Other">不願透露</option>
                </select>
                <label className={styles.floatingLabel}>性別</label>
              </div>
            </div>

            {/* 同意政策 */}
            <div className={`${styles.formCheck} ${styles.checkRead} align-items-center d-flex`}>
              <input
                name="agreeTerms"
                className={styles.formCheckInput}
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                 id="agreeTerms"
              />
              <label className={styles.formCheckLabel} htmlFor="agreeTerms">
                已閱讀並同意
                <Link href="/terms" className={styles.red}>會員服務條款</Link>
                與
                <Link href="/privacy" className={styles.red}>隱私權政策</Link>
              </label>
          
            </div>

         
            {/* 按鈕 */}
            <button type="submit" className={styles.button}>註冊</button>
            <br />

            <p className={styles.hadAccount}>
              已經是會員了嗎？
              <Link href="/member/login" className={styles.red}>
                現在登入
              </Link>。
            </p>
            <div
              className={`d-flex justify-content-center ${styles.btnBack}`}
            >

              <Link
                href="/"
                className={styles.blue}
              >
                返回首頁
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RWD */}
      <div className="d-block d-lg-none ms-5 ">
        <div>
          <div className={`${styles.tabContent} ms-5`}>

            <div
              className={`${styles.tabPane} ${styles.fade} ${styles.registerContent} `}
              id="register"
              role="tabpanel"
              aria-labelledby="register-tab"
            >
              {/* 帳號 */}
              <FloatingLabelInput
                label="帳號 *"
                type="text"
                name="account"
                value={formData.account}
                onChange={handleChange}
                error={errors.account}
              />
              {/* pwd */}
              <FloatingLabelInput
                label="密碼 *"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                isPassword={true}
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
              />

              {/* pwd2 */}
              <FloatingLabelInput
                label="再次輸入密碼 *"
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                error={errors.password2}
                isPassword={true}
                togglePasswordVisibility={togglePassword2Visibility}
                showPassword={showPassword2}
              />

              {/* emaile */}
              <FloatingLabelInput
                label="電子郵件 *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              {/* name */}
              <FloatingLabelInput
                label="姓名 *"
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                error={errors.user_name}
              />

              {/* tel */}
              <FloatingLabelInput
                label="手機號碼 "
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              {/* birthday&gender */}
              <div className="d-flex ">
                <div className={`${styles.floatingLabelInput} ${styles.dateInputWrapper}`}>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className={`${styles.registerInput} ${styles.dateInput}`}
                  />
                  <label className={styles.floatingLabel}>生日</label>
                </div>

                <div className={`${styles.floatingLabelInput} ${styles.selectWrapper}`}>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`${styles.registerInput} ${styles.select}`}
                  >
                    <option value=""></option>
                    <option value="Male">男性</option>
                    <option value="Female">女性</option>
                    <option value="Other">不願透露</option>
                  </select>
                  <label className={styles.floatingLabel}>性別</label>
                </div>
              </div>

    {/* 同意政策 */}
<div className={`${styles.formCheck} ${styles.checkRead} align-items-center d-flex`}>
  <input
    name="agreeTerms"
    className={styles.formCheckInput}
    type="checkbox"
    checked={formData.agreeTerms}
    onChange={handleChange}
    id="agreeTermsRwd"
  />
  <label className={styles.formCheckLabelrwd} htmlFor="agreeTermsRwd">
    已閱讀並同意
    <Link href="/terms" className={styles.red}>會員服務條款</Link>
    與
    <Link href="/privacy" className={styles.red}>隱私權政策</Link>
  </label>
</div>

              {/* 按鈕 */}
              <button type="submit" className={styles.button}>註冊</button>
              <br />
              <p className={styles.hadAccount}>
                已經是會員了嗎？
                <Link href="/member/login" className={styles.red} >
                  現在登入
                </Link>。
              </p>
              <div
                className={`d-flex justify-content-center ${styles.btnBack}`}
              >

                <Link
                  href="/"
                  className={styles.blue}
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