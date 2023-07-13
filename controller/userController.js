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
 

  userData.push(userInfo);

  console.log(userData);

  res.status(201).send("register successfully");
}

function login(req, res) {
  const loginInfo = req.body;

  let userFound = false;
  for (const eachUser of userData) {
    const isSamePassword = isCorrectPassword(
      loginInfo.password,
      eachUser.password
    );

    if (eachUser.email == loginInfo.email && isSamePassword) {
      userFound = true;
      break;
    }
  }

  if (userFound) {
    res.send("logged in successfully");
  } else {
    res.status(500).json({ message: "invalid email or password" });
  }
}

module.exports = {
  signUp,
  login,
};
