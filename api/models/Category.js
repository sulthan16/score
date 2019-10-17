module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        title: DataTypes.STRING,
        thumb: DataTypes.TEXT
    })

    Category.associate = function (models) {
        Category.belongsTo(models.Company);
    }

    return Category
}