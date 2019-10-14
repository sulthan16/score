module.exports = (sequelize, DataTypes) => {
    const RoleAccess = sequelize.define('RoleAccess', {
        show: DataTypes.ENUM('1', '0'),
        read: DataTypes.ENUM('1', '0'),
        create: DataTypes.ENUM('1', '0'),
        put: DataTypes.ENUM('1', '0'),
        delete: DataTypes.ENUM('1', '0')
    });

    RoleAccess.associate = function (models) {
        RoleAccess.belongsTo(models.Role);
        RoleAccess.belongsTo(models.Module);
        RoleAccess.belongsTo(models.Feature);
    }

    return RoleAccess
}