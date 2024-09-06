// # 保護路由
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const ProtectedRoute = ({ children }) => {
  const { auth, isLoading, checkAuth } = useAuth();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isLoading && !auth.isAuth) {
        await checkAuth(); // 重新檢查認證狀態
      }
      setIsChecked(true);
    };

    verifyAuth();
  }, [isLoading, auth.isAuth, checkAuth]);

  useEffect(() => {

    
    if (isChecked && !auth.isAuth) {
      router.push('/member/login');
    }
  }, [isChecked, auth.isAuth, router]);





  if (isLoading || !isChecked) {
    console.log('ProtectedRoute: Still loading');
    return (
      <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ClipLoader
          color="#851931"
          loading={isLoading || !isChecked} // 根據 isLoading 或 isChecked 來控制加載
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  // 如果用戶已登入，渲染子組件
  return auth.isAuth ? children : null;
};

export default ProtectedRoute;