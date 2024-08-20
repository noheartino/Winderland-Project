import React from "react";
import { useRouter } from "next/router";

export default function ArticleIndexCard({ article }) {
  const router = useRouter();
  const handleLink = () => {
    if (article && article.id) {
      router.push(`/article/${article.id}`);
    }
  };

  return (
    <>
      <div className="col-12 col-lg-12">
        <div className="a-box">
          <div className="a-box-img">
            {article.images.length > 0 ? (
              <img
                src={`../images/article/${article.images[0]}`}
                alt="Article Image"
              />
            ) : (
              <img
                src={`../images/article/content-pic.jpeg`}
                alt="Default Image"
              />
            )}
          </div>
          <div className="a-box-content">
            <p>{article.category}</p>
            <h4>{article.title}</h4>
            <h5>
              by {article.poster} l {article.update_date}
            </h5>
            <div className="a-readmore">
              <button className="btn a-btn-content" onClick={handleLink}>
                閱讀文章
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
