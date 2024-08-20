// @ 導入模組
import LoginForm from '@/components/member/login-form'
import React from 'react'
import { useAuth } from '@/hooks/use-auth' // 處理認證邏輯
import { useRouter } from 'next/router'// 操作路由，進行導航

// @ 預設導出
export default function Login() {
  const { auth, login, logout } = useAuth()
  const router = useRouter()
  const handleLoginSuccess = () => {
    router.push('/dashboard/profile')
  }

  return (
    <>
      <p>目前登入狀態：{auth.isAuth ? '已登入' : '未登入'}</p>
      <LoginForm onLoginSuccess={handleLoginSuccess} login={login} />
    </>

  )
}
