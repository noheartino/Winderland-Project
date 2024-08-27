import React, { useState, useEffect } from 'react';
import css from '@/components/cart/cart2/cartTransport.module.css';
import { useShip711StoreOpener } from '@/hooks/use-ship-711-store';

export default function CartTransportM({ addressLabel = "門市選擇", hideSelectButton = false }) {
    const { store711, openWindow } = useShip711StoreOpener(
        'http://localhost:3005/api/shipment/711',
        { autoCloseMins: 3 }
    );

    // 使用 state 管理門市名稱和地址
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');

    // 當 store711 更新時，更新 state 並儲存到 sessionStorage
    useEffect(() => {
        const savedStoreName = sessionStorage.getItem('storeName') || '';
        const savedStoreAddress = sessionStorage.getItem('storeAddress') || '';
        
        setStoreName(savedStoreName);
        setStoreAddress(savedStoreAddress);

        // 如果 store711 更新，儲存新的門市資訊到 sessionStorage
        sessionStorage.setItem('storeName', store711.storename || '');
        sessionStorage.setItem('storeAddress', store711.storeaddress || '');
    }, [store711]);

    // 使用 useEffect 監聽頁面卸載事件，確保離開頁面時清除 sessionStorage
    useEffect(() => {
        const handleUnload = () => {
            console.log("Clearing session storage on unload");
            sessionStorage.removeItem('storeName');
            sessionStorage.removeItem('storeAddress');
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    // 處理頁面切換時清除 sessionStorage
    useEffect(() => {
        const handlePageNavigation = () => {
            sessionStorage.removeItem('storeName');
            sessionStorage.removeItem('storeAddress');
        };

        window.addEventListener('popstate', handlePageNavigation);

        return () => {
            window.removeEventListener('popstate', handlePageNavigation);
        };
    }, []);

    return (
        <div className={css.transportContent}>
            <div className={css.transportContent1}>
                <div className={css.transportContent2}>
                    <div>{addressLabel}</div>
                    <div>
                        <input
                            type="text"
                            className={css.transportstore}
                            value={storeName}
                            readOnly
                            placeholder="請選擇門市"
                        />
                    </div>
                </div>
                {!hideSelectButton && (
                    <div className={css.payContent2}>
                        <button
                            className={css.button}
                            onClick={openWindow}
                        >
                            選擇
                        </button>
                    </div>
                )}
            </div>
            <div className={css.transportContent1}>
                <div className={css.transportContent2}>
                    <div>取貨姓名</div>
                    <div>
                        <input
                            type="text"
                            className={css.transportname}
                            placeholder="請輸入姓名"
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
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
