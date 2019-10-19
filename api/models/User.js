const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options) {
    const SALT_FACTOR = 8

    if (!user.changed('password')) {
        return
    }
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        emailVerification: DataTypes.ENUM('1', '0'),
        password: DataTypes.STRING,
        token: DataTypes.TEXT,
        level: DataTypes.INTEGER,
        fcnTokenWeb: DataTypes.TEXT,
        fcnTokenMobile: DataTypes.TEXT
    }, {
        hooks: {
            beforeSave: hashPassword
        }
    })
    
    User.associate = function (models) {
        User.belongsTo(models.Company);
        User.belongsTo(models.Role);
    }

    User.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password)
    }

    return User
}
