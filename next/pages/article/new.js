import Footer from "@/components/footer/footer";
import Nav from "@/components/Header/Header";
import React, { useState, useRef } from "react";
import style from "./articleCreate.module.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import axios from "axios";
import Head from "next/head";

export default function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [inlineImages, setInlineImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [inlineImagePreviews, setInlineImagePreviews] = useState([]);

  const contentRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  // const handleInlineImageUpload = (e) => {
  //   // 在此處理內嵌圖片上傳
  //   const files = Array.from(e.target.files);
  //   setInlineImages(files);
  //   setInlineImagePreviews(files.map((file) => URL.createObjectURL(file)));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 步驟 1: 提交文章基本資料
      const response = await axios.post("/api/article/new", {
        title,
        content: processContent(contentRef.current.innerHTML),
        author: "Admin", // 替換為實際作者
        update_time: new Date().toISOString(),
        valid: true,
        images: [], // 初始不需要圖片資料
      });

      const articleId = response.data.articleId;

      // 步驟 2: 上傳首圖
      if (mainImage) {
        const formData = new FormData();
        formData.append("image", mainImage);
        await axios.post(
          `/api/article/upload-main-image/${articleId}`,
          formData
        );
      }

      // 步驟 3: 上傳內嵌圖片
      for (const image of inlineImages) {
        const formData = new FormData();
        formData.append("image", image);
        await axios.post(
          `/api/article/upload-inline-image/${articleId}`,
          formData
        );
      }

      alert("文章和圖片成功上傳");
    } catch (error) {
      console.error(error);
      alert("上傳失敗");
    } finally {
      setLoading(false);
    }
  };

  const processContent = (content) => {
    // 替換圖片占位符為 <!--IMAGE_HERE--> 文字
    const imagePlaceholderRegex = /<img[^>]*>/g;
    return content.replace(imagePlaceholderRegex, "<!--IMAGE_HERE-->");
  };

  let savedRange = null;

  const handleInlineImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setInlineImages((prevImages) => [...prevImages, ...newImages]);

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
    if (selection.rangeCount > 0 && contentEditableDiv.contains(selection.anchorNode)) {
      savedRange = selection.getRangeAt(0);
    }
  };
  
  // 在點擊選擇圖片按鈕前保存光標位置
  const handleMouseDown = () => {
    saveSelection();
  };

  return (
    <>
      {/* Header */}
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
      <div className={`container-fuild ${style.ACbg} row`}>
        <div className={`container ${style.AcreatePage} col-lg-7 col-11 py-5`}>
          <div className={`${style.ACnav} col row ps-5 mb-3`}>
            <div className={`${style.ACicon} col-auto`}>
              <p className="m-0"></p>
            </div>
            <div className={`${style.ACname} col`}>
              <p className="m-0">Admin</p>
              <div className={`${style.ACtime}`}>發佈於 08/22</div>
            </div>
          </div>
          <form className="row px-5" onSubmit={handleSubmit}>
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
              className={`${style.ACtitle} py-1 mt-3 col-12 border-0`}
              placeholder="文章標題"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className={`${style.ACtitleLimit}`}>({title.length}/80)</p>
            <div
              className={`${style.ACtextarea} col-12`}
              ref={contentRef}
              contentEditable={true}
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
              onMouseDown={handleMouseDown} // 新增這個事件
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
