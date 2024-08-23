import React from 'react'

export default function Course() {
  return (
    <>
  <title>Title</title>
  {/* Required meta tags */}
  <meta charSet="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  <div className="tarot_wrap">
    <header></header>
    <div className="container-fluid px-0 tarot-area py-5">
      {/* Ask modal start */}
      <div
        className="modal fade w-100"
        id="askArea"
        tabIndex={-1}
        aria-labelledby="askAreaLabel"
        aria-hidden="true"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          className="modal-dialog w-100"
          style={{ height: "100vh", width: "100vw", maxWidth: "none" }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh", width: "100vw" }}
          >
            <div className="tarot-quest-area row justify-content-center align-items-center spac-1">
              <div
                className="col-auto bg-white rounded-4 p-3 pt-5 position-relative"
                id="tarot-quest-inner"
              >
                <div
                  className="bg-white position-absolute py-1 px-3"
                  id="tarot-quest-label"
                >
                  <h6 className="spac-1">您想詢問什麼呢?</h6>
                </div>
                <div className="row flex-wrap gap-5 row-gap-4 px-3 my-3 mb-5 justify-content-center mx-4">
                  <button className="col-auto btn btn-sec-blue rounded-4 py-2 px-4 pe-auto">
                    <h5 className="px-0 py-1 px-1 m-0 spac-1">金錢</h5>
                  </button>
                  <button className="col-auto btn btn-sec-blue rounded-4 py-2 px-4 pe-auto">
                    <h5 className="px-0 py-1 px-1 m-0 spac-1">愛情/戀愛</h5>
                  </button>
                  <button className="col-auto btn btn-sec-blue rounded-4 py-2 px-4 pe-auto">
                    <h5 className="px-0 py-1 px-1 m-0 spac-1">事業/工作</h5>
                  </button>
                  <button className="col-auto btn btn-sec-blue rounded-4 py-2 px-4 pe-auto">
                    <h5 className="px-0 py-1 px-1 m-0 spac-1">學業</h5>
                  </button>
                  <button className="col-auto btn btn-sec-blue rounded-4 py-2 px-4 pe-auto">
                    <h5 className="px-0 py-1 px-1 m-0 spac-1">親子感情</h5>
                  </button>
                  <button className="col-auto btn btn-sec-blue rounded-4 py-2 px-4 pe-auto">
                    <h5 className="px-0 py-1 px-1 m-0 spac-1">健康</h5>
                  </button>
                  <button className="col-auto btn btn-sec-blue rounded-4 py-2 px-4 pe-auto">
                    <h5 className="px-0 py-1 px-1 m-0 spac-1">置產</h5>
                  </button>
                  <button className="col-auto btn btn-sec-blue rounded-4 py-2 px-4 pe-auto">
                    <h5 className="px-0 py-1 px-1 m-0 spac-1">生育</h5>
                  </button>
                </div>
                <div className="row gap-5 row-gap-4 my-4 px-3 justify-content-center">
                  <h6 className="px-0 py-1 px-1 m-0 text-wrap text-center mb-5 spac-1">
                    請選擇一項，並在抽牌時在心裡默念您的問題
                  </h6>
                </div>
                <div className="row gap-5 row-gap-4 mt-3 justify-content-between">
                  <button
                    className="btn btn-white rounded-5 py-2 px-4"
                    data-bs-dismiss="modal"
                  >
                    <h5 className="col-auto px-0 py-1 px-1 m-0 text-wrap text-center d-inlineblock pe-auto">
                      <strong>
                        <i className="fa-solid fa-angles-left me-1" />
                        返回
                      </strong>
                    </h5>
                  </button>
                  <button
                    className="btn btn-white-to-wine rounded-5 py-2 px-4 pe-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#remindArea"
                    data-bs-dismiss="modal"
                  >
                    <h5 className="col-auto px-0 py-1 px-1 m-0 text-wrap text-center">
                      <strong>
                        選擇完成
                        <i className="fa-solid fa-angles-right ms-1" />
                      </strong>
                    </h5>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Ask modal end */}
      {/* remind modal start */}
      <div
        className="modal fade w-100"
        id="remindArea"
        tabIndex={-1}
        aria-labelledby="remindAreaLabel"
        aria-hidden="true"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          className="modal-dialog w-100"
          style={{ height: "100vh", width: "100vw", maxWidth: "none" }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh", width: "100vw" }}
          >
            <div className="tarot-quest-area row justify-content-center align-items-center spac-1">
              <div
                className="col-auto bg-white rounded-4 p-3 pt-5 position-relative"
                id="tarot-quest-inner"
              >
                <div
                  className="bg-white position-absolute py-1 px-3"
                  id="tarot-quest-label"
                >
                  <h6 className="spac-1">注意事項</h6>
                </div>
                <div className="row my-4">
                  <p className="px-0 py-1 px-3 m-0 text-wrap mb-5 spac-1 lh-2">
                    親愛的使用者，
                    <br />
                    <br />
                    感謝您使用我們的酒相占星服務，在使用前，請讓我們為您說明本次占星的注意事項。
                    <br />
                  </p>
                  <ul className="ms-3">
                    <li>
                      參考建議&nbsp;本次占星將使用22張大阿克納塔羅牌洗牌後提供您挑選，請在洗牌完成後，依照您的直覺抽取三張牌，我們會依您抽取的結果提供建議。請不要將其視為真實的預言，或是現實中唯一的決策依據。
                    </li>
                    <li>
                      謹慎使用&nbsp;請注意，線上塔羅無法考量您的個人情況及環境給出客觀的建議，請將解牌結果作為娛樂用途，如果您有任何真實生活中的困惑，請尋求專業的意見和協助。
                    </li>
                  </ul>
                  <br />
                  最後，我們希望您玩的開心。
                  <br />
                  如果您有任何疑問或意見，歡迎使用我們的客戶服務功能，祝您好運！
                  <br />
                  <br />
                  醺迷仙園團隊
                  <br />
                  敬上
                  <p />
                </div>
                <div className="row gap-5 row-gap-4 mt-3 justify-content-between">
                  <button
                    className="btn btn-white rounded-5 py-2 px-4"
                    data-bs-dismiss="modal"
                  >
                    <h5 className="col-auto px-0 py-1 px-1 m-0 text-wrap text-center d-inlineblock pe-auto">
                      <strong>
                        <i className="fa-solid fa-angles-left me-1" />
                        返回
                      </strong>
                    </h5>
                  </button>
                  <button
                    className="btn btn-white-to-wine rounded-5 py-2 px-4 pe-auto start-choose-card-btn"
                    data-bs-dismiss="modal"
                  >
                    <h5 className="col-auto px-0 py-1 px-1 m-0 text-wrap text-center">
                      <strong>
                        閱讀完畢，開始洗牌
                        <i className="fa-solid fa-angles-right ms-1" />
                      </strong>
                    </h5>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* remind modal end */}
      {/* rules modal start */}
      <div
        className="modal fade w-100"
        id="rulesArea"
        tabIndex={-1}
        aria-labelledby="rulesAreaLabel"
        aria-hidden="true"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          className="modal-dialog w-100"
          style={{ height: "100vh", width: "100vw", maxWidth: "none" }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh", width: "100vw" }}
          >
            <div className="tarot-quest-area row justify-content-center align-items-center spac-1">
              <div
                className="col-auto bg-white rounded-4 p-3 pt-1 position-relative"
                id="tarot-quest-inner"
              >
                <div
                  className="bg-white position-absolute py-1 px-3"
                  id="tarot-quest-label"
                >
                  <h6 className="spac-1">抽牌規則</h6>
                </div>
                <div className="row my-3">
                  <ul className="ms-3 mt-5">
                    <li>
                      隨機抽卡&nbsp;本次占星將使用22張大阿克納塔羅牌，並進行洗牌後提供您挑選，並依您抽取的結果提供建議。
                    </li>
                    <li className="list-unstyled">
                      <br />
                    </li>
                    <li>
                      使用牌陣&nbsp;本次占星使用時間之流牌陣，請在洗牌完成後，依照您的直覺抽取三張牌。
                    </li>
                  </ul>
                </div>
                <div className="row gap-5 row-gap-4 mt-3 justify-content-end">
                  <button
                    className="btn btn-white rounded-5 py-2 px-4"
                    data-bs-dismiss="modal"
                  >
                    <h5 className="col-auto px-0 py-1 px-1 m-0 text-wrap text-center d-inlineblock pe-auto">
                      <strong>
                        <i className="fa-solid fa-angles-left me-1" />
                        返回
                      </strong>
                    </h5>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rules modal end */}
      </div>
      <div className="row justify-content-center pb-4 spac-2 tarot-area-title">
        <h4 className="col-auto text-white">
          <strong>酒相占星館 / 以下是您抽取的三張牌</strong>
        </h4>
      </div>
      <div className="row justify-content-center my-4 align-items-start gap-5 flex-nowrap">
        {/* col1 */}
        <div className="col firstP-col1" />
        {/* col2 */}
        <div
          type="button"
          className="col-auto firstP-col2 justify-content-center"
          data-bs-toggle="modal"
          data-bs-target="#askArea"
        >
          <img
            className="tarot_card_back"
            src="/images/course_and_tarot/tarot_card_back.jpg"
            alt=""
          />
        </div>
        {/* col3 */}
        <div className="col py-5 flex-shrink-0 firstP-col3">
          <button
            type="button"
            className="btn ms-2 mt-5 btn-sec-y d-flex align-items-center rounded-4"
            style={{ padding: "10px 15px 10px 20px" }}
            data-bs-toggle="modal"
            data-bs-target="#rulesArea"
            data-bs-dismiss="modal"
          >
            <h6 className="text-prim-dark m-0 me-1 text-nowrap">抽牌規則</h6>
            <img src="/images/course_and_tarot/tarotsICON.png" alt="" width="25px" />
          </button>
        </div>
        {/* 抽牌區
              <div className="pick-card-area row justify-content-center align-items-center px-0 m-0 flex-nowrap d-none" style="overflow-x: hidden">
                  <div className="col-auto d-flex flex-column justify-content-centercard-1 px-0 m-0">
                      <div className="tarot_card_div card_unactive">
                          <img className="tarot_card_front" src="/images/course_and_tarot/theHangedMan.png" alt="" />
                      </div>
                  </div>
              </div> */}
        {/* ↓ 結果-塔羅牌 */}
        <div className="result-tarot-area row justify-content-center align-items-center px-0 m-0 flex-nowrap position-relative d-none">
          {/* 1 */}
          <div
            className="card-anim card-1 px-0 m-0 position-absolute"
            style={{ top: "calc(100vh - 300px)", left: "calc(50vw - 116px)" }}
          >
            <div className="tarot_card_div card_active">
              <img
                className="tarot_card_front"
                src="/images/course_and_tarot/theHangedMan.png"
                alt=""
              />
            </div>
          </div>
          {/* 2 */}
          <div
            className="card-anim card-2 px-0 m-0 position-absolute"
            style={{ top: "calc(100vh - 300px)", left: "calc(50vw - 116px)" }}
          >
            <div className="tarot_card_div card_active">
              <img
                className="tarot_card_front"
                src="/images/course_and_tarot/theHangedMan.png"
                alt=""
              />
            </div>
          </div>
          {/* 3 */}
          <div
            className="card-anim card-3 px-0 m-0 position-absolute"
            style={{ top: "calc(100vh - 300px)", left: "calc(50vw - 116px)" }}
          >
            <div className="tarot_card_div card_active">
              <img
                className="tarot_card_front"
                src="/images/course_and_tarot/theHangedMan.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row card-explain flex-column justify-content-center align-items-center spac-2 pt-4 d-none">
        <h4 className="col-auto text-white">
          <strong>高塔</strong>
        </h4>
        <p className="col-auto text-white mb-2">The Tower</p>
        <p className="col-auto text-white mb-1">-寓意-</p>
        <p className="col-auto text-white text-center">
          崩塌與動蕩、啟示、覺醒與突破
        </p>
      </div>
      <div className="row justify-content-center pt-5 pb-3 spac-2 tarot-area-footer">
        {/* page 1 */}
        <h4 className="col-auto text-white">
          <strong>
            <i className="fa-solid fa-chevron-up me-2" />
            請點擊卡牌進行占卜
          </strong>
        </h4>
        {/* page 2 */}
        <h4 className="col-auto text-white">
          <strong>
            請向下滑動查看結果
            <i className="fa-solid fa-angle-down" />
          </strong>
        </h4>
      </div>
    </div>
    {/* page 2 result area start */}
    <div className="container-fluid d-none tarot-anlz-area px-0">
      <div className="container-fluid px-0">
        <div className="container-md my-5">
          <div className="row justify-content-between mb-4 gap-4">
            <div className="col d-flex rounded-4 p-4 result-card justify-content-between">
              <div className="col-7">
                <h3 className="spac-1">
                  <strong>倒吊人</strong>
                </h3>
                <h6 className="spac-1">
                  <strong>(The Hanged Man)</strong>
                </h6>
                <br />
                <p className="spac-1">觀察過去:</p>
                <br />
                <p>
                  前段時間的你，可能面臨進退兩難,或許需要做出犧牲，你可能需要改變觀點或等待更好的時機來解決問題。這段停滯是為了讓你有機會重新審視人生。
                </p>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <div className="result_cardfront_md">
                  <img src="/images/course_and_tarot/theHangedMan.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col d-flex rounded-4 p-4 result-card justify-content-between">
              <div className="col-7">
                <h3 className="spac-1">
                  <strong>高塔</strong>
                </h3>
                <h6 className="spac-1">
                  <strong>(The Tower)</strong>
                </h6>
                <br />
                <p className="spac-1">審視現在:</p>
                <br />
                <p>
                  如今的你，生活中將要或正在經歷巨變，可能出人意料但卻必不可少。可能是信念崩塌或現狀瓦解。雖是痛苦體驗,卻是必要的洗禮。
                </p>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <div className="result_cardfront_md">
                  <img src="/images/course_and_tarot/theTower.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col d-flex rounded-4 p-4 result-card justify-content-between">
              <div className="row py-3">
                <div className="col-8">
                  <h3 className="spac-1">
                    <strong>戰車</strong>
                  </h3>
                  <h6 className="spac-1">
                    <strong>(The Chariot)</strong>
                  </h6>
                  <br />
                  <p className="spac-1">展望未來:</p>
                  <br />
                  <p>
                    前路漫漫，你將要經歷一段需要毅力和決心的旅途。你擁有強大的意志力和自制力,能夠克服障礙,邁向勝利。堅定信念,就能抵達遠方。
                    <br />
                    你需要時刻提醒自己，擬定明確目標,全力以赴，保持堅定，朝著你的目標前進，平衡行動與內省，以智慧駕馭熱情。勝利就在眼前。
                  </p>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <div className="result_cardfront_lg">
                    <img src="/images/course_and_tarot/theChariot.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0 bg-prim-wine text-white d-flex flex-column align-items-center justify-content-center py-3 text-center">
        <div className="container-md px-5 py-3">
          <div className="w-for-tarot-result m-auto">
            <h6 className="text-white spac-1 pb-3">屬於你的酒相是：</h6>
            <h3 className="text-white spac-2 pb-3">
              <a className="text-white" href="">
                <u>
                  <strong>梅樂（Merlot）</strong>
                </u>
              </a>
            </h3>
            <p className="text-white spac-1 lh-5">
              梅樂葡萄酒柔順且強而有力，象徵著控制和勝利意志，如同戰車前進般堅定的心和精神。
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0">
        <div className="container-md tarot-wine-cards my-5">
          <div className="row justify-content-between mb-4 px-0">
            {/* 結果小卡 start */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="rounded-4 result-card d-flex flex-column overflow-hidden px-0 w-100 position-relative">
                <div className="result2-img-area position-relative">
                  <img
                    className="position-relative"
                    src="/images/course_and_tarot/wineEX.png"
                    alt=""
                  />
                  <button
                    className="btn btn-sec-y position-absolute p-1 px-2"
                    style={{ right: '8px', bottom: '50px' }}
                  >
                    <p className="m-0">梅樂酒</p>
                  </button>
                  <button
                    className="btn btn-sec-y position-absolute p-1 px-2"
                    style={{ right: '8px', bottom: '50px' }}
                  >
                    <p className="m-0">祖絲玲莊園酒</p>
                  </button>
                </div>
                <div className="result2-text-area bg-prim p-3">
                  <h4 className="text-white spac-1 mb-2">此處為酒名</h4>
                  <p className="text-white spac-1 mb-4">此處為酒名別稱、英文</p>
                  <div className="row px-0 align-items-center justify-content-between">
                    <div className="col-auto">
                      <a href="" className="btn btn-prim-prim">
                        <p className="text-white">+ 查看商品詳情</p>
                      </a>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-prim-wine rounded-4">
                        <p className="m-0">
                          加入購物車
                          <i className="fa-solid fa-cart-plus ms-1" />
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 結果小卡 end */}
            {/* 結果小卡 start */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="rounded-4 result-card d-flex flex-column overflow-hidden px-0 w-100 position-relative">
                <div className="result2-img-area position-relative">
                  <img
                    className="position-relative"
                    src="/images/course_and_tarot/wineEX.png"
                    alt=""
                  />
                  <button
                    className="btn btn-sec-y position-absolute p-1 px-2"
                    style={{ right: '8px', bottom: '50px' }}
                  >
                    <p className="m-0">梅樂酒</p>
                  </button>
                  <button
                    className="btn btn-sec-y position-absolute p-1 px-2"
                    style={{ right: '8px', bottom: '10px' }}
                  >
                    <p className="m-0">祖絲玲莊園酒</p>
                  </button>
                </div>
                <div className="result2-text-area bg-prim p-3">
                  <h4 className="text-white spac-1 mb-2">此處為酒名</h4>
                  <p className="text-white spac-1 mb-4">此處為酒名別稱、英文</p>
                  <div className="row px-0 align-items-center justify-content-between">
                    <div className="col-auto">
                      <p className="text-white">+ 查看商品詳情</p>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-prim-wine rounded-4">
                        <p className="m-0">
                          加入購物車
                          <i className="fa-solid fa-cart-plus ms-1" />
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 結果小卡 end */}
            {/* 結果小卡 start */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="rounded-4 result-card d-flex flex-column overflow-hidden px-0 w-100 position-relative">
                <div className="result2-img-area position-relative">
                  <img
                    className="position-relative"
                    src="/images/course_and_tarot/wineEX.png"
                    alt=""
                  />
                  <button
                    className="btn btn-sec-y position-absolute p-1 px-2"
                    style={{ right: '8px', bottom: '50px' }}
                  >
                    <p className="m-0">梅樂酒</p>
                  </button>
                  <button
                    className="btn btn-sec-y position-absolute p-1 px-2"
                    style={{ right: '8px', bottom: '10px' }}
                  >
                    <p className="m-0">祖絲玲莊園酒</p>
                  </button>
                </div>
                <div className="result2-text-area bg-prim p-3">
                  <h4 className="text-white spac-1 mb-2">此處為酒名</h4>
                  <p className="text-white spac-1 mb-4">此處為酒名別稱、英文</p>
                  <div className="row px-0 align-items-center justify-content-between">
                    <div className="col-auto">
                      <p className="text-white">+ 查看商品詳情</p>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-prim-wine rounded-4">
                        <p className="m-0">
                          加入購物車
                          <i className="fa-solid fa-cart-plus ms-1" />
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 結果小卡 end */}
          </div>
        </div>
      </div>
    </div>
    {/* page 2 result area end */}
    <footer></footer>
  </div>
  {/* Bootstrap JavaScript Libraries */}
</>


  )
}
