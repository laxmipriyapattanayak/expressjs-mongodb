require("dotenv").config();
const dev={
    app:{
        serverPort:process.env.SERVER_PORT||3002,
    },
    db:{
        url: process.env.DB_URL||"mongodb://127.0.0.1:27017/testDB",
    },
};
module.exports=dev;