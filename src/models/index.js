'use strict';

require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./data-collection');
const userSchema = require('./users/model.js');
const taskSchema = require('./tasks/model.js');


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

const sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

// Sequelize is the ORM layer the works with our SQL database
const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const UserModel = userSchema(sequelize, DataTypes);
const TaskModel = taskSchema(sequelize, DataTypes);

const UserCollection = new Collection(UserModel);
const TaskCollection = new Collection(TaskModel);

UserCollection.hasManyThrough(TaskCollection);
// UserCollection.hasManyThrough(TaskCollection, UserModel);
// TaskCollection.belongsToManyThrough(UserCollection, UserModel);

module.exports = {
    db: sequelize,
    User: UserCollection,
    Task: TaskCollection
};
