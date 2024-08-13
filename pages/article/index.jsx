import ArticleCard from '@/components/article/article-index-card'
import React from 'react'

export default function Index() {
  return (
    <>
      <title>Title</title>
      {/* Required meta tags */}
      <div className="wrap">
        {/* Banner */}
        <div className="container-fluid a-banner">
          <h2>相關文章</h2>
          <h3>Aritcle</h3>
        </div>
        <div className="container mx-auto">
          <div className="a-function row m-0 mb-4">
            {/* 篩選 */}
            <div className="d-none d-lg-flex dropdown a-dropdown col-lg-2">
              <button
                className="btn btn-secondary a-sort-btn py-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                默認排序 <i className="fa-solid fa-angle-down" />
              </button>
              <ul className="dropdown-menu a-dropdown-menu">
                <li>
                  <a className="dropdown-item a-dropdown-item" href="#">
                    <i className="fa-regular fa-clock" /> 最新發布
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fa-solid fa-fire" /> 熱門文章
                  </a>
                </li>
              </ul>
            </div>
            {/* 搜尋列 */}
            <div className="d-none d-lg-block col-lg-3 a-search-block">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                type="text"
                className="a-search px-3 py-2"
                placeholder="搜尋關鍵字"
              />
            </div>
            {/* 搜尋列小 */}
            <div className="d-lg-none col-10 a-search-sm-block">
              <input
                type="text"
                className="a-search-sm px-5 py-2"
                placeholder="搜尋關鍵字"
              />
              <i className="fa-solid fa-magnifying-glass" />
            </div>
            {/* 手機側邊欄 */}
            <div className="d-lg-none col-2 a-sidebar-sm">
              <button
                className="btn smside-topbtn px-2 py-1"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasResponsive"
                aria-controls="offcanvasResponsive"
              >
                <i
                  className="fa-solid fa-filter"
                  style={{ color: '#60464c' }}
                />
              </button>
              <div
                className="a-offcanvas offcanvas offcanvas-end"
                tabIndex={-1}
                id="offcanvasResponsive"
                aria-labelledby="offcanvasResponsiveLabel"
              >
                <div className="a-offcanvas-header offcanvas-header">
                  <div className="a-offcanvas-title offcanvas-title">
                    <p className="mb-0">
                      <i
                        className="fa-solid fa-filter"
                        style={{ color: '#fff' }}
                      />
                      篩選項目
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#offcanvasResponsive"
                    aria-label="Close"
                  />
                </div>
                <div className="a-offcanvas-body offcanvas-body">
                  {/* 小篩選1 */}
                  <p className="">類型</p>
                  <div className="dropdown mb-4">
                    <button
                      className="btn btn-secondary a-sort-btn-sm"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      歷史典故 <i className="fa-solid fa-angle-down" />
                    </button>
                    <ul className="a-dropdown-menu dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fa-regular fa-clock" /> 葡萄酒小知識
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fa-solid fa-fire" /> 熱門文章
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* 小篩選2 */}
                  <p className="">發布日期</p>
                  <div className="dropdown mb-4">
                    <button
                      className="btn btn-secondary a-sort-btn-sm"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      近半年 <i className="fa-solid fa-angle-down" />
                    </button>
                    <ul className="a-dropdown-menu dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          一年前
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          本日
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* 日期 */}
                  <div className="a-date row mb-5">
                    <div className="a-date-block col">
                      <input
                        className="a-date-input py-2"
                        type="text"
                        placeholder="2024.02.01"
                      />
                    </div>
                    -
                    <div className="a-date-block col">
                      <input
                        className="a-date-input py-2"
                        type="text"
                        placeholder="2024.09.01"
                      />
                    </div>
                  </div>
                  {/* 按鈕 */}
                  <div className="row">
                    <div className="col">
                      <button className="btn py-3 a-smside-bottombtn">
                        重設
                      </button>
                    </div>
                    <div className="col">
                      <button className="btn py-3 a-smside-bottombtn">
                        送出篩選
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 主要文章內容區塊 */}
          <div className="row a-contentmain">
            {/* 側邊欄 */}
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
              <div className="a-date row mb-3">
                <div className="a-date-block col">
                  <input
                    className="a-date-input py-2"
                    type="text"
                    placeholder="2024.02.01"
                  />
                </div>
                -
                <div className="a-date-block col">
                  <input
                    className="a-date-input py-2"
                    type="text"
                    placeholder="2024.09.01"
                  />
                </div>
              </div>
              <button className="btn a-btn-select">
                進行篩選 <img src="/images/article/select.svg" alt="" />
              </button>
            </div>
            {/* 文章一格格 */}
            <div className="a-content col-lg-9 row g-3">
              {/* 文章頭條 */}
              <div className="col-9 col-lg-8">
                <div className="a-title">
                  <h3>一分鐘認識橡木桶：增添葡萄酒香氣的幕後功臣</h3>
                </div>
              </div>
              {/* 收藏 */}
              <div className="col-3 col-lg-4">
                <div className="a-collection p-2">
                  <h3>
                    <i className="fa-solid fa-bookmark" /> 我的收藏
                  </h3>
                </div>
              </div>
              {/* 文章區塊大 */}
              <ArticleCard />
              {/* 文章區塊小 */}
              <div className="col-12 col-lg-6">
                <div className="a-box">
                  <div className="a-box-img">
                    <img src="./images/article/content-pic.jpeg" alt="" />
                  </div>
                  <div className="a-box-content">
                    <p>!酒類介紹</p>
                    <h4>
                      澳洲紅酒產區葡萄酒特色介紹--巴羅莎谷紅酒 Barossa Valley
                    </h4>
                    <h5>by admin l 2024.02.10</h5>
                    <div className="a-readmore">
                      <button className="btn a-btn-content">閱讀文章</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="a-box">
                  <div className="a-box-img">
                    <img src="./images/article/content-pic.jpeg" alt="" />
                  </div>
                  <div className="a-box-content">
                    <p>!酒類介紹</p>
                    <h4>
                      澳洲紅酒產區葡萄酒特色介紹--巴羅莎谷紅酒 Barossa Valley
                    </h4>
                    <h5>by admin l 2024.02.10</h5>
                    <div className="a-readmore">
                      <button className="btn a-btn-content">閱讀文章</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 選頁 */}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
