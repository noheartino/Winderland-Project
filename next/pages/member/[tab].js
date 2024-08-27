//  # 動態路由 

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import { Tab, Tabs } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginForm from '@/components/member/LoginForm'
import RegisterForm from '@/components/member/RegisterForm'
import styles from '@/components/member/member.module.css'
import Nav from '@/components/Header/Header'
import Footer from '@/components/footer/footer'

export default function MemberPage() {
    const router = useRouter()
    const { tab } = router.query
    const [activeTab, setActiveTab] = useState(tab)

    useEffect(() => {
        if (tab) {
            setActiveTab(tab)
        }
    }, [tab])

    const handleTabChange = (newTab) => {
        router.push(`/member/${newTab}`, undefined, { shallow: true })
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.bg} >
                    <Nav />

                    {/* desk */}
                    <div className={`${styles.loginBox} d-none d-lg-block`}>
                        <ul className="nav nav-tabs" id="member-tabs" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('login')}
                                >
                                    會員登入
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('register')}
                                >
                                    會員註冊
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="member-tabContent">
                            <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}>
                                <LoginForm />
                            </div>
                            <div className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''}`}>
                                <RegisterForm />
                            </div>
                        </div>
                    </div>

                    {/* rwd */}
                    <div className={` d-block d-lg-none`}>
                        <ul className="nav nav-tabs nav-tabs-rwd" id="member-tabs-rwd" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('login')}
                                >
                                    會員登入
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('register')}
                                >
                                    會員註冊
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="member-tabContent-rwd">
                            <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}>
                                <LoginForm />
                            </div>
                            <div className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''}`}>
                                <RegisterForm />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </main>

            <style jsx>
            {`
                    .main-m {
                        width: 100%;
                        height: 100%;
                        color: var(--text_primary, #60464C);
                        font-size: 24px;
                        font-weight: 400;
                        line-height: normal;
                    }
                    .container-m {
                        margin-top: 46px;
                    }
                    .u-title {
                        font-size: 32px;
                        font-weight: 700;
                        line-height: 38.73px;
                        text-align: left;
                        color: var(--text_primary);
                        margin-bottom: 30px;
                    }
                    .u-title-rwd {
                        font-size: 22px;
                        font-weight: 700;
                        line-height: 38.73px;
                        text-align: left;
                        color: var(--text_primary);
                        margin-bottom: 30px;
                        margin-left: 25px;
                    }
                    .nav-tabs {
                        border: none;
                        width: 100%;
                        justify-content: center;
                        color: var(--purple);
                        border-bottom: 10px solid var(--light);
                        white-space: nowrap;
                        margin-bottom: 25px;
                       
                    }
                    .nav-link {
                        font-size: 28px;
                        width: 100%;
                        appearance: none;
                        border: none;
                        background: none;
                        margin: 0;
                        position: relative;
                        display: inline-block;
                        font-size: 15px;
                        margin-top: 10px;
                        margin-right: 45px;
                   
                        color: var(--purple);
                        font-weight: 700;
                     
                        letter-spacing: 2px;
                    }
                    .nav-link::after {
                        content: '';
                        position: absolute;
                        left: 0;
                        bottom: -10px;
                        background-color: transparent;
                        transition: background-color 0.3s;
                    }
                    .nav-link:hover,
                    .nav-link.active {
                        color: var(--purple);
                    }
                    .nav-link:hover::after,
                    .nav-link.active::after {
                        color: var(--purple);
                        border-bottom: 10px solid var(--purple);
                        width: 100%;
                    }
                    .nav-tabs-rwd {
                        width: 100%;
                        margin-bottom: 20px;
                        padding: 10px;
                        border-bottom: 5px solid var(--light);
                        list-style: none;
                    }
                    .nav-tabs-rwd .nav-link {
                        font-size: 12px;
                        letter-spacing: 1.8px;
                    }
                    .nav-tabs-rwd .nav-link::after {
                        bottom: -18px;
                    }
                    .nav-tabs-rwd .nav-link:hover::after,
                    .nav-tabs-rwd .nav-link.active::after {
                        border-bottom: 5px solid var(--purple);
                        left: -10px;
                        width: 170%;
                    }
                `}</style>
        </>
    )
}