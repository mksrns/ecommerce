const Product = require('../models/product');

exports.products_get_all = (req, res, next) => {
    Product.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1) {
                res.status(200).json({
                    count: result.length,
                    product: result
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    });
}

exports.products_get_product = (req, res, next) => {
    Product.findById(req.params.productId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    product: result
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    });
}

exports.products_add_product = async (req, res, next) => {
    try {
        const newProduct = new Product({ ...req.body });
        const Product_ = await newProduct.save();
        res.status(200).json({success: true, message: Product_})
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}