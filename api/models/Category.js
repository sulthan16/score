module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        title: DataTypes.STRING,
        thumb: DataTypes.TEXT
    })

    return Category
}