import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import ProfileUpdateUser from "./profile/ProfileUpdateUser";
import ProfileUpdatePwd from "./profile/ProfileUpdatePwd";
import ProfileMembership from "./profile/ProfileMembership";
import ProfileUpdateUserRWD from "./profile/ProfileUpdateUserRWD";
import ProfileUpdatePwdRWD from "./profile/ProfileUpdatePwdRWD";
// import Lv1Card from '../level/Lv1Card'
// import Lv2Card from '../level/Lv2Card'
// import Lv3Card from '../level/Lv3Card'
// import Lv4Card from '../level/Lv4Card'

import Lv1Card from "@/components/member/level/Lv1Card";
import Lv2Card from "@/components/member/level/Lv2Card";
import Lv3Card from "@/components/member/level/Lv3Card";
import Lv4Card from "@/components/member/level/Lv4Card";

export default function DashboardProfile() {
  // 驗證登入
  const { auth, updateUserInfo, isLoading } = useAuth();
  const router = useRouter();

  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [key, setKey] = useState(0);

  const [formData, setFormData] = useState({
    user_name: "",
    account: "",
    gender: "",
    birthday: "",
    member_level_id: "",
    phone: "",
    address: "",
  });

  const updateAvatarUrl = useCallback(() => {
    if (auth.userData && auth.userData.avatar_url) {
      setAvatarUrl(
        `http://winderland.shop${auth.userData.avatar_url
        }?t=${new Date().getTime()}`
      );
    } else {
      setAvatarUrl("/images/member/avatar/default-avatar.jpg");
    }
  }, [auth.userData]);

  const renderMembershipCard = () => {
    switch (auth.userData.member_level_id) {
      case 1:
        return <Lv1Card />;
      case 2:
        return <Lv2Card />;
      case 3:
        return <Lv3Card />;
      case 4:
        return <Lv4Card />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isLoading && !auth.isAuth) {
      router.push("/member/login");
    } else if (auth.userData) {
      console.log("auth.userData:", auth.userData);
      setFormData({
        user_name: auth.userData.user_name || "",
        account: auth.userData.account || "",
        birthday: auth.userData.birthday || "",
        gender: auth.userData.gender || "",
        phone: auth.userData.phone || "",
        address: auth.userData.address || "",
        member_level_id: auth.userData.member_level_id || "",
        total_spending: auth.userData.total_spending || 0,
      });

      // 合併的 useEffect，更新頭像 URL
      const fetchAvatarUrl = async () => {
        try {
          const response = await fetch(
            `http://winderland.shop/api/dashboard/profile/avatar/${auth.userData.id}`
          );
          const data = await response.json();
          if (data.status === "success" && data.data.avatar_url) {
            setAvatarUrl(`http://winderland.shop${data.data.avatar_url}?t=${new Date().getTime()}`);
          } else {
            setAvatarUrl("/images/member/avatar/default-avatar.jpg");
          }
        } catch (error) {
          console.error("抓取頭像錯誤:", error);
          setAvatarUrl("/images/member/avatar/default-avatar.jpg");
        }
      };

      fetchAvatarUrl();
      updateAvatarUrl();
    }
  }, [isLoading, auth.isAuth, auth.userData, router, updateAvatarUrl]);

  if (isLoading) {
    return (
      <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ClipLoader
          color="#851931"
          loading={isLoading} // 使用 isLoading 控制加載動畫
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

  if (!auth.isAuth) {
    return null;
  }

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(
        "http://winderland.shop/api/dashboard/profile/upload-avatar",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP 錯誤！狀態碼: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === "success") {
        // 更新頭像 URL
        const newAvatarUrl = `http://winderland.shop${result.data.avatar_url}`;
        setAvatarUrl(newAvatarUrl);

        // 發送自定義事件
        const event = new CustomEvent("avatarUpdated", {
          detail: newAvatarUrl,
        });
        window.dispatchEvent(event);

        // 顯示成功提示
        await Swal.fire({
          icon: "success",
          title: "頭像更新成功",
          text: "您的頭像已成功更新。",
          confirmButtonText: "確定",
          confirmButtonColor: "#60464C",
        });
      } else {
        throw new Error(result.message || "頭像上傳失敗");
      }
    } catch (error) {
      console.error("更新頭像錯誤:", error);
      await Swal.fire({
        icon: "error",
        title: "頭像更新失敗",
        text: error.message || "更新頭像時發生錯誤。",
        confirmButtonText: "確定",
        confirmButtonColor: "#60464C",
      });
    }
  };

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error}</div>

  // @ 前端換算顯示
  // * 性別
  const genderMapping = {
    Male: "男性",
    Female: "女性",
  };
  const userGender = genderMapping[auth.userData.gender] || "其他";

  // * 歲數
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // 如果生日還沒過，年齡需要減一歲
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const userAge = calculateAge(auth.userData.birthday);

  // * 會員等級
  const membershipMapping = {
    1: "銅瓶會員",
    2: "銀瓶會員",
    3: "金瓶會員",
    4: "白金瓶會員",
  };
  const userMembership = membershipMapping[auth.userData.member_level_id];

  // * 根據會員等級決定背景樣式
  const getMembershipStyle = (level) => {
    switch (level) {
      case 1:
        return {
          background: "var(--primary)",
          color: "#FFF",
        };
      case 2:
        return {
          background:
            "linear-gradient(180deg, #E7E2D3 0%, #FFF 47.5%, #D0C7B0 100%)",
          color: "var(--text_primary, #60464C)",
        };
      case 3:
        return {
          background:
            "linear-gradient(180deg, #FCC63E 0%, #FFE7A9 47.5%, #FBC741 100%)",
          color: "var(--text_primary, #60464C)",
        };
      case 4:
        return {
          background:
            "linear-gradient(180deg, #FBE09B 0%, #FFF1CF 47.5%, #E5C369 100%)",
          border: "1px solid #FFF",
          boxShadow: "0px 0px 8.1px 1px #FFF",
          color: "var(--text_primary, #60464C)",
        };
      default:
        return {};
    }
  };

  // * 計算升級所需的消費差額
  const calculateUpgradeInfo = () => {
    if (auth.userData.member_level_id === 4) {
      return { amount: "已為最高等級會員", nextLevel: null };
    }
    if (auth.userData.next_level_entry_cumulative) {
      const difference =
        auth.userData.next_level_entry_cumulative -
        auth.userData.total_spending;
      const nextLevelId = auth.userData.member_level_id + 1;
      return {
        amount:
          difference > 0
            ? `NT$ ${Math.ceil(difference).toLocaleString()}`
            : "NT$ 0",
        nextLevel: membershipMapping[nextLevelId],
      };
    }
    return { amount: "無法計算", nextLevel: null };
  };

  const { amount: upgradeAmountDisplay, nextLevel: nextLevelName } =
    calculateUpgradeInfo();

  return (
    <>
      <>
        {/* desk */}
        <div className="container d-none d-lg-block mb-5">
          {/* 個人資料區 */}
          <section className="name-card d-flex row">
            {/* 會員資料 */}
            <div className="name col-5">
              <div className="d-flex align-item-center mt-3">
                <div className="userName">{auth.userData.user_name}</div>
              </div>
              <div
                className="membership"
                style={{
                  ...getMembershipStyle(auth.userData.member_level_id),
                  fontSize: "16px",
                  fontWeight: "400",
                  letterSpacing: "1.4px",
                }}
              >
                {userMembership}
              </div>

              <div className="userID">ID：{auth.userData.account}</div>
              <div className="userAge">
                {userGender} / {userAge}歲 / {auth.userData.birthday}
              </div>

              {/* 會員頭像 */}
              <div className="user-img">
                <Image
                  src={avatarUrl || "/images/member/avatar/default-avatar.jpg"}
                  alt="User Avatar"
                  width={130}
                  height={130}
                  className="profileAvatar"
                  style={{ borderRadius: '50%' }}
                  key={avatarUrl} // 使用 avatarUrl 作為 key
                  loader={({ src }) => src} // 自定義 loader 以避免 Next.js 的圖片優化
                  unoptimized // 禁用 Next.js 的圖片優化
                />
              </div>

              {/* 更換頭像 */}
              <label
                htmlFor="avatarUpload"
                className="avatarButton avatarbuttonOutlined"
              >
                更換頭像
              </label>
              <input
                name="avatar"
                type="file"
                id="avatarUpload"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </div>

            {/* 會員卡 */}
            <div className="membership-level d-flex  justify-content-end col-2">
              {renderMembershipCard()}
            </div>

            {/* 升級 */}
            <div className="membership-detail col-2">
              {/* <p className="membership-exp">白金會員到期日 - 2025.07.10</p> */}
              <div className="profile-total-spend">
                <p className="">
                  年度累積消費{" "}
                  <span className="total-spend-span">
                    NT${" "}
                    {Math.round(auth.userData.total_spending).toLocaleString()}
                  </span>
                </p>
                {auth.userData.member_level_id < 4 ? (
                  <p>
                    累積消費差{" "}
                    <span className="total-spend-span">
                      {upgradeAmountDisplay}
                    </span>{" "}
                    升級
                    <span className="next-level-span">{nextLevelName}</span>
                  </p>
                ) : (
                  <p>{upgradeAmountDisplay}</p>
                )}
              </div>

              <Link href="/dashboard/level">
                <div className="upgrade">升級攻略</div>
              </Link>
              {/* <div className="upgrade">升級攻略</div> */}
            </div>
          </section>
          <hr style={{ border: "3px solid var(--light)" }} />

          {/* 修改區 */}
          <div className="edit-card d-flex  ">
            <ProfileUpdateUser />
            <ProfileUpdatePwd />
          </div>
        </div>

        {/* rwd */}
        <div
          className=" d-block d-lg-none  d-fluid ms-4 "
          id="account-content-rwd"
        >
          {/* 個人資料區 */}
          <section className="name-card-rwd ">
            {/* 會員資料 */}
            <div className="d-flex profileArea">
              <div className="name-rwd">
                <div className="userName-rwd">{auth.userData.user_name}</div>

                <div className="membership-detail-rwd d-flex">
                  <div className="membership-rwd">{userMembership}</div>
                  {/* <p className="membership-exp-rwd">白金會員到期日 - 2025.07.10</p> */}
                </div>

                <div className="userID-rwd">ID：{auth.userData.account}</div>
                <div className="userAge-rwd">
                  {userGender} / {userAge}歲 / {auth.userData.birthday}
                </div>
              </div>
              <div className="user-img-rwd">
                <Image
                  src={avatarUrl || "/images/member/avatar/default-avatar.jpg"}
                  alt="User Avatar"
                  width={130}
                  height={130}
                  className="profileAvatar"
                  style={{ borderRadius: '50%' }}
                  key={avatarUrl} // 使用 avatarUrl 作為 key
                  loader={({ src }) => src} // 自定義 loader 以避免 Next.js 的圖片優化
                  unoptimized // 禁用 Next.js 的圖片優化
                />
              </div>

              {/* 更換頭像 */}
              <label
                htmlFor="avatarUpload"
                className="avatarButtonrwd avatarbuttonOutlinedrwd"
              >
                更換頭像
              </label>
              <input
                name="avatar"
                type="file"
                id="avatarUpload"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </div>
          </section>
          <hr className="hrProfile" />

          {/* 修改區 */}
          <div className="edit-card edit-card-rwd">
            <ProfileUpdateUserRWD />
            <ProfileUpdatePwdRWD />
          </div>
        </div>
      </>
    </>
  );
}
