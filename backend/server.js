require("dotenv").config()
const express=require("express")
const cors=require("cors")
const app=express()
const mongoose=require("mongoose")
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000", // your frontend
  credentials: true
}))

const User=require("./models/reglogdat")
const Item=require("./models/items")
const port=process.env.PORT || 5000
const userRoutes=require("./routes/userRoutes")
const itemRoutes=require("./routes/itemRoutes")
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch(err=>console.error("server issue: ",err))

app.use("/users",userRoutes)
app.use("/items",itemRoutes)

app.listen(port,()=>{
  console.log(`server running on http://localhost:${port}`)
})