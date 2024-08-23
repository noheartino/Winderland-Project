import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/components/cart/cart3/cartMoneyTotal.module.css';

export default function CartMoneyTotal({ userId }) {
    const router = useRouter();
    const [discountAmount, setDiscountAmount] = useState(0);
    const [pointsUsed, setPointsUsed] = useState(0);
    const [currentDate, setCurrentDate] = useState('');
    const [orderUuid, setOrderUuid] = useState('');
    const storedPoints = sessionStorage.getItem("pointsUsed");
    const discountedAmount = parseFloat(sessionStorage.getItem('discountedAmount')) || 0;

    useEffect(() => {
        console.log('Received userId in CartMoneyTotal:', userId);

        // 從 sessionStorage 讀取資料
        const storedDiscountAmount = parseFloat(sessionStorage.getItem('discountAmount')) || 0;
        setDiscountAmount(storedDiscountAmount);

        if (storedPoints) {
            setPointsUsed(JSON.parse(storedPoints));
        } else {
            // 如果 sessionStorage 中沒有必要的數據，則導向首頁
            router.push("/");
        }

        // 獲取並格式化台灣時間
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const [{ value: year }, { value: month }, { value: day }] = formatter.formatToParts(now);
        const formattedDate = `${year}.${month}.${day}`;
        setCurrentDate(formattedDate);

        // 獲取最新訂單編號
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3005/api/cart/${userId}`);
                if (!response.ok) {
                    console.error('Failed to fetch:', response.statusText);
                    return;
                }
                const data = await response.json();
                console.log('Fetched order details:', data); // 打印數據以調試

                if (data && data.coupons && data.coupons.length > 0) {
                    setOrderUuid(data.coupons[0].order_uuid); // 從 coupons 陣列中提取 order_uuid
                } else {
                    console.error('Order UUID not found in response');
                }
            } catch (error) {
                console.error('Network error', error);
            }
        };

        fetchOrderDetails();
    }, [router, userId]);

    const distotal = Math.floor(discountAmount) + pointsUsed;

    return (
        <div className={css.cartMoneyTotal3}>
            <div className={css.cartMoneyTotalTitle3}>結帳詳情</div>
            <div className={css.cartMoneyTotalContent3}>
                <div className={css.cartContent3}>
                    <div>結帳日期</div>
                    <div>{currentDate}</div>
                </div>
                <div className={css.cartContent3}>
                    <div>訂單編號</div>
                    <div className={css.cartContentCoupon}>{orderUuid}</div> {/* 填入 orderUuid */}
                </div>
                <div className={css.cartContent3}>
                    <div>總折抵</div>
                    <div>- NT$ {distotal}</div>
                </div>
                <div className={`${css.cartContent3} ${css.cartContentTotal1}`}>
                    <div className={css.cartContentTotal1}>實付金額</div>
                    <div className={css.cartContentTotal2}>NT$ {discountedAmount}</div>
                </div>
            </div>
        </div>
    );
}
