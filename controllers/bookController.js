//The logic for handling requests to the API. In this case, we have a bookController.js file for handling book-related requests.
const {v4:uuidv4}=require("uuid");
const Book = require("../models/bookModel");


/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: auto generated id of the user
 *         name:
 *           type: string
 *           description: book name
 *         author:
 *           type: string
 *           description: book author
 *         publication:
 *           type: string
 *           description: publication date
 *         price:
 *           type: number
 *           description: book price
 *         isbn:
 *           type: string
 *           description: isbn number
 *       required:
 *          - name
 *          - author
 *          - price
 *       example:
 *          name: kids world
 *          author: Mark
 *          price: 350
 *       
 */
/**
 * @openapi
 * tags:
 *    name: Books
 *    description: Book description
 */


/**
 * @openapi
 * /api/books:
 *   get:
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     summary: get all books
 *     tags: [Books]
 *     description: Welcome to BookAPI
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *          description: NOT FOUND
 *       500:
 *          description: SERVER ERROR
 */

//all books
const getAllBooks=async(req,res)=>{
    try{
        const {page=1,limit=2}=req.query;
        const books=await Book.find().sort({price:1}).limit(limit).skip((page-1)*limit);
        return res.status(200).json({
            message:"all books returned",
            books: books,
        })
    }catch(error){
        return res.status(500).json({
            message:error.message,
        });
    }
};
//create book
/**
 * @openapi
 * /api/books:
 *    post:
 *       summary: create a single book
 *       tags: [Books]
 *       requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                     $ref: '#/components/schemas/Book'
 *       responses:
 *        201:
 *         description: CREATED
 *         content:
 *            application/json:
 *              schema:
 *                     $ref: '#/components/schemas/Book'
 *        400:
 *          description: ALREADY EXIST
 *        500:
 *          description: SERVER ERROR
 */

const createBook=async(req,res)=>{
    try{
        const isExist=await Book.findOne({name:req.body.name});
        if(isExist) return res.status(400).json({
            message:"book is already exist",
        });
        const newBook=new Book({
            id:uuidv4(),
            name:req.body.name,
            author:req.body.author,
            price:req.body.price,
        });
        const book=await newBook.save();
        if(!book) {
            return res.status(400).json({
                message:"book was not created"
            })
        } else {
            return res.json(book)
        }

    }catch(error){
        return res.status(500).json({
            message:error.message,
        });
    }
};

//single book
/**
 * @openapi
 * /api/books/{name}:
 *   get:
 *     summary: get single book
 *     tags: [Books]
 *     parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: name of the book
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *          description: NOT FOUND
 *       500:
 *          description: SERVER ERROR
 */
const getSingleBook=async(req,res)=>{
    try{
        const book=await Book.findOne({name:req.params.name});
        return res.status(200).json({
            message:"single book",
            book:book,
        });
    }catch(error){
        return res.status(500).json({
            message:error.message,
        });
    }
};
//delete book
/**
 * @openapi
 * /api/books/{name}:
 *   delete:
 *     summary: delete single book
 *     tags: [Books]
 *     parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: a name of book
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *          description: NOT FOUND
 *       500:
 *          description: SERVER ERROR
 */
const deleteBook=async(req,res)=>{
    try{
        await Book.deleteOne({name:req.params.name});
        return res.status(200).json({
            message:"single book deleted"
        });
    }catch(error){
        return res.status(500).json({
            message:error.message,
        });
    }
};
//update book
/**
 * @openapi
 * /api/books/{name}:
 *   put:
 *     summary: update book
 *     tags: [Books]
 *     parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: a name of the book
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                     $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *          description: NOT FOUND
 *       500:
 *          description: SERVER ERROR
 */
const updateBook=async(req,res)=>{
    try{
        const book=await Book.findOne({name:req.params.name});
        if(!book)
            return res.status(400).json({
                message:"book is not found",
            });
            const updateBook=await Book.updateOne({name:req.params.name},
                {$set: {name:req.body.name,
                    author:req.body.author,
                    publication:req.body.publication,
                    price:req.body.price}})
            if(!updateBook){
                return res.status(400).json({
                    message:"book was not updated"
                });
            } else {
                res.json({
                    message: "updated successfully"
                })
            }
            
    }catch(error){
        return res.status(500).json({
                message:error.message,
        });
    }
};

module.exports={getAllBooks,createBook,getSingleBook,deleteBook,updateBook}