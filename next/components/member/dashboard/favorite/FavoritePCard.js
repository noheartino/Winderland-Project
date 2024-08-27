import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './FavoritePCard.module.css' 

export default function FavoritePCard() {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    // 格式化價格輔助函數
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

    useEffect(() => {
        fetchFavorites();
    }, []);

    // @ 獲取收藏商品
    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://localhost:3005/api/favorites/products', {
                credentials: 'include',
            });
            console.log('Response status:', response.status);
            // if (response.ok) {
            //     const data = await response.json();
            //     setFavorites(data.data);
            // } else {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || '獲取收藏失敗');
            // }
            let data;
            if (response.status === 304) {
                console.log('304 Not Modified, using cached data');
                // 如果有緩存數據，使用緩存數據
                // 這裡需要實現一個獲取緩存數據的邏輯
                data = { data: [] }; // 臨時措施，實際應該從緩存中獲取
            } else if (response.ok) {
                data = await response.json();
                console.log('Received data:', data);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (data.status === 'success') {
                setFavorites(data.data);
            } else {
                throw new Error(data.message || '獲取收藏失敗');
            }
        } catch (error) {
            console.error('獲取收藏時發生錯誤', error);
            setError(error.message);
        }
    };

    // @ 從商品收藏中移除
    const removeFavorite = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3005/api/favorites/products/${productId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                setFavorites(favorites.filter(fav => fav.product_id !== productId));
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || '移除收藏失敗');
            }
        } catch (error) {
            console.error('移除收藏時發生錯誤', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <>

            <div className={styles.favoritesList}>
                {favorites.length === 0 ? (
                    <div className={styles.noFavorites}>目前還沒有任何收藏喔 .ᐟ.ᐟ.ᐟ</div>
                ) : (
                    <div className={styles.favoritesGrid}>
                    {favorites.map((favorite) => (
                        <div key={favorite.product_id} className={styles.favoritePCard}>
                            <div className={styles.favoritePImgBox}>
                                <Image
                                    src={`/images/product/${favorite.image_path}`}
                                    alt={favorite.product_name}
                                  layout="fill"
                                    objectFit="contain"
                                    className={styles.productImage}
                                />
                                <i className={`fa-solid fa-bookmark ${styles.bookmarkIcon}`} 
                                onClick={() => removeFavorite(favorite.product_id)} 
                                style={{ cursor: 'pointer' }}
                                />
                            </div>

                            <div className={styles.favoritePDetail}>
                                <p className={styles.favoriteProductName}>{favorite.product_name}&nbsp;・&nbsp;{favorite.years}</p>
                                <p>{favorite.capacity}ml&nbsp;/&nbsp;{favorite.country_name}</p>
                                <div className={styles.price}>NT${formatPrice(favorite.price)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    )
}
