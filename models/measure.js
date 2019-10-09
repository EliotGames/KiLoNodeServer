const mongoose = require("mongoose");

const measureSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  productId: {
    type: String,
    ref: "Product"
  },
  deviceId: {
    type: String,
    required: true,
    ref: "Device"
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Measure", measureSchema);
