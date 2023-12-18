const express = require('express');
// const session = require('express-session');
const mongoose = require('mongoose');
// const mongodbStore = require('connect-mongodb-session')(session)
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const databaseUri = 'mongodb://127.0.0.1:27017/authapp';


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
application.use(express.urlencoded({extended:true}));
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

application.get("/",(req,res)=>{
    res.render('home');
})
// Routing
application.get("/login",(req,res)=>{
    res.render('login');
})

application.get("/register",(req,res)=>{
    res.render('register');
})

application.post('/register',async (req,res)=>{
    console.log(req.body);
    const {username,password} = req.body;
    try{
        // check if the username and password is not empty
        if(!username || !password){
            res.status(401).render('register',{'error':"Enter username and password"})
        }
        const existingUser = await User.findOne({username});
        if(existingUser){
            res.status(400).render('register',{"error":"Username already exists"})
            return;
        }
        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser = new User({
            username,
            password:hashedPassword
        })
        await newUser.save();
        res.status(201).redirect('/login');
    }catch(error){
        console.log(error);
        res.status(500).render('register',{'error':"Internal server error"})
    }
})

application.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    try{
        const user = await User.findOne({username});
        if(user && bcrypt.compareSync(password,user.password)){
            res.cookie('auth',true);
            res.status(201).redirect('/');
        }else{
            res.status(500).render('login',{'error':"Incorrect username/password"})
        }
    }catch(error){
        console.log(error);
        res.status(500).render('login',{'error':"Internal server error"})
    }
})
//start server
application.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})