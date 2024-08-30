import React, { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import Swal from 'sweetalert2'

export default function ProfileUpdatePwd() {
    const { auth } = useAuth();
    // const [error, setError] = useState(null)
    // const [success, setSuccess] = useState(null)

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handlePasswordChange = (e) => {
        setPasswordData({
          ...passwordData,
          [e.target.name]: e.target.value
        })
      }
    
    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        // setError(null)
        // setSuccess(null)

        // 先檢查新密碼和確認密碼是否一致
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            Swal.fire({
              icon: 'error',
              title: '密碼不一致',
              text: '新密碼與確認密碼不一致 .ᐟ.ᐟ.ᐟ',
              confirmButtonText: '確定'
            })
            return
          }

        try {
            const response = await fetch('http://localhost:3005/api/dashboard/profile/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword
                })
            })
            const data = await response.json()

            if (response.ok) {
                Swal.fire({
                  icon: 'success',
                  title: '密碼更新成功',
                  text: '密碼更新成功 .ᐟ.ᐟ.ᐟ',
                  confirmButtonText: '確定'
                })
                setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
              } else {
                throw new Error(data.message || '密碼更新失敗')
              }
            } catch (err) {
              Swal.fire({
                icon: 'error',
                title: '密碼更新失敗',
                text: err.message,
                confirmButtonText: '確定'
              })
            }
          
    }

    if (!auth.isAuth) {
        return <>
            請先登入
        </>
    }

    return (
        <>
            <form onSubmit={handlePasswordSubmit} className='form-update'>
                <section className="editPwd-card-rwd ">
                    <h2 className="edit-card-title">修改密碼</h2>
                    <label htmlFor="">舊密碼</label>

                    <input
                        type="password"
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        style={{ width: "93%" }}
                        required
                    />
                    <br />
                    <label htmlFor="newPassword">新密碼 (6-12字元)</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        style={{ width: "93%" }}
                        minLength="6"
                        maxLength="12"
                        required
                    />
                    <br />
                    <label htmlFor="confirmPassword">再次輸入新密碼</label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        // placeholder="請再次輸入新密碼"
                        style={{ width: "93%" }}
                        minLength="6"
                        maxLength="12"
                        required
                    />
                     {/* {error && <div className="error-message-pwd-rwd">{error}</div>}
                     {success && <div className="success-message-pwd-rwd">{success}</div>} */}
                    <div className="btn-group d-flex justify-content-end mb-5">
                        <button type="submit" className="button-send-rwd">
                            修改密碼
                        </button>
                    </div>
              
                </section>
           
            </form>
        </>
    )
}
