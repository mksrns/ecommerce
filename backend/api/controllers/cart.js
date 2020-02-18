const Cart = require('../models/cart');
const Product = require('../models/product');

exports.add_to_cart = (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart();
    Product.findById(productId, (err, product) => {
        if(err) {
            return res.status(400).json({error: 'Some error occured'});
        }
        cart.add(product, product.id);
    });
}