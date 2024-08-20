// # dashboard默認路由

import { useRouter } from 'next/router'

export default function DashboardIndex() {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    router.push('/dashboard/profile')
  }

  return <></>
}
