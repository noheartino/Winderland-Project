import React, { useState, useEffect } from "react";
import css from '@/components/cart/cart2/cartTransport.module.css';

export default function CartTransportBlackCat({ addressLabel = "地址", onClear, onTransportBlackCatDataChange }) {
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (onClear) {
            onClear(); // 呼叫父組件的清空函數
        }
    }, [onClear]);

    useEffect(() => {
        // 初始化時讀取 sessionStorage 的資料
        const storedData = JSON.parse(sessionStorage.getItem('transportBlackCatData')) || {};
        setAddress(storedData.address || '');
        setName(storedData.name || '');
        setPhone(storedData.phone || '');
    }, []);

    useEffect(() => {
        // 當資料變更時儲存到 sessionStorage 並傳遞給父組件
        const data = { address, name, phone };
        sessionStorage.setItem('transportBlackCatData', JSON.stringify(data));
        if (onTransportBlackCatDataChange) {
            onTransportBlackCatDataChange(data); // 將資料傳遞給父組件
        }
    }, [address, name, phone]);

    useEffect(() => {
        // 清除 sessionStorage 中的資料
        const clearData = () => {
            sessionStorage.removeItem('transportBlackCatData');
        };

        // 註冊頁面 unload 事件和 popstate 事件的監聽器
        window.addEventListener('beforeunload', clearData);
        window.addEventListener('popstate', clearData);

        // 在元件卸載時清除事件監聽器
        return () => {
            window.removeEventListener('beforeunload', clearData);
            window.removeEventListener('popstate', clearData);
        };
    }, []);

    // 處理電話欄位變更
    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // 只保留數字
        setPhone(value.slice(0, 10)); // 最多 10 位數
    };

    return (
        <div className={css.transportContent}>
            <div className={css.transportContent1}>
                <div className={css.transportContent2}>
                    <div>{addressLabel}</div>
                    <div>
                        <input
                            type="text"
                            className={css.transportstore}
                            placeholder="請輸入地址"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className={css.transportContent1}>
                <div className={css.transportContent2}>
                    <div>取貨姓名</div>
                    <div>
                        <input
                            type="text"
                            className={css.transportname}
                            placeholder="請輸入姓名"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <div>取貨手機號碼</div>
                    <div>
                        <input
                            type="text"
                            className={css.transportphone}
                            placeholder="請輸入手機號碼"
                            value={phone}
                            maxLength="10"
                            minLength="10"
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
