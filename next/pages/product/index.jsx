import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CategoryTitle from "@/components/product-list/header/CategoryTitle";
import SortSearch from "@/components/product-list/sortSearch/SortSearch";
import MobileFliterAside from "@/components/product-list/aside/MobileFliterAside";
import PcFliterAside from "@/components/product-list/aside/PcFliterAside";
import ProductGroup from "@/components/product-list/productlist/ProductList";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import ListPageNation from "@/components/product-list/productlist/ListPageNation";

export default function ProductIndex() {
  const fetchProducts = async (filters = selectFilters) => {
    try {
      // response取得axios的回應數據(內容有很多但我們只要data)
      console.log("Fetching products with filters:", filters);
      const response = await axios.get(`http://localhost:3005/api/product`, {
        params: {
          ...selectFilters,
          sort: currentSort,
          page: currentPage,
          limit: itemsPerPage,
          search: search,
          minPrice:filters.minPrice,
          maxPrice:filters.maxPrice
        },
      });
      setProducts(response.data.products);
      setCategoryies(response.data.categories);
      setTotalPages(response.data.pagination.totalPages);
      setTotalItems(response.data.pagination.totalItems);

      setLoading(false);
    } catch (err) {
      setError("加載商品時出錯");
      setLoading(false);
    }
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategoryies] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    varietes: [],
    origins: [],
    countries: [],
  });
  const [selectFilters, setSelectFilters] = useState({
    category: "",
    variet: "",
    origin: "",
    country: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [currentSort, setCurrentSort] = useState("id_asc");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // 從URL讀取初始參數
    const { page, sort, search: urlSearch } = router.query;
    if (page) setCurrentPage(parseInt(page));
    if (sort) setCurrentSort(sort);
    if (urlSearch) setSearch(urlSearch);
  }, [router.query]);

  useEffect(() => {
    fetchFilters();
  }, [
    selectFilters.category,
    selectFilters.country,
    selectFilters.origin,
    selectFilters.variet,
  ]);

  const fetchFilters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3005/api/product/filters",
        {
          params: selectFilters,
        }
      );
      setFilters(response.data);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  // 掛載後執行一個獲取數據的副作用
  // 使用axios發送get訊息到指定URL API
  useEffect(() => {
    fetchProducts();
    fetchFilters();

    // 更新 URL
    const query = { page: currentPage, sort: currentSort, ...selectFilters };
    if (search) query.search = search;

    router.push(
      {
        pathname: router.pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    );
  }, [currentPage, itemsPerPage, currentSort, search, selectFilters]);

  // 更改頁數的函式
  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  // 更改排序方式的函式
  const changeSort = (newSort) => {
    setCurrentSort(newSort);
    setCurrentPage(1);
  };

  // 搜尋功能
  const changeSearch = (newSearch) => {
    setSearch(newSearch);
    setCurrentPage(1);
    setCurrentSort("id_asc");
  };

  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, [selectFilters, currentPage]);

  const changeFilter = (filterType, value) => {
    setSelectFilters((prev) => {
      const newFilters = { ...prev, [filterType]: value };
      // 重置相關篩選
      if (filterType === "price") {
        if (value === null) {
          // 清除價格篩選
          delete newFilters.minPrice;
          delete newFilters.maxPrice;
        } else {
          newFilters.minPrice = value.min;
          newFilters.maxPrice = value.max;
        }
      }
      if (filterType === "category") {
        newFilters.variet = "";
        newFilters.origin = "";
        newFilters.country = "";
      } else if (filterType === "country") {
        newFilters.origin = "";
      }
      return newFilters;
    });
    setCurrentPage(1); // 重置頁碼
  };

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <>
        <header>
          <Nav />
          {/* TOP的分類名稱 */}
          <CategoryTitle filters={filters} selectFilters={selectFilters} setSelectFilters={setSelectFilters}/>
        </header>
        <div className="container">
          {/* 排序跟搜尋 */}
          <SortSearch
            changeSort={changeSort}
            currentSort={currentSort}
            search={search}
            changeSearch={changeSearch}
            totalItems={totalItems}
          />
          {/* 手機&平板版的開關aside */}
          <MobileFliterAside />
          {/* 主要內容 */}
          <div className="row main-content">
            {/* 電腦版篩選 */}
            <PcFliterAside
              filters={filters}
              selectFilters={selectFilters}
              changeFilter={changeFilter}
            />
            {/* 商品list */}
            <ProductGroup products={products} />
            {/* 分頁 */}
            <ListPageNation
              currentPage={currentPage}
              totalPages={totalPages}
              changePage={changePage}
            />
          </div>
        </div>
        <Footer />
      </>
    </>
  );
}
