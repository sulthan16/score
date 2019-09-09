const authCheck = require('./middleware/auth');
const auth = require("./controllers/auth");
const product = require("./controllers/product");

module.exports = (app) => {
    app.get('/login',authCheck, auth.login);
    app.get('/product', product.getProduct);
}