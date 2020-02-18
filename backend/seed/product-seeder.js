var Products = require('../api/models/product');
var mongoose = require('mongoose');
const connUri = 'mongodb+srv://monu007:rzHEW0JsOrfl18Tp@cluster0-9my40.mongodb.net/test?retryWrites=true&w=majority';
mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true });

var products = [
    new Products({
        imagePath: "https://cdn2.zedua.com/uploads%2Fhome-page-banners%2Fimage%2F5dfb61b218de4-stage-uploads-home-page-banners-image-5d2c4c1968a72-desktop-banner.jpg",
        title: "120 ml cup",
        description: "awesome game",
        price: 10
    }),
    new Products({
        imagePath: "https://cdn2.zedua.com/uploads%2Fhome-page-banners%2Fimage%2F5dc51639d33a6-f1-in-schools.jpg",
        title: "180ml cup",
        description: "awesome game",
        price: 20
    }),
    new Products({
        imagePath: "https://cdn2.zedua.com/uploads%2Fhome-page-banners%2Fimage%2F5dfb61b218de4-stage-uploads-home-page-banners-image-5d2c4c1968a72-desktop-banner.jpg",
        title: "250ml cup",
        description: "awesome game",
        price: 30
    }),
    new Products({
        imagePath: "https://cdn2.zedua.com/uploads%2Fhome-page-banners%2Fimage%2F5dc51639d33a6-f1-in-schools.jpg",
        title: "350ml cup",
        description: "awesome game",
        price: 40
    }),
    new Products({
        imagePath: "https://cdn2.zedua.com/uploads%2Fhome-page-banners%2Fimage%2F5dfb61b218de4-stage-uploads-home-page-banners-image-5d2c4c1968a72-desktop-banner.jpg",
        title: "500ml cup",
        description: "awesome game",
        price: 50
    })
];
var done = 0;
for(var i = 0; i<products.length; i++ ) {
    products[i].save(() => {
        done++;
    });
    if(done === products.length) exit();
}
function exit() {
    mongoose.disconnect();
}