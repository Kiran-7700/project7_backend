const categories=require("../controller/categoryController")

const categoryRouter=require("express").Router();


categoryRouter.get("/categories",categories)

module.exports=categoryRouter;