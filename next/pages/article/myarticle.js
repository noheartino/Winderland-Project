import { useEffect, useState } from "react";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import EventHeader from "@/components/event/event-header";
import Noresult from "@/components/event/noresult";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import Head from "next/head";
import ArticlePagination from "@/components/article/article-pagination";

export default function Applyevent() {
  const router = useRouter();
  // const { id } = router.query;
  const [myarticle, setMyarticle] = useState([]);
  const [loading, setLoading] = useState(true);

  // const authData = useAuth().auth;
  // const UserData = authData.userData;
  // const useridis = UserData ? UserData.name : 0;

  useEffect(() => {
    // if (useridis) {
    fetch(`http://localhost:3005/api/article/all`)
      .then((response) => response.json())
      .then((data) => {
        // 處理 articles 資料，將 images 字段轉換為數組
        const processedArticles = data.articles.map((article) => ({
          ...article,
          images: article.images ? article.images.split(",") : [],
          content: article.content.replace(/<!--IMAGE_HERE-->/g, ""),
        }));

        setMyarticle(processedArticles);
        // console.log(processedArticles);
      })
      .catch((error) => console.error("Error:", error));
    // }
  }, []);
  // console.log(myarticle);
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [scaleYIndexes, setScaleYIndexes] = useState([]);

  // 設定展開box
  const handleClick = (index) => {
    setActiveIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    setTimeout(() => {
      setScaleYIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }, 100);
  };

  // function filtertheevent(index) {
  //   return myallevent.filter((i) => i.id === index)[0];
  // }

  // function filterapply(index) {
  //   return myallapply.filter((i) => i.event_id === index);
  // }

  // if (loading) return <div>Loading...</div>
  // if (!infodata) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>文章管理列表</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />
      <div className="container-fluid a-banner">
        <h2>相關文章</h2>
        <h3>Aritcle</h3>
      </div>

      <>
        <div className="eventManageNav">
          <div className="container">
            <div className="ManageNavT">文章管理</div>
            <div className="ManageNavList">
              <Link href="/article/new" className="Armall">
                <div className="NavListLi">新增文章</div>
              </Link>
              <Link href="/article/myarticle" className="Armall">
                <div className="NavListLi NowUnderLI">我的文章</div>
              </Link>
              {/* <Link href="/article/edit" className="Armall">
                <div className="NavListLi">編輯文章</div>
              </Link> */}
            </div>
          </div>
        </div>

        {myarticle.length === 0 && <Noresult text={"沒有任何結果"} />}

        <div
          className={`eventMDetailArea ${myarticle.length === 0 && "noheight"}`}
        >
          <div className="container">
            {myarticle.map((art, i) => {
              return (
                <div className={`eventDetailist`} key={i}>
                  <div className={`DetailistBox `}>
                    {/* 照片 */}
                    <img
                      src={`http://localhost:3005/uploads/article/${art.images[0]}`}
                      alt=""
                      className="DetailistBoxPic"
                    />
                    <div className="DetailistBoxT">
                      <div className="DetailistBoxTitle">
                        <div className={`Eventstatus`}>{art.category}</div>
                        <div className="EventTitle">{art.title}</div>
                      </div>
                      <div className="DetailistBoxInfo">
                        發布日期 : {art.update_time}
                      </div>
                    </div>
                    <div
                      className="DetailistBoxArr"
                      onClick={() => handleClick(i)}
                    >
                      <div
                        className={`lineA ${
                          activeIndexes.includes(i) ? "" : "active"
                        }`}
                      />
                      <div
                        className={`lineB ${
                          activeIndexes.includes(i) ? "" : "active"
                        }`}
                      />
                    </div>
                  </div>
                  <div
                    className={`DetailistToggleBox ${
                      activeIndexes.includes(i) ? "active" : ""
                    } ${scaleYIndexes.includes(i) ? "scaleY" : ""}`}
                  >
                    <div className="row gx-5 mb-3">
                      <div className="col-10">
                        <div className="ListInformationT">圖片預覽</div>
                      </div>
                      <div className="col-2">
                        <div className="eventEditIcon">
                          <Link
                            href={`/article/edit/${art.id}`}
                            className="Armallc d-flex align-items-center"
                          >
                            <div className="eventEditIconT d-none d-lg-block">
                              編輯文章
                            </div>
                            <i className="fa-solid fa-pen-to-square EditIconI" />
                          </Link>
                        </div>
                      </div>
                      {art.images.length - 1 > 0 ? (
                        art.images.slice(1).map((image, index) => (
                          <div key={index} className="col-12 col-md-3 mb-4">
                            <div className="eventAge">
                              <div className="eventAgeText">
                                <img
                                  src={`http://localhost:3005/uploads/article/${image}`}
                                  style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center">文中無插入照片</p>
                      )}
                    </div>
                    <div className="row mt-4 gx-5">
                      <div className="col-12">
                        <div className="eventListInfoT">文章概覽</div>
                      </div>
                      <div className="col-12">
                        <div className="ListInfoComment">
                          <div className="eventPList">
                            <div
                              className="ListPComment"
                              style={{ whiteSpace: "pre-wrap" }}
                            >
                              {art.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <ArticlePagination />
          </div>
        </div>
      </>

      <Footer />
    </>
  );
}
