const mongoose = require('mongoose');

const measureSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  value: Number,
  productId: Number,
  deviceId: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Measure', measureSchema);
