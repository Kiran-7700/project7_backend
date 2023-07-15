const jwt=require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config();

function createToken(data, expiresIn){
    const token = jwt.sign(data, process.env.DATABASE_SECRET_KEY, { expiresIn });
    return token

}

function verifyToken(token) {
    try {
        const tokenData = jwt.verify(token,  process.env.DATABASE_SECRET_KEY);
        return tokenData;
    } catch (err) {
        console.log(err);
        return null;
    }
}
module.exports={
    createToken,
    verifyToken
};