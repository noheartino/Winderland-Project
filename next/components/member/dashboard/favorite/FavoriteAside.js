import React from 'react'

export default function FavoriteAside() {
  return (
  <>
      <aside>
          <hr />
          <ul className="list-unstyled ">
            <span>類別</span>
            <li>商品</li>
            <li>課程</li>
            <li>文章</li>
            <li>全部</li>
          </ul>
          <hr />
          <span>日期區間</span>
          <br />
          <div className="input-date-gruop ">
            <input type="date" className="mb-3 me-3" />-
            <input type="date" className="mx-2" />
          </div>
          <br />
          <button>日期篩選</button>
        </aside>
  </>
  )
}
