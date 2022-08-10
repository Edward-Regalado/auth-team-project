const taskModel = (sequelize, DataTypes) => {
    const model = sequelize.define('Task', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isComplete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
    return model;
};

module.exports = taskModel;