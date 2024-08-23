/**
 * 集中管理會員狀態：Context Hook 勾子寫法
 */

// # 目的1：將context provider(提供者)中的共享狀態集中統一管理
// # 目的2：包裝useContext，提供一個對應適合的名稱為useAuth，方便消費者(consumers)呼叫使用，提高閱讀性

import { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

// * Context使用1.建立context與導出
// 傳入參數為defaultValue，是在套用context時錯誤或失敗才會得到的值
// 可以使用有意義的預設值，或使用null(通常目的是為了除錯)
const AuthContext = createContext(null)

// * 2.建立AuthProvider元件
// props.children屬性，代表包裹在Providers中的所有
export function AuthProvider({ children }) {
  // 建立路由器
  const router = useRouter()

  // 會員使用的認証&授權狀態
  const [auth, setAuth] = useState({
    isAuth: false, // 會員是否有登入的信號值
    userData: null,
    // 會員資料
    // userData: {
    //   id: 12,
    //   user_name: 'Sophie',
    //   email: 'Sophie',
    //   account: 'sophie',
  })

  useEffect(() => {
    checkAuth()
  }, [])

  // @ 檢查狀態
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/member/auth-status', {
        method: 'GET',
        credentials: 'include', // 確保發送 cookies
      })
      if (response.ok) {
        const { status, data } = await response.json();
        if (status === 'success') {
          setAuth({
            isAuth: data.isAuth,
            userData: {
              ...data.user,
              gender: data.user.gender || '',
              birthday: data.user.birthday || '',
              member_level_id: data.user.member_level_id || '',
            },
          })
        } else {
          setAuth({
            isAuth: false,
            userData: null,
          })
        }
      } else {
        const errorData = await response.json()
        console.error('Auth check failed:', errorData)
        setAuth({
          isAuth: false,
          userData: null,
        });
      }
    } catch (error) {
      console.error('驗證身份時發生錯誤：', error)
      setAuth({
        isAuth: false,
        userData: null,
      })
    }
  }

  // @ 登入
  const login = async (account, password) => {
    try {
      const response = await fetch('http://localhost:3005/api/member/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account, password }),
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        setAuth({
          isAuth: true,
          userData: {
            ...data.user,
            gender: data.user.gender,
            birthday: data.user.birthday,
            member_level_id: data.user.member_level_id,
          },
        })
        alert('登入成功！')
        router.push('/dashboard/profile') // 登入成功後導向首頁
      } else {
        alert('登入失敗，請檢查帳號密碼。')
      }
    } catch (error) {
      console.error('登入時發生錯誤：', error)
      alert('登入過程中發生錯誤，請稍後再試。')
    }
  }

  // @ 登出
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/member/logout', {
        method: 'POST',
        credentials: 'include',
      })
      if (response.ok) {
        setAuth({
          isAuth: false,
          userData: null,
        })
        alert('你已成功登出!')
        router.push('/member') // 登出後導向登入頁面
      }
    } catch (error) {
      console.error('登出時發生錯誤：', error)
      alert('登出過程中發生錯誤，請稍後再試。')
    }
  }

  // @ 更新
  const updateUserInfo = async (updatedData) => {
    try {
      console.log('Sending update request with data:', updatedData);
      const response = await fetch('http://localhost:3005/api/dashboard/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedData)
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // 更新本地 auth 狀態
        setAuth(prevAuth => ({
          ...prevAuth,
          userData: {
            ...prevAuth.userData,
            ...result.data.user
          }
        }));
        console.log('User data updated:', result.data.user); // 添加這行來檢查更新後的數據
        return { success: true, user: result.data.user };
      } else {
        throw new Error(result.message || '更新失敗');
      }
    } catch (error) {
      console.error('更新失敗資訊:', error);
      return { success: false, error: error.message };
    }
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, checkAuth, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  )
}

// * 3.建立一個包裝useContext的useAuth
export const useAuth = () => useContext(AuthContext)
