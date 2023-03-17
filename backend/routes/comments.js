const router=require("express").Router();
const Comment=require("../models/Comment");

router.post("/" , async (req,res)=>{
    console.log(req.body);
    const newComment=new Comment(req.body);
    try{
        const savedComment= await newComment.save();
        return res.status(200).json(savedComment);
    }
    catch(err){
        return res.status(500).json(err);
    }
})
router.get("/:id" , async (req,res)=>{
    const coms= await Comment.find({blogId:req.params.id})
  
    return res.status(200).json(coms)
})
module.exports=router