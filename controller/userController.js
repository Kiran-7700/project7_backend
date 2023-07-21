 const {createToken} = require("../jwt")
const bcrypt = require("bcrypt");
const saltRound = 10;



function hashPassword(password) {
  return bcrypt.hashSync(password, saltRound);
}

function isCorrectPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

const userData = [];

function signUp(req, res) {
  const userInfo = req.body;
  if (userInfo == null) {
    res.status(403).send("please provide complete information");
    return;
  }
  
  let user = userData.find((item) => {
    if (userInfo.email === item.email) {
      return item;
    }
  });
 
  if (user) {
    return res.send("you are already exits please try to login");
  }

  let hashPass = hashPassword(userInfo.password);

  
  delete userInfo.password;

  userInfo.password = hashPass;
 
  const obj={
    name : userInfo.name,
    phone : userInfo.phone,
    email : userInfo.email,
    password :userInfo.password
  }

  userData.push(obj);

  console.log(userData);
  console.log("user register successfully");
  res.status(201).json({
    message:"user register successfully",
    userData
  })
  
}

function login(req, res) {
  const loginInfo = req.body;

  let userFound = null;
  for (const eachUser of userData) {
    if (eachUser.email == loginInfo.email){
      userFound=eachUser;
    }
  }
  if (userFound==null) {
    res.status(400).send("user is not registered");
    console.log("user is not registered");
  }

  //compare hash password
  let isPasswordCorrect=isCorrectPassword(loginInfo.password, userFound.password);
  if(!isPasswordCorrect){
    console.log("password is not correct");
    return res.status(400).send("password is not correct");

  }

    //during login create the token
    const loginToken=createToken({
      name:userFound.name,
      email:userFound.email
    },'30m');

    console.log("user logged in successfully");

    return res.json({
      message: 'user logged in successfully',
      loginToken,
   });
  
}

module.exports = {
  signUp,
  login,
};
