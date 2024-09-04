import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import styles from '@/components/member/dashboard/favorite/FavoriteA.module.css';

export default function FavoriteArwd({ searchResults, searchTerm }) {
  const [favorites, setFavorites] = useState([])
  const { auth } = useAuth()

  useEffect(() => {
    if (auth.isAuth && !searchTerm) {
      fetchFavorites()
    }
  }, [auth.isAuth, searchTerm])

  // @ 獲取收藏文章
  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/favorites/articles', {
        method: 'GET',
        credentials: 'include',
      })
      const data = await response.json()
      if (data.status === 'success') {
        setFavorites(data.data)
      }
    } catch (error) {
      console.error('獲取收藏時出錯:', error)
    }
  }

  // @ 移除收藏文章
  const removeFavorite = async (articleId) => {
    try {
      const response = await fetch(`http://localhost:3005/api/favorites/articles/${articleId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await response.json()
      if (data.status === 'success') {
        fetchFavorites() // 刷新列表
      }
    } catch (error) {
      console.error('移除收藏時出錯:', error)
    }
  }

  const displayArticles = searchTerm ? searchResults : favorites;

  return (
    <>
      <span>文章收藏</span>
      <hr />
      {/* 空收藏庫邏輯 */}
      {displayArticles.length === 0 ? (
        <div className="no-favorites">
          {searchTerm ? "沒有符合搜尋條件的文章收藏" : "目前還沒有任何收藏喔 .ᐟ.ᐟ.ᐟ"}
        </div>
      ) : (
        <div className="favorite-a-group">

          {displayArticles.map((article) => (

            <div key={article.id} className="favorite-a-card d-flex">
              <Image
                src={article.image_path ? `http://localhost:3005/uploads/article/${article.image_path}` : "/images/member/fav-a1.jpeg"}
                alt={article.title || article.name}
                width={90}
                height={90}
                className="favorite-a-img"
              />
              <div className="favorite-a-detail">
                <div className="favorite-a-detail-title d-flex">
                  <div className="a-category">⬩{article.category}</div>
                  <svg
                    className="svg-bookmark"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={25}
                    viewBox="0 0 20 25"
                    fill="none"
                    onClick={() => removeFavorite(article.id)}
                  >
                    <path
                      d="M0.500008 22.1646V22.1635V4.70239C0.502225 3.57488 0.91311 2.50224 1.63069 1.71736C2.34693 0.93399 3.30764 0.502366 4.29948 0.5H15.7005C16.6924 0.502366 17.6531 0.93399 18.3693 1.71736C19.087 2.50235 19.4979 3.57518 19.5 4.70286V22.1635V22.1642C19.5006 22.606 19.3884 23.0366 19.1793 23.4072L19.1793 23.4073C18.9704 23.7777 18.6748 24.0707 18.3306 24.2589L18.3306 24.2589C17.9871 24.4468 17.6061 24.5245 17.2294 24.487L17.2293 24.487C16.8524 24.4495 16.4877 24.2975 16.1771 24.0418L16.1762 24.0411L10.818 19.6517L10.8161 19.6502C10.5861 19.4635 10.3008 19.3582 10.0022 19.3582C9.70358 19.3582 9.41835 19.4635 9.1883 19.6502L9.1864 19.6517L3.82376 24.046L3.82324 24.0464C3.51224 24.3019 3.14727 24.4538 2.77006 24.491C2.39304 24.5282 2.01192 24.4501 1.66831 24.2618C1.32407 24.0731 1.02849 23.7796 0.819726 23.4088C0.610839 23.0377 0.498977 22.6067 0.500008 22.1646Z"
                      fill="#FF4F4F"
                      stroke="white"
                    />
                  </svg>
                </div>
                <Link href={`/article/${article.id}`} className={styles.articleTitleLink}>
                  <div className={styles.articleTitle}>
                    {article.title || article.name}
                  </div>
                </Link>
                <div className='favoritePoster' >by {article.poster} l {new Date(article.update_time).toLocaleDateString()}</div>
              </div>
            </div>

          ))}
        </div>
      )}
    </>
  )
}
