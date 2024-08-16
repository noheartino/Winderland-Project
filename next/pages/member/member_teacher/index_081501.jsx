import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import DashboardProfile from '@/components/member/dashboard/profile'
import DashboardOrder from '@/components/member/dashboard/order'
import DashboardFavorite from '@/components/member/dashboard/favorite'
import DashboardTitle from '@/components/member/dashboard/dashboardTitle' 
import TabContent from '@/components/member/dashboard/TabContent'
import Nav from '@/components/Header/Header'

export default function MemberIndex() {
  const [key, setKey] = useState('profile');

  return (
    <>
      {/* nav */}
      <Nav />

      {/* main */}
      <div className='main-m '>
        <div className="container-m">
          {/* <div className="u-title d-none d-lg-block">會員中心</div>
          <div className="u-title-rwd d-block d-lg-none">會員中心</div> */}
          <DashboardTitle />

          {/* desk */}
          <div >
            <Tabs
              activeKey={key}
              onSelect={(k) => setKey(k)}
              // defaultActiveKey="profile"
              id="dashboard-tabs"
              className="mb-3 d-lg-flex d-none d-lg-block container"
            >
              <Tab eventKey="profile" title="個人資料" />
              <Tab eventKey="order" title="訂單查詢" />      
              <Tab eventKey="coupon" title="優惠券庫" />
              <Tab eventKey="favorite" title="經典收藏" />
            </Tabs>
          </div>

          {/* rwd */}
          <div className="d-block d-lg-none">
            <Tabs
              // defaultActiveKey="profile"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              id="dashboard-tabs-rwd"
              className="mb-3 nav-rwd nav-tabs-rwd d-flex d-block d-lg-none"
            >
              <Tab eventKey="profile" title="個人資料" />
              <Tab eventKey="order" title="訂單查詢" />      
              <Tab eventKey="coupon" title="優惠券庫" />
              <Tab eventKey="favorite" title="經典收藏" />
            </Tabs>
          </div>

           {/* 共用的 Tab 內容 */}
           <TabContent activeKey={key} />
        </div>
      </div>

      {/* footer */}
      <style jsx>
        {`
          * {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
        box-sizing: border-box;
        }

        html {
            width: 100%;
            height: 100%;
            font-family: Inter;
        }

        .noline {
            outline: none;
        }
                `}
      </style>

    </>
  )
}
