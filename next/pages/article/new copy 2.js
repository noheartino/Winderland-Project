import Footer from "@/components/footer/footer";
import Nav from "@/components/Header/Header";
import React, { useState, useRef } from "react";
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

  const handleInlineImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setInlineImages((prevImages) => [...prevImages, ...newImages]);

    // 插入圖片到contenteditable的div中
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    files.forEach((file, index) => {
      const img = document.createElement("img");
      img.src = newImages[index];
      img.alt = "inline-image";
      img.className = style.inlineImage;
      range.insertNode(img);
      range.collapse(false);
    });
  };

  // const handleInput = (e) => {
  //   const caretPosition = saveCaretPosition();
  //   setContent(e.target.innerHTML);
  //   restoreCaretPosition(caretPosition);
  // };
  // const saveCaretPosition = () => {
  //   const selection = window.getSelection();
  //   if (selection.rangeCount === 0) return null;
  //   const range = selection.getRangeAt(0);
  //   const preSelectionRange = range.cloneRange();
  //   preSelectionRange.selectNodeContents(contentRef.current);
  //   preSelectionRange.setEnd(range.startContainer, range.startOffset);
  //   const start = preSelectionRange.toString().length;
  //   return { start };
  // };

  // const restoreCaretPosition = (caretPosition) => {
  //   const range = document.createRange();
  //   const selection = window.getSelection();
  //   let node = contentRef.current;
  //   const stack = [node];
  //   let start = caretPosition.start;
  //   let foundStart = false;

  //   while (stack.length > 0) {
  //     node = stack.pop();
  //     if (node.nodeType === Node.TEXT_NODE) {
  //       const nodeLength = node.nodeValue.length;
  //       if (!foundStart && start <= nodeLength) {
  //         range.setStart(node, start);
  //         range.setEnd(node, start);
  //         foundStart = true;
  //       }
  //       start -= nodeLength;
  //     } else {
  //       let i = node.childNodes.length;
  //       while (i--) {
  //         stack.push(node.childNodes[i]);
  //       }
  //     }
  //   }

  //   selection.removeAllRanges();
  //   selection.addRange(range);
  // };
  return (
    <>
      {/* Header */}
      <Nav />
      <title>新增文章</title>
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
            <div
              className={`${style.ACtextarea} col-12`}
              ref={contentRef}
              contentEditable={true}
              // onInput={handleInput}
              // dangerouslySetInnerHTML={{ __html: content }}
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
