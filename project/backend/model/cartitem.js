const mongoose = require('mongoose');
const cartItemSchema = mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:Number
})

const CartItem = mongoose.model('CartItem',cartItemSchema);
module.exports = CartItem;