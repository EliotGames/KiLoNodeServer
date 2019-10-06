const mongoose = require("mongoose");

const { getIdValue } = require("../helpers/db");

const productSchema = mongoose.Schema({
  _id: {
    type: String,
    minlength: 5,
    default: getIdValue
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0
  },
  isAvaiable: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Product", productSchema);
