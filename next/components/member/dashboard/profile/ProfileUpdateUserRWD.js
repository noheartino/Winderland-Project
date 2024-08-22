import React, { useState, useEffect } from 'react'

export default function ProfileUpdateUserRWD() {
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

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <form onSubmit={handleSubmit}>
      <section className="editAccount-card-rwd me-5 ">
        <h2 className="edit-card-title">修改會員資料</h2>
        <input
          type="text"
          name="name"
          value={formData.user_name}
          onChange={handleInputChange}
          placeholder={`${userData.name}`}
          style={{ width: "100%" }}
        />
        <br />
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleInputChange}
          placeholder={`${userData.birthday}`}
          style={{ width: "45%" }}
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          style={{ width: "45%" }}>
          <option value="option1">選擇性別</option>
          <option value="Male">男</option>
          <option value="Female">女</option>
          <option value="Other">不願透露</option>
        </select>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder={`${userData.phone}`} style={{ width: "50%" }} />
        <br />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder={`${userData.address}`}
          style={{ width: "100%", marginBottom: 41 }}
        />
      </section>
      </form>
    </>
  )
}
