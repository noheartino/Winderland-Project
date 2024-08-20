// # 重設密碼

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '@/components/member/member.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { token, email } = router.query
      if (token && email) {
        setToken(token)
        setEmail(email)
      } else {
        setMessage('無效的重設密碼連結')
      }
    }
  }, [router.isReady, router.query])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (!token || !email) {
      setMessage('無效的重設密碼連結')
      return
    }

    if (password !== confirmPassword) {
      setMessage('密碼不一致')
      return
    }

    if (password.length < 6) {
      setMessage('密碼長度必須至少為6個字符')
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
        setMessage('密碼重設成功')
        setTimeout(() => router.push('member/login'), 3000)
      } else {
        setMessage(data.message || '重設密碼失敗')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('發生錯誤,請稍後再試')
    }
  }

  return (
    <div className={`d-none d-lg-block`}>
      <main className={styles.main}>
        <div className={styles.bg}>
          <div className={styles.loginBox}>

            {message && <div className={` ms-5 mt-5 ${styles.message} ${message.includes('成功') ? styles.success : styles.error}`}>{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className={`${styles.tabContent} ms-5`}>
                <div className={`${styles.tabPane} ${styles.fade} ${styles.show} ${styles.active} ${styles.loginContent}`}>
                  <label className={`${styles.label} mt-5 mb-2`} htmlFor="newPassword">
                    重設密碼
                  </label>{' '}
                  <p className={`${styles.resetNotice} me-5`}>請重新設定您的密碼，完成設定後用新密碼登入。
                  </p>
                  <br />
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className={styles.loginInput}
                    placeholder='新密碼 (至少6個字符) '
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                  <br />

                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className={styles.loginInput}
                    placeholder='確認新密碼'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                  <br />
                  <button type="submit" className={`${styles.button} mt-5 mb-5`}>
                    確認重設密碼
                  </button>
                </div>
              </div>
            </form>
            {/* {message && <div className={styles.message}>{message}</div>} */}
          </div>
        </div>
      </main>
    </div>
  )
}