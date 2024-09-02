import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import FavoriteAside from '@/components/member/dashboard/favorite/FavoriteAside'
import FavoriteFilterOffcanvas from '@/components/member/dashboard/favorite/FavoriteFilterOffcanvas';
import FavoriteP from './favorite/FavoriteP'
import FavoritePrwd from './favorite/FavoritePrwd'
import FavoriteC from './favorite/FavoriteC'
import FavoriteCrwd from './favorite/FavoriteCrwd'
import FavoriteA from './favorite/FavoriteA'
import FavoriteArwd from './favorite/FavoriteArwd'

export default function DashboardFavorite() {
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState({
    products: [],
    courses: [],
    articles: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchTerm(''); // 清空搜尋詞
    setSearchResults([]); // 清空搜尋結果
  };

  const fetchSearchResults = async (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3005/api/favorites/search?term=${encodeURIComponent(term)}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.status === 'success') {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error('搜尋收藏時出錯:', error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {/* desk */}
      <div className=" container d-lg-flex  d-none d-lg-block mb-5">
        {/* 側欄 */}
        <FavoriteAside onFilterChange={handleFilterChange} />

        <div className="favorite-list mb-5">
          {(filter === 'all' || filter === 'products') && (
            <div className="favorite-p">
              <FavoriteP products={favorites.products} />
            </div>
          )}
          {(filter === 'all' || filter === 'courses') && (
            <div className="favorite-c">
              <FavoriteC courses={favorites.courses} />
            </div>
          )}
          {(filter === 'all' || filter === 'articles') && (
            <div className="favorite-a mb-5">
              <FavoriteA articles={favorites.articles} />
            </div>
          )}
        </div>
      </div>

      {/* rwd */}
      <div className="d-block d-lg-none" id="favorite-content-rwd">
        {/* 搜尋區 */}
        <div className="d-flex  align-items-center searchArea">
          <div className="search ms-4 mt-2 ">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search_icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              id="search" placeholder="搜 尋 商品／課程／文章名稱 " />
          </div>
          {/* 篩選手風琴元件 */}
          <FavoriteFilterOffcanvas />
        </div>

        {/* 收藏區 */}
  <div className="favorite-list-rwd container-fluid mb-5">
    {/* 商品收藏 */}
    <div className="favorite-p-rwd">
      <FavoritePrwd searchResults={searchResults.filter(item => item.type === 'product')} searchTerm={searchTerm} />
    </div>
    {/* 課程收藏 */}
    <div className="favorite-c-rwd">
      <FavoriteCrwd searchResults={searchResults.filter(item => item.type === 'course')} searchTerm={searchTerm} />
    </div>
    {/* 文章收藏 */}
    <div className="favorite-a mb-5">
      <FavoriteArwd searchResults={searchResults.filter(item => item.type === 'article')} searchTerm={searchTerm} />
    </div>
  </div>

      </div>
    </>
  )
}
