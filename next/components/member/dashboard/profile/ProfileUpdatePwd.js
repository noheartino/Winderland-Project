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
      const response = await fetch('http://localhost:3005/api/dashboard/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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
      const response = await fetch('http://localhost:3005/api/dashboard/password', {
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
    <form onSubmit={handlePasswordSubmit}>
              <section className="editPwd-card col-6">
                <h4 className="edit-card-title">修改密碼</h4>
                <label htmlFor="">舊密碼</label> <span>*舊密碼輸入錯誤</span>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="********"
                  style={{ width: "93%" }}
                />
                <br />
                <label htmlFor="newPassword">新密碼</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="********"
                  style={{ width: "93%" }}
                />
                <br />
                <label htmlFor="confirmPassword">再次輸入新密碼</label> <span>*密碼內容輸入錯誤</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="********"
                  style={{ width: "93%" }}
                />
              </section>
            </form>
    </>
  )
}
