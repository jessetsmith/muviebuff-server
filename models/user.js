module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    })
}