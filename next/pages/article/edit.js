import Footer from "@/components/footer/footer";
import Nav from "@/components/Header/Header";
import React, { useState, useRef, useEffect } from "react";
import style from "./articleCreate.module.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Head from "next/head";
import Link from "next/link";

export default function New() {
  const { auth } = useAuth();
  const [userAccount, setUserAccount] = useState(null);
  const [userId, setUserId] = useState(null);
  // 等待獲取userId
  useEffect(() => {
    // 模擬從 useAuth 中獲取 userId
    const fetchUserId = () => {
      setTimeout(() => {
        const id = auth.userData?.id; // 從 auth 取得 userId
        setUserId(id);
        setUserAccount(auth.userData?.account);
        setLoading(false);
      }, 1000);
    };

    fetchUserId();

    return () => clearTimeout();
  }, [auth]);

  // console.log(userAccount);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [inlineImages, setInlineImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  // const [inlineImagePreviews, setInlineImagePreviews] = useState([]);

  const contentRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  // 新增類別
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // 新增文章內容
  const handleInput = () => {
    const content = contentRef.current.innerHTML;
    setContent(content); // 假設你有一個 state 來存儲內容
  };

  // 上傳預覽文中圖片
  let savedRange = null;

  const handleInlineImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setInlineImages((prevImages) => [...prevImages, ...files]);

    if (!savedRange) return;

    files.forEach((file, index) => {
      const img = document.createElement("img");
      img.src = newImages[index];
      img.alt = "inline-image";
      img.className = style.inlineImage;

      // 插入圖片到保存的光標位置
      savedRange.insertNode(img);

      // 移動光標到圖片後面
      savedRange.setStartAfter(img);
      savedRange.collapse(true);

      // 更新選區以確保光標位置正確
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRange);
    });

    // 插入後重置保存的光標位置
    savedRange = null;
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    const contentEditableDiv = contentRef.current;
    if (
      selection.rangeCount > 0 &&
      contentEditableDiv.contains(selection.anchorNode)
    ) {
      savedRange = selection.getRangeAt(0);
    }
  };

  // 在點擊選擇圖片按鈕前保存光標位置
  const handleMouseDown = () => {
    saveSelection();
  };

  const processContent = (content) => {
    // 暫時將 <!--IMAGE_HERE--> 替換為特殊標記
    const placeholder = "UNIQUE_IMAGE_PLACEHOLDER";
    const imagePlaceholderRegex = /<img[^>]*>/g;
    let processedContent = content.replace(imagePlaceholderRegex, placeholder);

    // 將 <br> 或 <div> 替換為換行符號，其他 HTML 標籤去除
    processedContent = processedContent
      .replace(/<br\s*\/?>/g, "\n") // 將 <br> 替換為換行符號
      .replace(/<\/?div[^>]*>/g, "\n") // 將 <div> 替換為換行符號
      .replace(/<span[^>]*>(.*?)<\/span>/g, "$1") // 去除 <span> 標籤，保留內部文字
      .replace(/<[^>]+>/g, ""); // 去除所有其他 HTML 標籤

    // 將特殊標記替換回 <!--IMAGE_HERE-->
    processedContent = processedContent.replace(
      new RegExp(placeholder, "g"),
      "<!--IMAGE_HERE-->"
    );

    // 處理多餘的換行符號
    processedContent = processedContent.replace(/\n{2,}/g, "\n\n"); // 將多餘的連續換行符號替換為兩個換行符號

    return processedContent.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 處理內容中的圖片佔位符
    const processedContent = processContent(contentRef.current.innerHTML);
    try {
      // 步驟 1: 提交文章基本資料
      const response = await axios.post(
        "http://localhost:3005/api/article/new",
        {
          title,
          category,
          content: processedContent,
          poster: "Admin", // 替換為實際作者
          update_time: new Date().toISOString(),
          valid: "1", // 初始不需要圖片資料
        }
      );

      const articleId = response.data.articleId;

      // 步驟 2: 上傳首圖
      if (mainImage) {
        const formData = new FormData();
        formData.append("image", mainImage);
        await axios.post(
          `http://localhost:3005/api/article/upload-main-image/${articleId}`,
          formData
        );
      }

      // 步驟 3: 上傳內嵌圖片
      for (const image of inlineImages) {
        const formData = new FormData();
        formData.append("image", image);
        console.log(formData);
        await axios.post(
          `http://localhost:3005/api/article/upload-inline-image/${articleId}`,
          formData
        );
      }

      alert("文章和圖片成功上傳");
      router.push(`/article/${articleId}`);
    } catch (error) {
      console.error(error);
      alert("上傳失敗");
    } finally {
      setLoading(false);
    }
  };
  // console.log(inlineImages);
  // console.log(category);
  // console.log(title);
  // console.log(mainImage);
  // console.log(contentRef.current.innerHTML);
  return (
    <>
    <Head>
        <title>新增文章</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />
      {/* Banner */}
      <div className="container-fluid a-banner">
          <h2>相關文章</h2>
          <h3>Aritcle</h3>
        </div>
      <div className="eventManageNav">
        <div className="container">
          <div className="ManageNavT">文章管理</div>
          <div className="ManageNavList">
            <Link href="/article/new" className="Armall">
              <div className="NavListLi NowUnderLI">新增文章</div>
            </Link>
            <Link href="/article/myarticle" className="Armall">
              <div className="NavListLi">我的文章</div>
            </Link>
            <Link href="/article/edit" className="Armall">
              <div className="NavListLi">編輯文章</div>
            </Link>
          </div>
        </div>
      </div>
      {/* Header */}

      <div className={`container-fuild ${style.ACbg} row`}>
        <div className={`container ${style.AcreatePage} col-lg-7 col-11 py-5`}>
          <div className={`${style.ACnav} col row ps-5 mb-3`}>
            <div className={`${style.ACicon} col-auto`}>
              <p className="m-0"></p>
            </div>
            <div className={`${style.ACname} col`}>
              <p className="m-0">{userAccount}</p>
              <div className={`${style.ACtime}`}>發佈於 08/22</div>
            </div>
          </div>
          <form className="row px-5" onSubmit={handleSubmit}>
            <select
              className={`${style.ACCategory} my-2 py-2 col-4`}
              value={category} // 設定選取值
              onChange={handleCategoryChange} // 監聽變更
            >
              <option value="" disabled>
                請選擇類別
              </option>
              <option value="葡萄酒小知識">知識</option>
              <option value="產區特色">產區特色</option>
              <option value="葡萄品種介紹">品種介紹</option>
              <option value="搭配餐點推薦">搭配餐點</option>
              <option value="調酒知識">調酒知識</option>
            </select>
            <div
              className={`${style.ACDropArea} my-3 col-12 p-2`}
              id="dropArea"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="mainImage"
              />
              <label className={`${style.imagePreBlock}`} htmlFor="mainImage">
                {mainImagePreview ? (
                  <img
                    src={mainImagePreview}
                    alt="Main preview"
                    className={style.previewImage}
                  />
                ) : (
                  "點擊加入文章首圖"
                )}
              </label>
            </div>

            <input
              className={`${style.ACtitle} py-1 mt-2 col-12`}
              placeholder="文章標題"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className={`${style.ACtitleLimit}`}>({title.length}/50)</p>
            <div
              className={`${style.ACtextarea} col-12`}
              ref={contentRef}
              contentEditable={true}
              onInput={handleInput}
            ></div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleInlineImageUpload}
              style={{ display: "none" }}
              id="inlineImages"
            />
            <label
              htmlFor="inlineImages"
              className="col-auto d-flex align-items-center"
              onMouseDown={handleMouseDown}
            >
              <MdAddPhotoAlternate className={`${style.ACaddPhoto}`} />
            </label>
            <div className={`${style.AcreateBtn} my-3 col gap-3`}>
              <button
                className={`${style.ACcloseBtn} btn btn-secondary`}
                type="button"
              >
                取消
              </button>
              <button
                className={`${style.ACplusBtn} btn`}
                type="submit"
                disabled={loading}
              >
                {loading ? "新增中..." : "新增文章"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
