import Footer from "@/components/footer/footer";
import Nav from "@/components/Header/Header";
import React, { useState, useRef, useEffect } from "react";
import style from "../articleCreate.module.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Head from "next/head";
import Swal from "sweetalert2";
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
  const contentRef = useRef(null);

  // 呼叫當前id文章資料
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const { anid } = router.query; // 取得路由中的 id 參數
    if (router.isReady) {
      fetch(`http://localhost:3005/api/article/${anid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response not ok");
          }
          return response.json();
        })
        .then((data) => {
          // 處理 articles 資料，將 images 字段轉換為數組
          const processedArticle = {
            ...data,
            images: data.images ? data.images.split(",") : [],
          };
          setArticle(processedArticle);
          setTitle(processedArticle.title);
          setCategory(processedArticle.category);
          setMainImagePreview(
            `http://localhost:3005/uploads/article/${processedArticle.images[0]}`
          );
          setMainImage(processedArticle.images[0]);
          // setContent(processedArticle.content);
          setInlineImages(processedArticle.images);
          console.log(article);
          // 處理文章內容，將 <!--IMAGE_HERE--> 佔位符替換為圖片
          if (contentRef.current) {
            const content = processedArticle.content || "";
            const images = Array.isArray(processedArticle.images)
              ? processedArticle.images
              : [];
            const imagePlaceholder = /<!--IMAGE_HERE-->/g;

            const contentWithImages = content
              .split(imagePlaceholder)
              .reduce((acc, part, index) => {
                acc.push(part);

                if (index < images.length - 1) {
                  const imageHTML = `
                    <img src="http://localhost:3005/uploads/article/${
                        images[index + 1]}" 
                          class="editInlineImage"
                          alt="${images[index + 1]}" <img/>
                    `;

                  acc.push(imageHTML);
                }

                return acc;
              }, [])
              .join(""); // 將陣列轉回字串

            // 移除不必要的空白字元和多餘的空行
            const cleanedContent = contentWithImages
              // 替換連續的空行（兩行以上）為單行空行
              .replace(/(\n\s*){2,}/g, "\n")
              .trim();

            contentRef.current.innerHTML = cleanedContent;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.isReady]);

  // console.log(article.images);
  // console.log(contentRef.current.innerHTML);
  // console.log(contentRef.current.innerHTML);

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
    // Step 1: 提取出所有的 img 標籤的 alt 屬性
    const imgElements = contentRef.current.getElementsByTagName("img");
    const currentAltAttributes = Array.from(imgElements).map((img) => img.alt);

    console.log("Current alt attributes:", currentAltAttributes);

    // Step 2: 過濾 inlineImages，保留 alt 屬性中已存在的文件
    const updatedInlineImages = inlineImages.filter((file) =>
      currentAltAttributes.includes(file.name)
    );
    console.log("Updated inlineImages:", updatedInlineImages);
    // Step 3: 更新 inlineImages 狀態
    setInlineImages(updatedInlineImages);

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
      img.alt = `${file.name}`;
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
  // const imgElements = contentRef.current.getElementsByTagName("img");
  // const existingInlineImages = Array.from(imgElements).map((img) => img.alt);
  // console.log(existingInlineImages)
  // console.log(inlineImages)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Step 1: 处理内容中的图片占位符并提取相关数据
    const processedContent = processContent(contentRef.current.innerHTML);

    // 提取现有的图片 alt 属性，作为现有内嵌图片路径
    const imgElements = contentRef.current.getElementsByTagName("img");
    const existingInlineImages = Array.from(imgElements).map((img) => img.alt);
    console.log(existingInlineImages)
    // console.log(inlineImages)
    try {
      // 使用 FormData 来处理复杂的多部分请求
      const formData = new FormData();

      // 添加基本文章数据
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", processedContent);
      formData.append("update_time", new Date().toISOString());
      formData.append("valid", "1");

      // 添加现有内嵌图片路径
      formData.append(
        "existingInlineImages",
        JSON.stringify(existingInlineImages)
      );

      // 添加首图（如果存在）
      if (mainImage) {
        formData.append("mainImage", mainImage);
      }

      // 添加新的内嵌图片
      inlineImages.forEach((image) => {
        formData.append("inlineImages", image);
      });

      // 发送更新请求到后端
      const response = await axios.put(
        `http://localhost:3005/api/article/update/${article.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "成功",
        text: "文章圖片成功更新",
        icon: "success",
        confirmButtonText: "確定",
      });
      router.push(`/article/detail/${article.id}`);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "上傳失敗",
        text: "請稍後再試",
        icon: "error",
        confirmButtonText: "確定",
      });
    } finally {
      setLoading(false);
    }
  };

  const date = new Date().toISOString().split("T")[0];
  console.log("行內圖：" + inlineImages);
  console.log("類別：" + category);
  console.log("標題：" + title);
  console.log("首圖：" + mainImage);
  console.log(inlineImages);
  console.log(mainImage)
  // console.log(contentRef.current.innerHTML);
  return (
    <>
      <Head>
        <title>醺迷仙園｜編輯文章</title>

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
              <div className="NavListLi">新增文章</div>
            </Link>
            <Link href="/article/myarticle" className="Armall">
              <div className="NavListLi">我的文章</div>
            </Link>
            <Link href="/article/edit" className="Armall">
              <div className="NavListLi NowUnderLI">編輯文章</div>
            </Link>
          </div>
        </div>
      </div>
      {/* Header */}

      <div className={`container-fuild ${style.ACbg} row`}>
        <div className={`container ${style.AcreatePage} col-lg-7 col-11 py-5`}>
          <div className={`${style.ACnav} col row ps-5 mb-3`}>
            <div className={`${style.ACicon} col-auto p-0`}>
              <img
                src="/images/member/avatar/default-avatar.jpg"
                className="m-0"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </div>
            <div className={`${style.ACname} col ms-3`}>
              <p className="m-0">{article.poster}</p>
              <div className={`${style.ACtime}`}>
                發佈於 {article.update_date}
              </div>
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
              placeholder={`${article.title}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className={`${style.ACtitleLimit}`}>({title.length}/50)</p>
            <div
              className={`${style.ACtextarea} col-12 p-2`}
              style={{ whiteSpace: "pre-wrap" }}
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
              <Link href={"/article/myarticle"}><button
                className={`${style.ACcloseBtn} btn btn-secondary`}
                type="button"
              >
                取消
              </button></Link>
              <button
                className={`${style.ACplusBtn} btn`}
                type="submit"
                disabled={loading}
              >
                {loading ? "編輯中..." : "編輯文章"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
