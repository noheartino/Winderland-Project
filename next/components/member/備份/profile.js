import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '@/hooks/use-auth'
import Swal from 'sweetalert2'

import ProfileUpdateUser from './profile/ProfileUpdateUser'
import ProfileUpdatePwd from './profile/ProfileUpdatePwd'
import ProfileMembership from './profile/ProfileMembership'
import ProfileUpdateUserRWD from './profile/ProfileUpdateUserRWD'
import ProfileUpdatePwdRWD from './profile/ProfileUpdatePwdRWD'

export default function DashboardProfile() {
  // 驗證登入
  const { auth } = useAuth();

  if (!auth.isAuth) {
    return <Redirect to="/login" />;
  }


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
      // const token = localStorage.getItem('authToken');
      // console.log('Token:', token);  // 打印出Token的值

      const response = await fetch('http://localhost:3005/api/dashboard/profile', {
        method: 'GET',
        credentials: 'include', // 這將包含cookies
        headers: {
          // 'Authorization': `Bearer ${token}`,// 添加授權頭
          'Content-Type': 'application/json',
        }
      })
      if (!response.ok) {
        throw new Error('獲取用戶數據失敗')
      }
      const data = await response.json()
      console.log('獲取的數據:', data);

      if (data.status === 'success' && data.data && data.data.user) {
        const user = data.data.user;
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
        throw new Error('用戶數據不可用或格式不正確');
      }
    } catch (err) {
      console.error("獲取用戶數據時出錯:", err);
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
      // const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3005/api/dashboard/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        throw new Error('Failed to update profile')
      }
      // 更新成功後的操作，例如顯示成功消息
      // alert('Profile updated successfully')
      await Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '已完成會員資料修改',
        showConfirmButton: false,
        timer: 1500
      });
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
      // const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3005/api/dashboard/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
      })
      if (!response.ok) {
        throw new Error('Failed to update password')
      }
      // 密碼更新成功後的操作
      // alert('Password updated successfully')
      await Swal.fire({
        icon: 'success',
        title: '密碼修改成功',
        text: '已完成會員密碼修改',
        showConfirmButton: false,
        timer: 1500
      });
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  // 前端換算顯示
  // * 性別
  const genderMapping = {
    Male: '男性',
    Female: '女性',
  };
  const userGender = genderMapping[userData.gender] || '其他';

  // * 歲數
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // 如果生日還沒過，年齡需要減一歲
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };
  const userAge = calculateAge(userData.birthday);

  // * 會員等級
  const membershipMapping = {
    1: '銅瓶會員',
    2: '白瓶會員',
    3: '黃金會員',
    4: '白金會員',
  };
  const userMembership = membershipMapping[userData.member_level_id] ;

  // * 會員頭像
  // const avatarPath = `/public/member/avatar/${userData.img.split('/').pop()}`;

  return (
    <>
      <>
        {/* desk */}
        <div className="container d-none d-lg-block">
          {/* 個人資料區 */}
          <section className="name-card d-flex row">
            {/* 會員資料 */}
            <div className="name col-5">
              <div className="userName">{userData.user_name}</div>
              <div className="userID">ID：{userData.account}</div>
              <div className="userAge">{userGender} / {userAge}歲 / {userData.birthday}</div>
              <div className="user-img" style={{ backgroundImage: `url($)` }} />
              <div className="membership">{userMembership}</div>
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
              <button type="button" onClick={() => setFormData({ ...userData })}>清空</button>
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
                <div className="userName-rwd">{userData.user_name}</div>
                <div className="userID-rwd">ID：{userData.account}</div>
                <div className="userAge-rwd">{userGender} / {userAge}歲 / {userData.birthday}</div>
              </div>
              <div className="user-img-rwd" />
            </div>
            <hr style={{ border: "3px solid var(--primary_color-light)" }} />
            <div className="membership-detail-rwd d-flex">
              <div className="membership-rwd">{userMembership}</div>
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