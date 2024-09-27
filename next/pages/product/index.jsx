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
import Arrtotop from "@/components/Header/arr";
import Head from "next/head";
import ClipLoader from "react-spinners/ClipLoader";

export default function ProductIndex() {
  const [products, setProducts] = useState([]);
  const [noProducts, setNoProducts] = useState(false);
  const [serverError, setServerError] = useState(false);
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
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 新增的狀態
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const router = useRouter();

  const resetFilters = useCallback(() => {
    setSelectFilters((prev) => ({
      ...prev,
      variet: "",
      origin: "",
      country: "",
      minPrice: 0,
      maxPrice: 150000,
    }));
  }, []);

  const resetSearch = useCallback(() => {
    setSearch("");
  }, []);

  const urlParams = useMemo(() => {
    if (!router.isReady) return null;
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

  useEffect(() => {
    if (router.isReady) {
      console.log("URL 參數:", router.query);
      console.log("選擇的篩選器:", selectFilters);
    }
  }, [router.isReady, router.query, selectFilters]);

  useEffect(() => {
    if (selectFilters.country) {
      // 當國家變更時，重新獲取篩選器
      fetchFilters();
      console.log("selectFilters.country", selectFilters.country);
    }
  }, [selectFilters.country]);

  const fetchProducts = useCallback(
    async (filters) => {
      try {
        const response = await axios.get(`https://winderland.shop/api/product`, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            sort: currentSort,
            search: search,
            category: filters.category,
            variet: filters.variet,
            origin: filters.origin,
            country: filters.country,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
          },
        });
        console.log("API 請求參數:", response.config.params);
        setProducts(response.data.products);
        setCategoryies(response.data.categories);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setNoProducts(response.data.products.length === 0);
        setError(null);
      } catch (err) {
        console.error("加載商品時出錯:", err);
        if (err.response && err.response.status === 404) {
          setNoProducts(true);
          setProducts([]);
        } else {
          setError("獲取商品資料錯誤，請稍後再試");
        }
      } finally {
        setLoading(false);
      }
    },
    [currentPage, itemsPerPage, currentSort, search]
  );

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

      const initialFilters = {
        category: category || "",
        variet: variet || "",
        origin: origin || "",
        country: country || "",
      };

      setCurrentPage(page ? parseInt(page) : 1);
      setCurrentSort(sort || "id_asc");
      setSearch(urlSearch || "");
      setSelectFilters(initialFilters);
      fetchProducts(initialFilters);
      fetchFilters();
      setIsInitialLoad(false); // 初始加載完成
    }
  }, [router.isReady]);

  // 新增 useEffect 來控制 body 的滾動
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    // 清理函數
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [isMobileFilterOpen]);

  const updateURL = useCallback(() => {
    if (isInitialLoad) return; // 初始加載時不更新URL
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
  }, [currentPage, currentSort, selectFilters, search, router, isInitialLoad]);

  useEffect(() => {
    updateURL();
  }, [currentPage, currentSort, search, selectFilters]);

  const fetchFilters = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://winderland.shop/api/product/filters",
        {
          params: selectFilters,
        }
      );
      console.log("Fetched filters:", response.data);
      setFilters(response.data);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  }, [selectFilters]);

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
      const newFilters = { ...prev };
      if (filterType === "price") {
        newFilters.minPrice = value.min;
        newFilters.maxPrice = value.max;
      } else {
        newFilters[filterType] = value;
      }

      // 根據選擇的篩選條件重置其他相關篩選器
      if (filterType === "category") {
        newFilters.variet = "";
        newFilters.origin = "";
        newFilters.country = "";
        setSearch("");
      } else if (filterType === "variet") {
        newFilters.origin = "";
        newFilters.country = "";
      } else if (filterType === "country") {
        newFilters.origin = "";
        setSearch("");
      }

      return newFilters;
    });
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      fetchProducts(selectFilters);
      fetchFilters();
    }
  }, [
    router.isReady,
    currentPage,
    currentSort,
    search,
    selectFilters,
    fetchFilters,
  ]);

  const handleCategoryChange = (categoryId) => {
    // 構建新的 URL，只包含 category 参数
    const newQuery = categoryId ? { category: categoryId } : {};

    // 使用 router.push 來更新 URL，替換當前歷史紀錄
    router.push(
      {
        pathname: "/product",
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );

    // 調用 changeFilter 来更新组件狀態
    changeFilter("category", categoryId);

    // 重置其他篩選條件
    changeFilter("country", "");
    changeFilter("origin", "");
    changeFilter("variet", "");
    changeFilter("price", { min: minLimit, max: maxLimit });
    setMinValue(minLimit);
    setMaxValue(maxLimit);
    setPriceRange("0-150000");
  };

  const override = {
    display: "block",
    margin: "0 auto",
  };

  if (loading) {
    return (
      <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ClipLoader
          color="#851931"
          loading={loading}
          cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    ); // 或者返回一個更具體的 loading 元素
  }
  if (error) return <div>{error}</div>;

  return (
    <>
      <>
        <Head>
          <title>醺迷仙園｜商品列表</title>

          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="icon" href="/logo.png" />
        </Head>
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
            noProducts={noProducts}
            onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
            selectFilters={selectFilters}
            handleCategoryChange={handleCategoryChange}
          />
          {/* 手機&平板版的開關aside */}
          <MobileFliterAside
            filters={filters}
            selectFilters={selectFilters}
            changeFilter={changeFilter}
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
            resetFilters={resetFilters}
            fetchProducts={fetchProducts}
            fetchFilters={fetchFilters}
          />
          {/* 主要內容 */}
          <div className="row main-content">
            {/* 電腦版篩選 */}
            <PcFliterAside
              filters={filters}
              selectFilters={selectFilters}
              changeFilter={changeFilter}
              fetchFilters={fetchFilters}
            />
            {/* 商品list */}
            {!noProducts ? (
              <ProductGroup products={products} noProducts={noProducts} />
            ) : (
              <main className={`col-lg-9 col-md-12 ps-lg-4 `}>
                <div>
                  <img
                    style={{ width: "70%", marginLeft: "17%" }}
                    src={`/shop_images/search-result-fin-17.jpg`}
                    alt="No Data"
                  />
                </div>
              </main>
            )}

            {!noProducts && totalPages > 1 && (
              <ListPageNation
                currentPage={currentPage}
                totalPages={totalPages}
                changePage={changePage}
              />
            )}
          </div>
        </div>
        <Arrtotop />
        <Footer />
      </>
    </>
  );
}
