import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';

export default function Homepage() {

  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const searchQuery = event.target.value;
      router.push(`/product?page=1&sort=id_asc&search=${encodeURIComponent(searchQuery)}`);
    }
  }


  useEffect(() => {


    // 頁面
    const homebar = document.querySelector(".homebar");
    const homebar_bg = document.querySelector(".homebar_bg");
    const homebar_lf = document.querySelector(".homebar_lf");
    const homebar_wine = document.querySelector(".homebar_wine");
    const homebar_wine_text = document.querySelector(".homebar_wine_text");
    const bird = document.querySelector(".bird");
    const homebar_rwd = document.querySelector(".homebar_rwd");
    const homebar_bg_rwd = document.querySelector(".homebar_bg_rwd");
    const homebar_lf_rwd = document.querySelector(".homebar_lf_rwd");

    (function () {
      setTimeout(() => {
        homebar_lf.style.top = `-10px`;
        homebar_bg.style.top = `0px`;
        homebar_bg.style.left = `-300px`;
        homebar_bg.style.transform = "scale(1)";
        homebar_bg.style.filter = `blur(0px)`;
      }, 500)

    })();

    homebar.addEventListener("click", () => {
      homebar_bg.classList.toggle("active");
      homebar_lf.classList.toggle("active");
    })

    homebar_rwd.addEventListener("click", () => {
      homebar_bg_rwd.classList.toggle("active");
      homebar_lf_rwd.classList.toggle("active");
    })



    setTimeout(() => {


      document.addEventListener('mousemove', e => {


        const mouseX = parseInt((e.clientX / window.innerWidth) * 100);


        // console.log(mouseX);


        if (mouseX < 10) {
          let mu = 100 - mouseX;
          homebar_bg.style.left = `${(mu * 2) - 250}px`;
          homebar_lf.style.left = `${(mu * 4) - 400}px`;
          homebar_wine.classList.add("display");
          homebar_wine_text.classList.add("display");
        }

        else {
          homebar_bg.style.left = `${(-mouseX) - 300}px`;
          homebar_lf.style.left = `${(-mouseX * 2) - 300}px`;
          homebar_wine.classList.remove("display");
          homebar_wine_text.classList.remove("display");

        }




        if (mouseX <= 20) {
          homebar_bg.style.filter = `blur(2px)`;
        }
        else if (mouseX >= 90) {
          homebar_bg.style.filter = `blur(3px)`;
        }
        else {
          homebar_bg.style.filter = `blur(0px)`;
        }


      });
    }, 1500)




    const touch_list = document.querySelector(".teacher_area_rwd");
    const teacher_area_rwd_inner = document.querySelector(".teacher_area_rwd_inner");



    let startX, moveX;

    touch_list.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    touch_list.addEventListener('touchmove', (e) => {
      moveX = e.touches[0].clientX;
      const diff = startX - moveX;

      handleSlide(startX - moveX);
    });


    let isMouseDown = false;

    touch_list.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      startX = e.clientX;
    });

    touch_list.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      moveX = e.clientX;
      handleSlide(startX - moveX);
    });

    touch_list.addEventListener('mouseup', () => {
      isMouseDown = false;
    });

    touch_list.addEventListener('mouseleave', () => {
      isMouseDown = false;
    });





    function handleSlide(diff) {
      if (diff > 50) {
        touch_list.classList.add('active');
      } else if (diff < -50) {
        touch_list.classList.remove('active');
      }
    }




    const nextarr = document.querySelector(".nextarr");
    const tech = document.querySelector(".tech");
    const teacher_area = document.querySelector(".teacher_area");
    const teacher_area_inner = document.querySelector(".teacher_area_inner");


    nextarr.addEventListener("click", () => {
      teacher_area.classList.add("active");
    })

    tech.addEventListener("click", () => {
      teacher_area.classList.remove("active");
    })

  }, [])

  return (
    <>

      {/* 頁面開始 */}
      <div className="homebar d-none d-lg-block">
        <div className="homebar_bg" />
        <div className="homebar_lf" />
        <div className="homebar_wine" />
        <div className="homebar_wine_text">
          <h2>強堤·帕西雍酒莊．「香貝丹」特級園紅酒 2016</h2>
          <p>
            布根地的馬賽克地形，導致每塊葡萄園都有著千變萬化的土壤性質；隨著山坡的起伏形成許多微氣候區，使得即便位於同一塊葡萄園中，也有些微的差異性；而鑒於每位釀酒人的風格不一，令此區釀出的酒款變化多端、類型多元。布根地葡萄酒也因此被公認為全世界最難懂的葡萄酒。
          </p>
        </div>
        <div className="bird" onClick={() => { router.push('/event/hato') }} />
        <a href="#homeArea01">
          <div className="homebar_scroll">
            <div className="scroll_line" />
            <div className="scroll_head_b">
              <div className="scroll_head" />
            </div>
          </div>
        </a>
        {/* <div class="homebar_slogan">仙園裡，醉美的迷茫。</div> */}
      </div>
      <div className="homebar_rwd d-block d-lg-none">
        <div className="homebar_bg_rwd" />
        <div className="homebar_lf_rwd" />
        <div className="bird_rwd" />
        <div className="homeuserview_rwd">
          <h2>
            仙園裡，
            <br />
            醉美的迷茫。
          </h2>
          <div className="home_search_rwd">
            <input
              type="search"
              name=""
              id="home_search_rwd"
              placeholder="搜尋您想要的美酒"
              onKeyDown={handleKeyPress}
            />
            <i className="fa-solid fa-magnifying-glass search_icon_rwd" />
          </div>
        </div>
        <a className="homebar_rwd_link" href="#homeArea01_rwd">
          <p>- 點擊往下尋寶 -</p>
        </a>
      </div>
      {/* desk */}
      <div className="container homeArea01 d-none d-lg-block" id="homeArea01">
        <div>
          <div className={`homeArea01_l ${isVisible ? 'active' : ''}`}></div>
          <Link className='A-rmpre' href={'/product/75'}>
            <div className={`homeArea01_r ${isVisible ? 'active' : ''}`}>
              <div className="homeArea01_r_t">
                <div className="homeArea01_r_t_box" />
                <p>強堤·帕西雍酒莊．「香貝丹」特級園紅酒</p>
              </div>
              <div className="homeArea01_r_m">
                色澤：漂亮且深邃的紅寶石色澤。
                <br />
                香氣：非常精確且非常複雜，帶有煙草、甘草和烘烤的香氣，隨著醒酒時間拉長，展現成熟、新鮮的黑莓、藍莓、黑加侖的香氣。
                <br />
                風味：成熟清新的果味和清爽的酸度達到完美平衡，頂尖的結構表現。尾韻非常精緻，單寧細膩點綴辛香料口感。
              </div>
              <div className="homeArea01_r_b">
                <div className="line1" />
                <div className="line2" />
                商品頁面
              </div>
            </div>
          </Link>
        </div>
        <div className="row Homenews">
          <div className="col-3 pt-5">
            <img className="d-block" src="/images/home/Frame 49.png" alt="" />
          </div>
          <div className="col-9 pt-5 px-5">
            <div className="news_b">
              <div className="news_b_l">
                <img src="/images/home/what-is-a-dry-white.webp" alt="" />
              </div>
              <div className="news_b_r">
                <p className="fs5">最新活動 - 酒友一支會</p>
                <p className="fs">
                  什麼是一支會？
                  就像英文的potluck，一人帶一道菜去聚會，一支會就是一人帶一支酒來聚會。
                  VINDEX中山主辦的一支會，有泰德利代理品牌全品項品飲，也有以產區、品種的盲飲一支會
                  更歡迎各路好友包場，自行帶一支酒來大亂鬥大。享。受。
                </p>
                <Link className='rmall' href={'/event'}>
                  <div className="news_btn">
                    <p>2024.09.08</p>
                    <img src="/images/home/Frame 8.png" alt="" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-none d-lg-block homeArea02_bg" />
      <div className="container d-none d-lg-block" id="homeArea02">
        <img src="/images/home/Frame 56.png" alt="" className="homeArea02_title" />
        <div className="row homeArea02_type">
          <div className="col-4">
            <Link href={'/product?page=1&sort=id_asc&category=1&minPrice=0&maxPrice=150000'}>
              <div className="homeArea02_type_text">
                <p>紅酒 (Red Wine)</p>
              </div>
              <img src="/images/home/nav_wine.png" alt="" />
            </Link>
          </div>
          <div className="col-4">
            <Link href={'/product?page=1&sort=id_asc&category=2&minPrice=0&maxPrice=150000'}>
              <div className="homeArea02_type_text">
                <p>白酒 (White Wine)</p>
              </div>
              <img src="/images/home/nav_white.png" alt="" />
            </Link>
          </div>
          <div className="col-4">
            <Link href={'http://winderland.shop/product?page=1&sort=id_asc&category=3'}>
              <div className="homeArea02_type_text">
                <p>其他類別 (Other Types)</p>
              </div>
              <img src="/images/home/nav_tool.png" alt="" />
            </Link>
          </div>
        </div>
        <div className="homeArea02_product">
          <div className="homeArea02_product_list">
            <div className="product_item" onClick={() => { router.push('/product/6') }}>
              <div className="product_item_pic">
                <img src="/images/home/WI00008903_btl.jpg" alt="" />
                <div className="product_item_price">
                  <p>750ml&nbsp;| 西班牙</p>
                  <p>＄3,070</p>
                </div>
              </div>
              <div className="product_item_name">洛禾酒莊．「吹笛人」紅酒</div>
            </div>
            <div className="product_item" onClick={() => { router.push('/product/10') }}>
              <div className="product_item_pic">
                <img src="/images/home/WI00098201_btl.jpg" alt="" />
                <div className="product_item_price">
                  <p>750ml&nbsp;| 法國</p>
                  <p>＄1,590</p>
                </div>
              </div>
              <div className="product_item_name">
                皮耶．烏塞力歐父子酒莊 ．教皇新堡紅酒
              </div>
            </div>
            <div className="product_item" onClick={() => { router.push('/product/4') }}>
              <div className="product_item_pic">
                <img src="/images/home/WI00107408_btl.jpg" alt="" />
                <div className="product_item_price">
                  <p>750ml&nbsp;| 義大利</p>
                  <p>＄7,540</p>
                </div>
              </div>
              <div className="product_item_name">
                布魯諾．洛卡酒莊．「庫拉園」巴巴瑞斯科陳年紅酒
              </div>
            </div>
          </div>
          <div className="all_product">
            <img src="/images/home/Frame 60.png" alt="" />
            <Link href={'/product?page=1&sort=id_asc'}>
              <div className="all_circlebtn">
                <div className="btn_arrow_line" />
                <div className="btn_arrow_head" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container d-none d-lg-block" id="homeArea03">
        <img src="/images/home/Frame 57.png" alt="" className="homeArea03_title" />
        <div className="row homeArea03_outer">
          <div className="col-12 my-4">
            <div className="homeArea03_article_title">
              一分鐘認識橡木桶：增添葡萄酒香氣的幕後功臣
            </div>
            <Link href={'/article/1'}>
              <div className="homeArea03_article_lg"></div>
            </Link>
          </div>
          <div className="col-5">
            <div className="homeArea03_article_title">學習形容葡萄酒的風味</div>
            <Link href={'/article/2'}>
              <div className="homeArea03_article_sm sm1"></div>
            </Link>
          </div>
          <div className="col-5">
            <div className="homeArea03_article_title">
              喝不完的葡萄酒該怎麼保存？
            </div>
            <Link href={'/article/3'}>
              <div className="homeArea03_article_sm sm2"></div>
            </Link>
          </div>
          <div className="col-2 article_circlebtn">
            <Link href={'/article'}>
              <div className="all_circlebtn_red">
                <div className="btn_arrow_line_red" />
                <div className="btn_arrow_head_red" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container d-none d-lg-block" id="homeArea04">
        <div className="nextarr">
          <i className="fa-solid fa-chevron-right" />
        </div>
        <img src="/images/home/Frame 58.png" alt="" className="homeArea04_title" />
        <div className="mt-4">
          <img className="tech" src="/images/home/Frame 59.png" alt="" />
          <div className="teacher_outer">
            <div className="teacher_area">
              <div className="teacher_area_inner">
                <div className="teacherbox" onClick={() => { router.push('/course/teacher/1') }}>

                  <img src="/images/home/id_01.jpg" alt="" />
                  <h5>蔡孝倫</h5>

                </div>
                <div className="teacherbox" onClick={() => { router.push('/course/teacher/19') }}>

                  <img src="/images/home/id_19.jpg" alt="" />
                  <h5>屈享平</h5>

                </div>
                <div className="teacherbox" onClick={() => { router.push('/course/teacher/21') }}>

                  <img src="/images/home/id_21.jpg" alt="" />
                  <h5>王依亭</h5>

                </div>
                <div className="teacherbox" onClick={() => { router.push('/course/teacher/4') }}>

                  <img src="/images/home/id_04.jpg" alt="" />
                  <h5>Mark Pygott MW</h5>

                </div>
                <div className="teacherbox" onClick={() => { router.push('/course/teacher/20') }}>

                  <img src="/images/home/id_20.webp" alt="" />
                  <h5>王琪</h5>

                </div>
                <div className="teacherbox" onClick={() => { router.push('/course/teacher/22') }}>

                  <img src="/images/home/id_22.jpg" alt="" />
                  <h5>蕭豐盛</h5>

                </div>
                <div className="teacherbox" onClick={() => { router.push('/course/teacher/18') }}>

                  <img src="/images/home/id_18.jpg" alt="" />
                  <h5>侍酒夏娃</h5>

                </div>
                <div className="teacherbox" onClick={() => { router.push('/course/teacher') }}>

                  <img src="/images/home/default_user.jpg" alt="" />
                  <h5>查看更多</h5>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <div className="row CourseList">
              <div className="col-4 d-flex flex-column" onClick={() => { router.push('/course/37') }}>
                <img src="http://winderland.shop/uploads/course_and_tarot/class_id37.jpeg" alt="" className="CourseListPic" />
                <div className="CourseListText">
                  <div className="Courseon">線上</div>
                  迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="CourseListTeacher">by 萊特</div>
                  <div className="CourseListPrice">NT$ 2,980</div>
                </div>
              </div>
              <div className="col-4 d-flex flex-column" onClick={() => { router.push('/course/31') }}>
                <img src="http://winderland.shop/uploads/course_and_tarot/class_id31.jpg" alt="" className="CourseListPic" />
                <div className="CourseListText">
                  <div className="Courseon">線上</div>
                  我的第一堂品酒課：侍酒師的老師帶你輕鬆進入葡萄酒世界
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="CourseListTeacher">by 蔡孝倫</div>
                  <div className="CourseListPrice">NT$ 1,299</div>
                </div>
              </div>
              <div className="col-4 d-flex flex-column" onClick={() => { router.push('/course/26') }}>
                <img
                  src="http://winderland.shop/uploads/course_and_tarot/class_id26.jpg"
                  alt=""
                  className="CourseListPic"
                />
                <div className="CourseListText">
                  <div className="Courseoff">線下</div>
                  SFM南法產區大師級認證課程
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="CourseListTeacher">by Sofia Salvador</div>
                  <div className="CourseListPrice">NT$ 18,800</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2 article_circlebtn">
            <a href="http://winderland.shop/course">
              <div className="all_circlebtn_blue">
                <div className="btn_arrow_line_blue" />
                <div className="btn_arrow_head_blue" />
              </div>
            </a>
          </div>
        </div>
      </div>
      {/* rwd */}
      <div className="d-block d-lg-none" id="homeArea01_rwd">
        <div className="homeArea01_rwd_type">
          <div className="homeArea01_rwd_title">選您所要的商品類型</div>
          <div className="rwd_type_p">
            <div className="rwd_type_pic me-1" onClick={() => { router.push('/product?page=1&sort=id_asc&category=1&minPrice=0&maxPrice=150000') }}>
              <h6 className="d-none d-md-block d-lg-none mt-3">紅酒 (Red Wine)</h6>
              <h6 className="d-block d-md-none">紅酒</h6>

              <img src="/images/home/nav_wine.png" alt="" />

            </div>
            <div className="rwd_type_pic ms-1" onClick={() => { router.push('/product?page=1&sort=id_asc&category=2&minPrice=0&maxPrice=150000') }}>
              <h6 className="d-none d-md-block d-lg-none mt-3">
                白酒 (White Wine)
              </h6>
              <h6 className="d-block d-md-none">白酒</h6>
              <a href="">
                <img src="/images/home/nav_white.png" alt="" />
              </a>
            </div>
            <div className="rwd_type_pic me-1" onClick={() => { router.push('/product?page=1&sort=id_asc&category=3&minPrice=0&maxPrice=150000') }}>
              <h6 className="d-none d-md-block d-lg-none mt-3">
                粉紅酒 (Rose Wine)
              </h6>
              <h6 className="d-block d-md-none">粉紅酒</h6>
              <a href="">
                <img src="/images/home/nav_tool.png" alt="" />
              </a>
            </div>
            <div className="rwd_type_pic ms-1 pink" onClick={() => { router.push('/product?page=1&sort=id_asc') }}>
              <h6 className="d-none d-md-block d-lg-none mt-3">
                查看更多 (see more)
              </h6>
              <h6 className="d-block d-md-none">查看更多..</h6>
            </div>
          </div>
          <div className="wine_adtitle" />
          <div className="wine_ad">
            <div className="adtext">
              <h2>強堤·帕西雍酒莊．「香貝丹」特級園紅酒</h2>
              <p>
                色澤：漂亮且深邃的紅寶石色澤。
                <br />
                香氣：非常精確且非常複雜，帶有煙草、甘草和烘烤的香氣。
              </p>
            </div>
          </div>
          <div className="wine_ad_link">
            <div className="link_box" onClick={() => { router.push('/product/75') }}>
              <img src="/images/product/75-2.jpg" alt="" width={180} />
              <div className="link_box_text">
                <h4>強堤·帕西雍酒莊．「香貝丹」特級園紅酒 2016</h4>
                <div className="link_box_text_price">
                  <p>750ml | 法國</p>
                  <p>$19,800</p>
                </div>
              </div>
            </div>
            <div className="link_box" onClick={() => { router.push('/product/75') }}>
              <img src="/images/product/75-2.jpg" alt="" width={180} />
              <div className="link_box_text">
                <h4>強堤·帕西雍酒莊．「香貝丹」特級園紅酒 2018</h4>
                <div className="link_box_text_price">
                  <p>750ml | 法國</p>
                  <p>$22,100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-block d-lg-none" id="homeArea02_rwd">
        <div className="homeArea02_rwd_title">最新消息</div>
        <div className="newsbox">
          <div className="acttitle">最新活動 - 酒友一支會</div>
          <div className="actimg">
            <img src="/images/home/what-is-a-dry-white.webp" alt="" />
          </div>
          <div className="newsText" onClick={() => { router.push('/event') }}>
            <p>
              什麼是一支會？
              就像英文的potluck，一人帶一道菜去聚會，一支會就是一人帶一支酒來聚會。
              VINDEX中山主辦的一支會，有泰德利代理品牌全品項品飲，也有以產區、品種的盲飲一支會
              更歡迎各路好友包場，自行帶一支酒來大亂鬥大。享。受。
            </p>
            <div className="newsText_date">
              <h5>2024.09.08</h5>
              <img src="/images/home/Frame 8.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="d-block d-lg-none" id="homeArea03_rwd">
        <div className="homeArea03_rwd_title">相關文章</div>
        <div className="article_out">
          <Link href={'/article/1'}>
            <div className="article_box">
              <img src="/images/home/Rectangle 39b.jpg" alt="" />
              <h5>一分鐘認識橡木桶：增添葡萄酒香氣的幕後功臣</h5>
            </div>
          </Link>
          <Link href={'/article/2'}>
            <div className="article_box">
              <img src="/images/home/Rectangle 64.png" alt="" />
              <h5>學習形容葡萄酒的風味</h5>
            </div>
          </Link>
          <Link href={'/article/3'}>
            <div className="article_box">
              <img src="/images/home/Rectangle 65.png" alt="" />
              <h5>喝不完的葡萄酒該怎麼保存？</h5>
            </div>
          </Link>
        </div>
      </div>
      <div className="d-block d-lg-none" id="homeArea04_rwd">
        <div className="homeArea04_rwd_title">品酒課程</div>
        <div className="teacher_area_rwd">
          <div className="teacher_area_rwd_inner">
            <div className="teacherbox">

              <img src="/images/home/id_01.jpg" alt="" />
              <h5>蔡孝倫</h5>

            </div>
            <div className="teacherbox">

              <img src="/images/home/id_19.jpg" alt="" />
              <h5>屈享平</h5>

            </div>
            <div className="teacherbox">

              <img src="/images/home/id_21.jpg" alt="" />
              <h5>王依亭</h5>

            </div>
            <div className="teacherbox">

              <img src="/images/home/id_04.jpg" alt="" />
              <h5>Mark Pygott MW</h5>

            </div>
            <div className="teacherbox">

              <img src="/images/home/id_20.webp" alt="" />
              <h5>王琪</h5>

            </div>
            <div className="teacherbox">

              <img src="/images/home/id_22.jpg" alt="" />
              <h5>蕭豐盛</h5>

            </div>
            <div className="teacherbox">

              <img src="/images/home/default_user.png" alt="" />
              <h5>查看更多</h5>

            </div>
          </div>
        </div>
        <div className="course_area_rwd">
          <div className="coursebox_rwd" onClick={() => { router.push('/course/37') }}>
            <img src="http://winderland.shop/uploads/course_and_tarot/class_id37.jpeg" alt="" />
            <div className="coursebox_rwd_text">
              <h5>迷人的葡萄酒探索之旅-5小時從挑選到品飲一次了解</h5>
              <div className="coursebox_rwd_type">
                <div>線上</div>
                <p>by 萊特</p>
              </div>
              <div className="coursebox_rwd_text_price">
                <h4>NT$ 2,980</h4>
                <del>NT$ 5,500</del>
              </div>
            </div>
          </div>


          <div className="coursebox_rwd" onClick={() => { router.push('/course/31') }}>
            <img src="http://winderland.shop/uploads/course_and_tarot/class_id31.jpg" alt="" />
            <div className="coursebox_rwd_text">
              <h5>我的第一堂品酒課：侍酒師的老師帶你輕鬆進入葡萄酒世界</h5>
              <div className="coursebox_rwd_type">
                <div>線上</div>
                <p>by 蔡孝倫</p>
              </div>
              <div className="coursebox_rwd_text_price">
                <h4>NT$ 1,299</h4>
                <del>NT$ 2,999</del>
              </div>
            </div>
          </div>


          <div className="coursebox_rwd" onClick={() => { router.push('/course/26') }}>
            <img src="http://winderland.shop/uploads/course_and_tarot/class_id26.jpg" alt="" />
            <div className="coursebox_rwd_text">
              <h5>SFM南法產區大師級認證課程</h5>
              <div className="coursebox_rwd_type">
                <div>線下</div>
                <p>by Sofia Salvador</p>
              </div>
              <div className="coursebox_rwd_text_price">
                <h4>NT$ 18,800</h4>
                <del>NT$ 20,800</del>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
