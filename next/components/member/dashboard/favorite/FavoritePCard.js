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
    
      const fetchFavorites = async () => {
        try {
          const response = await fetch('http://localhost:3005/api/favorites', {
            credentials: 'include', // 包含 cookie
          });
          if (response.ok) {
            const data = await response.json();
            setFavorites(data);
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || '獲取收藏失敗');
          }
        } catch (error) {
          console.error('獲取收藏時發生錯誤', error);
        }
      };

    return (
        <>
            <div className="favorites-list">
                {favorites.map((item) => (
                    <div className="favorite-p-card" key={item.item_id}>
                        <div className="favorite-p-img">
                            {/* <Image
                                src={`/images/member/fav-p${item.item_id}.jpg`}
                                alt=""
                                width={180}
                                height={200}
                                className="favorite-p-img"
                            /> */}
                            <i className="fa-solid fa-bookmark" />
                        </div>
                        <div className="favorite-p-detail">
                            <p>{item.product_name}/{item.years}</p>
                            <p>{item.capacity}ml&nbsp;/&nbsp;{item.country_name}</p>
                            <span>NT {item.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
