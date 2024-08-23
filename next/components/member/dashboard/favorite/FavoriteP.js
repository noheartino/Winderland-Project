import React from 'react'
import Image from 'next/image'
import FavoritePCard from './FavoritePCard' 

export default function FavoriteP() {
  return (
    <>
         <span>商品收藏</span>
            <hr />
            <div className="favorite-p-group d-flex">
              <FavoritePCard />
              <FavoritePCard />
              <FavoritePCard />
              <FavoritePCard />
            </div>
    </>
  )
}
