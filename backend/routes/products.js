const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all categories (must come before :id route)
router.get('/categories', productController.getCategories);

// GET all products with filtering
router.get('/', productController.getProducts);

// GET single product by ID
router.get('/:id', productController.getProductById);

module.exports = router;
