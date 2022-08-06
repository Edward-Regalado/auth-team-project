const fs = require('fs');
const express = require('express');
const Collection = require('../models/data-collection.js');

const router = express.Router();

// const model = require('../../index.js');
const db = require('../../index.js'); 
// const datatypes = require('../../index.js'); 

// const { DataTypes } = require('sequelize');

// fs.getCurrentFilenames();

router.param('model', (req, res, next) => {
    const fileName = `${__dirname}/../models/${req.params.model}/model.js`;
    console.log(fileName);
    if(fs.existsSync(fileName)) {
        console.log("Inside if statement");
        // const schema = require(fileName);
        // const model = schema(db, DataTypes); 
        // req.model = new Collection(model);
        next();
    } else {
        next('invalid model');
    }
});

router.get('/:model', handleGetAll);

async function handleGetAll(req, res) {
    const allRecords = await req.model.get();
    res.status(200).json(allRecords);
}

module.exports = router;

