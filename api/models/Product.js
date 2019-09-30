module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        title: DataTypes.STRING,
        thumb: DataTypes.TEXT,
        images: DataTypes.TEXT,
        price: DataTypes.BIGINT,
        sellPrice: DataTypes.BIGINT,
        discon : DataTypes.FLOAT
    })

    Product.associate = function (models) {
        Product.belongsTo(models.Category);
    }

    return Product
}
