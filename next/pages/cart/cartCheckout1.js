import React, { useState, useEffect } from "react";
import CartProduct from "@/components/cart/cart1/cartProduct"; // 引入 CartProduct 組件
import CartClass from "@/components/cart/cart1/cartClass"; // 引入 CartClass 組件
import CartMoney from "@/components/cart/cart1/cartMoney"; // 引入 CartMoney 組件
import CartCoupon from "@/components/cart/cart1/cartCoupon"; // 引入 CartCoupon 組件
import CartProductM from "@/components/cart/cart1/cartPorductM"; // 引入手機版 CartProduct 組件
import CartClassM from "@/components/cart/cart1/cartClassM"; // 引入手機版 CartClass 組件
import CartMoneyM from "@/components/cart/cart1/cartMoneyM"; // 引入手機版 CartMoney 組件
import CartCouponM from "@/components/cart/cart1/cartCouponM"; // 引入手機版 CartCoupon 組件
import Nav from '@/components/Header/Header'; // 引入導航組件
import Footer from "@/components/footer/footer"; // 引入底部組件

export default function CartCheckout1() {
    const [allChecked, setAllChecked] = useState(false); // 全選狀態
    const [productChecked, setProductChecked] = useState(false); // 商品選擇狀態
    const [classChecked, setClassChecked] = useState(false); // 課程選擇狀態

    const [productData, setProductData] = useState([]); // 商品數據狀態
    const [classData, setClassData] = useState([]); // 課程數據狀態
    const [totalAmount, setTotalAmount] = useState(0); // 新增狀態以存儲總金額

    // 當組件加載時獲取數據
    useEffect(() => {
        const userId = 3; // 假設這是用戶的 ID
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3005/api/cart/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setProductData(data.items.filter(item => item.product_detail_id !== null)); // 过滤出商品数据
                setClassData(data.items.filter(item => item.class_id !== null)); // 过滤出课程数据
                setTotalAmount(data.totalAmount); // 设置总金额
            } else {
                const errorData = await response.json();
                console.error('请求失败:', errorData);
            }
        };
        fetchData();
    }, []);

    const handleAllCheck = (e) => {
        const isChecked = e.target.checked;
        setAllChecked(isChecked); // 設置全選狀態
        setProductChecked(isChecked); // 同步商品選擇狀態
        setClassChecked(isChecked); // 同步課程選擇狀態
    };

    const handleProductCheck = (e) => {
        setProductChecked(e.target.checked); // 設置商品選擇狀態
        setAllChecked(e.target.checked && classChecked); // 根據子選項更新全選狀態
    };

    const handleClassCheck = (e) => {
        setClassChecked(e.target.checked); // 設置課程選擇狀態
        setAllChecked(productChecked && e.target.checked); // 根據子選項更新全選狀態
    };

    // 处理删除单个商品
    const handleRemoveItem = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:3005/api/cart/${itemId}`, { method: 'DELETE' });
            if (response.ok) {
                // 从状态中删除被删除的商品
                const updatedProductData = productData.filter(item => item.cart_item_id !== itemId);
                const updatedClassData = classData.filter(item => item.cart_item_id !== itemId);
    
                // 更新状态
                setProductData(updatedProductData);
                setClassData(updatedClassData);
    
                // 重新计算总金额
                let newTotalAmount = 0;
    
                // 计算商品总额
                updatedProductData.forEach(item => {
                    newTotalAmount += item.product_price * item.product_quantity;
                });
    
                // 计算课程总额
                updatedClassData.forEach(item => {
                    newTotalAmount += item.class_price; // 假设课程数量为1
                });
    
                // 更新总金额状态
                setTotalAmount(newTotalAmount);
            } else {
                const errorData = await response.json();
                console.error('无法删除物品:', errorData);
            }
        } catch (error) {
            console.error('删除物品时发生错误:', error);
        }
    };
    
    return (
        <>
            <title>Cart2</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <Nav />
            <main>
                <div className="container mb-5 d-none d-lg-block">
                    <div className="row">
                        <div className="col-7">
                            <div className="progressTitle">
                                <div className="progressText1">確認訂單</div>
                                <div className="progressText2">填寫訂單詳情</div>
                                <div className="progressText3">完成訂單</div>
                            </div>
                            <div className="progressBar">
                                <div className="progressCircle progressCircle1" />
                                <div className="progressLine progressLine1" />
                                <div className="progressCircle progressCircle2" />
                                <div className="progressLine progressLine2" />
                                <div className="progressCircle progressCircle3" />
                            </div>
                            <div className="checkAllBox">
                                <input
                                    type="checkbox"
                                    id="all"
                                    checked={allChecked}
                                    onChange={handleAllCheck}
                                    className="styled-checkbox"
                                />
                                <label htmlFor="all">全部</label>
                            </div>

                            {/* 當有商品數據時渲染商品區塊 */}
                            {productData.length > 0 && (
                                <div>
                                    <div className="checkProductBox">
                                        <input
                                            type="checkbox"
                                            id="productCheck"
                                            checked={productChecked}
                                            onChange={handleProductCheck}
                                            className="styled-checkbox"
                                        />
                                        <label htmlFor="productCheck">酒類商品</label>
                                    </div>
                                    <CartProduct cartItems={productData} onRemove={handleRemoveItem} /> {/* 传递删除逻辑 */}
                                </div>
                            )}

                            {/* 當有課程數據時渲染課程區塊 */}
                            {classData.length > 0 && (
                                <div>
                                    <div className="checkClassBox">
                                        <input
                                            type="checkbox"
                                            id="classCheck"
                                            checked={classChecked}
                                            onChange={handleClassCheck}
                                            className="styled-checkbox"
                                        />
                                        <label htmlFor="classCheck">課程商品</label>
                                    </div>
                                    <CartClass classItems={classData} onRemove={handleRemoveItem} /> {/* 传递删除逻辑 */}
                                </div>
                            )}
                        </div>
                        <div className="col-1" />
                        <div className="col-4">
                            <CartMoney totalAmount={totalAmount} />
                            <CartCoupon />
                        </div>
                    </div>
                </div>

                {/* 手機版 */}
                <div className="container d-block d-lg-none">
                    <div className="progressTitle">
                        <div className="progressText1">確認訂單</div>
                        <div className="progressText2">填寫訂單詳情</div>
                        <div className="progressText3">完成訂單</div>
                    </div>
                    <div className="progressBar">
                        <div className="progressCircle progressCircle1" />
                        <div className="progressLine progressLine1" />
                        <div className="progressCircle progressCircle2" />
                        <div className="progressLine progressLine2" />
                        <div className="progressCircle progressCircle3" />
                    </div>
                    <div className="checkAllBox">
                        <input
                            type="checkbox"
                            id="allM"
                            checked={allChecked}
                            onChange={handleAllCheck}
                            className="styled-checkbox"
                        />
                        <label htmlFor="allM">全部</label>
                    </div>
                    <div>
                        {productData.length > 0 && (
                            <div className="checkProductBox">
                                <input
                                    type="checkbox"
                                    id="productCheckM"
                                    checked={productChecked}
                                    onChange={handleProductCheck}
                                    className="styled-checkbox"
                                />
                                <label htmlFor="productCheckM">酒類商品</label>
                            </div>
                        )}
                        {productData.length > 0 && <CartProductM cartItems={productData} onRemove={handleRemoveItem} />} {/* 传递删除逻辑 */}
                    </div>
                    <div>
                        {classData.length > 0 && (
                            <div className="checkClassBox">
                                <input
                                    type="checkbox"
                                    id="classCheckM"
                                    checked={classChecked}
                                    onChange={handleClassCheck}
                                    className="styled-checkbox"
                                />
                                <label htmlFor="classCheckM">課程商品</label>
                            </div>
                        )}
                        {classData.length > 0 && <CartClassM classItems={classData} onRemove={handleRemoveItem} />} {/* 传递删除逻辑 */}
                    </div>
                    <CartCouponM />
                    <div style={{ height: "150px" }}></div> {/* 占位元素 */}
                </div>
                <CartMoneyM totalAmount={totalAmount} /> {/* 传递总金额 */}
            </main>
            <Footer showMobileFooter={false} />
        </>
    );
}
