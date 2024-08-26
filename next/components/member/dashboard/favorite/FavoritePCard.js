import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/use-auth' 
import Image from 'next/image'

export default function FavoritePCard() {
    const [favorites, setFavorites] = useState([]);
    // const { user, checkAuth } = useAuth();

    // useEffect(() => {
    //     if (user) {
    //         fetchFavorites();
    //     }
    // }, [user]);
    
      // const fetchFavorites = async () => {
      //   try {
      //     const response = await fetch('http://localhost:3005/api/favorites', {
      //       credentials: 'include', // 包含 cookie
      //     });
      //     if (response.ok) {
      //       const data = await response.json();
      //       setFavorites(data);
      //     } else {
      //       const errorData = await response.json();
      //       throw new Error(errorData.message || '獲取收藏失敗');
      //     }
      //   } catch (error) {
      //     console.error('獲取收藏時發生錯誤', error);
      //   }
      // };

    return (
        <>
            <div className="favorites-list">
            
                    <div className="favorite-p-card">
                        <div className="favorite-p-img">
                            <Image
                                src={`/images/member/fav-p1.jpg`}
                                alt=""
                                width={180}
                                height={200}
                                className="favorite-p-img"
                            />
                            <i className="fa-solid fa-bookmark" />
                        </div>
                        <div className="favorite-p-detail">
                            <p>商品名稱/年份</p>
                            <p>容量ml&nbsp;/&nbsp;國家</p>
                            <span>NT 價格</span>
                        </div>
                    </div>
            
            </div>
        </>
    )
}
