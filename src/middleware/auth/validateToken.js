require("dotenv").config();
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).send("unauthorized");
      next();
    } else {
      const user = jwt.verify(token, SECRET);
      req.user = user;
      next();
    }
  } catch (e) {
    console.log(`error message: ${e.message}`);
  }
}

module.exports = validateToken;
