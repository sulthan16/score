module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        title: DataTypes.STRING,
        thumb: DataTypes.TEXT,
        images: DataTypes.TEXT,
        price: DataTypes.BIGINT,
        sellPrice: DataTypes.BIGINT,
        discon : DataTypes.FLOAT,
        barcode: DataTypes.TEXT
    })

    Product.associate = function (models) {
        Product.belongsTo(models.Category);
        Product.belongsTo(models.Company);
    }

    return Product
}
