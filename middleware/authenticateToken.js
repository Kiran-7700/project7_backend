const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const authToken = async (req, res, next) => {
  const bearerToken = req.headers["authorization"]
  if(typeof bearerToken === undefined){
      res.send({message : "Unauthorised Person!!"})
  }
  const token = bearerToken.split(" ")[1]
  console.log(bearerToken)
  jwt.verify(token,process.env.DATABASE_SECRET_KEY);
  next();
};

module.exports = authToken;