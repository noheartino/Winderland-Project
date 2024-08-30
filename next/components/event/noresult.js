import React from 'react'
import styles from './noresult.module.css'

export default function Noresult({text}) {
  return (
    <>
    <div className={styles.noresult}>
        <p className={styles.noresulttext}>{text}</p>
        <div className={styles.noresultpic}></div>
    </div>
    
    </>
  )
}
