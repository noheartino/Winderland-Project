import React, { useState, useEffect } from 'react';
import css from '@/components/cart/cart2/cartTransport.module.css';
import { useShip711StoreOpener } from '@/hooks/use-ship-711-store';

export default function CartTransport({ addressLabel = "門市選擇", hideSelectButton = false, handleTransportDataChange }) {
    const { store711, openWindow } = useShip711StoreOpener(
        'http://localhost:3005/api/shipment/711',
        { autoCloseMins: 3 }
    );

    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [pickupName, setPickupName] = useState('');
    const [pickupPhone, setPickupPhone] = useState('');

    useEffect(() => {
        if (store711 && store711.storename && store711.storeaddress) {
            setStoreName(store711.storename);
            setStoreAddress(store711.storeaddress);

            // 儲存新的門市資訊到 localStorage
            localStorage.setItem('storeName', store711.storename);
            localStorage.setItem('storeAddress', store711.storeaddress);
        }
    }, [store711]);

    // 處理輸入欄位變更
    const handlePickupNameChange = (e) => {
        setPickupName(e.target.value);
        sessionStorage.setItem('pickupName', e.target.value); // 儲存取貨姓名到 sessionStorage
    };
    
    const handlePickupPhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // 只保留數字
        setPickupPhone(value.slice(0, 10)); // 最多 10 位數
        sessionStorage.setItem('pickupPhone', value.slice(0, 10)); // 儲存取貨手機號碼到 sessionStorage
    };

    // 儲存所有資料到 sessionStorage
    useEffect(() => {
        handleTransportDataChange({
            storeName,
            storeAddress,
            pickupName,
            pickupPhone,
        });
    }, [storeName, storeAddress, pickupName, pickupPhone]);

    const clearLocalStorage = () => {
        localStorage.removeItem('storeName');
        localStorage.removeItem('storeAddress');
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            clearLocalStorage();
        };

        const handlePopState = () => {
            clearLocalStorage();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
            clearLocalStorage();
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
                            required
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
                            value={pickupName}
                            onChange={handlePickupNameChange}
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
                            value={pickupPhone}
                            maxLength="10"
                            minLength="10"
                            onChange={handlePickupPhoneChange}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
