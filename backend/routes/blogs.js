const router=require("express").Router();
const User=require("../models/User");
const Blog=require("../models/Blog")
const { route } = require("./users");


// create new blog
router.post("/" , async (req,res)=>{
    console.log(req.body);
    const newBlog=new Blog(req.body);
    try{
        const savedBlog= await newBlog.save();
        return res.status(200).json(savedBlog);
    }
    catch(err){
        return res.status(500).json(err);
    }
})

//update blog
router.put("/:id", async (req,res)=>{

    try{
        const blog= await Blog.findById(req.params.id);
        if(blog.username === req.body.username){
        try{
           const updatedBlog=await Blog.findByIdAndUpdate(req.params.id, {
            $set:req.body
           },{new:true});
           return res.status(200).json(updatedBlog);
        }
        catch(err){
             return res.status(500).json(err);
        }
    }
    else{
        return res.status(101).json("you can only update your posts")
    }
    }
    catch(err){
        return res.status(500).json(err);
    }
})


//delete blog

router.delete("/:id", async (req,res)=>{

    try{
        const blog= await Blog.findById(req.params.id);
        if(blog.username === req.body.username){
        try{
           await Blog.findByIdAndDelete(req.params.id);
           return res.status(200).json("blog successfuly deletd");
        }
        catch(err){
             return res.status(500).json(err);
        }
    }
    else{
        return res.status(101).json("you can only delete your posts")
    }
    }
    catch(err){
        return res.status(500).json(err);
    }
})

// get blog

router.get("/:id", async (req,res)=>{
    try{
     const blog =await Blog.findById(req.params.id);
   
     return res.status(200).json(blog);

    }
    catch(err){
        return res.status(500).json(err)
    }
})

//get all posts

router.get("/", async (req,res)=>{
    const username=req.query.user;
  
    try{
       
    let blogs;
     if(username){
        blogs=await Blog.find({username:username})
     }
     else{
        blogs=await Blog.find();
     }
     return res.status(200).json(blogs);
    }
    catch(err){
        return res.status(500).json(err)
    }
})



module.exports=router