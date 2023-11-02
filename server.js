const http = require('http')
// const port = process.env.PORT || 1337;
const server = http.createServer(function(req,res){
    console.log("request listener function called");
    console.log(req.url);
    if(req.url === "/"){
        respondText(req,res);
    } else if(req.url === "/person"){
        respondJson(req,res);
    } else respondNothing(req,res);
    // res.end("Hi from the server");
    res.end();
})
server.listen(3000,()=>{
    console.log(`listening to the port 3000`);
});

function respondText(req,res){
    res.setHeader("Content-Type","text/plain");
    res.write("HI from server");
}

function respondJson(req,res){
    res.setHeader("Content-Type","application/json");
    res.write(JSON.stringify({name:"Bill",age:32}))
}

function respondNothing(req,res){
    res.writeHead(404,"NOthing found");
    res.write("Nothing found.")
}