import React from "react";
import styles from "./RatingArea.module.css";

export default function RatingArea() {
  return (
    <>
      <div className={`row ${styles['rating-area']}`}>
        <div className={`col-9 ${styles["rating-group"]}`}>
          <div className={`${styles["rating-item"]}`}>
            <div className={`${styles["rating-bar"]}`}>
              <span className={`${styles["rating-number"]}`}>5</span>
              <div className={`${styles["bar-container"]}`}>
                <div className={`${styles["bar"]}`} style={{ width:'80%' }}></div>
              </div>
            </div>
          </div>
          <div className={`${styles["rating-item"]}`}>
            <div className={`${styles["rating-bar"]}`}>
              <span className={`${styles["rating-number"]}`}>4</span>
              <div className={`${styles["bar-container"]}`}>
                <div className={`${styles["bar"]}`} style={{ width:'60%' }}></div>
              </div>
            </div>
          </div>
          <div className={`${styles["rating-item"]}`}>
            <div className={`${styles["rating-bar"]}`}>
              <span className={`${styles["rating-number"]}`}>3</span>
              <div className={`${styles["bar-container"]}`}>
                <div className={`${styles["bar"]}`} style={{ width:'30%' }}></div>
              </div>
            </div>
          </div>
          <div className={`${styles["rating-item"]}`}>
            <div className={`${styles["rating-bar"]}`}>
              <span className={`${styles["rating-number"]}`}>2</span>
              <div className={`${styles["bar-container"]}`}>
                <div className={`${styles["bar"]}`} style={{ width:'10%' }}></div>
              </div>
            </div>
          </div>
          <div className={`${styles["rating-item"]}`}>
            <div className={`${styles["rating-bar"]}`}>
              <span className={`${styles["rating-number"]}`}>1</span>
              <div className={`${styles["bar-container"]}`}>
                <div className={`${styles["bar"]}`} style={{ width:'0%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-3 ${styles['rating-score']}`}>
            <span className={`${styles['average-rating']}`}>4.8</span>
            <span className={`${styles['star']}`}><i class="fa-solid fa-star"></i></span>
            <span className={`${styles['review-count']}`}>1200則評論</span>
        </div>
      </div>
    </>
  );
}
