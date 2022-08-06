'use strict';

const express = require('express');

const app = express();
app.use(express.json());

module.exports = {
    server: app,
    start: port => {
        if(!port) {
            throw new Error('missing port!');
        }
        app.listen(port, () => console.log(`Listen on ${port}`));
    },
};
