import express from 'express'
// 連結db.js導入數據庫連接池
import db from '../configs/mysql.js'
// 創建一個新的路由
const router = express.Router();

// 商品首頁
router.get("/",async(req,res) => {
    try{
        const [datas] = await db.query('SELECT * FROM product')
        res.json(datas);
    }catch(error){
        res.status(500).json({
            error:"fail",
            message:"獲取產品列表失敗"
        })
    }
})

// router.get("/category",async(req,res) => {
//     try{
//         const id = req.params.id;
//         const [datas] = await db.query('SELECT category.id,category.name,variet.id,variet.name,varite.category_id FROM category LEFT JOIN variet ON category.id = variet.category.id');
//         res.send(datas);
//     }catch(error){
//         res.status(404).json({
//             error:"NOT FOUNTD",
//             message:"查無此類型"
//         })
//     }
// });


// 取得特定的商品ID
router.get("/:id",async(req,res) => {
    try{
        const id = req.params.id;
        const [data] = await db.query('SELECT * FROM product WHERE id=?',[id])
        if (data.length > 0){
            res.json([data]);
        }else{
            res.status(404).json({
                error:"NOT FOUNTD",
                message:"查無此商品"
            })
        }
    }catch(error){
        res.status(500).json({
            error:"fail",
            message:"獲取產品列表失敗"
        })
    }
})

export default router