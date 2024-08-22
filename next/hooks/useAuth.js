// # 自定義 hook
// hook-function的集合體
// 封裝登入、登出邏輯

// @ 導入模組
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'


const useAuth = () => {
    // 取出
    const { setUser, checkAuth } = useContext(AuthContext);

    // const { setUser } = useContext( AuthContext)
    // const { token,setToken } = useContext(AuthContext)

    // * 登入邏輯
    const login = async (account, password) => {
        try {
            const url = 'http://localhost:3005/api/member/login'
            const res = await fetch(url, {
                credentials: 'include', // 設定cookie或是存取隱私資料時要加這個參數
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // 記住登入
                    account: user.account,
                    password: user.password,
                    rememberMe: rememberMe
                }),
            })

            const resData = await res.json()

            if (res.ok) {
                if (resData.status === 'success') {
                    const { accessToken } = resData.data;

                    if (accessToken) {
                        localStorage.setItem('authToken', accessToken);
                    }

                    alert('登入成功')
                    router.push('/dashboard')
                } else {
                    alert('登入失敗：' + resData.message)
                }
            } else {
                switch (res.status) {
                    case 400:
                        alert('登入失敗：缺少必要資料')
                        break
                    case 401:
                        alert('登入失敗：帳號或密碼錯誤')
                        break
                    case 404:
                        alert('登入失敗：使用者不存在')
                        break
                    default:
                        alert('登入失敗：' + (resData.message || '未知錯誤'))
                }
            }
        } catch (e) {
            console.error(e)
            alert('登入過程中發生錯誤')
        }
        // try {Ｆ
        //     const response = await fetch("http://localhost:3005/api/member/login", {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ account, password }),
        //         credentials: 'include'
        //     });

        //     const data = await response.json();

        //     if (data.status === "success") {
        //         await checkAuth(); // 重新檢查認證狀態
        //         return { success: true };
        //     } else {
        //         throw new Error(data.message);
        //     }
        // } catch (error) {
        //     console.error("Login error:", error);
        //     return { success: false, message: error.message };
        // }
    }

    // * 登出邏輯
    const logout = async () => {
        try {
            await fetch("http://localhost:3005/api/member/logout", {
                method: "GET",
                credentials: 'include'
            });
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error("Logout error:", error);
            return { success: false, message: error.message };
        }
    }

    return { login, logout }
}

// @ 預設導出
export default useAuth

