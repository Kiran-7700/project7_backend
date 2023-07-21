const express=require("express")
const categoryRouter=require("./route/categoryRouter")
const userRoute=require("./route/userRoute")
const cors=require("cors")


const app=express();
app.use(express.json())

//CORS middleware to allow cross-origin access from the frontend server (http://localhost:4000
app.use(cors({
    origin:"*" 
}))
app.use("/api/categories",categoryRouter)
app.use("/students",userRoute)

app.listen(4000,()=>{
    console.log('Server is running on port 4000');
})