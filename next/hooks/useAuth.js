// # 自定義 hook
// hook-function的集合體
// 封裝登入、登出邏輯

// @ 導入模組
import { useContext, useState } from 'react'
import { AuthContent } from '@/context/AuthContext'


const useAuth = () => {
    // 取出
    const { setUser } = useContext(AuthContent)
    const { token,setToken } = useContext(AuthContent)

    // * 登入邏輯
    const login = async (account, password) => {
        // 宣告全域變數
        let newToken, error
        // 宣告變數
        const url = "http://localhost:3005/api/member/login"
        const formData = new FormData()
        // 插入
        formData.append("account", account)
        formData.append("password", password)

        newToken = await fetch(url, {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then(result => {
                if (result.status === "success") {
                    return result.token
                } else {
                    throw new Error(result.message)
                }
            })
            .catch(err => {
                error = err
                return undefined
            })
        console.log(token);
        if (error) {
            alert(error.message)
            return
        }
        if (newToken) {
            // 設定進去狀態
            setToken(newToken)
            localStorage.setItem("nextBenToken",newToken)
        }
    }

    // * 登出邏輯
    const logout = async () => {
        // 宣告全域變數
        let newToken, error
        // 宣告變數
        const url = "http://localhost:3005/api/member/logout"

        newToken = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json(
        )).then(result => {
            if (result.status === "success") {
                return result.token
            } else {
                throw new Error(result.message)
            }
        }).catch(err => {
            error = err
            return undefined
        })
        // 判斷錯誤
        if (error) {
            alert(error.message)
            return;
        }
        if (newToken) {
            setToken(newToken)
            localStorage.setItem("nextToken",newToken)
        }
        // setUser(undefined);


    }

    return { login, logout }
}

// @ 預設導出
export default useAuth

