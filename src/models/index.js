'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./data-collection');
const userSchema = require('./users/model.js');

require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

const sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
}: {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const UserModel = userSchema(sequelize, DataTypes);

const UserCollection = new Collection(UserModel);

module.exports = {
    db: sequelize,
    User: UserCollection
};
