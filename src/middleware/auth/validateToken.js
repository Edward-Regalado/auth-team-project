require("dotenv").config();
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

// function validateToken(req, res, next) {
//   try {
//     const token = req.headers["authorization"];
//     if (!token) {
//       res.status(401).send("unauthorized");
//       next();
//     } else {
//       const user = jwt.verify(token, SECRET);
//       req.user = user;
//       next();
//     }
//   } catch (e) {
//     console.log(`error message: ${e.message}`);
//   }
// }

const validateToken = async (req, res, next ) => {
      // const username = req.body.username;
      try {
          const authHeader = req.headers['authorization'];
          const token = authHeader && authHeader.split(' ')[1];
          if (token === null) {
              return res.status(401).send("You are not authorized!");
          }
          jwt.verify(token, SECRET, (error, user) => {
              if(error) {
                  return res.status(403);
              }
              req.user = user;
              console.log('/////////////////////////////////////////////////////');
              console.log(`user: ${user}`);
              console.log(`req.user: ${req.user}`);
              next();
          });
  
      } catch (error) {
          throw new Error(error);
      }
      next();
  };

module.exports = validateToken;
