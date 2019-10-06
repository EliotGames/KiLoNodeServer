const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: Number,
  name: String,
  price: Number,
  isAvaiable: Boolean
});

module.exports = mongoose.model('Product', productSchema);