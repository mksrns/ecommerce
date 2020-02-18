const auth = require('./auth');
const user = require('./user');
const product = require('./product');
const cart = require('./cart');
const authenticate = require('../middlewares/authenticate');
const seller = require('../middlewares/seller');
const admin = require('../middlewares/admin');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Api is up"});
    });

    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    // app.use('/api/user', authenticate, admin, user);
    // app.use('/api/user', authenticate, seller, user);
    app.use('/api/product', product);
    app.use('/api/cart', cart);
};