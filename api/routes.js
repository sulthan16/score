const authCheck = require('./middleware/auth');
const auth = require("./controllers/auth");
const product = require("./controllers/product");

module.exports = (app) => {
    app.post('/login', auth.login);
    app.get('/product',authCheck, product.getProduct);
}