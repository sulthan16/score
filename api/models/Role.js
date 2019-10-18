module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: DataTypes.STRING,
        level: DataTypes.FLOAT,
        notificationLevel: DataTypes.FLOAT
    });

    Role.associate = function (models) {
        Role.belongsTo(models.Company);
    }

    return Role
}