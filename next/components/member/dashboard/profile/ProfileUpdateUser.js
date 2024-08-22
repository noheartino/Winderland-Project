import React, { useState, useEffect } from 'react'

export default function ProfileUpdateUser() {
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
      const response = await fetch('http://localhost:3005/api/dashboard/profile', {
        method: 'GET',
        credentials: 'include', // 這將包含cookies
        headers: {
          'Content-Type': 'application/json',
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
              <section className="editAccount-card me-5 col-6">
                <h4 className="edit-card-title">修改會員資料</h4>
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
                  style={{ width: "50%" }}
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
                <input type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={`${userData.phone}`}
                  style={{ width: "50%" }} />
                <br />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={`${userData.address}`}
                  style={{ width: "100%" }}
                />
              </section>
      </form>
    </>
  )
}
