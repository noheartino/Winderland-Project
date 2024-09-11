// @ 導入模組
import React, { useState, useEffect } from "react";
// import Image from 'next/image'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { faFilter } from '@fortawesome/free-solid-svg-icons'
import Pagination from "@/components/member/dashboard/order/orderPagination";

import OrderAside from "@/components/member/dashboard/order/OrderAside";
import OrderFilterOffcanvas from "@/components/member/dashboard/order/OrderFilterOffcanvas";
import OrderCard from "./order/OrderCard";
import OrderCardDetail from "./order/OrderCardDetail";
// import OrderCardDetailRWD from '@/components/member/dashboard/order/OrderCardDetailRWD'
// import OrderCardRWD from './order/OrderCardRWD'
import OrderListRWD from "@/components/member/dashboard/order/OrderListRWD";

import styles from "@/components/member/dashboard/order/OrderCardDetail.module.css";

import ClipLoader from "react-spinners/ClipLoader";

// @ 預設導出
export default function DashboardOrder() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: [],
    startDate: "",
    endDate: "",
    sortOrder: "",
    searchTerm: "",
  });

  // 使用對象來存儲每個訂單的展開狀態
  const [expandedStates, setExpandedStates] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      let url = "http://winderland.shop/api/orders/history";
      const params = new URLSearchParams();

      if (filters.status.length > 0) {
        params.append("status", filters.status.join(","));
      }
      if (filters.startDate) {
        params.append("startDate", filters.startDate);
      }
      if (filters.endDate) {
        params.append("endDate", filters.endDate);
      }
      if (filters.sortOrder) {
        params.append("sortOrder", filters.sortOrder);
      }
      if (filters.searchTerm) {
        params.append("searchTerm", filters.searchTerm);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "獲取訂單失敗");
      }
      const data = await response.json();
      setOrders(data.data);
    } catch (error) {
      console.error("獲取訂單時出錯:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 展開詳細訂單
  const toggleDetails = (orderId) => {
    setExpandedStates((prevStates) => ({
      ...prevStates,
      [orderId]: !prevStates[orderId],
    }));
  };
  // 篩選器
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  //處理搜尋
  const handleSearch = (searchTerm) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm,
    }));
  };

  // 計算當前頁面的訂單
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // 更改頁碼
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* desk */}
      <div className="container d-none d-lg-block mb-5">
        <div className=" d-flex">
          <OrderAside onFilterChange={handleFilterChange} />

          <div className="order-list">
            {/* 搜尋框 */}
            <div className="searchPC">
              <div className="search ms-4 mt-2">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="search_icon"
                />
                <input
                  id="search"
                  type="search"
                  placeholder="搜 尋 訂單編號 ／ 日期 "
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            {isLoading ? (
              <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ClipLoader
                  color="#851931"
                  loading={isLoading} // 使用 isLoading 控制加載動畫
                  cssOverride={{
                    display: "block",
                    margin: "0 auto",
                  }}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : currentOrders.length === 0 ? (
              <OrderCard order={null} />
            ) : (
              currentOrders.map((order) => (
                <div key={order.order_uuid} className="order-card card mb-4">
                  <OrderCard order={order} />

                  {expandedStates[order.order_uuid] ? (
                    <>
                      {/* 訂單詳細頁-標題 */}
                      <div className={`${styles.orderDetailTitle} d-flex p-3`}>
                        <div className={`col-7  ${styles.titleLabel}`}>
                          品項
                        </div>
                        <div
                          className={`col-2 ${styles.titleLabelNumber} ${styles.titleLabel}`}
                        >
                          件數
                        </div>
                        <div className={`col-1 ${styles.titleLabel}`}>小計</div>
                        <div className={`col-1`}>
                          <button
                            onClick={() => toggleDetails(order.order_uuid)}
                            className={styles.iconBox}
                          >
                            <i
                              className={`fa-solid fa-chevron-up ${styles.faChevronUp}`}
                            />
                          </button>
                        </div>
                      </div>
                      {/* 訂單詳細頁-內容 */}
                      <OrderCardDetail orderUuid={order.order_uuid} />
                    </>
                  ) : (
                    <div>
                      {/* 訂單欄末 */}
                      <button
                        type="button"
                        className="card-footer text-muted d-flex justify-content-between align-items-center collapsible"
                        onClick={() => toggleDetails(order.order_uuid)}
                      >
                        <div>
                          {new Date(order.created_at).toLocaleDateString(
                            "zh-TW"
                          )}
                        </div>
                        <div>訂單編號 ＃{order.order_uuid}</div>
                        <div>
                          訂單詳情
                          <i className="fa-solid fa-chevron-down" />
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}

            {/* 分頁 */}
            <Pagination
              ordersPerPage={ordersPerPage}
              totalOrders={orders.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>

      {/* rwd */}
      <div className="d-block d-lg-none" id="order-content-rwd">
        <div className="d-flex align-items-center searchArea">
          <div className="search ms-4 mt-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search_icon" />
            <input
              id="search"
              type="search"
              placeholder="搜 尋 訂單編號 ／ 日期 "
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {/* 篩選手風琴元件 */}
          <OrderFilterOffcanvas onFilterChange={handleFilterChange} />
        </div>

        <OrderListRWD orders={currentOrders} isLoading={isLoading} />
      </div>
    </>
  );
}

DashboardOrder.requireAuth = true;
