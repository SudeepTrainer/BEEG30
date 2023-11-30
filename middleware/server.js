const express = require('express'); 
const app = express();
const port = 3000;

// global middleware
app.use(middleware1);
app.use(logMiddleware);

function middleware1(req,res,next){
    console.log("Middleware 1 called");
    const errorObj = new Error("just another error");
    next(errorObj);
}

function errorHanndler(err,req,res,next){
    console.error(err.stack);
    res.status(500).send("<h1>Error page</h1>")
}

function logMiddleware(req,res,next){
    console.log("logMiddleware called");
    if(req.query.user==='admin'){
        console.log("before");
        next();
        console.log("after");
    }else{
        res.send("<h1>Only admin can access<h1>")
    }
}

function defaultResponse(req,res,next){
    res.send("<h1>Default page </h1>")
}

app.get('/',defaultResponse);

function auth(req,res,next){
    if(req.query.username === 'abc' && req.query.password === 'abc'){
        next()
    }else{
        res.send("<h1>Login failed</h1>")
    }
}
app.get('/login',auth,(req,res,next)=>{
    console.log("routing action called");
    res.send("<h1>Login page</h1>")
})

app.use(errorHanndler);

app.listen(port,()=>{console.log(`listening on port ${port}`)})