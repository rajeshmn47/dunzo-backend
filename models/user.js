const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const customerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:false
    },
})


module.exports = mongoose.model('Customer',customerSchema)