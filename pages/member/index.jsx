import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import DashboardProfile from '@/components/member/dashboard/profile'
import DashboardOrder from '@/components/member/dashboard/order'
import DashboardFavorite from '@/components/member/dashboard/favorite'

export default function MemberIndex() {
  return (
    <>
      {/* nav */}

      <main>
        <div className="container">
          <div className="u-title d-none d-lg-block">會員中心</div>
          <div className="u-title-rwd d-block d-lg-none">會員中心</div>

          {/* desk */}
          <div>
            <Tabs
              defaultActiveKey="dashboard"
              id="dashboard-tabs"
              className="mb-3 nav-tabs d-lg-flex d-none d-lg-block"
            >
              <Tab eventKey="profile" title="個人資料">
                {/* tab內容 */}
                <div className="tab-pane active account-content">
                  <DashboardProfile />
                </div>
              </Tab>
              <Tab eventKey="order" title="訂單查詢">
                {/* tab內容 */}
                <div className="tab-pane active order-content">
                  <DashboardOrder />
                </div>
              </Tab>
              <Tab eventKey="coupon" title="優惠券庫">
                {/* 優惠券內容 */}
              </Tab>
              <Tab eventKey="favorite" title="經典收藏">
                {/* tab內容 */}
                <div className="tab-pane active favorite-content">
                  <DashboardFavorite />
                </div>
              </Tab>
            </Tabs>
          </div>

          {/* rwd */}
          <div>
            <Tabs
              defaultActiveKey="dashboard"
              id="dashboard-tabs"
              className="mb-3 nav-rwd nav-tabs-rwd d-flex d-block d-lg-none"
            >
              <Tab eventKey="profile" title="個人資料">
                {/* tab內容 */}
                <div className="tab-pane active account-content">
                  <DashboardProfile />
                </div>
              </Tab>
              <Tab eventKey="order" title="訂單查詢">
                {/* tab內容 */}
                <div className="tab-pane active order-content">
                  <DashboardOrder />
                </div>
              </Tab>
              <Tab eventKey="coupon" title="優惠券庫">
                {/* 優惠券內容 */}
              </Tab>
              <Tab eventKey="favorite" title="經典收藏">
                {/* tab內容 */}
                <div className="tab-pane active favorite-content">
                  <DashboardFavorite />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </main>

      {/* footer */}
    </>
  )
}
