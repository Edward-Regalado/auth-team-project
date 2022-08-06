"use strict";

const { User } = require("../../models/index");
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

async function signUp(req, res) {
  try {
    let obj = req.body;
    let newUser = await User.create(obj);
    res.status(200).json(newUser);
  } catch (e) {
    res.status(500).send(`cannot create user ${req.body.username}`);
    console.log(`error message: ${e.message}`);
  }
}

async function signIn(req, res) {
  try {
    const user = await User.model.findOne({
      where: { username: req.body.username },
    });
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (valid) {
      res.status(200).send({ user: user.username, token: user.token });
    }
  } catch (e) {
    res.status(403).send("invalid username or password");
    console.log(`error message: ${e.message}`);
  }
}

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
