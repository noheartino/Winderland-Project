import React from 'react'

export default function ArticleIndexCard() {
  return (
    <>
      <div className="col-12 col-lg-12">
        <div className="a-box">
          <div className="a-box-img">
            <img src="./images/article/content-pic.jpeg" alt="" />
          </div>
          <div className="a-box-content">
            <p>酒類介紹</p>
            <h4>澳洲紅酒產區葡萄酒特色介紹--巴羅莎谷紅酒 Barossa Valley</h4>
            <h5>by admin l 2024.02.10</h5>
            <div className="a-readmore">
              <button className="btn a-btn-content">閱讀文章</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
