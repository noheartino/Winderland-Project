import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import styles from '@/components/member/dashboard/profile/ProfileMembership.module.css'

export default function ProfileMembership() {
  const { auth } = useAuth();
  const [membershipInfo, setMembershipInfo] = useState(null);

  useEffect(() => {
    const fetchMembershipInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/member/membership-info/${auth.userData.member_level_id}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (response.ok) {
          setMembershipInfo(data.membershipInfo);
        } else {
          console.error('Failed to fetch membership info');
        }
      } catch (error) {
        console.error('Error fetching membership info:', error);
      }
    };

    if (auth.userData && auth.userData.member_level_id) {
      fetchMembershipInfo();
    }
  }, [auth.userData]);

  if (!membershipInfo) return null;

  const levelColors = {
    1: 'levelA',
    2: 'levelB',
    3: 'levelC',
    4: 'levelD'
  };

  return (
    <>
      <div className={styles.levelList}>
        <div className={`level ${auth.userData.member_level_id === 1 ? levelColors[1] : ''}`}>銅瓶</div>
        <div className={`level ${auth.userData.member_level_id === 2 ? levelColors[2] : ''}`}>銀瓶</div>
        <div className={`level ${auth.userData.member_level_id === 3 ? levelColors[3] : ''}`}>金瓶</div>
        <div className={`level ${auth.userData.member_level_id === 4 ? levelColors[4] : ''}`}>白金瓶</div>
      </div>

      <div className="levelDetail">
        <span className="span-p">{membershipInfo.name}會員優惠</span>

        <ul className='levelGift'>
          <li>生日回饋   
            <span className={`${styles.emphasis} ${styles.birthdayPoints}`}>{membershipInfo.birthday_points}</span>WPoints
          </li>
          <li>WPoints 
            <span className={`${styles.emphasis} ${styles.birthdayPoints}`}>
            {Math.floor(membershipInfo.points_reward_percentage)}
            </span>倍回饋
          </li>
          <li>每月
          <span className={`${styles.emphasis} ${styles.birthdayPoints}`}>{membershipInfo.free_coupon}</span>張自選優惠券</li>


        </ul>
      </div>
    </>
  )
}
