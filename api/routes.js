const isAuthenticated = require('./middleware/isAuthenticated');

const auth = require("./controllers/AuthController");
const product = require("./controllers/ProductController");

module.exports = (app) => {
    app.post('/login', auth.login);
    app.get('/product',isAuthenticated, product.getProduct);
}