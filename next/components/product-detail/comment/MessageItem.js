import React from "react";
import styles from "./MessageItem.module.css";

export default function MessageItem() {
  return (
    <>
      <div className={`${styles["message-item"]}`}>
        <div className={`${styles["message-user"]}`}>
          <div className={`${styles["user-photo"]}`}>
            <img
              className={`${styles["photo"]}`}
              src="/product_images/chiikawa.jfif"
              alt=""
            />
          </div>
          <div className={`${styles["name-star"]}`}>
            <div className={`${styles["user"]}`}>
              <div className={`${styles["user-name"]}`}>吉伊</div>
              <div className={`${styles["floor-good"]}`}>
                <span>B1</span>
                <span className={`${styles["divider"]}`}> | </span>
                <button className={`${styles["good-button"]}`} type="button">
                  <i className={`fa-regular fa-thumbs-up ${styles['good-icon']}`}></i>
                  251
                </button>
              </div>
            </div>
            <div className={`${styles["user-star"]}`}>
              <div className={`${styles["stars"]}`}>
                <i className={`fa-solid fa-star ${styles["light"]}`}></i>
                <i className={`fa-solid fa-star ${styles["light"]}`}></i>
                <i className={`fa-solid fa-star ${styles["light"]}`}></i>
                <i className={`fa-solid fa-star ${styles["light"]}`}></i>
                <i className={`fa-solid fa-star ${styles["light"]}`}></i>
              </div>
              <div className={`${styles["score"]}`}>4.8</div>
            </div>
          </div>
        </div>
        <div className={`${styles["more-content"]}`}>
          <div itemType="button" className={`${styles["more"]}`}>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
          <div className={`${styles["message-content"]}`}>
            <p className={`${styles["comment-text"]}`}>屋哇哇屋挖~~~♪</p>
          </div>
          <div className={`${styles["time"]}`}>發佈於 2024.08.05, 14:22:25</div>
        </div>
      </div>

      <div className={`mt-5 ${styles["message-item"]}`}>
        <div className={`${styles["message-user"]}`}>
          <div className={`${styles["user-photo"]}`}>
            <img
              className={`${styles["photo"]}`}
              src="/product_images/usagi.jfif"
              alt=""
            />
          </div>
          <div className={`${styles["name-star"]}`}>
            <div className={`${styles["user"]}`}>
              <div className={`${styles["user-name"]}`}>烏薩奇</div>
              <div className={`${styles["floor-good"]}`}>
                <span>B1</span>
                <span className={`${styles["divider"]}`}> | </span>
                <button className={`${styles["good-button"]}`} type="button">
                  <i className={`fa-regular fa-thumbs-up ${styles['good-icon']}`}></i>
                  1000
                </button>
              </div>
            </div>
            <div className={`${styles["user-star"]}`}>
              <div className={`${styles["stars"]}`}>
                <i className={`fa-solid fa-star ${styles["light"]}`}></i>
                <i className={`fa-solid fa-star`}></i>
                <i className={`fa-solid fa-star`}></i>
                <i className={`fa-solid fa-star`}></i>
                <i className={`fa-solid fa-star`}></i>
              </div>
              <div className={`${styles["score"]}`}>1.0</div>
            </div>
          </div>
        </div>
        <div className={`${styles["more-content"]}`}>
          <div itemType="button" className={`${styles["more"]}`}>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
          <div className={`${styles["message-content"]}`}>
            <p className={`${styles["comment-text"]}`}>樓上吵啥</p>
          </div>
          <div className={`${styles["time"]}`}>發佈於 2024.08.05, 14:23:55</div>
        </div>
      </div>
    </>
  );
}
