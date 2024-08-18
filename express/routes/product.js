import express from 'express'
// 連結db.js導入數據庫連接池
import db from '../configs/mysql.js'
// 創建一個新的路由
const router = express.Router()

// 取得所有商品
const getProducts = `SELECT 
    product.*,
    variet.name AS variet_name,
    category.id AS category_id,
    category.name AS category_name,
    country.id AS country_id,
    country.name AS country_name,
    origin.name AS origin_name
FROM 
    product
LEFT JOIN 
    variet ON product.variet_id = variet.id
LEFT JOIN 
    category ON variet.category_id = category.id
LEFT JOIN
	origin ON product.origin_id = origin.id
LEFT JOIN 
	country ON origin.country_id = country.id`

// 取得指定id的商品
const getIdProduct = `SELECT 
    product.*,
    variet.name AS variet_name,
    category.id AS category_id,
    category.name AS category_name,
    country.id AS country_id,
    country.name AS country_name,
    origin.name AS origin_name
FROM 
    product
LEFT JOIN 
    variet ON product.variet_id = variet.id
LEFT JOIN 
    category ON variet.category_id = category.id
LEFT JOIN
	origin ON product.origin_id = origin.id
LEFT JOIN 
	country ON origin.country_id = country.id
WHERE product.id=?`

// 取得detail
const getProductsDetail = `SELECT * FROM product_detail WHERE product_id IN (?)`

// 取得images
const getImages = `SELECT * FROM images_product WHERE product_id IN (?)`

// 取得description
const getDescription = `SELECT * FROM description WHERE product_id IN (?)`

// 整理商品資訊的函式
const tidyProduct = async (products) => {
  try {
    // 獲取所有商品ID
    const productIds = products.map((p) => p.id)

    // 獲取所有商品詳細信息
    const [details] = await db.query(getProductsDetail, [productIds])
    const [images] = await db.query(getImages, [productIds])
    const [descriptions] = await db.query(getDescription, [productIds])

    //將詳細資料加到相對應的id
    return products.map((product) => ({
      ...product,
      images: images.filter((i) => i.product_id === product.id),
      descriptions: descriptions.filter((d) => d.product_id === product.id),
      details: details.filter((d) => d.product_id === product.id),
    }))
  } catch (error) {
    console.error('Error in tidyProducts:', error)
    throw error
  }
}

// 商品首頁,取得所有商品的內容
router.get('/', async (req, res) => {
  try {
    // 獲取所有商品的基本訊息
    const [products] = await db.query(getProducts)

    const productWithDetails = await tidyProduct(products)

    res.json(productWithDetails)
  } catch (error) {
    res.status(500).json({
      error: 'fail',
      message: '獲取產品列表失敗',
    })
  }
})

// 取得特定的商品ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const [products] = await db.query(getIdProduct, [id])

    if (products.length === 0) {
      res.status(404).json({
        error: 'NOT FOUNTD',
        message: '查無此商品',
      })
    }

    const productWithDetails = await tidyProduct(products)
    res.json(productWithDetails)
  } catch (error) {
    res.status(500).json({
      error: 'fail',
      message: '獲取產品列表失敗',
    })
  }
})

export default router
