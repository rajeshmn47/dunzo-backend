
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name:String,
    image:String,
    subcat:String,
    desc:String,
    price:Number,
    quantity:Number,
    weight:Number,
})
module.exports = mongoose.model('Product',productSchema)
