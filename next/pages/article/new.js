import dynamic from "next/dynamic";
import Footer from "@/components/footer/footer";
import Nav from "@/components/Header/Header";
import React, { useState, useRef, useEffect } from "react";
import style from "./articleCreate.module.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import axios from "axios";
import "quill/dist/quill.snow.css";
// 动态导入 Quill
const Quill = dynamic(() => import("quill").then((mod) => mod.default), { ssr: false });

export default function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [inlineImages, setInlineImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [inlineImagePreviews, setInlineImagePreviews] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null); // 用來保存 Quill 編輯器的參考

  useEffect(() => {
    if (isClient && editorRef.current && Quill) {
      quillRef.current = new Quill.default(editorRef.current, {
        theme: "snow",
        placeholder: "在這裡輸入文章內容...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });
  
      // 当内容改变时，更新 content 状态
      quillRef.current.on("text-change", () => {
        setContent(quillRef.current.root.innerHTML);
      });
  
      // 自定义图片上传处理
      quillRef.current.getModule("toolbar").addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
  
        input.onchange = async () => {
          const file = input.files[0];
          const formData = new FormData();
          formData.append("image", file);
  
          // 模拟图片上传，替换成你的API路径
          const res = await axios.post("/api/article/upload-image", formData);
          const imageUrl = res.data.imageUrl;
  
          // 插入图片到 Quill 编辑器
          const range = quillRef.current.getSelection();
          quillRef.current.insertEmbed(range.index, "image", imageUrl);
        };
      });
    }
  }, [isClient]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/article/new", {
        title,
        content: quillRef.current.root.innerHTML, // 提交時獲取編輯器內容
        author: "Admin", 
        update_time: new Date().toISOString(),
        valid: true,
        images: [],
      });

      const articleId = response.data.articleId;

      if (mainImage) {
        const formData = new FormData();
        formData.append("image", mainImage);
        await axios.post(`/api/article/upload-main-image/${articleId}`, formData);
      }

      alert("文章和圖片成功上傳");
    } catch (error) {
      console.error(error);
      alert("上傳失敗");
    } finally {
      setLoading(false);
    }
  };


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
            <div className={`${style.ACtextarea} col-12`}>
              {isClient && <div ref={editorRef}></div>}
            </div>
            {/* <input
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
            </label> */}
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
