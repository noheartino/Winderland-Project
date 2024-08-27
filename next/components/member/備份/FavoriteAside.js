import React, { useState } from 'react'
import styles from './FavoriteAside.module.css'

export default function FavoriteAside({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  

  const handleCategoryChange = (category) => {
    const newCategory = category === selectedCategory ? 'all' : category
    setSelectedCategory(newCategory)
    onFilterChange(newCategory)
  }

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'products', name: '商品' },
    { id: 'courses', name: '課程' },
    { id: 'articles', name: '文章' }
  ]

  return (
  <>
     <aside className={styles.favoriteAside}>
          <hr />
          <ul className="list-unstyled ">
            <span>類別</span>
            {/* <li onClick={() => onFilterChange('all')}>全部</li>
        <li onClick={() => onFilterChange('products')}>商品</li>
        <li onClick={() => onFilterChange('courses')}>課程</li>
        <li onClick={() => onFilterChange('articles')}>文章</li> */}
        {categories.map(category => (
          <li
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`${styles.categoryItem} ${selectedCategory === category.id ? styles.selected : ''}`}
          >
            {category.name}
          </li>
        ))}

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
