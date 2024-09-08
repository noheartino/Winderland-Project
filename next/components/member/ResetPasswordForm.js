// # 重設密碼
import React, { useState, useEffect , useCallback } from 'react'
import { useRouter } from 'next/router'
import styles from '@/components/member/resetPassword.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// * 漂浮標籤
const FloatingLabelInput = ({ label, type, name, value, onChange, error, isPassword, togglePasswordVisibility, showPassword }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${styles.floatingLabelInput} position-relative mb-3`}>
      <div className={styles.inputWrapper}>
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${styles.resetPwdInput} ${error ? styles.inputError : ''} ${isFocused || value ? styles.hasContent : ''}`}
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
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { token, email } = router.query
      if (token && email) {
        setToken(token)
        setEmail(email)
      } else {
        Swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '無效的重設密碼連結',
          confirmButtonText: '確定'
        })
      }
    }
  }, [router.isReady, router.query])

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setConfirmPasswordError('')

    if (!token || !email) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '無效的重設密碼連結',
        confirmButtonText: '確定'
      })
      return
    }
    if (password.length < 6) {
      setPasswordError('密碼長度必須至少為6-12個字符')
      return
    }
 
    if (password !== confirmPassword) {
      setConfirmPasswordError('密碼不一致')
      return
    }

   
 

    try {
      const response = await fetch('http://localhost:3005/api/member/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: '成功',
          text: '密碼重設成功，請重新登入！',
          confirmButtonText: '確定'
        })
        setTimeout(() => router.push('/member/login'), 3000)
      } else {
        Swal.fire({
          icon: 'error',
          title: '錯誤',
          text: data.message || '重設密碼失敗',
          confirmButtonText: '確定'
        })
      }
    } catch (error) {
      console.error('Error:', error)
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '發生錯誤,請稍後再試',
        confirmButtonText: '確定'
      })
    }
  }

  return (
    <>
      {/* desk */}
      <div className={`d-none d-lg-block`}>
        <main className={styles.main}>
          <div className={styles.bgResetPwd}>
            <div className={`${styles.resetPwdBox} mb-5`}>

              <form onSubmit={handleSubmit}>

                <div className={`${styles.tabContent} ms-5`}>
                  <div className={`${styles.tabPane} ${styles.fade} ${styles.show} ${styles.active} ${styles.loginContent}`}>

                    <h2 className={`${styles.resetLabel} mt-5 mb-2`}>重設密碼</h2>
                    <p className={`${styles.resetNotice} me-5`}>請重新設定您的密碼，並以新密碼登入。</p>

                    <br />
                   <FloatingLabelInput
                      label="新密碼 (6-12字符，不區分大小寫)"
                      type="password"
                      name="newPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={passwordError}
                      isPassword={true}
                      togglePasswordVisibility={togglePasswordVisibility}
                      showPassword={showPassword}
                    />
                    <FloatingLabelInput
                      label="確認新密碼"
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={confirmPasswordError}
                      isPassword={true}
                      togglePasswordVisibility={toggleConfirmPasswordVisibility}
                      showPassword={showConfirmPassword}
                    />

                    <br />
                    <button type="submit" className={`${styles.button} mt-5 mb-5`}>
                      確認重設密碼
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* <div style={{ height: "80px" }}></div> */}
          </div>
        </main>
      </div>

      {/* RWD */}
      <div className="d-block d-lg-none">
        <main className={styles.main}>

          <form onSubmit={handleSubmit}>
            <div className={`${styles.tabContent} ms-5 mt-5`}>
              <div className={`${styles.tabPane} ${styles.fade} ${styles.show} ${styles.active} ${styles.loginContent}`}>

                <h2 className={`${styles.resetLabel} mt-5 mb-2 ms-4`}>重設密碼</h2>
                <p className={`${styles.resetNotice} me-5 ms-4`}>請重新設定您的密碼，並以新密碼登入。</p>

                <br />
                <div className="ms-3">
                <FloatingLabelInput
                      label="新密碼 (6-12字符，不區分大小寫)"
                      type="password"
                      name="newPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={passwordError}
                      isPassword={true}
                      togglePasswordVisibility={togglePasswordVisibility}
                      showPassword={showPassword}
                    />
                    <FloatingLabelInput
                      label="確認新密碼"
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={confirmPasswordError}
                      isPassword={true}
                      togglePasswordVisibility={toggleConfirmPasswordVisibility}
                      showPassword={showConfirmPassword}
                    />
                </div>

                <br />
                <button type="submit" className={`${styles.buttonRwd} mt-5 mb-5 ms-4`}>
                  確認重設密碼
                </button>
              </div>
            </div>
          </form>
          {/* {message && <div className={styles.message}>{message}</div>} */}


        </main>
      </div>
    </>
  )
}