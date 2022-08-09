const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/products.controller');

router.get('/products', ProductsController.getAllProducts);

router.get('/products/random', ProductsController.getRandomProduct);

router.get('/products/:id', ProductsController.getProductById);

router.post('/products', ProductsController.addProduct);

router.put('/products/:id', ProductsController.updateProductById);

router.delete('/products/:id', ProductsController.removeProductById);

module.exports = router;
