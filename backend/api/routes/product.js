const express = require('express');
const {check} = require('express-validator');
const authenticate = require('../middlewares/authenticate');
const seller = require('../middlewares/seller');
const Product = require('../controllers/product');

const router = express.Router();

router.get('/', Product.products_get_all);
router.get('/:productId', authenticate, seller, Product.products_get_product);
router.post('/', authenticate, seller, Product.products_add_product);

module.exports = router;