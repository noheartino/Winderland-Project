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

  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [key, setKey] = useState(0); // 新增一個 key 狀態用於強制重新渲染 Image 組件

  const [formData, setFormData] = useState({
    user_name: '',
    account: '',
    gender: '',
    birthday: '',
    member_level_id: '',
    phone: '',
    address: ''
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
      setAvatarUrl(auth.userData.avatar_url || '/images/member/avatar/default-avatar.jpg');
      setKey(prev => prev + 1);
    }
  }, [auth, router]);


  if (!auth.isAuth || !auth.userData) {
    return null;
  }

  // @ 更換會員頭像
  const handleAvatarChange = async (event) => {
    console.log('更換會員頭像函式');

    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setUploadStatus('上傳中...');
      console.log('會員頭像上傳要求中...');
      const response = await fetch('http://localhost:3005/api/dashboard/profile/upload-avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('會員頭像上傳回應:', result);

      if (result.status === 'success') {
        console.log('會員頭像更換成功');
        const newAvatarUrl = result.data.avatar_url;
        setAvatarUrl(newAvatarUrl);
        updateUserInfo({ ...auth.userData, avatar_url: newAvatarUrl });
        setUploadStatus('上傳成功');
        setKey(prev => prev + 1);
      } else {
        console.error('頭像上傳失敗:', result.message);
        setUploadStatus('上傳失敗: ' + result.message);
      }
    } catch (error) {
      console.error('頭像上傳出錯:', error);
      setUploadStatus('上傳出錯: ' + error.message);
    }
  };

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
    2: '銀瓶會員',
    3: '金瓶會員',
    4: '白金瓶會員',
  };
  const userMembership = membershipMapping[auth.userData.member_level_id];

  // * 根據會員等級決定背景樣式
  const getMembershipStyle = (level) => {
    switch (level) {
      case 1:
        return {
          background: 'var(--primary)',
          color: '#FFF'
        };
      case 2:
        return {
          background: 'linear-gradient(180deg, #E7E2D3 0%, #FFF 47.5%, #D0C7B0 100%)',
          color: 'var(--text_primary, #60464C)'
        };
      case 3:
        return {
          background: 'linear-gradient(180deg, #FCC63E 0%, #FFE7A9 47.5%, #FBC741 100%)',
          color: 'var(--text_primary, #60464C)'
        };
      case 4:
        return {
          background: 'linear-gradient(180deg, #FBE09B 0%, #FFF1CF 47.5%, #E5C369 100%)',
          border: '1px solid #FFF',
          boxShadow: '0px 0px 8.1px 1px #FFF',
          color: 'var(--text_primary, #60464C)'
        };
      default:
        return {};
    }
  };

  

  return (
    <>
      <>
        {/* desk */}
        <div className="container d-none d-lg-block mb-5">
          {/* 個人資料區 */}
          <section className="name-card d-flex row">

            {/* 會員資料 */}
            <div className="name col-5">
              <div className="d-flex align-item-center mt-3">
                <div className="userName">{auth.userData.user_name}</div>

              </div>
              <div
                className="membership"
                style={{
                  ...getMembershipStyle(auth.userData.member_level_id),
                  fontSize: '16px',
                  fontWeight: '400',
                  letterSpacing: '1.4px'
                }}
              >
                {userMembership}
              </div>


              <div className="userID">ID：{auth.userData.account}</div>
              <div className="userAge">{userGender} / {userAge}歲 / {auth.userData.birthday}</div>

              <div className="user-img">
                <Image
                src={avatarUrl || '/images/member/avatar/default-avatar.jpg'}
                  alt="User Avatar"
                  width={130}
                  height={130}
                  className="rounded-circle"
                />
              </div>

              <label htmlFor="avatarUpload" className="avatarButton avatarbuttonOutlined">
                更換頭像
              </label>
              <input
                name='avatar'
                type="file"
                id="avatarUpload"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
                accept="image/*"
              />
              {uploadStatus && <div className="uploadStatus">{uploadStatus}</div>}
            </div>



            {/* 會員卡 */}
            <div className="membership-level d-flex  justify-content-end col-2">
              <ProfileMembership />
            </div>

            {/* 升級 */}
            <div className="membership-detail col-2">
              {/* <p className="membership-exp">白金會員到期日 - 2025.07.10</p> */}
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
           src={auth.userData.avatar_url || '/images/member/avatar/default-avatar.jpg'}
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