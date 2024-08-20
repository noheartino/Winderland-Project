import { useRouter } from 'next/router'

export default function Logout() {
  const router = useRouter()

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