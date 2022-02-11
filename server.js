const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
require("dotenv").config();
app.use(cors());
app.use(express.json());




mongoose.connect(process.env.MONGO_URI).then((result)=>{
    console.log("connected to database");
    app.listen(process.env.PORT || 8080);
}).catch((err)=>{
    console.log(err)
})