import { useRouter } from 'next/router'
// import { useAuth } from '@/hooks/use-auth'

export default function Logout() {
  const router = useRouter()
  // const { logout } = useAuth();

  if (typeof window !== 'undefined') {
    // 登出導向首頁
    router.push('/')
  }

  return <></>
}


// import React from 'react'

// export default function Logout() {
//   return <div>Logout</div>
// }