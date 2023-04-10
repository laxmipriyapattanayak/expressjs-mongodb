const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const bodyParser=require("body-parser");
const booksRouter = require("./route/Route");
const dev=require("./config");
const connectDB = require("./config/db");
const swaggerJsdoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");


const app=express();


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:"users API",
            description:"return JSON users data",
            version:"1.0.0",
        },
        servers:[
            {url:"http://localhost:3001"},
            {url:"http://localhost:3002"},
        ],
    },///src/controllers/*.js
    apis:['./controllers/*.js']
};
const openapiSpecification=swaggerJsdoc(options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(openapiSpecification));

app.use("/api/books",booksRouter);
const PORT=dev.app.serverPort;

app.get("/",(req,res)=>{
    res.status(200).json({message:"testing route"});
});
app.listen(PORT,()=>{
    console.log(`server is running at http:\\localhost:${PORT}`);
    connectDB();
});