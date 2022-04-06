
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var productSchema =  new Schema({
    name:String,
    image:String,
    subcat:String,
    desc:String,
    price:Number,
    quantity:Number,
})
module.exports = mongoose.model('productTable',productSchema)