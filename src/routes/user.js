
const express = require('express');
const userCollection = require('../models/index.js').User;
const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getOneUsers);
router.post('/users', createUsers);


async function getAllUsers(req, res) {
    try {
        const allUsers = await userCollection.read();
        if(allUsers.length == 0) {
            res.status(200).send('There are no users available!');
        } else {
            res.status(200).json(allUsers);
        }
    } catch (error) {
        console.error(error);
    }
}

async function getOneUsers(req, res) {
    try {
        const id = req.params.id;
        const Users = await userCollection.read(id);
        if(Users == undefined) {
            res.status(404).send(`We don't have a valid user id for ${id}`);
        } else {
            res.status(200).json(Users);
        }
    } catch (error) {
        console.log(error);
    }
}

async function createUsers(req, res) {
    try {
        const record = req.body;
        const newUser = await userCollection.create(record);
        res.status(201).json(newUser);
        console.log(`user created successfully ${record.username}`);
       
        }
     catch (error) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            res.status(500).send('user already exists');
        } else {
            res.status(500).send("Some else failed on the backend!");
        }
    }
}

module.exports = router;