import React from 'react'
import CommentTitle from './CommentTitle'
import Message from './Message'
import styles from "./PcComment.module.css"

export default function PcComment() {
  return (
    <>
        <div className={`container ${styles['product-comment-content']}`}>
          <CommentTitle />
          <div className={`${styles['product-comment-message']}`}>
            <Message />
          </div>
        </div>
    </>
  )
}
