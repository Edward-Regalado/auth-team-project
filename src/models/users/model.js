const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const userModel = (sequelize, DataTypes) => {
    const model = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        token: {
            type: DataTypes.VIRTUAL,
            get(){
                const payload = { username: this.username, role: this.role };
                return jwt.sign(payload, SECRET);
                },
            },
        });
    return model;
};

module.exports = userModel;
