const path = require('path')
const basePath = path.join("images","image1.gif")
const filePath = path.resolve(__dirname,basePath);

console.log(filePath);