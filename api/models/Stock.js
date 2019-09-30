module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
        stock: DataTypes.FLOAT,
        type: DataTypes.ENUM('in', 'out'),
        total: DataTypes.FLOAT
    })

    Stock.associate = function (models) {
        Stock.belongsTo(models.Stock, { as: 'parent'});
        Stock.belongsTo(models.Product)
    }

    return Stock
}
