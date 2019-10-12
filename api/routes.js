const isAuthenticated = require('./middleware/isAuthenticated');

const auth = require("./controllers/AuthController");
const product = require("./controllers/ProductController");
const categories = require("./controllers/CategoriesProductController");
const images = require("./controllers/ImagesController");

module.exports = (app) => {
    app.post('/login', auth.login);

    app.post('/insertProduct', isAuthenticated, product.store);
    app.get('/product', isAuthenticated, product.get);
    app.delete('/product/:id', isAuthenticated, product.delete);

    app.get('/categories', isAuthenticated, categories.get);
    app.delete('/categories/:categoryId', isAuthenticated, categories.delete);

    app.get('/images', isAuthenticated, images.get);
    app.post('/upload-image', isAuthenticated, images.post);
}