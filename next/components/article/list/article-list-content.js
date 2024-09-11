import React from "react";
import Image from "next/image";
import { ClientPageRoot } from "next/dist/client/components/client-page";

export default function ArticleListContent({ article }) {
  if (!article || !article.images || article.images.length === 0) {
    return null; // 返回預設佈局或其他內容
  }

  const content = article.content;
  const imagePlaceholder = /<!--IMAGE_HERE-->/g;

  // 將文章內容用佔位符分割
  const contentParts = content.split(imagePlaceholder);
  // console.log(contentParts)
  // 使用 map 將內容與圖片組合
  const contentWithImages = contentParts.map((part, index) => {
    // 插入文本部分
    const textElement = <p key={`text-${index}`}>{part}</p>;

    // 插入圖片部分，如果不是最後一個段落，則插入對應的圖片
    const imageElement =
      index < article.images.length - 1 ? (
        <div className="aid-pic">
          <img
            src={`http://winderland.shop/uploads/article/${article.images[index + 1]}`}
            alt={`Image ${index + 1}`}
            key={`image-${index + 1}`}
          />
        </div>
      ) : null; // 確保最後一個段落不插入圖片

    // 返回文本段和對應的圖片
    return (
      <React.Fragment key={`fragment-${index}`}>
        {textElement}
        {imageElement}
      </React.Fragment>
    );
  });

  return (
    <>
      <div className="aid-content-word">
        {/* 桌機 */}
        <div key={article.id} className="aid-content-p d-none d-lg-block" style={{ whiteSpace: "pre-wrap" }}>

          {contentWithImages}
        </div>
        {/* rwd */}
        <div className="aid-content-p-sm d-lg-none px-4" style={{ whiteSpace: "pre-wrap" }}>
          {contentWithImages}
        </div>
      </div>
    </>
  );
}
