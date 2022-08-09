const taskModel = (sequelize, DataTypes) => {
    const model = sequelize.define('Task', {
        // UserId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'User',
        //         key: 'id',
        //     },
        // },
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