console.log("First message");
setTimeout(()=>{
    console.log("Second message");
},0);
console.log("third message");

function a(){
    console.log("a called");
    // throw new Error("this is an error");
}
function b(){
    a();
}
function c(){
    b();
}
c();

function d(){
    d();
}
d();