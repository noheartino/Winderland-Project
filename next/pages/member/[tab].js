//  # 動態路由 

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
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
        <main className={styles.main}>
            <div className={styles.bg}>
            <Nav />
                <div className={styles.loginBox}>
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => handleTabChange(k)}
                        id="member-tabs"
                        className={styles.navTabs}
                    >
                        <Tab eventKey="login" title="會員登入" className={styles.loginTab} >
                            <LoginForm />
                        </Tab>
                        <Tab eventKey="register" title="會員註冊" className={styles.registerTab}>
                            <RegisterForm />
                        </Tab> 
                    </Tabs>
                </div>
            </div>
            <Footer />
        </main>
    )
}