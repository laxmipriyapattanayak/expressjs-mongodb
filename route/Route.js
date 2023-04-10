// add your routes here
const router=require("express").Router();

const { getAllBooks, createBook, getSingleBook, deleteBook, updateBook } = require("../controllers/bookController");


router.get("/",getAllBooks);
router.post("/",createBook);
router.get("/:name",getSingleBook);
router.delete("/:name",deleteBook);
router.put("/:name",updateBook);

module.exports=router;