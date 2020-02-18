const express = require('express');
const {check} = require('express-validator');

const Product = require('../controllers/product');

const router = express.Router();

router.get('/', Product.products_get_all);
router.get('/:productId', Product.products_get_product);

module.exports = router;