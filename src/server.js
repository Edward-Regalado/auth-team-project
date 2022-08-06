'use strict';

const express = require('express');

const loginRoutes = require('./middleware/auth/route.js');
const verifyAccessToken = require('./middleware/auth/auth.js');

const userRoutes = require('./routes/user.js');
// const allRoutes = require('./routes/v1.js');



const app = express();
app.use(express.json());


// middleware
app.use(loginRoutes);
app.use(verifyAccessToken);

app.use(userRoutes);

// v1 routes
// app.use(allRoutes);

module.exports = {
    server: app,
    start: port => {
        if(!port) {
            throw new Error('missing port!');
        }
        app.listen(port, () => console.log(`Listen on ${port}`));
    },
};
