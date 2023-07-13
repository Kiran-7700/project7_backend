const {signUp ,login}=require("../controller/userController")

const userRouter=require("express").Router();


userRouter.post("/signUp",signUp)
userRouter.post("/login",login)

module.exports=userRouter;