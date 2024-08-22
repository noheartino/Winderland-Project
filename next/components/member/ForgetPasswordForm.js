// # 忘記密碼

// @ 導入
import React, { useState } from 'react'
import styles from '@/components/member/member.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'


// @ 預設導出
export default function ForgetPasswordForm() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3005/api/member/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            const data = await response.json()
            if (response.ok) {
                setMessage('已將重設密碼連結寄送到所填寫的信箱!')
            } else {
                setMessage(data.message || '發生錯誤,請稍後再試')
            }
        } catch (error) {
            console.error('Error:', error)
            setMessage('發生錯誤,請稍後再試')
        }
    }

    return (
        <>
            {/* desk */}
            <div className={` d-none d-lg-block`}>
                <main className={styles.main}>
                    <div className={styles.bg}>
                        <div className={styles.loginBox}>
                            <form onSubmit={handleSubmit}>
                                <div className={`${styles.tabContent} ms-5`}>
                                    {/* 忘記密碼 */}
                                    <div
                                        className={`${styles.tabPane} ${styles.fade} ${styles.show} ${styles.active} ${styles.loginContent}`}
                                    >
                                        <label className={`${styles.label} mt-5 mb-4`} htmlFor="forgetPWD">
                                            忘記密碼
                                        </label>{' '}
                                        <br />
                                        <input
                                            type="email"
                                            name="email"
                                            className={styles.loginInput}
                                            placeholder='請輸入Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />

                                        <br />

                                        <div className={` d-flex justify-content-around  `}>   
                                        <div></div>  
                                            <Link href="/member/login"  className={`${styles.red} `}>返回登入</Link>
                                        </div>
                                        {/* 按鈕 */}
                                        <button
                                            type="submit"
                                            className={`${styles.button} mt-5 mb-5`}
                                        >
                                            重設密碼
                                        </button>


                                    </div>

                                </div>
                            </form>
                            {message && <div className={`${styles.message} ms-5`}>{message}</div>}
                        </div>
                    </div>
                </main>


            </div>

            {/* RWD */}
            <div className="d-block d-lg-none">
                <div>
                    <div className={`${styles.tabContent} ms-5 mt-5`}>
                        <form onSubmit={handleSubmit}>
                            <div
                                className={`tab-pane fade show active ${styles.loginContent}`}
                                id="login-rwd"
                                role="tabpanel"
                                aria-labelledby="login-tab-rwd"
                            >
                                <label className={`${styles.label} mt-5 mb-4 ms-5`} htmlFor="forgetPWD">
                                    忘記密碼
                                </label>
                                <br />
                                <input
                                    type="email"
                                    name="forgetPWD"
                                    id="forgetPWD"
                                    className={`${styles.loginInput} ${styles.forgetPWD} ms-5 mb-5`}
                                    placeholder='請輸入Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <br />



                                <button className={`${styles.loginButton} mb-5 mt-5 ms-5`} type="submit">重設密碼</button>


                            </div>
                        </form>
                        {message && <div className={`${styles.message} ms-5`}>{message}</div>}
                    </div>
                </div>
            </div>
        </>
    )
}