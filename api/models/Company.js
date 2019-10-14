module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        name: DataTypes.STRING,
        logoLandscape: DataTypes.TEXT,
        logoSquare: DataTypes.TEXT,
        logoDashboardLandscape: DataTypes.TEXT,
        logoDashboardSquare: DataTypes.TEXT,
        banner: DataTypes.TEXT,
        bookingUrl:DataTypes.TEXT,
        timezone: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING
    });

    return Company
}