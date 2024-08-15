import React from "react";
import { useRouter } from "next/router";

export default function ArticleIndexCardSm({ article }) {
  const router = useRouter();
  const handleClick = () => {
    if (article && article.id) {
      router.push(`/article/${article.id}`);
    }
  };

  return (
    <>
      <div className="col-12 col-lg-6">
        <div className="a-box">
          <div className="a-box-img">
            <img src="./images/article/content-pic.jpeg" alt="" />
          </div>
          <div className="a-box-content">
            <p>{article.category}</p>
            <h4>{article.title}</h4>
            <h5>
              by {article.poster} l {article.update_time}
            </h5>
            <div className="a-readmore">
              <button className="btn a-btn-content" onClick={handleClick}>閱讀文章</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
