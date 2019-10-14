module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: DataTypes.STRING,
        level: DataTypes.FLOAT,
        notificationLevel: DataTypes.FLOAT,
        show: DataTypes.ENUM('1', '0'),
        read: DataTypes.ENUM('1', '0'),
        create: DataTypes.ENUM('1', '0'),
        put: DataTypes.ENUM('1', '0'),
        delete: DataTypes.ENUM('1', '0')
    });

    Role.associate = function (models) {
        Role.belongsTo(models.Company);
        Role.belongsTo(models.Module);
        Role.belongsTo(models.Feature);
    }

    return Role
}