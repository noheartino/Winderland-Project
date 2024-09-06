import React from 'react'
import MessageItem from './MessageItem'
import styles from "./Message.module.css"


export default function Message({sortedComments}) {
  return (
    <div className={`${styles['Message-Items']}`}>
        <MessageItem sortedComments={sortedComments}/>
    </div>
  )
}