// # 忘記密碼

// @ 導入
import React, { useState } from 'react'
import styles from '@/components/member/forgetPassword.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'
import Swal from 'sweetalert2'

// * 漂浮標籤
const FloatingLabelInput = ({ label, type, name, value, onChange, error }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`${styles.floatingLabelInput} position-relative mb-3`}>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`${styles.forgetPwdInput} ${error ? styles.inputError : ''} ${isFocused || value ? styles.hasContent : ''}`}
                placeholder=" "
            />
            <label className={styles.floatingLabel}>{label}</label>
            {error && <span className={`${styles.error} ${styles.show}`}>{error}</span>}
        </div>
    );
};

// @ 預設導出
export default function ForgetPasswordForm() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    // 送出表單
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('') // 清除之前的錯誤信息
        try {
            const response = await fetch('https://winderland.shop/api/member/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
                credentials: 'include', // 包含 cookies
            })
            const data = await response.json()

            if (response.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: '重設密碼郵件已發送',
                    text: '請點擊信中連結完成密碼設定',
                    confirmButtonText: '確定'
                })
            } else {
                if (data.message === '此電子郵件未註冊') {
                    setError('此電子郵件未註冊')
                } else if (data.message === '請稍後再試') {
                    await Swal.fire({
                        icon: 'error',
                        title: '請求過於頻繁',
                        text: '請稍後再試',
                        confirmButtonText: '確定'
                    })
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: '發送失敗',
                        text: data.message || '發生錯誤,請稍後再試',
                        confirmButtonText: '確定'
                    })
                }
            }
        } catch (error) {
            console.error('Error:', error)
            await Swal.fire({
                icon: 'error',
                title: '發生錯誤',
                text: '請稍後再試',
                confirmButtonText: '確定'
            })
        }
    }

    return (
        <>
            {/* desk */}
            <div className={` d-none d-lg-block`}>
                <main className={styles.main}>
                    <div className={styles.bgForget}>
                        <div className={styles.forgetPwdBox}>
                            <form onSubmit={handleSubmit}>
                                <div className={`${styles.tabContent} ms-5`}>
                                    {/* 忘記密碼 */}
                                    <div
                                        className={`${styles.tabPane} ${styles.fade} ${styles.show} ${styles.active} ${styles.loginContent}`}
                                    >
                                        <h2 className={`${styles.label} mt-5 mb-4`}>忘記密碼</h2>
                                        <FloatingLabelInput
                                            label="請輸入註冊時Email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            error={error}
                                        />
                                        <br />

                                        <div className={` d-flex justify-content-around  `}>
                                            <div></div>
                                            <Link href="/member/login" className={`${styles.red} `}>返回登入</Link>
                                        </div>
                                        {/* 按鈕 */}
                                        <button
                                            type="submit"
                                            className={`${styles.button} mt-3 mb-5`}
                                        >
                                            送出驗證
                                        </button>


                                    </div>

                                </div>
                            </form>
                        </div>
                        <div style={{ height: "180px" }}></div>
                    </div>
                </main>


            </div>

            {/* RWD */}
            <div className="d-block d-lg-none ms-4">
                <div>
                    <div className={`${styles.tabContent} ms-5 mt-5`}>
                        <form onSubmit={handleSubmit}>
                            <div
                                className={`tab-pane fade show active ${styles.loginContent}`}
                                id="login-rwd"
                                role="tabpanel"
                                aria-labelledby="login-tab-rwd"
                            >
                                <h2 className={`${styles.label} mt-5 mb-4 `}>忘記密碼</h2>
                                <FloatingLabelInput
                                    label="請輸入註冊時Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={error}
                                />
                                <br />



                                <button className={`${styles.button} mb-5 mt-3 `} type="submit">送出驗證</button>
                                <div style={{ height: "80px" }}></div>


                            </div>
                        </form>
                        {/* {message && <div className={`${styles.message} ms-5`}>{message}</div>} */}
                    </div>
                </div>
            </div>
        </>
    )
}