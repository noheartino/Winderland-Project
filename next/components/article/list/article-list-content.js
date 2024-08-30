import React from "react";
import Image from "next/image";
import { ClientPageRoot } from "next/dist/client/components/client-page";

export default function ArticleListContent({ article }) {
  if (!article || !article.images || article.images.length === 0) {
    return null; // 或者可以返回一個預設的加載中佈局
  }

  // 假設 article.content 是從資料庫提取的文章內容
  const content = article.content;
  const imagePlaceholder = /<!--IMAGE_HERE-->/g;
  // + <!--IMAGE_HERE-->這個切的地方往上是一塊區塊

  // 使用 reduce 來處理內容和圖片
  const contentWithImages = content
    .split(imagePlaceholder)
    .reduce((acc, part, index) => {
      // 插入內容部分
      acc.push(part);

      // 檢查是否需要插入圖片
      if (index < article.images.length - 1) {
        // 確保插入圖片不超過圖片數組的長度
        acc.push(
          <div className="aid-content-pic my-4" key={`image-${index}`}>
            <Image
              src={`/images/article/${article.images[index + 1]}`} // 從第二張圖片開始插入
              alt="Description of image"
              width={100}
              height={100}
              priority
            />
          </div>
        );
      }

      return acc;
    }, []);

  return (
    <>
      <div className="aid-content-word">
        {/* 桌機 */}
        <div className="aid-content-p d-none d-lg-block" style={{ whiteSpace: "pre-wrap" }}>
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
