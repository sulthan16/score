const isAuthenticated = require('./middleware/isAuthenticated');

const auth = require("./controllers/AuthController");
const product = require("./controllers/ProductController");
const categories = require("./controllers/CategoriesProductController");

module.exports = (app) => {
    app.post('/login', auth.login);
    app.get('/product', isAuthenticated, product.get);
    app.get('/categories', isAuthenticated, categories.get);
}