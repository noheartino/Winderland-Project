import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/router'

import ProfileUpdateUser from './profile/ProfileUpdateUser'
import ProfileUpdatePwd from './profile/ProfileUpdatePwd'
import ProfileMembership from './profile/ProfileMembership'
import ProfileUpdateUserRWD from './profile/ProfileUpdateUserRWD'
import ProfileUpdatePwdRWD from './profile/ProfileUpdatePwdRWD'

export default function DashboardProfile() {
  // 驗證登入
  const { auth, updateUserInfo } = useAuth();
  const router = useRouter();

  // const [auth.userData, setauth.userData] = useState(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState(null)

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
    if (!auth.isAuth) {
      router.push('/member/login');
    } else if (auth.userData) {
      console.log('auth.userData:', auth.userData);
      setFormData({
        user_name: auth.userData.user_name || '',
        account: auth.userData.account || '',
        birthday: auth.userData.birthday || '',
        gender: auth.userData.gender || '',
        phone: auth.userData.phone || '',
        address: auth.userData.address || '',
        member_level_id: auth.userData.member_level_id || '',
      });
    }
  }, [auth, router]);

  if (!auth.isAuth || !auth.userData) {
    return null;
  }


  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error}</div>

  // 前端換算顯示
  // * 性別
  const genderMapping = {
    Male: '男性',
    Female: '女性',
  };
  const userGender = genderMapping[auth.userData.gender] || '其他';

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
  const userAge = calculateAge(auth.userData.birthday);

  // * 會員等級
  const membershipMapping = {
    1: '銅瓶會員',
    2: '白瓶會員',
    3: '黃金會員',
    4: '白金會員',
  };
  const userMembership = membershipMapping[auth.userData.member_level_id] ;

  // * 會員頭像
  // const avatarPath = `/public/member/avatar/${auth.userData.img.split('/').pop()}`;

  return (
    <>
      <>
        {/* desk */}
        <div className="container d-none d-lg-block mb-5">
          {/* 個人資料區 */}
          <section className="name-card d-flex row">
            {/* 會員資料 */}
            <div className="name col-5">
              <div className="userName">{auth.userData.user_name}</div>
              <div className="userID">ID：{auth.userData.account}</div>
              <div className="userAge">{userGender} / {userAge}歲 / {auth.userData.birthday}</div>
              <div className="user-img">
              <Image
                src={auth.userData.avatar_url || '/member/avatar/default-avatar.jpg'}
                alt="User Avatar"
                width={130}
                height={130}
                className="rounded-circle"
              />
            </div>
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
                <div className="userName-rwd">{auth.userData.user_name}</div>
                <div className="userID-rwd">ID：{auth.userData.account}</div>
                <div className="userAge-rwd">{userGender} / {userAge}歲 / {auth.userData.birthday}</div>
              </div>
              <div className="user-img-rwd">
              <Image
                src={auth.userData.avatar_url || '/member/avatar/default-avatar.jpg'}
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-circle"
              />
            </div>
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
       
        </div>
      </>

    </>
  );
}