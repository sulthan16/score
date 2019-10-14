module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define('Module', {
        name: DataTypes.STRING
    });

    return Module
}