const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var storeSchema =  new Schema({
    title:String,
    img_url:String,
    maincategory:String,
    description:String,
    location:String,
    category:[{
      name: {
        type: String,
        required: true,
      },
    }],
    coordinates:{
      type:[Number],
      index:"2dsphere"
  },
})

module.exports = mongoose.model('Store',storeSchema)
