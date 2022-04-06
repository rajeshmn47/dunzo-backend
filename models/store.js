const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var storeSchema =  new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    title:String,
    img_url:String,
    maincategory:String,
    description:String,
    location:String,
    category:Array,
})

module.exports = mongoose.model('storeTable',storeSchema)
