import React from 'react'
import ArticleDateSearch from './article-date-search'

export default function ArticleSidebar() {
  return (
    <>
     <div className="d-none d-lg-block a-sidebar col-2">
              <ul>
                類型
                <li>
                  <a href="">歷史典故</a>
                </li>
                <li>
                  <a href="">酒類介紹</a>
                </li>
                <li>
                  <a href="">教育</a>
                </li>
                <li>
                  <a href="">知識</a>
                </li>
                <li>
                  <a href="">冷門知識</a>
                </li>
                <li>
                  <a href="">趣味</a>
                </li>
                <li>
                  <a href="">新奇</a>
                </li>
                <li>
                  <a href="">感動</a>
                </li>
              </ul>
              <ul>
                發布日期
                <li>全部</li>
                <li>本日</li>
                <li>本週</li>
                <li>本月</li>
                <li>近半年</li>
                <li>近一年</li>
                <li>一年以上</li>
              </ul>
              {/* 日期 */}
              <ArticleDateSearch />
              <button className="btn a-btn-select">
                進行篩選 <img src="/images/article/select.svg" alt="" />
              </button>
            </div> 
    </>
  )
}
