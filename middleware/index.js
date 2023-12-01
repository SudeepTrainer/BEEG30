const express = require('express');
const cookieParser = require('cookie-parser');
const port = 3000;

const app = express();
const jsonArray = [];
app.use(express.json());
// app.use(cookieParser())
// http is a stateless protocol. cookies are used to store small information 
// in the client.
app.get("/",(req,res)=>{
    console.log(req.cookies);
    // req.headers.cookie
    res.cookie("visited",true,{
        maxAge:60000
    })
    res.send("<h1>Home page</h1>")
});
app.post("/add",(req,res)=>{
    console.log(req.body);
    jsonArray.push(req.body);
    res.send("<h1>Added successfully</h1>")
})
app.get("/array",(req,res)=>{
    res.send(jsonArray);
})
app.listen(port,()=>{
    console.log("listening on port 3000");
});


