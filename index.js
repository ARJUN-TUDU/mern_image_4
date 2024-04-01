const express = require("express")
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path")

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}))

app.use(express.static(path.join(__dirname,'public')));


try{
    mongoose.connect('mongodb+srv://arjuntudu:gxpFj2gp4bsWMGmN@cluster0.ssu2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("DATABASE CONNECTION SUCCESSS");
}catch(err){
    if(err){
        console.log("DATABSE CONNECTION FAILED")
    }
}

const Images = mongoose.model("New_Images",{
    name:String,
    image:String
})


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public");
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }

})

console.log(__dirname);


const upload = multer({
    storage:storage
})

app.get("/",(req,res)=>{
   
    const arr = 
    [
    
    {
        name:"name1",
        age:30
    },
    {
        name:"name1",
        age:30
    }

    ]

    
    res.json(arr);


})

app.post("/upload",upload.single('file'),async (req,res)=>{
    
    console.log(req.file)

    try{
         Images.create({
            image:req.file.filename,
            name:req.file.originalname,
            
         })
    }catch(e){
        console.log("catch image error")
    }

})

app.get("/getImages",async (req,res)=>{
    
   try{
      const all_data = await Images.find();
      
      res.json(all_data);
   }catch(e){
     console.log("get data error");
   }

})




app.listen(5000);






