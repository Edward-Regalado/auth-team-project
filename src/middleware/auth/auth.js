require("dotenv").config();
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).send("unauthorized");
  }
  const user = jwt.verify(token, SECRET);
  req.user = user;
  next();
}

module.exports = validateToken;
