import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/components/cart/cart3/cartMoneyTotal.module.css';

export default function CartMoneyTotal({ userId }) {
    const router = useRouter();
    const [discountAmount, setDiscountAmount] = useState(0);
    const [pointsUsed, setPointsUsed] = useState(0);
    const [currentDate, setCurrentDate] = useState('');
    const [orderUuid, setOrderUuid] = useState('');
    const [discountedAmount, setDiscountedAmount] = useState(0);

    useEffect(() => {
        const storedPoints = sessionStorage.getItem("pointsUsed");
        const storedDiscountedAmount = parseFloat(sessionStorage.getItem('discountedAmount')) || 0;

        // 更新狀態
        setPointsUsed(JSON.parse(storedPoints));
        setDiscountedAmount(storedDiscountedAmount);

        // 獲取並格式化台灣時間
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const formattedParts = formatter.formatToParts(now);
        const year = formattedParts.find(part => part.type === 'year').value;
        const month = formattedParts.find(part => part.type === 'month').value;
        const day = formattedParts.find(part => part.type === 'day').value;
        
        const formattedDate = `${year}.${month}.${day}`;
        setCurrentDate(formattedDate);

        // 獲取最新訂單編號和優惠券折扣
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3005/api/cart/${userId}`);
                if (!response.ok) {
                    console.error('Failed to fetch:', response.statusText);
                    return;
                }
                const data = await response.json();
                console.log('Fetched order details:', data);

                if (data && data.latestOrder) {
                    setOrderUuid(data.latestOrder.order_uuid); // 提取 order_uuid
                    setDiscountAmount(data.latestOrder.coupon_amount || 0); // 使用 coupon_amount 設置 discountAmount
                } else {
                    console.error('Order UUID or Coupon Amount not found in response');
                }
            } catch (error) {
                console.error('Network error', error);
            }
        };

        fetchOrderDetails();

        // 清除點數資料
        const handleBeforeUnload = () => {
            sessionStorage.removeItem('pointsUsed');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
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
                    <div className={css.cartContentCoupon}>{orderUuid}</div>
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
