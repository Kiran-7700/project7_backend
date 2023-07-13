const express=require("express")
const categoryRouter=require("./route/categoryRouter")
const userRoute=require("./route/userRoute")

const app=express();
app.use(express.json())
app.use("/api",categoryRouter)
app.use("/students",userRoute)

app.listen(4000,()=>{
    console.log('Server is running on port 4000');
})