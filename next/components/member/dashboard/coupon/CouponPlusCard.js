import React, { useState } from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import { CiCirclePlus } from "react-icons/ci";

export default function CouponPlusCard({ coupon,
  onSelect,
  isClaimed,
  isUsed,
isSelected, }) {
  if (!coupon || !coupon.id) {
    return null;
  }
  const handleCheck = () => {
    if (isClaimed | isUsed) {
      return; // 已經領取過的優惠券不能再選
    }
    onSelect(coupon); // 呼叫父元件的 onSelect 函式
    // setIsSelected((prev) => !prev);
  };

  // const [isSelected, setIsSelected] = useState(false);
  const [isGetUsed, setIsGetUsed] = useState(false);

  // const handleClick = () => {
  //   setIsSelected((prev) => !prev);
  //   // onSelect(coupon); // 將資料加入陣列
  // };

  const getCategoryClass = (category) => {
    switch (category) {
      case "倍數折扣":
        return {
          cardClass: style.couponDiscountCard,
          categoryClass: style.couponDiscountCategory,
        };
      case "金額折扣":
        return {
          cardClass: style.couponCard,
          categoryClass: style.couponC,
        };
      default:
        return {
          cardClass: "",
          categoryClass: "",
        };
    }
  };
  const couponcss = getCategoryClass(coupon.category);

  return (
    <>
      {/* 一組優惠券 */}
      <div className={`col-12 col-lg-4 px-5 py-3`} onClick={handleCheck}>
        <div
          className={`row align-items-center py-3 ${
            couponcss.cardClass
          } ${isSelected ? style.selectedCard : ""} ${isUsed || isClaimed ? style.cantselected : ""}`}
        >
          {!isSelected && (
            <div className={`col-auto `}>
              <p
                className={`p-2 m-0 ${couponcss.categoryClass} ${isUsed || isClaimed ? style.cantselectedC : ""}`}
              >
                {coupon.category}
              </p>
            </div>
          )}
          <div className={`col p-0`}>
            <p className={`${style.couponN} m-0`}>
              {isSelected ? <CiCirclePlus style={{fontSize:"29px"}} /> : coupon.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
