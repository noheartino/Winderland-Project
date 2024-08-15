import React from "react";

export default function ArticleCRreply() {
  return (
    <>
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
                      style={{ color: "var(--wine)" }}
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
                  style={{ color: "var(--text_gray)" }}
                ></i>
              </a>
              <ul className="dropdown-menu aid-replymore-dropmenu dropdown-menu-end dropdown-menu-lg-start">
                <li>
                  <a className="dropdown-item" href="#">
                    檢舉留言
                    <i
                      className="fa-regular fa-flag ms-1"
                      style={{ color: "var(--wine)" }}
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
    </>
  );
}
