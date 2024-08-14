import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

// -----各自主頁css檔案 start-----
import '@/styles/_member.css'
import '@/styles/Header.css'
import '@/styles/_tarot_and_course.css'
import '@/styles/_cart.css'
// -----各自主頁css檔案 end-----


// import其他套件
import { useEffect } from "react";
import { AuthProvider } from '@/hooks/use-auth'  // 管理會員狀態
import NextTopLoader from 'nextjs-toploader' //  換頁進度條－nextjs-toploanpm install nextjs-toploaderder

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  // 使用自訂在頁面層級的版面(layout)
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <AuthProvider>
      <NextTopLoader color="#fff777" />
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  )
}
