import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function ProfileUpdateUserRWD() {
  // 驗證登入
  const { auth, updateUserInfo } = useAuth();
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    user_name: '',
    account: '',
    gender: '',
    birthday: '',
    member_level_id: '',
    phone: '',
    address: '',
    email: ''
  })

  const updateFormData = useCallback((userData) => {
    setFormData({
      user_name: userData.user_name || '',
      account: userData.account || '',
      birthday: userData.birthday || '',
      gender: userData.gender || '',
      phone: userData.phone || '',
      address: userData.address || '',
      member_level_id: userData.member_level_id || '',
      email: userData.email || ''
    });
  }, []);

  useEffect(() => {
    if (!auth.isAuth) {
      router.push('/member/login');
    } else if (auth.userData) {
      // console.log('auth.userData:', auth.userData);
      updateFormData(auth.userData);
    }
  }, [auth, router, updateFormData]);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log('Submitting form data:', formData);
      const result = await updateUserInfo(formData);
      if (result.success) {
        // alert('個人資料更新成功');
        await Swal.fire({
          icon: 'success',
          title: '個人資料更新成功',
          text: '已完成資料修改',
          showConfirmButton: false,
          timer: 1500
        });
        // console.log('Updated user data:', result.user);
        updateFormData(result.user);
      } else {
        // alert('更新個人資料失敗：' + (result.error || '未知錯誤'));
        await Swal.fire({
          icon: 'error',
          title: '更新個人資料失敗',
          text: result.error || '未知錯誤',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (err) {
      // alert('更新個人資料失敗：' + err.message);
      await Swal.fire({
        icon: 'error',
        title: '更新個人資料失敗',
        text: err.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  if (!auth.isAuth || !auth.userData) {
    return null;
  }

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error}</div>

  return (
    <>
       <form onSubmit={handleSubmit} className='form-update'>
        <section className="editAccount-card-rwd me-5 ">
          <h2 className="edit-card-title">修改會員資料</h2>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}     
            onChange={handleInputChange}
            // placeholder={`${userData.name}`}
            style={{ width: "100%" }}
          />
          <br />
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            // placeholder={`${userData.birthday}`}
            style={{ width: "65%" }}
            className='me-2'
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            style={{ width: "27%" }}>
            {/* <option value="option1">選擇性別</option> */}
            <option value="Male">男</option>
            <option value="Female">女</option>
            <option value="Other">不願透露</option>
          </select>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            // placeholder={`${userData.phone}`} 
            style={{ width: "50%" }} />
          <br />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            // placeholder={`${userData.address}`}
            style={{ width: "100%" }}
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            // placeholder={`${userData.email}`}
            style={{ width: "100%", marginBottom: 60 }}
          />

          {/* 按鈕區 */}
          <div className="btn-group-rwd d-flex justify-content-end d-block d-lg-none mb-5">
            {/* <button>清空</button> */}
            <button type="submit" className="button-send">
              送出修改
            </button>
          </div>
        </section>
      </form>
    </>
  )
}
