module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        title: DataTypes.STRING,
        isDone: DataTypes.BOOLEAN,
        content: DataTypes.STRING(500)
    }, {
        timestamps: false
    })
    return Todo;
}