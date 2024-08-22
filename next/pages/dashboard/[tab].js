// # dashboard的動態路由

// @ 導入模組
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import DashboardProfile from '@/components/member/dashboard/profile'
import DashboardOrder from '@/components/member/dashboard/order'
import DashboardFavorite from '@/components/member/dashboard/favorite'
import DashboardTitle from '@/components/member/dashboard/dashboardTitle'
import Nav from '@/components/Header/Header'
import Footer from '@/components/footer/footer'


// @ 預設導出
export default function DashboardIndex() {
    const router = useRouter()
    const { tab } = router.query
    const [activeTab, setActiveTab] = useState(tab || 'profile')

    useEffect(() => {
        if (tab) {
            setActiveTab(tab)
        }
    }, [tab])

    const handleTabChange = (newTab) => {
        router.push(`/dashboard/${newTab}`, undefined, { shallow: true })
    }

    return (
        <>
            {/* nav */}
            <Nav />

            {/* main */}
            <div className='main-m'>
                <div className="container-m">
                    <DashboardTitle />

                    {/* desk */}
                    <div className="d-none d-lg-block">
                        <Tabs
                            activeKey={activeTab}
                            onSelect={(k) => handleTabChange(k)}
                            id="dashboard-tabs"
                            className="mb-3 d-lg-flex d-none d-lg-block container"
                        >
                            <Tab eventKey="profile" title="個人資料">
                                <div className="tab-pane active account-content">
                                    <DashboardProfile />
                                </div>
                            </Tab>
                            <Tab eventKey="order" title="訂單查詢">
                                <div className="tab-pane active order-content">
                                    <DashboardOrder />
                                </div>
                            </Tab>
                            <Tab eventKey="coupon" title="優惠券庫">
                                {/* 優惠券內容 */}
                            </Tab>
                            <Tab eventKey="favorite" title="經典收藏">
                                <div className="tab-pane active favorite-content">
                                    <DashboardFavorite />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>

                    {/* rwd */}
                    <div className="d-block d-lg-none">
                        <Tabs
                            activeKey={activeTab}
                            onSelect={(k) => handleTabChange(k)}
                            id="dashboard-tabs-rwd"
                            className="mb-3 nav-rwd nav-tabs-rwd d-flex d-block d-lg-none"
                        >
                            <Tab eventKey="profile" title="個人資料">
                                {/* tab內容 */}
                                <div className="tab-pane  account-content">
                                    <DashboardProfile />
                                </div>
                            </Tab>
                            <Tab eventKey="order" title="訂單查詢">
                                {/* tab內容 */}
                                <div className="tab-pane  order-content">
                                    <DashboardOrder />
                                </div>
                            </Tab>
                            <Tab eventKey="coupon" title="優惠券庫">
                                {/* 優惠券內容 */}
                            </Tab>
                            <Tab eventKey="favorite" title="經典收藏">
                                {/* tab內容 */}
                                <div className="tab-pane  favorite-content">
                                    <DashboardFavorite />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer />

            {/* style */}
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