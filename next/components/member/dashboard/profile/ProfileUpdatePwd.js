import React, { useState, useEffect } from 'react'

export default function ProfileUpdatePwd() {
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

      const response = await fetch('http://localhost:3005/api/dashboard/profile', {
        method: 'GET',
        credentials: 'include', // 這將包含cookies
        headers: {
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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    // 先檢查新密碼和確認密碼是否一致
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('新密碼與確認密碼不一致')
      return
    }

    try {
      const response = await fetch('http://localhost:3005/api/dashboard/profile', {
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
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '密碼更新失敗');
      }
      //  密碼更新成功後的操作
      alert('密碼更新成功')
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.message)
    }
  }


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <form onSubmit={handlePasswordSubmit} className='form-update'>
        <section className="editPwd-card col-6">
          <h4 className="edit-card-title">修改密碼</h4>
          <label htmlFor="">舊密碼</label> 
          {/* <span>*舊密碼輸入錯誤</span> */}
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            // placeholder="請輸入舊密碼"
            style={{ width: "93%" }}
          />
          <br />
          <label htmlFor="newPassword">新密碼 (6-12字元）</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            // placeholder="請輸入6-12字元新密碼"
            style={{ width: "93%" }}
          />
          <br />
          <label htmlFor="confirmPassword">再次輸入新密碼</label> 
          {/* <span>*密碼內容輸入錯誤</span> */}
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            // placeholder="請再次輸入新密碼"
            style={{ width: "93%" }}
          />
        </section>
        {error && <div className="error-message">{error}</div>}
        {/* <button type="submit" className='btn-group'>更新密碼</button> */}
      </form>
    </>
  )
}
