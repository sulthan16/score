module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        base64: DataTypes.TEXT
    })

    return Image
}