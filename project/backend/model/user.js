const mongoose = require("mongoose")
// define the user schema
const userSchema = new mongoose.Schema({
    username:String,
    password:String
})

// create a user model
const User = mongoose.model("User",userSchema);
module.exports = User;