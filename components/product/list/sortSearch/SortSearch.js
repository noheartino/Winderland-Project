import React, { useState } from "react";
import styles from "./SortSearch.module.css";
import MobileFliterAside from "../aside/MobileFliterAside";

export default function SortSearch() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* top的排序+搜尋欄 */}
      <div className={`row ${styles["shop-fliterSearch"]}`}>
        <div className="col-7" />
        {/* top的排序欄 */}
        <div className={`col-2 ${styles["shop-fliter"]}`}>
          <form action="" method="">
            <select name="" id="">
              <option value={0}>默認排序</option>
              <option value={1}>選項1</option>
              <option value={2}>選項2</option>
              <option value={3}>選項3</option>
            </select>
          </form>
        </div>
        {/* top的search欄 */}
        <div className={`col-3 ${styles["shop-search"]}`}>
          <form action="" method="">
            <input type="search" className="" placeholder="搜尋關鍵字" />
            <button>
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </form>
        </div>
      </div>
      {/* 手機搜尋+篩選 */}
      <div className={`row ${styles["shop-fliterSearch-m"]}`}>
        <div className={`col-md-11 col-10 ${styles["shop-search-m"]}`}>
          <form action="" method="">
            <input type="search" className="" placeholder="搜尋關鍵字" />
            <i
              className={`fa-solid fa-magnifying-glass ${styles["search-icon"]}`}
            />
          </form>
        </div>
        <div
          className={`col-md-1 col-2 ${styles["shop-fliter-m"]} ${styles["aside-open-button"]}`}
        >
          <button className={`${styles["fliter-icon"]}`} onClick={handleOpen}>
            <img src="/shop_images/fliter-icon.svg" alt="" />
          </button>
        </div>
      </div>
      {/* 手機排序 */}
      <div className={`${styles["shop-port"]}`}>
        <div className={`${styles["port-top"]}`}>綜合排名</div>
        <div className={`${styles["port-hr"]}`}>|</div>
        <div className={`${styles["port-new"]}`}>最新</div>
        <div className={`${styles["port-hr"]}`}>|</div>
        <div className={`${styles["port-sales"]}`}>銷量</div>
        <div className={`${styles["port-hr"]}`}>|</div>
        <div className={`${styles["port-price"]}`}>價格</div>
      </div>
      <MobileFliterAside isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
