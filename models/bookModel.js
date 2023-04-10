// defining the schema and model for our Book collection.
//add the schema validations required
const mongoose=require("mongoose");

//creating schema
const bookSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        minlength:[2,"min length of name is 2"],
        required:[true,"name is mandatory"],
    },
    author:{
        type:String,
        minlength:[2,"min length of author is 2"],
        required:[true,"author's name is mandatory"],
    },
    publication:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    price:{
        type:Number,
        required:[true,"price is mandatory"],
    },
    isbn:{
        type:Date,
        default:Date.now,
    },

})
//create the collection

const Book=mongoose.model("Books",bookSchema)

module.exports=Book;