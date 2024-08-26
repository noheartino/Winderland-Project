import React from 'react'
import styles from './event-header.module.css'
import { useRouter } from "next/router"
import Link from "next/link"

export default function EventHeader() {
    return (
        <>
            <Link className='A-rmpre' href={`/event`}>
            <div className={styles.eventHeader}>
                <div className="container">
                    <img src="/event/Frame 51.png" alt="" className={styles.eventHeader_img} />
                </div>
            </div>
            </Link>
        </>
    )
}
