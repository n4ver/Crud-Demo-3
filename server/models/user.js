module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
      type: DataTypes.STRING, // or DataTypes.INTEGER
      defaultValue: 'user', // or an appropriate default role
    }
    });
    return User
}