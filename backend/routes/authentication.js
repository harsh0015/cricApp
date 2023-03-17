const router=require("express").Router();
const User=require("../models/User");
const bcrypy=require("bcrypt");

// register 

router.post("/register", async (req,res)=>{
    try{    const salt=await bcrypy.genSalt(10);
            const hashedPass= await bcrypy.hash(req.body.password,salt);
            const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        });
        const user= await newUser.save();
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
})

// login

router.post("/login" ,async (req,res)=>{
   
   try{

    const user= await User.findOne({username:req.body.username});
    if(!user) return  res.status(400).json("wrong credentials");

    const validated=await bcrypy.compare(req.body.password,user.password);
    if(!validated)return  res.status(400).json("wrong credentials");
     const {password,...others} = user._doc;
    return res.status(200).json(others)
   }catch(res){
   return  res.status(500).json(err);
   }
})

module.exports=router