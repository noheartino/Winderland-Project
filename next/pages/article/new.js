import Footer from "@/components/footer/footer";
import Nav from "@/components/Header/Header";
import React from "react";
import style from "@/components/article/articleCreate.module.css";

export default function New() {
  return (
    <>
      {/* Header */}
      <Nav />
      <title>新增文章</title>
      <div className="container-fuild ACbg row">
        <div className={`container ${style.AcreatePage} col-lg-7 col-11`}>
          <div className={`${style.ACnav} col row`}>
              <div className={`${style.ACicon} col-2`}>
                <p>Ad</p>
              </div>
              <div className={`${style.ACname} col-3`}>Admin</div>
              <div className={`${style.ACtime} col-7`}>發佈於 08/22</div>
          </div>
          <form className="row">
            <input className="h5 p-3" placeholder="標題"></input>
            <textarea className="" placeholder="內容" rows={10}></textarea>
            <div className="AcreateBtn my-3 d-flex">
              <button className="btn btn-secondary">取消</button>
              <button className="btn btn-primary">下一步</button>
            </div>
          </form>
        </div>
      </div>
      {/* 評論區 */}
      {/* <ArticleCommentArea articleId={article.id}  /> */}
      {/* Footer */}
      <Footer />
    </>
  );
}
