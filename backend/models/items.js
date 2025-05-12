const mongoose=require("mongoose")
const userSchema=new mongoose.Schema(
    {
        name:{type:String},
        price:{type:String},
        location:{type:String},
        phno:{type:String},
        carted:{type:Boolean,default:false}
    }
)
module.exports=mongoose.model("Item",userSchema)