import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swal from 'sweetalert2';

export default function ArticleListNav({ article }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if the article is already bookmarked when the component mounts
    checkBookmarkStatus();
  }, [article]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/favorites/articles', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.status === 'success') {
        setIsBookmarked(data.data.some(bookmark => bookmark.id === article.id));
      }
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const url = `http://localhost:3005/api/favorites/articles/${article.id}`;
      const method = isBookmarked ? 'DELETE' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.status === 'success') {
        setIsBookmarked(!isBookmarked);

           // 顯示 Sweet Alert 提示
           Swal.fire({
            icon: 'success',
            title: isBookmarked ? '已取消收藏' : '收藏成功',
            text: isBookmarked ? '文章已從您的收藏中移除' : '文章已添加到您的收藏',
            timer: 1500,
            showConfirmButton: false
          });
      } else {
        console.error('Error toggling bookmark:', data.message);

               // 顯示錯誤提示
               Swal.fire({
                icon: 'error',
                title: '操作失敗',
                text: '無法更改收藏狀態，請稍後再試',
                timer: 1500,
                showConfirmButton: false
              });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);

       // 顯示錯誤提示
       Swal.fire({
        icon: 'error',
        title: '操作失敗',
        text: '發生錯誤，請稍後再試',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };


  if (!article || !article.images || article.images.length === 0) {
    return null; // 或者可以返回一個預設的加載中佈局
  }
  return (
    <>
      <div className="aid-content-nav row my-4">
        <div className="aid-user-infoLeft col row">
          <div className="icon col-2">
            <p>Ad</p>
          </div>
          <div className="user-name col-3">{article.poster}</div>
          <div className="time col-7">發佈於 {article.update_date}</div>
        </div>
        <div className="aid-bookmark d-none d-lg-block ms-auto col-auto">
          {/* <i className="fa-regular fa-bookmark" /> */}
          <i 
            className={`fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark`}
            onClick={toggleBookmark}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="aid-category d-lg-none ms-auto col-auto">教育</div>
      </div>
      <h1 className="aid-title d-lg-none">{article.title}</h1>
      <div className="aid-pic d-lg-none my-4">
        {/* <img src="/images/article/AA.png" alt="" />
         */}
        <Image
          src={`http://localhost:3005/uploads/article/${article.images[0]}`} // 必須是public資料夾裡的相對路徑
          alt="Description of image"
          width={100} // 圖像寬度（必需）
          height={100} // 圖像高度（必需）
          priority
        />
      </div>
    </>
  );
}
