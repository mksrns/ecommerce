const express = require('express');
const {check} = require('express-validator');

const Cart = require('../controllers/cart');

const router = express.Router();

router.get('/add-to-cart/:id', Cart.add_to_cart);

module.exports = router;