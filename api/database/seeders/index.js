const {
  sequelize,
  User,
  Product,
  Stock,
  Category,
  Company,
  Role,
  RoleAccess,
  Module,
  Feature
} = require('../../models')

const Promise = require('bluebird')
const users = require('./users.json')
const product = require('./product.json')
const categories = require('./categories.json')
const stock = require('./stock.json')
const company = require('./company.json')
const role = require('./role.json')
const modules = require('./modules.json')
const feature = require('./feature.json')
const roleAccess = require('./roleAccess.json')

sequelize.sync({ force: true })
  .then(async function () {
    await Promise.all(
      modules.map(module => {
        Module.create(module)
      }),
      feature.map(module => {
        Feature.create(module)
      }),
      company.map(company => {
        Company.create(company)
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
      role.map(role => {
        Role.create(role)
      }),
      roleAccess.map(roleAccess => {
        RoleAccess.create(roleAccess)
      }),
      users.map(user => {
        User.create(user)
      })
    )
  })
