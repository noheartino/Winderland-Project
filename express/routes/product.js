import express from 'express'
// 連結db.js導入數據庫連接池
import db from '../configs/mysql.js'
// 創建一個新的路由
const router = express.Router()

// 取得所有商品
let getProducts = `SELECT 
    product.*,
    variet.name AS variet_name,
    variet.name_en AS variet_nameEN,
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
`

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
const getProductsDetails = `SELECT * FROM product_detail WHERE valid = 1 && product_id IN (?)`

// 取得images
const getImages = `SELECT * FROM images_product WHERE product_id IN (?)`

// 取得description
const getDescription = `SELECT * FROM description WHERE product_id IN (?)`

// 取得基礎分類
const getCategories = 'SELECT * FROM category'

// 取得variet
const getVariet = `SELECT * FROM variet WHERE category_id IN (?)`

// 整理商品資訊的函式(多個)
const tidyProducts = async (products) => {
  try {
    // 獲取所有商品ID
    const productIds = products.map((p) => p.id)

    // 獲取評分信息
    const [ratings] = await db.query(
      `
      SELECT 
        entity_id AS product_id, 
        AVG(rating) AS avg_rating, 
        COUNT(*) AS rating_count
      FROM comments 
      WHERE entity_type = 'product' AND entity_id IN (?)
      GROUP BY entity_id
    `,
      [productIds]
    )

    // 獲取銷量信息
    const [sales] = await db.query(
      `
      SELECT 
        product_id, 
        SUM(sales) AS total_sales
      FROM product_detail
      WHERE product_id IN (?)
      GROUP BY product_id
    `,
      [productIds]
    )

    // 獲取所有商品詳細信息
    const [details] = await db.query(getProductsDetails, [productIds])
    const [images] = await db.query(getImages, [productIds])
    const [descriptions] = await db.query(getDescription, [productIds])

    //將詳細資料加到相對應的id
    return products.map((product) => ({
      ...product,
      images: images.filter((i) => i.product_id === product.id),
      descriptions: descriptions.filter((d) => d.product_id === product.id),
      details: details.filter((d) => d.product_id === product.id),
      ratings: ratings.find((r) => r.product_id === product.id) || {
        avg_rating: 0,
        rating_count: 0,
      },
      sales: sales.find((s) => s.product_id === product.id) || {
        total_sales: 0,
      },
    }))
  } catch (error) {
    console.error('Error in tidyProducts:', error)
    throw error
  }
}

// 整理商品資訊的函式(單個)
const tidyProduct = async (product) => {
  try {
    const pid = product[0].id

    // 獲取所有商品詳細信息
    const [details] = await db.query(
      'SELECT * FROM product_detail WHERE valid = 1 && product_id = ?',
      [pid]
    )
    const [images] = await db.query(
      'SELECT * FROM images_product WHERE product_id = ?',
      [pid]
    )
    const [descriptions] = await db.query(
      'SELECT * FROM description WHERE product_id = ?',
      [pid]
    )
    const [comments] = await db.query(
      `SELECT 
    comments.* ,
    users.account AS account,
    users.gender AS user_gender
    FROM 
        comments 
    LEFT JOIN
        users ON comments.user_id = users.id
    LEFT JOIN
        images_user ON comments.user_id = images_user.user_id
    WHERE
        entity_type = "product" && entity_id = ?`,
      [pid]
    )

    //將詳細資料加到相對應的id
    return product.map((product) => ({
      ...product,
      images: images,
      descriptions: descriptions,
      details: details,
      comments: comments,
    }))
  } catch (error) {
    console.error('Error in tidyProducts:', error)
    throw error
  }
}

const tidyCategories = async (categories) => {
  try {
    // 取得所有category id
    const cids = categories.map((c) => c.id)

    // 取得相對應的variet
    const [variets] = await db.query(getVariet, [cids])

    // 加到對應的category_id
    return categories.map((category) => ({
      ...category,
      variets: variets.filter((v) => v.category_id === category.id),
    }))
  } catch (error) {
    console.error('Error in tidyCategories:', error)
    throw error
  }
}

// 以下為路由們
// 商品首頁,取得所有商品的內容
router.get('/', async (req, res) => {
  try {
    const { category, variet, origin, country, search, minPrice, maxPrice } =
      req.query
    // 設定預設頁數1，limit一頁限制多少筆，offset要跳過幾筆
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const sort = req.query.sort || 'id_asc'

    let query = getProducts
    let conditions = ['product.valid = 1']
    let params = []

    // 取得搜尋參數塞進搜尋商品的sql語法
    if (category) {
      conditions.push('category.id = ?')
      params.push(parseInt(category))
    }

    if (variet) {
      conditions.push('variet.name = ?')
      params.push(variet)
    }
    if (origin) {
      conditions.push('origin.id = ?')
      params.push(origin)
    }
    if (country) {
      conditions.push('country.id = ?')
      params.push(country)
    }
    if (search) {
      conditions.push('product.name LIKE ?')
      params.push(`%${search}%`)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    console.log('最終 SQL 查詢:', query)
    console.log('查詢參數:', params)

    // 獲取分頁後商品的基本訊息
    const [products] = await db.query(query, params)

    if (products.length === 0) {
      // 如果沒有找到商品，立即返回錯誤
      return res.status(404).json({
        error: 'fail',
        message: '沒有找到商品',
      })
    }

    // 取得所有分類
    const [categories] = await db.query(getCategories)

    // 獲取所有商品跟商品的詳細數據、所有分類+品種
    let productWithDetails = await tidyProducts(products)
    const categoryWithVarieds = await tidyCategories(categories)

    // 價格篩選
    if (minPrice || maxPrice) {
      productWithDetails = productWithDetails.filter((product) => {
        const price =
          product.details[0]?.sale_price || product.details[0]?.price
        return (
          (!minPrice || price >= parseInt(minPrice)) &&
          (!maxPrice || price <= parseInt(maxPrice))
        )
      })
    }

    // 取得了product + detail後再排序
    productWithDetails.sort((a, b) => {
      switch (sort) {
        case 'rating_desc':
          return b.ratings.avg_rating - a.ratings.avg_rating
        case 'rating_asc':
          return a.ratings.avg_rating - b.ratings.avg_rating
        case 'sales_desc':
          return b.sales.total_sales - a.sales.total_sales
        case 'sales_asc':
          return a.sales.total_sales - b.sales.total_sales
        case 'price_asc':
          return a.details[0].price - b.details[0].price
        case 'price_desc':
          return b.details[0].price - a.details[0].price
        case 'year_asc':
          return a.details[0].years - b.details[0].years
        case 'year_desc':
          return b.details[0].years - a.details[0].years
        default:
          return a.id - b.id
      }
    })

    // 手動分頁
    const total = productWithDetails.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const paginatedProducts = productWithDetails.slice(
      startIndex,
      startIndex + limit
    )

    res.json({
      products: paginatedProducts,
      categories: categoryWithVarieds,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: total,
        itemsPerPage: limit,
      },
    })
  } catch (error) {
    res.status(500).json({
      error: 'fail',
      message: '獲取產品列表失敗',
    })
  }
})

