const express = require('express');
// const session = require('express-session');
const mongoose = require('mongoose');
// const mongodbStore = require('connect-mongodb-session')(session)
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const databaseUri = 'mongodb://127.0.0.1:27017/authdb';


async function db(){
    await mongoose.connect(databaseUri);
}
db()
.then(res=>console.log("DB connected"))
.catch(err=>console.log(`error ${err}`));

// define the user schema
const userSchema = new mongoose.Schema({
    username:String,
    password:String
})

// create a user model
const User = mongoose.model("User",userSchema);

// const store = new mongodbStore(
//     {
//         uri:databaseUri,
//         collection:"sessions"
//     }
// )
const PORT = 3000;

const application = express();

// middleware
application.set('view engine','ejs');
application.use(cookieParser());

// application.use(session({
//     secret:"thisisasecretkeytosigncookies",
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         secure:false,
//         maxAge:60000
//     },
//     store:store
// }));

// Routing
application.get("/login",(req,res)=>{
    res.render('login');
})

application.get("/register",(req,res)=>{
    res.render('register');
})


//start server
application.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})