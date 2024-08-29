import React from 'react'
import Image from 'next/image'
import FavoritePCardRWD from '@/components/member/dashboard/favorite/FavoritePCardRwd'
import FavoritePCard from '@/components/member/dashboard/favorite/FavoritePCard'

export default function FavoritePrwd() {
  return (
    <>
          <span>商品收藏</span>
            <hr />

            <div className="favorite-p-group-rwd d-flex ">
            
            <FavoritePCard />

              {/* <div className="favorite-p-card-rwd ">
                <div className="favorite-p-img-rwd">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={170}
                    height={170}
                    className="favorite-p-img-rwd"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail-rwd">
                  <p className="favorite-p-name">
                    約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019
                  </p>
                  <p className="favorite-p-about">750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
              <div className="favorite-p-card-rwd">
                <div className="favorite-p-img-rwd">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={80}
                    height={80}
                    className="favorite-p-img-rwd"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail-rwd">
                  <p className="favorite-p-name">
                    約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019
                  </p>
                  <p className="favorite-p-about">750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div> */}
            </div>
    </>
  )
}
