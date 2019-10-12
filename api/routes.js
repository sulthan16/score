const isAuthenticated = require('./middleware/isAuthenticated');

const auth = require("./controllers/AuthController");
const product = require("./controllers/ProductController");
const categories = require("./controllers/CategoriesProductController");
const images = require("./controllers/ImagesController");

module.exports = (app) => {
    app.post('/login', auth.login);

    app.post('/insertProduct', isAuthenticated, product.store);
    app.put('/updateProduct/:id', isAuthenticated, product.put);
    app.get('/product', isAuthenticated, product.get);
    app.get('/productFind', isAuthenticated, product.getByBarcode);
    app.delete('/product/:id', isAuthenticated, product.delete);

    app.get('/categories', isAuthenticated, categories.get);
    app.post('/insertCategory', isAuthenticated, categories.store);
    app.put('/updateCategory/:id', isAuthenticated, categories.put);
    app.delete('/categories/:categoryId', isAuthenticated, categories.delete);

    app.get('/images', isAuthenticated, images.get);
    app.post('/upload-image', isAuthenticated, images.post);
}