import Footer from "@/components/footer/footer";
import Nav from "@/components/Header/Header";
import React from "react";
import style from "./articleCreate.module.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import axios from 'axios';

export default function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [inlineImages, setInlineImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleInlineImageUpload = (e) => {
    // 在此處理內嵌圖片上傳
    const files = Array.from(e.target.files);
    setInlineImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 步驟 1: 提交文章基本資料
      const response = await axios.post('/api/article/new', {
        title,
        content,
        author: "Admin", // 替換為實際作者
        update_time: new Date().toISOString(),
        valid: true,
        images: [] // 初始不需要圖片資料
      });

      const articleId = response.data.articleId;

      // 步驟 2: 上傳首圖
      if (mainImage) {
        const formData = new FormData();
        formData.append('image', mainImage);
        await axios.post(`/api/article/upload-main-image/${articleId}`, formData);
      }

      // 步驟 3: 上傳內嵌圖片
      for (const image of inlineImages) {
        const formData = new FormData();
        formData.append('image', image);
        await axios.post(`/api/article/upload-inline-image/${articleId}`, formData);
      }

      alert('文章和圖片成功上傳');
    } catch (error) {
      console.error(error);
      alert('上傳失敗');
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
          <form className="row px-5">
            <div class={`${style.ACDropArea} my-3`} id="dropArea">
              拖曳文章首圖到這裡
            </div>
            <input
              className={`${style.ACtitle} py-1 mt-3 col-12 border-0`}
              placeholder="標題"
            />
            <p className={`${style.ACtitleLimit}`}>(0/80)</p>
            <textarea
              className={`${style.ACtextarea} col-12 `}
              placeholder="在這裡輸入文章內容..."
              rows={10}
            ></textarea>
            <div className={`${style.AcreateBtn} my-3 col-12 gap-3`}>
              <MdAddPhotoAlternate className={`${style.ACaddPhoto}`} />
              <button className={`${style.ACcloseBtn} btn btn-secondary`}>
                取消
              </button>
              <button className={`${style.ACplusBtn} btn`}>新增文章</button>
            </div>
          </form>
        </div>
      </div>
      {/* 評論區 */}
      {/* <ArticleCommentArea articleId={article.id}  /> */}
      {/* Footer */}
      <Footer />
    </>
  );
}
