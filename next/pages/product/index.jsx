import React, { useState, useEffect, useCallback, useMemo } from "react";
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

  const urlParams = useMemo(() => {
    if (!router.isReady) return null;
    console.log("URL 參數:", router.query);
    console.log("選擇的篩選器:", selectFilters);
    const { page, sort, search, category, variet, origin, country } =
      router.query;
    return {
      page: page ? parseInt(page) : 1,
      sort: sort || "id_asc",
      search: search || "",
      category: category || "",
      variet: variet || "",
      origin: origin || "",
      country: country || "",
    };
  }, [router.isReady, router.query]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/product`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          sort: currentSort,
          search: search,
          category: selectFilters.category,
          variet: selectFilters.variet,
          origin: selectFilters.origin,
          country: selectFilters.country,
        },
      });
      console.log("API 請求參數:", response.config.params);
      setProducts(response.data.products);
      setCategoryies(response.data.categories);
      setTotalPages(response.data.pagination.totalPages);
      setTotalItems(response.data.pagination.totalItems);
      setLoading(false);
    } catch (err) {
      setError("加載商品時出錯");
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, currentSort, search, selectFilters,urlParams]);

  useEffect(() => {
    if (router.isReady) {
      // 從URL讀取初始參數
      const {
        page,
        sort,
        search: urlSearch,
        category,
        variet,
        origin,
        country,
      } = router.query;

      setCurrentPage(page ? parseInt(page) : 1);
      setCurrentSort(sort || "id_asc");
      setSearch(urlSearch || "");
      setSelectFilters({
        category: category || "",
        variet: variet || "",
        origin: origin || "",
        country: country || "",
      });
      fetchProducts({
        category: category || "",
        variet: variet || "",
        origin: origin || "",
        country: country || "",
      });
      fetchFilters();
    }
  }, [router.isReady]);

  const updateURL = useCallback(() => {
    const query = {
      page: currentPage,
      sort: currentSort,
      ...selectFilters,
    };
    if (search !== "") query.search = search;
    Object.keys(query).forEach((key) => query[key] === "" && delete query[key]);

    router.push(
      {
        pathname: router.pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    );
  }, [currentPage, currentSort, selectFilters, search, router]);

  useEffect(() => {
    updateURL();
  }, [currentPage, currentSort, search, selectFilters]);

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

  // 重置篩選器的函式，如果選擇類別會全部重置
  // 如果選擇了國家會重置產地
  const changeFilter = useCallback((filterType, value) => {
    setSelectFilters((prev) => {
      const newFilters = { ...prev, [filterType]: value };
      if (filterType === "category") {
        newFilters.variet = "";
        newFilters.origin = "";
        newFilters.country = "";
      } else if (filterType === "country") {
        newFilters.origin = "";
      }
      return newFilters;
    });
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      fetchProducts();
      fetchFilters();
    }
  }, [router.isReady, currentPage, currentSort, search, selectFilters]);

  if (loading) return <div>加載中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <>
        <header>
          <Nav />
          {/* TOP的分類名稱 */}
          <CategoryTitle
            filters={filters}
            selectFilters={selectFilters}
            setSelectFilters={setSelectFilters}
          />
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
