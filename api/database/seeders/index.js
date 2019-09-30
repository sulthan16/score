const {
  sequelize,
  User,
  Product,
  Stock,
  Category
} = require('../../models')

const Promise = require('bluebird')
const users = require('./users.json')
const product = require('./product.json')
const categories = require('./categories.json')
const stock = require('./stock.json')

sequelize.sync({ force: true })
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      }),
      categories.map(categories => {
        Category.create(categories)
      }),
      product.map(product => {
        Product.create(product)
      }),
      stock.map(stock => {
        Stock.create(stock)
      }),
    )
  })
