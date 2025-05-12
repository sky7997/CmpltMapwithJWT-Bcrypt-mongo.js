const express=require("express")
const router=express.Router()
const Item=require("../models/items")


router.get("/", async (req,res)=>{
  try{
    const data=await Item.find()
    res.json(data)
  } catch(err)
  {
    res.status(501).json({error:"failed to fetch"})
  }
})

router.post("/", async (req,res)=>{
  try{
    const newdat= new Item(req.body)
    await newdat.save()
    res.status(201).json(newdat)

  }catch(err){
res.status(501).json({error:"failed to fetch"})
  }
})
router.put("/:id", async (req,res)=>{
 try{
  const updatedItem=await Item.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.json(updatedItem)
 } catch(err){
  res.status(501).json({error:"failed to update"})
 }
})
router.delete("/:id", async (req,res)=>{
  try{
   const deletedItem=await Item.findByIdAndDelete(req.params.id)
   res.json({message:`id ${req.params.id} deleted`})
  } catch(err){
   res.status(501).json({error:"failed to update"})
  }
 })
 module.exports=router