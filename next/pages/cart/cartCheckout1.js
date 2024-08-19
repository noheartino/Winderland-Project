import React, { useState, useEffect } from "react";
import CartProduct from "@/components/cart/cart1/cartProduct"; // 引入 CartProduct 組件
import CartClass from "@/components/cart/cart1/cartClass"; // 引入 CartClass 組件
import CartMoney from "@/components/cart/cart1/cartMoney"; // 引入 CartMoney 組件
import CartCoupon from "@/components/cart/cart1/cartCoupon"; // 引入 CartCoupon 組件
import CartProductM from "@/components/cart/cart1/cartPorductM"; // 引入手機版 CartProduct 組件
import CartClassM from "@/components/cart/cart1/cartClassM"; // 引入手機版 CartClass 組件
import CartMoneyM from "@/components/cart/cart1/cartMoneyM"; // 引入手機版 CartMoney 組件
import CartCouponM from "@/components/cart/cart1/cartCouponM"; // 引入手機版 CartCoupon 組件
import Nav from "@/components/Header/Header"; // 引入導航組件
import Footer from "@/components/footer/footer"; // 引入底部組件

export default function CartCheckout1() {
  const userId = 3; // 假设的用户 ID
  const [allChecked, setAllChecked] = useState(false); // 全选状态
  const [productChecked, setProductChecked] = useState(false); // 商品选择状态
  const [classChecked, setClassChecked] = useState(false); // 课程选择状态
  const [productData, setProductData] = useState([]); // 商品数据状态
  const [classData, setClassData] = useState([]); // 课程数据状态
  const [totalAmount, setTotalAmount] = useState(0); // 总金额
  const [coupons, setCoupons] = useState([]); // 储存优惠券
  const [selectedCoupon, setSelectedCoupon] = useState(null); // 储存选择的优惠券

  // 当组件加载时获取数据
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3005/api/cart/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProductData(
          data.items.filter((item) => item.product_detail_id !== null)
        ); // 过滤出商品数据
        setClassData(data.items.filter((item) => item.class_id !== null)); // 过滤出课程数据
        setCoupons(data.items.flatMap((item) => item.coupons)); // 储存用户的优惠券
        calculateTotalAmount(data.items); // 计算总金额
      } else {
        const errorData = await response.json();
        console.error("请求失败:", errorData);
      }
    };
    fetchData();
  }, [userId]);

  // 计算总金额
  const calculateTotalAmount = () => {
    let newTotalAmount = 0;

    // 计算商品金额
    if (productChecked) {
      productData.forEach((item) => {
        const quantity = item.product_quantity || 0;
        const productPrice = item.product_price || 0;
        newTotalAmount += productPrice * quantity;
      });
    }

    // 计算课程金额
    if (classChecked) {
      classData.forEach((item) => {
        const classPrice = item.class_price || 0;
        newTotalAmount += classPrice;
      });
    }

    // 优惠计算
    let discountAmount = 0; // 初始化优惠金额
    if (selectedCoupon) {
      const discount = parseFloat(selectedCoupon.discount) || 0; // 确保为有效数值
      if (discount > 1) {
        discountAmount += discount; // 现金折扣
      } else {
        discountAmount += newTotalAmount * discount; // 比例折扣
      }
    }

    const finalAmount = Math.max(0, newTotalAmount - discountAmount); // 确保不为负
    setTotalAmount(Math.floor(finalAmount)); // 更新金额状态
  };

  const handleCouponChange = (coupon) => {
    setSelectedCoupon(coupon); // 更新选中的优惠券
    calculateTotalAmount(); // 重新计算金额
  };

  const handleAllCheck = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked); // 设置全选状态
    setProductChecked(isChecked); // 同步商品选择状态
    setClassChecked(isChecked); // 同步课程选择状态

    // 一次性更新金额
    calculateTotalAmount();
  };

  const handleProductCheck = (e) => {
    const isChecked = e.target.checked;
    setProductChecked(isChecked); // 设置商品选择状态
    setAllChecked(isChecked && classChecked); // 更新全选状态
    calculateTotalAmount(); // 仅更新金额
  };

  const handleClassCheck = (e) => {
    const isChecked = e.target.checked;
    setClassChecked(isChecked); // 设置课程选择状态
    setAllChecked(productChecked && isChecked); // 更新全选状态
    calculateTotalAmount(); // 更新金额
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3005/api/cart/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // 从状态中删除被删除的商品
        const updatedProductData = productData.filter(
          (item) => item.cart_item_id !== itemId
        );
        const updatedClassData = classData.filter(
          (item) => item.cart_item_id !== itemId
        );

        // 更新状态
        setProductData(updatedProductData);
        setClassData(updatedClassData);

        // 重新计算总金额
        calculateTotalAmount(updatedProductData.concat(updatedClassData));
      } else {
        const errorData = await response.json();
        console.error("无法删除物品:", errorData);
      }
    } catch (error) {
      console.error("删除物品时发生错误:", error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:3005/api/cart/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_quantity: newQuantity }),
      });

      if (response.ok) {
        setProductData((prevData) =>
          prevData.map((item) =>
            item.cart_item_id === itemId
              ? { ...item, product_quantity: newQuantity }
              : item
          )
        );
        // 更新数量后重新计算金额
        calculateTotalAmount();
      } else {
        const errorData = await response.json();
        console.error("无法更新数量:", errorData);
      }
    } catch (error) {
      console.error("更新数量时发生错误:", error);
    }
  };

  return (
    <>
      <title>Cart2</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
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

              {/* 商品和课程部分 */}
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
                  <CartProduct
                    cartItems={productData}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                </div>
              )}
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
                  <CartClass
                    classItems={classData}
                    onRemove={handleRemoveItem}
                  />
                </div>
              )}
            </div>
            <div className="col-1" />
            <div className="col-4">
              <CartMoney totalAmount={totalAmount} coupons={coupons} />{" "}
              {/* 傳遞總金額和優惠券 */}
              <CartCoupon
                userId={userId}
                onCouponChange={handleCouponChange}
              />{" "}
              {/* 傳遞優惠券變更函數 */}
            </div>
          </div>
        </div>

        {/* 手机版 */}
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
            {productData.length > 0 && (
              <CartProductM
                cartItems={productData}
                onRemove={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            )}
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
            {classData.length > 0 && (
              <CartClassM classItems={classData} onRemove={handleRemoveItem} />
            )}
          </div>
          <CartCouponM />
          <div style={{ height: "150px" }}></div> {/* 占位元素 */}
        </div>
        <Footer showMobileFooter={false} />
      </main>
    </>
  );
}
