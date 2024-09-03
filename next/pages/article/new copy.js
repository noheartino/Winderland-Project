import Footer from "@/components/footer/footer";
import Nav from "@/components/Header/Header";
import React, { useState } from "react";
import style from "./articleCreate.module.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import axios from "axios";

export default function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [inlineImages, setInlineImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [inlineImagePreviews, setInlineImagePreviews] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInlineImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setInlineImages(files);
    setInlineImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 步驟 1: 提交文章基本資料
      const response = await axios.post("/api/article/new", {
        title,
        content: processContent(content), // 替換占位符
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

  return (
    <>
      {/* Header */}
      <Nav />
      <title>新增文章</title>
      <div className={`container-fluid ${style.ACbg} row`}>
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
            <div className={`${style.ACDropArea} my-3`} id="dropArea">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="mainImage"
              />
              <label htmlFor="mainImage">
                {mainImagePreview ? (
                  <img
                    src={mainImagePreview}
                    alt="Main preview"
                    className={style.previewImage}
                  />
                ) : (
                  "拖曳文章首圖到這裡"
                )}
              </label>
            </div>
            <input
              className={`${style.ACtitle} py-1 mt-3 col-12 border-0`}
              placeholder="標題"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className={`${style.ACtitleLimit}`}>({title.length}/80)</p>
            <textarea
              className={`${style.ACtextarea} col-12`}
              placeholder="在這裡輸入文章內容..."
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {inlineImagePreviews.length > 0 && (
              <div className={style.inlineImagePreviews}>
                {inlineImagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Inline preview ${index}`}
                    className={style.previewImage}
                  />
                ))}
              </div>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleInlineImageUpload}
              style={{ display: "none" }}
              id="inlineImages"
            />
            <label htmlFor="inlineImages" className="col-auto d-flex align-items-center">
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