import React, { useEffect, useState } from "react";
import style from "@/components/member/dashboard/coupon/coupon.module.css";
import CouponCard from "./coupon/CouponCard";
import WPointShow from "./coupon/wPointShow";
import CouponRecord from "./coupon/CouponRecord";
import CouponExpired from "./coupon/CouponExpired";
import CouponStorage from "./coupon/CouponStorage";
import WPointRecord from "./coupon/WPointRecord";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import CouponPlusSm from "./coupon/CouponPlusSm";
import axios from 'axios';

export default function DashboardCoupon() {
  const router = useRouter();
  const { auth } = useAuth();
  const [userId, setUserId] = useState(null);
  const [memberLevelId, setMemberLevelId] = useState(null);
  const [freeCoupon, setfreeCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  const [coupons, setCoupons] = useState([]);
  const [userCoupons, setUserCoupons] = useState([]);
  const [userGetCoupons, setUserGetCoupons] = useState([]);
  const [userUsedCoupons, setUserUsedCoupons] = useState([]);
  const [userExpiredCoupons, setUserExpiredCoupons] = useState([]);

  const [userPoints, setUserPoints] = useState([]);
  const [memberLevelName, setMemberLevelName] = useState("");

  const [userPointsRecord, setUserPointsRecord] = useState([]);

  // // 等待獲取userId
  // useEffect(() => {
  //   // 模擬從 useAuth 中獲取 userId
  //   const fetchUserId = () => {
  //     setTimeout(() => {
  //       const id = auth.userData?.id;
  //       setUserId(id);
  //       setMemberLevelId(auth.userData?.member_level_id);
  //       setfreeCoupon(auth.userData?.free_coupon);
  //       setLoading(false);
  //     }, 1000);
  //   };

  //   fetchUserId();

  //   // 清除定時器以防止內存洩漏
  //   return () => clearTimeout();
  // }, [auth]);
  // console.log(freeCoupon)
  // useEffect(() => {
  //   if (!loading) {
  //     if (!userId | !freeCoupon | !memberLevelId) {
  //       // 如果 userId 不存在，則進行重定向
  //       // 會影響google登入，先備註起來！不用驗證了！
  //       //router.push("/member/login");
  //     }
  //   }
  // }, [userId, loading, router]);
  const [userData, setUserData] = useState({
    userId: null,
    memberLevelId: null,
    freeCoupon: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 首先獲取基本用戶數據
        const id = auth.userData?.id;
        const memberLevelId = auth.userData?.member_level_id;
        // console.log(memberLevelId)
        if (!memberLevelId) {
          throw new Error("Member level ID not found");
        }

        // 然後使用 memberLevelId 來獲取會員等級信息
        const response = await axios.get(
          `http://winderland.shop/api/member/membership-info/${memberLevelId}`
        );

        if (response.data.status === "success") {
          const { free_coupon } = response.data.membershipInfo;

          setUserData({
            userId: id,
            memberLevelId: memberLevelId,
            freeCoupon: free_coupon,
            loading: false,
            error: null,
          });
        } else {
          throw new Error("Failed to fetch membership info");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchUserData();
  }, [auth]);

  // console.log(userData)
  // 獲取全部優惠券(領取優惠券使用)
  useEffect(() => {
    // 使用 fetch 從後端 API 獲取資料
    fetch("http://winderland.shop/api/coupon")
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data); // 將資料儲存在狀態中
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });
  }, []);

  // 會員擁有的資料取用
  useEffect(() => {
    fetch(`http://winderland.shop/api/coupon/${userData.userId}`)
      .then((response) => response.json())
      .then((data) => {
        // 全部
        const userAllCoupon = data.userCoupons;
        const userGetCouponData = userAllCoupon.filter(
          (coupon) => coupon.status === "get"
        );
        const userUsedCouponData = userAllCoupon.filter(
          (coupon) => coupon.status === "used"
        );
        const userExpiredCouponData = userAllCoupon.filter(
          (coupon) => coupon.status === "expired"
        );

        // 設定 userPoints，如果為空則設置預設值
        const defaultUserPoints = {
          id: null,
          user_id: userId,
          points_balance: 0,
          last_updated: null,
        };
        const processedUserPoints = data.userPoints.length
          ? data.userPoints[0]
          : defaultUserPoints;

        // 處理日期
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          return date.toISOString().split("T")[0];
        };
        const formatMonthDay = (dateString) => {
          const date = new Date(dateString);
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${month}-${day}`;
        };
        const processedPointsData = data.pointsRecord.map((record) => ({
          ...record,
          fullDate: formatDate(record.payment_date),
          monthDay: formatMonthDay(record.payment_date),
        }));
        setUserCoupons(userAllCoupon);
        setUserGetCoupons(userGetCouponData);
        setUserUsedCoupons(userUsedCouponData);
        setUserExpiredCoupons(userExpiredCouponData);

        setUserPoints(processedUserPoints);
        setUserPointsRecord(processedPointsData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userData.userId, setUserGetCoupons]);

  // console.log(userUsedCoupons);
  // 會員等級
  useEffect(() => {
    const fetchMemberLevel = async () => {
      try {
        const response = await fetch(
          "http://winderland.shop/api/coupon/member-level",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ member_level_id: userData.memberLevelId }),
          }
        );

        const result = await response.json();

        if (response.ok && result.status === "success") {
          if (result.data.length > 0) {
            // 假設只有一筆資料，因為 member_level_id 是唯一的
            setMemberLevelName(result.data[0].name);
          } else {
            console.error("No data found for the given member_level_id");
          }
        } else {
          throw new Error(result.message || "Failed to fetch member level");
        }
      } catch (error) {
        console.error("Error fetching member level:", error);
      }
    };

    if (userData.memberLevelId) {
      fetchMemberLevel();
    }
  }, [userData.memberLevelId]);

  // 如果正在加載，顯示 loading 畫面
  if (userData.loading) {
    return (
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader
          color="#851931"
          loading={userData.loading} // 根據 loading 狀態顯示加載動畫
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <>
      <div className={`container ${style["coupon-content"]} m-0 mx-auto`}>
        {/* 優惠券倉庫 */}
        <CouponStorage
          userId={userData.userId}
          freeCoupon={userData.freeCoupon}
          memberLevelName={memberLevelName}
          userGetCoupons={userGetCoupons}
          setUserGetCoupons={setUserGetCoupons}
        />

        {/* 手機的領券的標題
        <CouponPlusSm
          userId={userData.userId}
          freeCoupon={userData.freeCoupon}
          setUserGetCoupons={setUserGetCoupons}
        /> */}

        <div className="row">
          {/* 優惠券使用紀錄 */}
          <CouponRecord userId={userData.userId} userUsedCoupons={userUsedCoupons} />

          {/* 優惠券過期紀錄 */}
          <CouponExpired
            userId={userData.userId}
            userExpiredCoupons={userExpiredCoupons}
          />
        </div>
        <hr
          className="d-none d-lg-block"
          style={{
            height: "6px",
            backgroundColor: "var(--light)",
            border: "none",
          }}
        />

        {/* wpoints */}
        {/* wpoints 2 nav */}
        <div className="wpoint-navbar mt-5 mx-3 row">
          {/* {console.log(userPoints)} */}
          <WPointShow userId={userData.userId} userPoints={userPoints} />

          {/* 會員說明的區塊 */}
          <div
            className={`${style.couponNav} d-none d-lg-block col-lg-3 ms-auto text-end`}
          >
            <a className={`${style.couponPlus}`}>白金會員回饋比率 3.5%</a>
            <div className={`${style.membership} mt-2`}>
              <p className={`${style.memberP} p-2`}>{memberLevelName}會員</p>
            </div>
          </div>
        </div>

        {/* wpoints的使用紀錄 */}
        {/* {console.log(userPointsRecord)} */}
        <div className="row">
          {userPointsRecord && userPointsRecord.length > 0 ? (
            <WPointRecord userId={userData.userId} userPointsRecord={userPointsRecord} />
          ) : (
            <p>No point records available.</p>
          )}
        </div>
      </div>
    </>
  );
}

DashboardCoupon.requireAuth = true;
