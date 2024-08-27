import React from 'react'

export default function FavoriteAside({ onFilterChange }) {
  return (
  <>
      <aside>
          <hr />
          <ul className="list-unstyled ">
            <span>類別</span>
            <li onClick={() => onFilterChange('all')}>全部</li>
        <li onClick={() => onFilterChange('products')}>商品</li>
        <li onClick={() => onFilterChange('courses')}>課程</li>
        <li onClick={() => onFilterChange('articles')}>文章</li>

          </ul>
          <hr />
          {/* <span>日期區間</span>
          <br />
          <div className="input-date-gruop ">
            <input type="date" className="mb-3 me-3" />-
            <input type="date" className="mx-2" />
          </div>
          <br />
          <button>日期篩選</button> */}
        </aside>
  </>
  )
}
