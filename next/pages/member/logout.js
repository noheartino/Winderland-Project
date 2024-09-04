import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'

export default function Logout() {
  const router = useRouter()
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      const logoutSuccess = await logout();
      if (logoutSuccess) {
        router.push('/');
      }
    }

    performLogout();
  }, [logout, router]);

  // 返回 null 或一個加載指示器，因為這個組件不需要渲染任何內容
  return null;
}


// import React from 'react'

// export default function Logout() {
//   return <div>Logout</div>
// }