const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const customerSchema = new Schema({
    name:{
        type:String,     
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:String,
        required:true
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    },
    active:{
        type:Boolean,
        default:false
    },
})


module.exports = mongoose.model('Customer',customerSchema)