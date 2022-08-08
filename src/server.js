"use strict";

const express = require("express");

const loginRoutes = require("./middleware/auth/loginRoutes.js");
const verifyAccessToken = require("./middleware/auth/validateToken.js");

// const userRoutes = require("./routes/user.js");
const v1Router = require("./routes/v1.js");
const { User } = require("./models/index");

const app = express();
app.use(express.json());

// middleware
app.use(loginRoutes);
app.use(verifyAccessToken);

// app.use(userRoutes);

// v1 routes
app.use("/v1", v1Router([User]));

module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error("missing port!");
    }
    app.listen(port, () => console.log(`Listen on ${port}`));
  },
};
