const express=require("express")
const app=express()
const mongoose =require("mongoose");
const authRoute=require("./routes/authentication")
const blogRoute=require("./routes/blogs")
const commentRoute=require("./routes/comments")
const cors=require("cors");
const multer=require("multer");

const path=require("path")

app.use(cors());
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
mongoose.set("strictQuery", false);
MONGO_URL = "mongodb://harsh:harsh@ac-vzm7spp-shard-00-00.9kti6xm.mongodb.net:27017,ac-vzm7spp-shard-00-01.9kti6xm.mongodb.net:27017,ac-vzm7spp-shard-00-02.9kti6xm.mongodb.net:27017/?ssl=true&replicaSet=atlas-2xgwoq-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(MONGO_URL).then(console.log("connected to mongo"))
.catch((err) => console.log(err));


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
})

app.use("/api/auth",authRoute);
app.use("/api/blogs",blogRoute);
app.use("/api/comments",commentRoute);
app.get('/',(req,res)=>{
     return res.json("hello")
})

app.listen("5000" ,()=>{
    console.log("backend is running...")
})