// 獲取篩選選項的API
router.get('/filters', async (req, res) => {
  try {
    const { category, variet, origin, country, minPrice, maxPrice } = req.query

    // 獲取所有類別
    const [allCategories] = await db.query(
      'SELECT id, name, name_en, img FROM category'
    )

    // 獲取品種
    let varietQuery = `
      SELECT DISTINCT v.name, v.name_en
      FROM variet v
      JOIN product p ON v.id = p.variet_id
    `
    let varietParams = []
    if (category) {
      varietQuery += ' WHERE v.category_id = ?'
      varietParams.push(category)
    }
    const [varieties] = await db.query(varietQuery, varietParams)

    // 獲取所有國家
    const [allCountries] = await db.query('SELECT id, name FROM country')

    // 獲取所有產地
    let originQuery = `
      SELECT DISTINCT o.id, o.name, o.country_id, c.name as country_name
      FROM origin o
      JOIN country c ON o.country_id = c.id
      JOIN product p ON p.origin_id = o.id
    `
    const [allOrigins] = await db.query(originQuery)

    // 篩選商品查詢
    let productQuery = `
      SELECT DISTINCT
        p.id,
        p.variet_id,
        v.category_id,
        p.origin_id,
        o.country_id
      FROM product p
      JOIN variet v ON p.variet_id = v.id
      JOIN origin o ON p.origin_id = o.id
    `
    let conditions = []
    let params = []

    if (category) {
      conditions.push('v.category_id = ?')
      params.push(category)
    }
    if (variet) {
      conditions.push('p.variet_id = ?')
      params.push(variet)
    }
    if (origin) {
      conditions.push('p.origin_id = ?')
      params.push(origin)
    }
    if (country) {
      conditions.push('o.country_id = ?')
      params.push(country)
    }

    if (conditions.length > 0) {
      productQuery += ' WHERE ' + conditions.join(' AND ')
    }

    // 獲取所有符合條件的產品
    const [products] = await db.query(productQuery, params)

    // 獲取產品詳情
    const productIds = products.map((p) => p.id)
    const [details] = await db.query(getProductsDetails, [productIds])

    const filteredProducts = products.filter((product) => {
      const productDetails = details.find((d) => d.product_id === product.id)
      if (!productDetails) return false

      const price = productDetails.sale_price || productDetails.price
      return (
        (!minPrice || price >= parseInt(minPrice)) &&
        (!maxPrice || price <= parseInt(maxPrice))
      )
    })

    // 標記可選取的選項
    const categories = allCategories.map((c) => ({
      ...c,
      available: filteredProducts.some((p) => p.category_id === c.id),
    }))

    const origins = allOrigins.map((o) => ({
      ...o,
      available: filteredProducts.some((p) => p.origin_id === o.id),
      belongsToSelectedCountry: country
        ? o.country_id.toString() === country
        : true,
    }))

    const countries = allCountries.map((c) => ({
      ...c,
      available: filteredProducts.some((p) => p.country_id === c.id),
    }))

    const result = {
      categories,
      varieties,
      origins,
      countries,
    }

    res.json(result)
  } catch (error) {
    console.error('Detailed error:', error)
    res
      .status(500)
      .json({ error: 'Failed to fetch filters', details: error.message })
  }
})

// 取得特定的商品ID
router.get('/:pid', async (req, res) => {
  try {
    const id = req.params.pid
    const [product] = await db.query(getIdProduct, [id])
    const productWithDetails = await tidyProduct(product)

    res.json(productWithDetails)
  } catch (error) {
    console.error('Error in tidyProduct:', error)
    throw error
  }
})

router.post('/addCart', async (req, res) => {
  try {
    const { user_id, product_detail_id, product_quantity } = req.body

    const currentFormattedDate = new Date()
      .toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(/\//g, '-')
      .replace(/24:/, '00:')

    const result = await db.query(
      'INSERT INTO cart_items(user_id, product_detail_id, product_quantity, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [
        user_id,
        product_detail_id,
        product_quantity,
        currentFormattedDate,
        currentFormattedDate,
      ]
    )

    res.json({
      success: true,
      time: currentFormattedDate,
      result: result,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
