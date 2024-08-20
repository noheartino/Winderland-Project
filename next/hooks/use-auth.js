/**
 * 集中管理會員狀態：Context Hook 勾子寫法
 */

// # 目的1：將context provider(提供者)中的共享狀態集中統一管理
// # 目的2：包裝useContext，提供一個對應適合的名稱為useAuth，方便消費者(consumers)呼叫使用，提高閱讀性

import { createContext, useState, useContext } from 'react'
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
    // 會員資料
    userData: {
      id: 1,
      user_name: '',
      email: '',
      account: 'gobo_dogg',
    },
  })

  // @ 登入
  const login = () => {
    setAuth({
      isAuth: true,
      userData: {
        id: 1,
        user_name: '黃柏翰',
        email: 'gobo_dogg@test.com',
        account: 'gobo_dogg',
      },
    })
    alert('登入成功！')
  }
  // @ 登出
  const logout = () => {
    // 恢復預設值
    setAuth({
      isAuth: false,
      userData: {
        id: 0,
        name: '',
        email: '',
        username: '',
      },
    })
    alert('你已成功登出!')
  }
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// * 3.建立一個包裝useContext的useAuth
export const useAuth = () => useContext(AuthContext)
