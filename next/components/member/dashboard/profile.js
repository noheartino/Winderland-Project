import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'

import ProfileUpdateUser from './profile/ProfileUpdateUser'
import ProfileUpdatePwd from './profile/ProfileUpdatePwd'
import ProfileMembership from './profile/ProfileMembership'
import ProfileUpdateUserRWD from './profile/ProfileUpdateUserRWD'
import ProfileUpdatePwdRWD from './profile/ProfileUpdatePwdRWD'

export default function DashboardProfile() {

  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    user_name: '',
    account: '',
    gender: '',
    birthday: '',
    member_level_id: '',
    phone: '',
    address: ''
  })

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    setIsLoading(true)
    try {
      // 從 localStorage 獲取令牌
      const token = localStorage.getItem('authToken');
      console.log('Token:', token);  // 打印出Token的值

      const response = await fetch('http://localhost:3005/api/dashboard/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,// 添加授權頭
          'Content-Type': 'application/json',
          credentials: 'include' // 這會包含 cookies
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }
      const data = await response.json()
      console.log('Fetched data:', data);

      const user = data?.data?.user || data?.user || data;
      if (user && typeof user === 'object') {
        setUserData(user);
        setFormData({
          user_name: user.user_name,
          account: user.account,
          birthday: user.birthday,
          gender: user.gender,
          phone: user.phone,
          address: user.address,
          member_level_id: user.member_level_id,
        });
      } else {
        throw new Error('User data is not available or in unexpected format');
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3005/api/dashboard/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        throw new Error('Failed to update profile')
      }
      // 更新成功後的操作，例如顯示成功消息
      alert('Profile updated successfully')
      fetchUserData() // 重新獲取用戶數據以刷新頁面
    } catch (err) {
      setError(err.message)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match')
      return
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3005/api/dashboard/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
      })
      if (!response.ok) {
        throw new Error('Failed to update password')
      }
      // 密碼更新成功後的操作
      alert('Password updated successfully')
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <>
        {/* desk */}
        <div className="container d-none d-lg-block">
          {/* 個人資料區 */}
          <section className="name-card d-flex row">
            {/* 會員資料 */}
            <div className="name col-5">
              <div className="userName">{userData.name}</div>
              <div className="userID">ID：{userData.id}</div>
              <div className="userAge">{userData.gender} / 28歲 / {userData.birthday}</div>
              <div className="user-img" style={{ backgroundImage: `url(${userData.avatar})` }} />
              <div className="membership">{userData.member_level_id}</div>
            </div>
            {/* 會員等級 */}
            <div className="membership-level d-flex  col-2">
            <ProfileMembership />
            </div>
            {/* 會員期限 */}
            <div className="membership-detail col-2">
              <p className="membership-exp">白金會員到期日 - 2025.07.10</p>
              <div className="upgrade">升級攻略</div>
            </div>
          </section>
          <hr style={{ border: "3px solid var(--light)" }} />
          {/* 修改區 */}
          <div className="edit-card d-flex  ">
            <ProfileUpdateUser />
            <ProfileUpdatePwd />
          </div>
          {/* 按鈕區 */}
          <form onSubmit={handleSubmit}>
            <div className="btn-group d-flex justify-content-end mb-5">
              <button ype="button" onClick={() => setFormData({ ...userData })}>清空</button>
              <button type="submit" className="button-send">
                送出更改
              </button>
            </div>
          </form>
        </div>

        {/* rwd */}
        <div
          className="container-fluid d-block d-lg-none  d-fluid"
          id="account-content-rwd"
        >
          {/* 個人資料區 */}
          <section className="name-card-rwd ">
            {/* 會員資料 */}
            <div className="d-flex">
              <div className="name-rwd">
                <div className="userName-rwd">椎名林檎</div>
                <div className="userID-rwd">ID：Ann_970412</div>
                <div className="userAge-rwd">女 / 28歲 / 1996.02.05</div>
              </div>
              <div className="user-img-rwd" />
            </div>
            <hr style={{ border: "3px solid var(--primary_color-light)" }} />
            <div className="membership-detail-rwd d-flex">
              <div className="membership-rwd">白金會員</div>
              <p className="membership-exp-rwd">白金會員到期日 - 2025.07.10</p>
            </div>
            <hr style={{ border: "3px solid var(--primary_color-light)" }} />
          </section>
          {/* 修改區 */}
          <div className="edit-card edit-card-rwd">
           <ProfileUpdateUserRWD />
          <ProfileUpdatePwdRWD />
          </div>
          {/* 按鈕區 */}
          <div className="btn-group-rwd d-flex justify-content-center d-block d-lg-none mb-5">
            <button>清空</button>
            <button type="submit" className="button-send">
              送出更改
            </button>
          </div>
        </div>
      </>

    </>
  );
}