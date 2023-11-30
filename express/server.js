const express = require('express')
const fs = require('fs')
const port = 3000;
const app = express();
app.get("/",respondText);
app.get('/json',respondJson);
app.get('/echo',respondEcho);
app.get('/static/*',respondFiles);
app.get('*',respondNothing);

app.listen(port,()=>{
    console.log("Listening on port 3000");
})
function respondText(req,res){
    res.send("This is from express server");
}
function respondNothing(req,res){
    res.send("Page you are trying to access doesn't exist")
}
function respondJson(req,res){
    res.json({name:"Elon Musk",age:35})
}
function respondEcho(req,res){
    // console.log(req.query);
    const {input} = req.query;
    res.json({
        normal:input,
        uppercase:input.toUpperCase(),
        length:input.length
    })
}

function respondFiles(req,res){
    const fileName = `${__dirname}/public/${req.params[0]}`;
    fs.createReadStream(fileName)
        .on('error',()=>{respondNothing(req,res)})
        .pipe(res)
}