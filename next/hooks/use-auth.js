/**
 * 集中管理會員狀態：Context Hook 勾子寫法
 */

// # 目的1：將context provider(提供者)中的共享狀態集中統一管理
// # 目的2：包裝useContext，提供一個對應適合的名稱為useAuth，方便消費者(consumers)呼叫使用，提高閱讀性

import { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

// google登入
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { useFirebase } from './useFirebase';
import useFirebase from './use-firebase';

// * Context使用1.建立context與導出
// 傳入參數為defaultValue，是在套用context時錯誤或失敗才會得到的值
// 可以使用有意義的預設值，或使用null(通常目的是為了除錯)
const AuthContext = createContext(null)

// * 2.建立AuthProvider元件
// props.children屬性，代表包裹在Providers中的所有
export function AuthProvider({ children }) {
  // 建立路由器
  const router = useRouter()
  // const { auth, firebaseInitialized } = useFirebase();
  // goole登入
  const { loginGoogle } = useFirebase()

  // 會員使用的認証&授權狀態
  const [auth, setAuth] = useState({
    isAuth: false, // 會員是否有登入的信號值
    userData: null,
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
        console.log('Auth status response:', data);
        if (status === 'success') {
          setAuth({
            isAuth: data.isAuth,
            userData: {
              ...data.user,
              gender: data.user.gender || '',
              birthday: data.user.birthday || '',
              member_level_id: data.user.member_level_id || '',
              phone: data.user.phone || '',  // 確保設置 phone
              address: data.user.address || '',  // 確保設置 address
            },
          })
        } else {
          setAuth({
            isAuth: false,
            userData: null,
          })
        }
      } else {
        // const errorData = await response.json()
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
  const login = async (account, password, rememberMe) => {
    try {
      const response = await fetch('http://localhost:3005/api/member/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account, password, rememberMe }),
        credentials: 'include',
      })
      const data = await response.json()
      console.log('Login response:', data);

      if (response.ok && data.status === 'success' && data.data && data.data.user) {
        // 登錄成功後，立即獲取完整的用戶資料
        const profileResponse = await fetch('http://localhost:3005/api/dashboard/profile', {
          method: 'GET',
          credentials: 'include',
        });
        const profileData = await profileResponse.json();
        console.log('Profile data:', profileData);

        if (profileResponse.ok && profileData.status === 'success') {
          const userData = {
            ...profileData.data.user,
            gender: profileData.data.user.gender || '',
            birthday: profileData.data.user.birthday || '',
            member_level_id: profileData.data.user.member_level_id || '',
            phone: profileData.data.user.phone || '',
            address: profileData.data.user.address || '',
            email: profileData.data.user.email || '',
          };
          setAuth({
            isAuth: true,
            userData: userData,
          });
          console.log('Updated auth state after login:', { isAuth: true, userData });
          router.push('/dashboard/profile');
          return { success: true, message: '登入成功！' };
        } else {
          console.error('Failed to fetch complete profile data');
          return { success: false, message: '獲取完整用戶資料失敗' };
        }
      } else {
        return { success: false, message: data.message || '登入失敗' };
      }
    } catch (error) {
      console.error('登入時發生錯誤：', error);
      return { success: false, message: '登入過程中發生錯誤，請稍後再試。' };
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
        // alert('你已成功登出!')
        await Swal.fire({
          icon: 'success',
          title: '登出成功',
          text: '醺迷仙園 期待下次再與您相見',
          showConfirmButton: false,
          timer: 2000
        });
        // Swal 關閉後立即返回，不再等待額外的時間
        return true; // 返回 true 表示登出成功
      }
    } catch (error) {
      console.error('登出時發生錯誤：', error)
      // alert('登出過程中發生錯誤，請稍後再試。')
      await Swal.fire({
        icon: 'error',
        title: '發生錯誤',
        text: '登出過程中發生錯誤，請稍後再試。',
        showConfirmButton: false,
        timer: 1500
      });
      return false; // 返回 false 表示登出失敗
    }
  }

  // @ 更新
  const updateUserInfo = async (updatedData) => {
    try {
      // console.log('Sending update request with data:', updatedData);
      const response = await fetch('http://localhost:3005/api/dashboard/profile/update', {
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
        setAuth(prevAuth => {
          const newAuth = {
            ...prevAuth,
            userData: {
              ...prevAuth.userData,
              ...result.data.user,
              avatar_url: updatedData.avatar_url || prevAuth.userData.avatar_url, // 確保頭像 URL 被更新
            }
          };
          console.log('Updated auth state:', newAuth); // 檢查更新後的狀態
          return newAuth;
        });
        return { success: true, user: result.data.user };
      } else {
        throw new Error(result.message || '更新失敗');
      }
    } catch (error) {
      console.error('更新失敗資訊:', error);
      return { success: false, error: error.message };
    }
  };

  // * google登入
  const cbGoogleLogin = async (providerData) => {
    // if (!auth) {
    //   console.error('Firebase auth is not initialized');
    //   return { success: false, message: 'Firebase auth is not initialized' };
    // }

    try {
      // const provider = new GoogleAuthProvider();
      // const result = await signInWithPopup(auth, provider);
      // const user = result.user;
      const user = providerData

      // 向後端發送 Google 用戶資訊
      const response = await fetch('http://localhost:3005/api/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providerId:"google.com",
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.status === 'success') {
        setAuth({
          isAuth: true,
          userData: data.data.user,
        });
        return { success: true, message: 'Google 登入成功！' };
      } else {
        return { success: false, message: data.message || 'Google 登入失敗' };
      }
    } catch (error) {
      console.error('Google 登入時發生錯誤：', error);
      return { success: false, message: 'Google 登入過程中發生錯誤，請稍後再試。' };
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, checkAuth, updateUserInfo, googleLogin: () => loginGoogle(cbGoogleLogin) }}>
      {children}
    </AuthContext.Provider>
  )
}

// * 3.建立一個包裝useContext的useAuth
export const useAuth = () => useContext(AuthContext)
