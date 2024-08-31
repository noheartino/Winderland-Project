import React from 'react'
import styles from '@/components/member/dashboard/order/Pagination.module.css'


const Pagination = ({ ordersPerPage, totalOrders, paginate, currentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className={styles.pagination}>
      <button 
        onClick={() => paginate(1)} 
        className={`${styles.pageButton} ${styles.firstPageButton}`}
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      <button 
        onClick={() => paginate(currentPage - 1)} 
        className={`${styles.pageButton} ${styles.prevPageButton}`}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`${styles.pageButton} ${currentPage === number ? styles.currentPage : ''}`}
        >
          {number}
        </button>
      ))}
      <button 
        onClick={() => paginate(currentPage + 1)} 
        className={`${styles.pageButton} ${styles.nextPageButton}`}
        disabled={currentPage === pageNumbers.length}
      >
        {'>'}
      </button>
      <button 
        onClick={() => paginate(pageNumbers.length)} 
        className={`${styles.pageButton} ${styles.lastPageButton}`}
        disabled={currentPage === pageNumbers.length}
      >
        {'>>'}
      </button>
    </nav>
  )
}


export default Pagination
