//const authToken = require("../middleware/authenticateToken");

const {Data,blog,latestArticle,topPosts,latestStories,detailDesc,Total}=require("../controller/categoryController")

const authToken=require("../middleware/authenticateToken")



const categoryRouter=require("express").Router();


categoryRouter.get("/data",Data)
categoryRouter.get("/blog",blog)
categoryRouter.get("/latestArticle",latestArticle)
categoryRouter.get("/topPosts",topPosts)
categoryRouter.get("/latestStories",latestStories)
categoryRouter.get("/total",Total)

//categoryRouter.get("/detailDesc",detailDesc)
categoryRouter.get("/detailDesc", authToken, detailDesc);

module.exports=categoryRouter;