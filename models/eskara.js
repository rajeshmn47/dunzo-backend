const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const eskaraSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  maincategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: [{
    name: {
      type: String,
    },
  }],
  coordinates: {
    type: [Number],
    index: "2dsphere"
  },
})

module.exports = mongoose.model('Eskara', eskaraSchema);

