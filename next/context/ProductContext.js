import React,{createContext,useContext,useState,useEffect} from "react";
import { useRouter } from "next/router";
import axios from 'axios';

// 建立一個新的context
const ProductContext = createContext();

// 包裝組件，提供context值給子組件
export function ProductProvider({children}){
    // 狀態
    const [product,setProduct] = useState(null);
    const [detail,setDetail] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    // 取得路由參數pid
    const router = useRouter();
    const pid = router.query.pid;

    // 商品數據獲取
    useEffect(() => {
        if(pid){
          const fetchProduct = async () => {
            try{
              setLoading(true);
              const response = await axios.get(`http://localhost:3005/api/product/${pid}`)
              setProduct(response.data);
              if(response.data.details){
                setDetail(response.data.details[0]);
                console.log(detail);
              }
            }catch(err){
              setError("獲取資料失敗");
              console.error(err);
            }finally{
              setLoading(false);
            }
          }
          fetchProduct();
        }
      },[pid])

    // 將所有狀態value提供給子組件
      return (
        <ProductContext.Provider value = {{product,loading,error,detail,setDetail}}>
            {children}
        </ProductContext.Provider>
      );
}

// 自訂義hook 
export function useProduct(){
    const context = useContext(ProductContext);
    if(!context){
      throw new Error("傳送context失敗");
    }
    return context;
}