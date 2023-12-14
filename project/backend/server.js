const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const mongodbStore = require('connect-mongodb-session')(session)
const databaseUri = 'mongodb://127.0.0.1:27017/mydb';

async function db(){
    await mongoose.connect(databaseUri);
}
db()
.then(res=>console.log("DB connected"))
.catch(err=>console.log(`error ${err}`));

const store = new mongodbStore(
    {
        uri:databaseUri,
        collection:"sessions"
    }
)
const PORT = 3000;

const application = express();

//middleware
application.use(session({
    secret:"thisisasecretkeytosigncookies",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:60000
    },
    store:store
}));

// Routing
application.get("/",(req,res)=>{
    res.send("Home page");
})

//start server
application.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})