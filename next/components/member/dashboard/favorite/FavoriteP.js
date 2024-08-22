import React from 'react'
import Image from 'next/image'

export default function FavoriteP() {
  return (
    <>
         <span>商品收藏</span>
            <hr />
            <div className="favorite-p-group d-flex">
              <div className="favorite-p-card">
                <div className="favorite-p-img">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={170}
                    height={170}
                    className="favorite-p-img"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail">
                  <p>約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019</p>
                  <p>750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
              <div className="favorite-p-card">
                <div className="favorite-p-img">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={170}
                    height={170}
                    className="favorite-p-img"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail">
                  <p>約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019</p>
                  <p>750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
              <div className="favorite-p-card">
                <div className="favorite-p-img">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={170}
                    height={170}
                    className="favorite-p-img"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail">
                  <p>約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019</p>
                  <p>750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
              <div className="favorite-p-card">
                <div className="favorite-p-img">
                  <Image
                    src="/images/member/fav-p1.jpg"
                    alt=""
                    width={268}
                    height={268}
                    className="favorite-p-img"
                  />
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div className="favorite-p-detail">
                  <p>約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019</p>
                  <p>750ml&nbsp;/&nbsp;法國</p>
                  <span>NT $7,920</span>
                </div>
              </div>
            </div>
    </>
  )
}
