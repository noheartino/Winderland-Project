import React from 'react'
import styles from './event-header.module.css'


export default function EventHeader() {
    return (
        <>
            <div className={styles.eventHeader}>
                <div className="container">
                    <img src="/event/Frame 51.png" alt="" className={styles.eventHeader_img} />
                </div>
            </div>
        </>
    )
}
