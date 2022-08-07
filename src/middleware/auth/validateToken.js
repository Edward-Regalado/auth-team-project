require("dotenv").config();
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      console.log("if not token");
      res.status(401).send("unauthorized");
    } else {
      console.log("else block");
      const user = jwt.verify(token, SECRET);
      req.user = user;
    }
  } catch (e) {
    console.log(`error message validate token: ${e.message}`);
  }
  next();
}

module.exports = validateToken;
