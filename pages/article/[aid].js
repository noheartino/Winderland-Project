import React from 'react'

export default function ArticleDetail() {
  return (
    <>
      <title>文章</title>
      <div className="container">
        {/* 文章主題 */}
        {/* 最上面桌機nav */}
        <div className="aid-header d-none d-lg-block mt-5">
          <div className="article-nav row">
            <div className="aid-category col-auto">教育</div>
            <div className="aid-times col-auto">
              <img src="/images/article/times.svg" alt="" /> 半年前
            </div>
            <div className="aid-date col-auto">
              <img src="/images/article/calender.svg" alt="" /> 2024.02.05
            </div>
          </div>
          <h1 className="aid-title my-5">術語：認識最常用的葡萄酒詞彙</h1>
          <div className="aid-pic my-4">
            <img src="/images/article/AA.png" alt="" />
          </div>
        </div>
        {/* 文章內容 */}
        <div className="row mb-5">
          <main className="aid-content-area mx-auto col col-lg-8">
            {/* 桌機+手機nav */}
            <div className="aid-content-nav row my-4">
              <div className="aid-user-infoLeft col row">
                <div className="icon col-2">
                  <p>Ad</p>
                </div>
                <div className="user-name col-3">admin01</div>
                <div className="time col-7">發佈於 2024.02.05</div>
              </div>
              <div className="aid-bookmark d-none d-lg-block ms-auto col-auto">
                <i className="fa-regular fa-bookmark" />
              </div>
              <div className="aid-category d-lg-none ms-auto col-auto">教育</div>
            </div>
            <h1 className="aid-title d-lg-none">
              術語：認識最常用的葡萄酒詞彙
            </h1>
            <div className="aid-pic d-lg-none my-4">
              <img src="/images/article/AA.png" alt="" />
            </div>
            <div className="aid-content">
              <p className="">
                即便是經驗豐富的葡萄酒愛好者，談酒有時候仍然令人發憷。如果你試過由侍酒師介紹葡萄酒，你就會明白我們的意思。收斂感、單寧、酒香和香氣等，都是描述葡萄酒的一些術語，當你不瞭解時，就會一頭霧水，聽不出所以然來。
                <br />
                對個人描述葡萄酒的口感時，答案沒有對錯之分，但在葡萄酒王國，有一些專門的詞彙用來描述特定的純度、口味和質地。
                以下是認識常用葡萄酒術語的快速指南。
                <br />
              </p>
              <div className="aid-content-pic my-3">
                <img
                  src="/images/article/36f4354c96eac045775082278bf8618f.png"
                  alt=""
                />
              </div>
              <p>
                收斂性（Astringent）是指一些葡萄酒在口腔中引起粗糙、苦澀和乾緊的感覺，通常是由單寧酸
                度或兩者兼有所引起。單寧含量高的葡萄酒會導致口腔有乾澀的感覺，變得緊致，猶如飲過一杯濃
                紅茶。
                <br />
                澀感（Tannic）可不是個貶義詞。它僅僅是指充滿了單寧酸的葡萄酒，主要是由葡萄皮和梗來反
                映在味覺上的苦味、乾燥和澀味。它經常被誤解為帶有負面含義，但是要達到葡萄酒的平衡口感，
                單寧必不可少。
                <br />
                口感（Mouthfeel）是指酒入口後的感覺，可以被描述為順滑、粗糙或絲滑等。
                <br />
                醒酒（Aeration）是指讓葡萄酒與氧氣接觸一段時間，也稱之為「呼吸」。讓氧氣滲透到葡萄酒
                中，使口感更圓潤順口。
                香氣（Nose）是用來描述葡萄酒的芳香和酒香。
                <br />
                芳香（Aromas）指源自葡萄品種的香味。例如，葡萄酒的芳香可以被描述為果香、草本香或香。
                與芳香不同，酒香（Bouquet）是指釀酒過程中，由發酵和陳釀所產生的葡萄酒氣味，可以被描述
                為堅果味、香料味或木味。
                <br />
                餘味（Finish）&nbsp;是指品嚐後，餘留在口中那揮之不去的味道和質地。
                <br />
              </p>
            </div>
          </main>
        </div>
      </div>
      {/* 評論區 */}
      <div className="aid-commentArea py-5">
        <div className="container">
          <h2 className="text-center text-lg-start">留言討論 | Comment</h2>
          {/* 上排按鈕 */}
          <div className="row ac-topbtn gap-4 my-4 justify-content-lg-end justify-content-center">
            {/* 新增評論 */}
            <button className="col-auto px-5 py-2 btn addC-btn">
              攥寫評論
            </button>
          </div>

          <div className="aid-reply-area row">
            {/* 回覆區 */}
            <div className="col mb-4">
              <div className="aid-reply row">
                <div className="col-auto">
                  {/* 桌機icon */}
                  <div className="au-icon d-none d-lg-flex">
                    <p className="m-0">u1</p>
                  </div>
                  {/* 手機icon */}
                  <div className="au-icon-sm d-lg-none">
                    <p className="m-0">u1</p>
                  </div>
                </div>
                <div className="aucomment-section col">
                  <div className="aucomment-nav row align-items-center mb-2">
                    {/* 使用者 */}
                    <div className="au-name col-auto col-lg-1">
                      <h5 className="m-0">user01</h5>
                    </div>

                    <div className="col-7 col-lg-5">
                      {/* 評論的上排nav */}
                      <ul className="au-nav-items row align-items-center justify-content-center m-0 p-0">
                        {/* 樓層 */}
                        <li className="col">B1</li>
                        {/* 讚數 */}
                        <li className="col-auto">
                          <a href="">
                            <i
                              className="fa-regular fa-thumbs-up me-1"
                              style={{ color: 'var(--wine)' }}
                            />
                            <p className="d-none d-lg-inline">有幫助</p> (???)
                          </a>
                        </li>
                        {/* 回覆 */}
                        <li className="col border-0">
                          <a href="">
                            <i className="fa-solid fa-reply me-1" />
                            <p className="d-none d-lg-inline">回覆</p>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* 回覆區的more */}
                    <div className="ms-auto col-auto pe-3 dropdown aid-replymore">
                      <a
                        className="btn p-0"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i
                          className="fa-solid fa-ellipsis"
                          style={{ color: 'var(--text_gray)' }}
                        ></i>
                      </a>
                      <ul className="dropdown-menu aid-replymore-dropmenu">
                        <li>
                          <a className="dropdown-item" href="#">
                            編輯留言
                            <i className="fa-solid fa-pen ms-1"></i>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            刪除留言
                            <i
                              className="fa-regular fa-trash-can ms-1"
                              style={{ color: 'var(--wine)' }}
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* 評論內容 */}
                  <div className="aucomment p-4">
                    <p>
                      評論的出現，必將帶領人類走向更高的巔峰。雪萊講過一句值得人反覆尋思的話，道德中最大的秘密是愛。這句話決定了一切。羅斯福說過一句著名的話，有學問而無道德，如一惡漢;
                      有道德而無學問，如一鄙夫。這讓我的思緒清晰了。儘管如此，別人往往卻不這麼想。
                      每個人都不得不面對這些問題。在面對這種問題時，務必詳細考慮評論的各種可能。伯爾告訴我們，消磨時間是一種多麼勞累、多麼可怕的事情啊，這只肉眼看不見的秒針無時不在地平線下轉圈，你一再醉生夢死地消磨時間，到頭來你還得明白，它仍在繼續轉圈，無情地繼續轉圈。這段話可說是震撼了我。
                    </p>
                  </div>
                  <div className="aucomment-time my-1">
                    發佈於 2024.08.05, 14:22:25
                  </div>
                </div>
              </div>
            </div>

            {/* 回覆區的回覆 */}
            <div className="col-11 ms-auto mb-4">
              <div className="aid-reply row">
                <div className="col-auto">
                  {/* icon */}
                  <div className="au-icon-sm">
                    <p className="m-0">u1</p>
                  </div>
                </div>
                <div className="aucomment-section col">
                  <div className="aucomment-nav row align-items-center mb-2">
                    {/* 使用者 */}
                    <div className="au-name col-auto col-lg-1">
                      <h5 className="m-0">user01</h5>
                    </div>

                    <div className="col-7 col-lg-5">
                      {/* 評論的上排nav */}
                      <ul className="au-nav-items row align-items-center justify-content-center m-0 p-0">
                        {/* 樓層 */}
                        <li className="col">B1</li>
                        {/* 讚數 */}
                        <li className="col-auto">
                          <a href="">
                            <i
                              className="fa-regular fa-thumbs-up me-1"
                              style={{ color: 'var(--wine)' }}
                            />
                            <p className="d-none d-lg-inline">有幫助</p> (???)
                          </a>
                        </li>
                        {/* 回覆 */}
                        <li className="col border-0">
                          <a href="">
                            <i className="fa-solid fa-reply me-1" />
                            <p className="d-none d-lg-inline">回覆</p>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* 回覆的回覆區的more */}
                    <div className="ms-auto col-auto pe-3 dropdown aid-replymore">
                      <a
                        className="btn p-0"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i
                          className="fa-solid fa-ellipsis"
                          style={{ color: 'var(--text_gray)' }}
                        ></i>
                      </a>
                      <ul className="dropdown-menu aid-replymore-dropmenu">
                        <li>
                          <a className="dropdown-item" href="#">
                            檢舉留言
                            <i
                              className="fa-regular fa-flag ms-1"
                              style={{ color: 'var(--wine)' }}
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* 評論內容 */}
                  <div className="aucomment p-4">
                    <p>
                      評論的出現，必將帶領人類走向更高的巔峰。雪萊講過一句值得人反覆尋思的話，道德中最大的秘密是愛。這句話決定了一切。羅斯福說過一句著名的話，有學問而無道德，如一惡漢;
                      有道德而無學問，如一鄙夫。這讓我的思緒清晰了。儘管如此，別人往往卻不這麼想。
                      每個人都不得不面對這些問題。在面對這種問題時，務必詳細考慮評論的各種可能。伯爾告訴我們，消磨時間是一種多麼勞累、多麼可怕的事情啊，這只肉眼看不見的秒針無時不在地平線下轉圈，你一再醉生夢死地消磨時間，到頭來你還得明白，它仍在繼續轉圈，無情地繼續轉圈。這段話可說是震撼了我。
                    </p>
                  </div>
                  <div className="aucomment-time my-1">
                    <i className="fa-solid fa-retweet me-1"></i>
                    回覆於 2024.08.07, 17:22:25
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
