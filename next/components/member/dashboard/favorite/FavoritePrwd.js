import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FavoritePrwd.module.css'

export default function FavoritePrwd({ searchResults, searchTerm }) {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      fetchFavoriteProducts();
    }
  }, [searchTerm]);

  const fetchFavoriteProducts = async () => {
    try {
      const response = await fetch('https://winderland.shop/api/favorites/products', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.status === 'success') {
        setFavoriteProducts(data.data);
      }
    } catch (error) {
      console.error('獲取收藏商品時出錯:', error);
    }
  };

  const removeFavorite = async (productId) => {
    try {
      const response = await fetch(`https://winderland.shop/api/favorites/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setFavoriteProducts(favoriteProducts.filter(fav => fav.product_id !== productId));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || '移除收藏失敗');
      }
    } catch (error) {
      console.error('移除收藏時發生錯誤', error);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const displayProducts = searchTerm ? searchResults : favoriteProducts;

  return (
    <>
      <span>{searchTerm ? '商品收藏' : '商品收藏'}</span>
      <hr />

      {displayProducts.length === 0 ? (
        <div className={styles.noFavorites}>
          {searchTerm ? "沒有符合搜尋條件的商品收藏" : "目前還沒有任何收藏喔 .ᐟ.ᐟ.ᐟ"}
        </div>
      ) : (
        <div className={styles.favoritesGrid}>
          {displayProducts.map((product) => (
            <div key={product.product_id} className={styles.favoritePCardRwd}>
              <div className={styles.favoritePImgBox}>
                <Image
                  src={`/images/product/${product.image_path}`}
                  alt={product.product_name}
                  width={90}
                  height={90}
                  className={styles.productImage}
                />
                <i
                  className={`fa-solid fa-bookmark ${styles.bookmarkIcon}`}
                  onClick={() => removeFavorite(product.product_id)}
                />
              </div>

              <div className={styles.favoritePDetail}>
                <Link href={`/product/${product.product_id}`} className={styles.productTitleLink}>
                  <p className={styles.favoriteProductName}>
                    {product.product_name}&nbsp;・&nbsp;{product.years}
                  </p>
                </Link>

                <p>{product.capacity}ml&nbsp;/&nbsp;{product.country_name}</p>
                <div className={styles.price}>NT${formatPrice(product.price)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image'
// import FavoritePCard from '@/components/member/dashboard/favorite/FavoritePCard'

// export default function FavoritePrwd({ searchResults, searchTerm }) {
//   const [favoriteProducts, setFavoriteProducts] = useState([]);

//   useEffect(() => {
//     if (!searchTerm) {
//       fetchFavoriteProducts();
//     }
//   }, [searchTerm]);

//   const fetchFavoriteProducts = async () => {
//     try {
//       const response = await fetch('https://winderland.shop/api/favorites/products', {
//         method: 'GET',
//         credentials: 'include',
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         setFavoriteProducts(data.data);
//       }
//     } catch (error) {
//       console.error('獲取收藏商品時出錯:', error);
//     }
//   };

//   const displayProducts = searchTerm ? searchResults : favoriteProducts;

//   return (
//     <>
//            <span>{searchTerm ? '商品收藏搜尋結果' : '商品收藏'}</span>
//             <hr />

//             {displayProducts.length === 0 ? (
//         <div className="no-favorites">
//           {searchTerm ? "沒有符合搜尋條件的商品收藏 .ᐟ.ᐟ.ᐟ" : "目前還沒有任何收藏喔 .ᐟ.ᐟ.ᐟ"}
//         </div>
//       ) : (
//         <div className="favorite-p-group-rwd d-flex">
//           {displayProducts.map((product) => (
//             <FavoritePCard key={product.product_id} product={product} />
//           ))}
//         </div>
//       )}
//     </>
//   )
// }
