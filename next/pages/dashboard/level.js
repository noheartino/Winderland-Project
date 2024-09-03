import React from 'react'
import Nav from '@/components/Header/Header'
import Footer from '@/components/footer/footer'
import Head from "next/head";


import Lv1Card from '@/components/member/level/Lv1Card'
import Lv2Card from '@/components/member/level/Lv2Card'
import Lv3Card from '@/components/member/level/Lv3Card'
import Lv4Card from '@/components/member/level/Lv4Card'

export default function Level() {
  return (
    <>
    <Head>
        <title>醺迷仙園｜會員等級</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
    <Nav />
   
    <div className="member_levelPage_intro container">
    <div className="row introall">
        <div className="col-12 col-md-6 col-xl-4">
        <div className="levelPageTitle">會員等級說明</div>
        </div>
        <div className="col-12 col-md-6 col-xl-8 d-none d-md-block">
        <div className="levelPageTitle">獲取條件</div>
        </div>
        <div className="col-12 col-md-6 col-xl-4 mb-4">
{/* 銅瓶 */}
<Lv1Card />
        {/* <div className="levelPageBox Lv1">
            <div className="PageBoxT">銅瓶會員優惠</div>
            <div className="PageBoxC">
            <p>▪ W Point 購物0.3%回饋</p>
            <p>▪ 生日禮 W Point 100點</p>
            </div>
        </div> */}

        </div>
        <div className="col-12 col-md-6 col-xl-8">
        <div className="levelPageBoxText d-none d-md-block">註冊本站會員</div>
        <div className="levelPageBoxText BoxTextrwd d-block d-md-none mb-5">
            <div className="mb-1 BoxT">- 達成條件 -</div>
            <div className="BoxC">註冊本站會員</div>
        </div>
        </div>
        <div className="col-12 col-md-6 col-xl-4 mb-4">
        {/* 銀瓶 */}
        <Lv2Card />
        {/* <div className="levelPageBox Lv2">
            <div className="PageBoxT">銀瓶會員優惠</div>
            <div className="PageBoxC">
            <p>▪ W Point 購物1%回饋</p>
            <p>▪ 每月1張自選優惠券</p>
            <p>▪ 生日禮 W Point 600點</p>
            </div>
        </div> */}

        </div>
        <div className="col-12 col-md-6 col-xl-8">
        <div className="levelPageBoxText d-none d-md-block">
            一年內消費金額達 $12,000
        </div>
        <div className="levelPageBoxText BoxTextrwd d-block d-md-none mb-5">
            <div className="mb-1 BoxT">- 達成條件 -</div>
            <div className="BoxC">一年內消費金額達 $12,000</div>
        </div>
        </div>
        <div className="col-12 col-md-6 col-xl-4 mb-4">
        {/* 黃金瓶 */}
        <Lv3Card />
        {/* <div className="levelPageBox Lv3">
            <div className="PageBoxT">黃金瓶會員優惠</div>
            <div className="PageBoxC">
            <p>▪ W Point 購物2%回饋</p>
            <p>▪ 每月3張自選優惠券</p>
            <p>▪ 生日禮 W Point 1200點</p>
            </div>
        </div> */}
        
        </div>
        <div className="col-12 col-md-6 col-xl-8">
        <div className="levelPageBoxText d-none d-md-block">
            一年內消費金額達 $70,000
        </div>
        <div className="levelPageBoxText BoxTextrwd d-block d-md-none mb-5">
            <div className="mb-1 BoxT">- 達成條件 -</div>
            <div className="BoxC">一年內消費金額達 $70,000</div>
        </div>
        </div>
        <div className="col-12 col-md-6 col-xl-4 mb-4">
        {/* 白金瓶 */}
        <Lv4Card />
        {/* <div className="levelPageBox Lv4">
            <div className="PageBoxT">白金瓶會員優惠</div>
            <div className="PageBoxC">
            <p>▪ W Point 購物3.5%回饋</p>
            <p>▪ 每月5張自選優惠券</p>
            <p>▪ 生日禮 W Point 2000點 </p>
            </div>
        </div> */}

        </div>
        <div className="col-12 col-md-6 col-xl-8">
        <div className="levelPageBoxText d-none d-md-block">
            一年內消費金額達 $120,000
        </div>
        <div className="levelPageBoxText BoxTextrwd d-block d-md-none mb-5">
            <div className="mb-1 BoxT">- 達成條件 -</div>
            <div className="BoxC">一年內消費金額達 $120,000</div>
        </div>
        </div>
        <div className="col-12">
        <div className="splitline" />
        <div className="eventCardWarn">
            <div className="WarnT">注意事項</div>
            <div className="WarnLine">
            <div>
                ▪️
                會員升級金額計算方式：於每日結算前一天回推一年間累積實際消費金額，若有符合會員資格，將於隔日更新於會員中心並啟用升級資格。
            </div>
            </div>
            <div className="WarnLine">
            <div>
                ▪️
                續會資格計算方式：於每日前一天回推一年間累積實際消費金額，若有符合續會資格，將於到期日隔天更新於會員中心並啟用續會資格。
            </div>
            </div>
            <div className="WarnLine">
            <div>
                ▪
                生日禮於生日當月1號PM12:00自動歸戶，須於當月最後一天23:59:59前使用完畢。<br />
                ＊無消費門檻限制，限使用於商品折抵，運費除外。<br />
                ＊僅提供單筆訂單使用，不得拆分額度於不同訂單。
            </div>
            </div>
            <div className="WarnLine">
            <div>
                ▪️ Winderland保有修改方案之權利。
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    <Footer />
    </>
  )
}
