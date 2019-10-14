module.exports = (sequelize, DataTypes) => {
    const Feature = sequelize.define('Feature', {
        name: DataTypes.STRING,
        path: DataTypes.STRING
    });

    Feature.associate = function (models) {
        Feature.belongsTo(models.Module);
    }
    
    return Feature
}