// # context－管理全局認證狀態

// @ 導入
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
// import jwt from "jsonwebtoken"

// @ 預設導出
export const  AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    // 管理狀態變數
    // const [token, setToken] = useState(null)
    const [user, setUser] = useState(null);

    // 設定路由
    const router = useRouter()
    const loginRoute = "/member/login"
    // const protectedRoute = ["/"]

    // 監聽router變化
    // useEffect(() => {
    //     if (!user) {
    //         // 檢查當前網頁路徑
    //         if (protectedRoute.includes(router.pathname)) {
    //             // 導向頁面
    //             router.push(loginRoute)
    //         }
    //     } else {
    //         // 回到根目錄
    //         router.push("/")
    //     }
    // }, [router.isReady, router.pathname, user])

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:3005/api/dashboard/profile', {
                method: 'GET',
                credentials: 'include' // 這確保了 cookies 會被發送
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
            setUser(null);
        }
    };

    // token 變化時驗證 token
    // useEffect(() => {
    //     // 立即執行函數- (() => {})()
    //     (async () => {
    //         if (token) {
    //             let result = await checkToken(token);
    //             console.log(result);
    //             if (result.account) {
    //                 setUser(result)
    //             } else {
    //                 setUser(undefined)
    //             }
    //         }
    //     })()
    // }, [token])

    // // * status
    // useEffect(() => {
    //     const oldToken = localStorage.getItem("nextToken")
    //     console.log(oldToken);
    //     (async () => {
    //         if (oldToken) {
    //             // 宣告全域變數
    //             let newToken, error
    //             // 宣告變數
    //             const url = "http://localhost:3005/api/member/status"

    //             newToken = await fetch(url, {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: `Bearer ${oldToken}`
    //                 }
    //             }).then(res => res.json(
    //             )).then(result => {
    //                 if (result.status === "success") {
    //                     return result.token
    //                 } else {
    //                     throw new Error(result.message)
    //                 }
    //             }).catch(err => {
    //                 error = err
    //                 return undefined
    //             })
    //             // 判斷錯誤
    //             if (error) {
    //                 alert(error.message)
    //                 return;
    //             }
    //             if (newToken) {
    //                 setToken(newToken)
    //                 localStorage.setItem("nextToken", newToken)
    //             }
    //             // setUser(undefined);

    //         }
    //     })()
    // }, [])

    // 解碼 JWT token
    // const checkToken = async (token) => {
    //     const secretKey = "benbenbenIamBen"
    //     let decoded;

    //     try {
    //         decoded = await new Promise((reslove, reject) => {
    //             jwt.verify(token, secretKey, (error, data) => {
    //                 if (error) {
    //                     return reject(error)
    //                 }
    //                 reslove(data)
    //             })
    //         })
    //     } catch (err) {
    //         console.log(err);
    //         // decoded設成空物件傳出去
    //         decoded = {}
    //     }


    //     return decoded

    // }

    return (
        // 提供內容寫在value內
        <AuthContext.Provider value={{ user, setUser, checkAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


// export const useAuth = () => {
//     return useContext(AuthContext);
// };