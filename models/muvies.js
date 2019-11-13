module.exports = (sequelize, DataTypes) => {

    const Muvies = sequelize.define('muvies', {
        title: DataTypes.STRING,

        year: DataTypes.INTEGER,

        director: DataTypes.STRING,

        description: DataTypes.STRING,

        watched: DataTypes.BOOLEAN,

        publicRating: DataTypes.INTEGER,

        userRating: DataTypes.INTEGER
    });
    return Muvies
};
