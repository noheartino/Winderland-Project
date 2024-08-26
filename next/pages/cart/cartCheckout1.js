import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import CartProduct from "@/components/cart/cart1/cartProduct";
import CartClass from "@/components/cart/cart1/cartClass";
import CartMoney from "@/components/cart/cart1/cartMoney";
import CartCoupon from "@/components/cart/cart1/cartCoupon";
import CartProductM from "@/components/cart/cart1/cartPorductM";
import CartClassM from "@/components/cart/cart1/cartClassM";
import CartMoneyM from "@/components/cart/cart1/cartMoneyM";
import CartCouponM from "@/components/cart/cart1/cartCouponM";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import CartZero from "@/components/cart/cartObject/cartZero";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import BounceLoader from "react-spinners/BounceLoader";

export default function CartCheckout1() {
  const { auth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const userId = auth.userData ? auth.userData.id : null; // 用户 ID
  const [allChecked, setAllChecked] = useState(false);
  const [productChecked, setProductChecked] = useState(false);
  const [classChecked, setClassChecked] = useState(false);
  const [productData, setProductData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  console.log("User ID:", userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/cart/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProductData(
            data.items.filter((item) => item.product_detail_id !== null)
          );
          setClassData(data.items.filter((item) => item.class_id !== null));
          setCoupons(data.coupons);
        } else {
          const errorData = await response.json();
          console.error("请求失败:", errorData);
        }
      } catch (error) {
        console.error("请求错误:", error);
      } finally {
        setLoading(false); // 数据加载完成
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (!loading) {
      calculateTotalAmount(productChecked, classChecked, selectedCoupon);
    }
  }, [
    productData,
    classData,
    selectedCoupon,
    productChecked,
    classChecked,
    loading,
  ]);

  const calculateTotalAmount = (isProductChecked, isClassChecked, coupon) => {
    let newTotalAmount = 0;

    if (isProductChecked) {
      productData.forEach((item) => {
        const quantity = item.product_quantity || 0;
        const productPrice =
          item.product_sale_price > 0
            ? item.product_sale_price
            : item.product_price || 0;
        newTotalAmount += productPrice * quantity;
      });
    }

    if (isClassChecked) {
      classData.forEach((item) => {
        const classPrice =
          item.class_sale_price > 0
            ? item.class_sale_price
            : item.class_price || 0;
        newTotalAmount += classPrice;
      });
    }

    let discountAmount = 0;
    if (coupon) {
      const discount = parseFloat(coupon.discount) || 0;
      discountAmount = discount > 1 ? discount : newTotalAmount * discount;
    }

    const finalAmount = Math.max(0, newTotalAmount - discountAmount);

    if (
      selectedCoupon &&
      newTotalAmount < (parseFloat(selectedCoupon.min_spend) || 0)
    ) {
      setSelectedCoupon(null);
      handleCouponChange(null);
      console.log("Total amount is less than min spend. Coupon removed.");
    }

    setTotalAmount(Math.floor(finalAmount));
  };

  const handleCouponChange = (coupon) => {
    console.log("Coupon changed:", coupon);
    setSelectedCoupon(coupon);
  };

  const handleAllCheck = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    setProductChecked(isChecked);
    setClassChecked(isChecked);
  };

  const handleProductCheck = (e) => {
    const isChecked = e.target.checked;
    setProductChecked(isChecked);
    setAllChecked(isChecked && classChecked);
  };

  const handleClassCheck = (e) => {
    const isChecked = e.target.checked;
    setClassChecked(isChecked);
    setAllChecked(productChecked && isChecked);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3005/api/cart/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedProductData = productData.filter(
          (item) => item.cart_item_id !== itemId
        );
        const updatedClassData = classData.filter(
          (item) => item.cart_item_id !== itemId
        );

        setProductData(updatedProductData);
        setClassData(updatedClassData);
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
      } else {
        const errorData = await response.json();
        console.error("无法更新数量:", errorData);
      }
    } catch (error) {
      console.error("更新数量时发生错误:", error);
    }
  };
  const override = {
    display: "block",
    margin: "0 auto",
    // borderColor: 'red',
  };

  if (loading) {
    return (
      <div>
        <BounceLoader
          color="#851931"
          loading={loading}
          cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    ); // 或者返回一個更具體的 loading 元素
  }

  if (!userId) {
    router.push("/member/login");
    return; // 防止继续执行下面的代码
  }

  return (
    <>
      <Head>
        <title>Cart2</title>
      </Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <Nav />
      {productData.length === 0 && classData.length === 0 ? (
        <CartZero />
      ) : (
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
                {/* 仅在商品或课程勾选时传递数据 */}
                <CartMoney
                  totalAmount={totalAmount}
                  selectedCoupon={selectedCoupon}
                  productData={productChecked ? productData : []}
                  classData={classChecked ? classData : []}
                  userId={userId}
                />
                <CartCoupon
                  userId={userId}
                  selectedCoupon={selectedCoupon}
                  totalAmount={totalAmount}
                  onCouponChange={handleCouponChange}
                />
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

            {/* 商品和课程部分 */}
            {productData.length > 0 && (
              <div>
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
                <CartProductM
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
                    id="classCheckM"
                    checked={classChecked}
                    onChange={handleClassCheck}
                    className="styled-checkbox"
                  />
                  <label htmlFor="classCheckM">課程商品</label>
                </div>
                <CartClassM
                  classItems={classData}
                  onRemove={handleRemoveItem}
                />
              </div>
            )}

            <div style={{ height: "150px" }}></div>

            {/* 仅在商品或课程勾选时传递数据 */}
            <CartMoneyM
              totalAmount={totalAmount}
              selectedCoupon={selectedCoupon}
              productData={productChecked ? productData : []}
              classData={classChecked ? classData : []}
              userId={userId}
            />
            <CartCouponM
              userId={userId}
              selectedCoupon={selectedCoupon}
              totalAmount={totalAmount}
              onCouponChange={handleCouponChange}
            />
            <div style={{ height: "150px" }}>
            </div>
          </div>
        </main>
      )}
      <Footer showMobileFooter={false} />
    </>
  );
}
