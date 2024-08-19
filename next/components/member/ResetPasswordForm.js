import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/components/member/member.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { token, email } = router.query

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('密碼不一致')
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
        // 可以在這裡添加重定向到登入頁面的邏輯
        setTimeout(() => router.push('/login'), 3000)
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
            <form onSubmit={handleSubmit}>
              <div className={`${styles.tabContent} ms-5`}>
                <div className={`${styles.tabPane} ${styles.fade} ${styles.show} ${styles.active} ${styles.loginContent}`}>
                  <label className={`${styles.label} mt-5 mb-4`} htmlFor="newPassword">
                    重設密碼
                  </label>{' '}
                  <br />
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className={styles.loginInput}
                    placeholder='新密碼'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                  />
                  <br />
                  <button type="submit" className={`${styles.button} mt-5 mb-5`}>
                    確認重設密碼
                  </button>
                </div>
              </div>
            </form>
            {message && <div className={styles.message}>{message}</div>}
          </div>
        </div>
      </main>
    </div>
  )
}