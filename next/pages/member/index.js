// # member默認路由

import { useRouter } from 'next/router'

export default function MemberIndex() {
  const router = useRouter()

  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/member/login')
  }

  return <></>
}
