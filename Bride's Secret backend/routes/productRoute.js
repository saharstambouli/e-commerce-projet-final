const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const productDto = require('../dtos/productDto');
const dtoMiddleware = require('../middlewares/dtoMiddleware');
const uploadConfig = require("../uploadConfig")

router.post('/addProduct', uploadConfig.upload.single('image'), productController.addProduct)
router.get('/getProducts', productController.getProducts)
router.get('/getProduct/:id', productController.getProduct)
router.get('/getProduct', productController.getProductsByCategory)
module.exports = router