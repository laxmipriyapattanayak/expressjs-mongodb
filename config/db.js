const mongoose=require("mongoose");
const dev=require(".");

const connectDB=async()=>{
    try{
        console.log(dev.db.url);
        await mongoose.connect(dev.db.url);
        console.log("connected to the database");
    }catch(error){
        console.log(error);
    }
}
module.exports=connectDB;