// # 保護路由
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';

const ProtectedRoute = ({ children }) => {
  const { auth, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    // 可以在這裡顯示一個加載指示器
    return <div>Loading...</div>;
  }

  if (!auth.isAuth) {
    // 如果用戶未登入，重定向到登入頁面
    router.push('/member/login');
    return null;
  }

  // 如果用戶已登入，渲染子組件
  return children;
};

export default ProtectedRoute;